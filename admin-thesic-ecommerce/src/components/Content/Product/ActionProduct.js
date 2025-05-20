import React, { Component } from "react";
import MyFooter from "../../MyFooter/MyFooter";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  actAddProductRequest,
  actGetProductRequest,
  actEditProductRequest,
} from "../../../redux/actions/product";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import { uploadImage } from "../../../utils/upload";
import Dropzone from "react-dropzone";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
let token;
let id;
const override = css`
  display: block;
  margin: 0 auto;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;
class ActionProduct extends Component {
  constructor(props) {
    super(props);
    this.onDrop = (files) => {
      let data = [];
      if (this.state.dataGallery !== null) {
        data = this.state.dataGallery;
        if (files && files.length !== 0) {
          files.forEach((item) => data.push(item));
        }
      }
      if (!id) {
        this.setState({
          files,
        });
      } else {
        this.setState({
          files,
          dataGallery: data,
        });
      }
    };
    this.state = {
      nameProduct: "",
      price: 0,
      numberAvailable: 0,
      originalPrice: null,
      cost: null,
      categoryId: null,
      desc: "",
      isActive: true,
      image: "",
      properties: {},
      producerId: null,
      redirectToProduct: false,
      dataCategories: [],
      dataProducer: [],
      img: null,
      loading: false,
      files: [],
      dataGallery: [],
      stockQuantity: 0,
      productionDate: "",
      expDate: "",
      errors: {},
    };
    id = this.props.id;
  }
  getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  async componentDidMount() {
    token = localStorage.getItem("_auth");
    const resCategories = await callApi(
      "categories?limit=100",
      "GET",
      null,
      token
    );
    const producers = await callApi(`producers`, "GET", null, token);
    this.setState({
      dataCategories: resCategories?.data?.results || [],
      dataProducer: producers?.data?.results || [],
      productionDate: this.getCurrentDate(),
      expDate: this.getCurrentDate(),
    });

    if (id) {
      const res = await callApi(`products/${id}`, "GET", null, token);

      if (res && res.status === 200) {
        const convertProperties = JSON.stringify(res.data.properties);
        this.setState({
          nameProduct: res.data?.nameProduct,
          price: res.data.price,
          originalPrice: res.data.originalPrice,
          cost: res.data.cost,
          numberAvailable: res.data.numberAvailable,
          stockQuantity: res.data.stockQuantity,
          categoryId: res.data.categoryId,
          desc: res.data.description,
          isActive: res.data.isActive,
          isHot: res.data.isHot,
          image: res.data.image,
          properties: convertProperties,
          producerId: res.data.producerId,
          dataGallery: res.data.gallery,
          productionDate: this.formatDateToDDMMYYYY(res.data.productionDate),
          expDate: this.formatDateToDDMMYYYY(res.data.expDate),
        });
      }
    }
  }

  handleChangeEditor = (value) => {
    this.setState({ desc: value });
  };

  handleChangeImage = (event) => {
    if (event.target.files[0]) {
      const img = event.target.files[0];
      this.setState(() => ({ img }));
    }
    const output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleChangeCategory = async (event) => {
    const value = event.target.value;
    this.setState({
      categoryId: value,
    });
  };

  handleChangeSelecProducer = (event) => {
    const value = event.target.value;
    this.setState({
      producerId: value,
    });
  };

  handleChangeRemoveGallery = (index) => {
    const data = [...this.state.dataGallery];
    this.setState({
      dataGallery: data.splice(index, 1),
    });
  };

  formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  validate = () => {
    const { nameProduct, price, originalPrice, categoryId, cost } = this.state;
    const errors = {};

    if (!nameProduct) errors.nameProduct = "Tên sản phẩm không được để trống";
    if (!price) errors.price = "Giá bán không được để trống";
    if (!originalPrice) errors.originalPrice = "Giá gốc không được để trống";
    if (!categoryId) errors.category = "Danh mục không được để trống";
    if (!cost) errors.cost = "Chi phí không được để trống";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.validate()) return;
    const {
      files,
      dataGallery,
      nameProduct,
      price,
      originalPrice,
      cost,
      // stockQuantity,
      numberAvailable,
      categoryId,
      isActive,
      desc,
      properties,
      producerId,
      isHot,
      expDate,
      productionDate,
    } = this.state;

    let { image, img } = this.state;
    let newFiles = dataGallery;
    this.setState({
      loading: true,
    });
    if (img !== null && img !== image) {
      image = await uploadImage(img);
    }
    if (files.length > 0) {
      for (const file of files) {
        const builder = await uploadImage(file);
        newFiles.push(builder);
      }
    }
    const newDesc = desc === "" ? null : desc;
    const newName = nameProduct === "" ? null : nameProduct;
    const newImage = image === "" ? null : image;
    const newGallery = newFiles && newFiles.length === 0 ? null : newFiles;
    const newProducerId = parseInt(producerId);
    const newProperties = properties === {} ? null : properties;
    const newNumberAvailable = parseInt(numberAvailable);
    const newCategoryId = parseInt(categoryId);
    // const newStockQuantity = stockQuantity || 0;
    const newProductionDate = productionDate || "";
    const newExpDate = expDate || "";
    let newGalleryFinal = [];
    if (newGallery && newGallery.length) {
      newGallery.forEach((item) => {
        if (typeof item === "string") newGalleryFinal.push(item);
      });
    }

    if (!id) {
      const newProduct = {
        isActive,
        isHot,
        nameProduct: newName,
        price,
        originalPrice,
        cost,
        numberAvailable: newNumberAvailable,
        categoryId: newCategoryId,
        image: newImage,
        gallery: newGalleryFinal,
        description: newDesc,
        properties: newProperties,
        producerId: newProducerId,
        // stockQuantity: newStockQuantity,
        productionDate: newProductionDate,
        expDate: newExpDate,
      };
      this.props.add_Product(token, newProduct);
      this.setState({
        nameProduct: "",
        image: "",
        desc: "",
        properties: {},
        dataGallery: newGalleryFinal,
        loading: false,
      });
    } else {
      const editProduct = {
        isActive,
        isHot,
        nameProduct: newName,
        price,
        originalPrice,
        cost,
        numberAvailable,
        // stockQuantity,
        categoryId,
        image: newImage,
        gallery: newGalleryFinal,
        description: newDesc,
        properties: newProperties,
        producerId,
        productionDate,
        expDate,
      };

      await this.props.edit_Product(token, id, editProduct);
      this.setState({
        loading: false,
        redirectToProduct: true,
        dataGallery: newGalleryFinal,
      });
    }
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  render() {
    const {
      dataGallery,
      nameProduct,
      loading,
      price,
      originalPrice,
      cost,
      numberAvailable,
      // stockQuantity,
      categoryId,
      isActive,
      isHot,
      image,
      desc,
      producerId,
      redirectToProduct,
      dataCategories,
      dataProducer,
      productionDate,
      expDate,
      errors,
    } = this.state;
    console.log("============isHot================: ", isHot);
    let files;
    if (dataGallery && dataGallery?.length !== 0) {
      files = (dataGallery || []).map((file, index) => {
        return (
          <span key={index}>
            {typeof file === "string" ? (
              // If `file` is a string (URL), display it as is
              <img
                src={file}
                style={{ height: 100, width: 100 }}
                alt="Image not found"
              />
            ) : file instanceof File ? (
              // If `file` is a File object, create an object URL for it
              <img
                src={URL.createObjectURL(file)}
                style={{ height: 100, width: 100 }}
                alt="Image not found"
              />
            ) : (
              // Fallback when no valid file or URL is present
              <img
                src="" // Replace with your default image path
                style={{ height: 100, width: 100 }}
                alt=""
              />
            )}
          </span>
        );
      });
      // files = (dataGallery || []).map((file, index) => {
      //   return (
      //     <span key={index}>
      //       {typeof file !== "object" ? (
      //         <img
      //           src={file}
      //           style={{ height: 100, width: 100 }}
      //           alt="notfound"
      //         />
      //       ) : (
      //         <img
      //           src={URL.createObjectURL(file)}
      //           style={{ height: 100, width: 100 }}
      //           alt="notfound"
      //         />
      //       )}
      //     </span>
      //   );
      // });
    } else {
      files = this.state.files.map((file) => (
        <img
          src={URL.createObjectURL(file)}
          style={{ height: 100, width: 100 }}
          alt="notfound"
        />
      ));
    }

    if (redirectToProduct) {
      return <Redirect to="/products"></Redirect>;
    }
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={30}
            color={"#796aeebd"}
            loading={loading}
          />
        </div>
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Thêm sản phẩm</h2>
          </div>
        </header>

        {/* Forms Section*/}
        <section className="forms">
          <div className="container-fluid">
            <div className="row">
              {/* Form Elements */}
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Mô tả</h3>
                  </div>
                  <div className="card-body">
                    <form
                      className="form-horizontal"
                      onSubmit={(event) => this.handleSubmit(event)}>
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Tên sản phẩm
                        </label>
                        <div className="col-sm-9">
                          <input
                            name="nameProduct"
                            onChange={this.handleChange}
                            value={nameProduct}
                            type="text"
                            className={`form-control ${
                              errors.nameProduct ? "is-invalid" : ""
                            }`}
                          />
                          {errors.nameProduct && (
                            <div className="invalid-feedback">
                              {errors.nameProduct}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Giá
                        </label>
                        <div className="col-sm-3">
                          <input
                            name="price"
                            onChange={this.handleChange}
                            value={price}
                            type="number"
                            className={`form-control ${
                              errors.price ? "is-invalid" : ""
                            }`}
                          />
                          {errors.price && (
                            <div className="invalid-feedback">
                              {errors.price}
                            </div>
                          )}
                        </div>
                        <label
                          className="col-sm-3 form-control-label"
                          style={{ textAlign: "center" }}>
                          Số lượng có thể bán
                        </label>
                        <div className="col-sm-3">
                          <input
                            name="numberAvailable"
                            onChange={this.handleChange}
                            value={numberAvailable}
                            type="number"
                            className="form-control"
                          />
                        </div>
                        <div className="line" />
                        <label
                          className="col-sm-3 form-control-label"
                          style={{ textAlign: "center" }}>
                          Giá gốc
                        </label>
                        <div className="col-sm-3">
                          <input
                            name="originalPrice"
                            onChange={this.handleChange}
                            value={originalPrice}
                            type="number"
                            className={`form-control ${
                              errors.originalPrice ? "is-invalid" : ""
                            }`}
                          />
                          {errors.originalPrice && (
                            <div className="invalid-feedback">
                              {errors.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="line" />
                        <label
                          className="col-sm-3 form-control-label"
                          style={{ textAlign: "center" }}>
                          Chi phí
                        </label>
                        <div className="col-sm-3">
                          <input
                            name="cost"
                            onChange={this.handleChange}
                            value={cost}
                            type="number"
                            className={`form-control ${
                              errors.cost ? "is-invalid" : ""
                            }`}
                          />
                          {errors.cost && (
                            <div className="invalid-feedback">
                              {errors.cost}
                            </div>
                          )}
                        </div>
                        <div className="line" />
                      </div>
                      <div className="line" />
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Ngày sản xuất
                        </label>
                        <div className="col-sm-3">
                          <input
                            name="productionDate"
                            onChange={this.handleChange}
                            value={productionDate}
                            type="date"
                            placeholder="dd/mm/yyyy"
                            className={`form-control ${
                              errors.productionDate ? "is-invalid" : ""
                            }`}
                          />
                          {errors.productionDate && (
                            <div className="invalid-feedback">
                              {errors.productionDate}
                            </div>
                          )}
                        </div>
                        <label className="col-sm-3 form-control-label">
                          Hạn sử dụng
                        </label>
                        <div className="col-sm-3">
                          <input
                            name="expDate"
                            onChange={this.handleChange}
                            value={expDate}
                            type="date"
                            placeholder="dd/mm/yyyy"
                            className={`form-control ${
                              errors.expDate ? "is-invalid" : ""
                            }`}
                          />
                          {errors.expDate && (
                            <div className="invalid-feedback">
                              {errors.expDate}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="line" />

                      <div className="form-group row">
                        <label
                          htmlFor="fileInput"
                          className="col-sm-3 form-control-label">
                          Hình ảnh
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="file"
                            onChange={this.handleChangeImage}
                            className="form-control-file"
                          />
                          <div className="fix-cart-product">
                            <img
                              src={
                                image || "http://via.placeholder.com/300x200"
                              }
                              id="output"
                              className="fix-img-product"
                              alt="avatar"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Mô tả
                        </label>
                        <div className="col-sm-9">
                          <ReactQuill
                            modules={this.modules}
                            formats={this.formats}
                            value={desc}
                            onChange={this.handleChangeEditor}
                          />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Sản phẩm HOT
                          <br />
                        </label>
                        <div className="col-sm-9">
                          <div className="i-checks">
                            <input
                              type="checkbox"
                              onChange={this.handleChange}
                              name="isHot"
                              checked={isHot}
                              className="checkbox-template"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Trạng thái
                          <br />
                        </label>
                        <div className="col-sm-9">
                          <div className="i-checks">
                            <input
                              type="checkbox"
                              onChange={this.handleChange}
                              name="isActive"
                              checked={isActive}
                              className="checkbox-template"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Thể loại
                        </label>
                        <div className="col-sm-9">
                          <div>
                            <select
                              name="category"
                              onChange={this.handleChangeCategory}
                              value={categoryId}
                              className={`form-control ${
                                errors.category ? "is-invalid" : ""
                              }`}>
                              <option value="">Chọn danh mục</option>
                              {Array.isArray(dataCategories)
                                ? dataCategories.map((category) => (
                                    <option
                                      key={category?.id}
                                      value={category?.id}>
                                      {category?.nameCategory}
                                    </option>
                                  ))
                                : []}
                            </select>
                            {errors.category && (
                              <div className="invalid-feedback">
                                {errors.category}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Nhà sản xuất
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-control mb-3"
                            name="producer"
                            value={producerId}
                            onChange={this.handleChangeSelecProducer}>
                            <option value="">Chọn nhà sản xuất</option>
                            {Array.isArray(dataProducer)
                              ? dataProducer.map((item) => (
                                  <option key={item?.id} value={item?.id}>
                                    {item?.name}
                                  </option>
                                ))
                              : []}
                          </select>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label pt-50">
                          Thư viện ảnh
                        </label>
                        <div className="col-sm-9">
                          <Dropzone onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps }) => (
                              <section
                                className="container"
                                style={{ border: "1px dotted" }}>
                                <div
                                  {...getRootProps({ className: "dropzone" })}>
                                  <input {...getInputProps()} />
                                  <h2>Tải danh sách hình ảnh tại đây!</h2>
                                </div>
                                <aside>
                                  <div>{files}</div>
                                </aside>
                              </section>
                            )}
                          </Dropzone>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <div className="col-sm-4 offset-sm-3">
                          <button
                            type="reset"
                            className="btn btn-secondary"
                            style={{ marginRight: 2 }}>
                            Huỷ bỏ
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Lưu thay đổi
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Page Footer*/}
        <MyFooter></MyFooter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_Product: (token, newProduct) => {
      dispatch(actAddProductRequest(token, newProduct));
    },
    get_Product: (token, id) => {
      dispatch(actGetProductRequest(token, id));
    },
    edit_Product: (token, id, data) => {
      dispatch(actEditProductRequest(token, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(ActionProduct);
