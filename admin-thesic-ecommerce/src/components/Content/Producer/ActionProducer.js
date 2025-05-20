import React, { Component } from "react";
import MyFooter from "../../MyFooter/MyFooter";
import {
  actAddProducerRequest,
  actGetProducerRequest,
  actEditProducerRequest,
} from "../../../redux/actions/producer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import { uploadImage } from "../../../utils/upload";
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
class ActionProducer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      name: "",
      desc: "",
      address: "",
      image: "",
      categoryId: 0,
      dataCategories: [],
      redirectToProducer: false,
      img: null,
      loading: false,
      errors: {},
    };
    id = this.props.id;
  }

  async componentDidMount() {
    token = localStorage.getItem("_auth");
    const resCategories = await callApi("categories", "GET", null, token);
    this.setState({
      dataCategories: resCategories.data.results,
    });
    if (id) {
      const res = await callApi(`producers/${id}`, "GET", null, token);
      this.setState({
        isActive: res.data.isActive,
        name: res.data.name,
        desc: res.data.description,
        address: res.data.address,
        image: res.data.image,
        categoryId: res.data.categoryId,
      });
    }
  }

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

  validate = () => {
    const { name } = this.state;
    const errors = {};
    if (!name) errors.name = "Tên thể nhà cung cấp";
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.validate()) return;
    const { isActive, name, desc, address, categoryId } = this.state;
    let { img, image } = this.state;
    this.setState({
      loading: true,
    });
    //upload image to firebase
    if (img !== null && img !== image) {
      image = await uploadImage(img);
    }
    const newDesc = desc === "" ? null : desc;
    const newName = name === "" ? null : name;
    const newAddress = address === "" ? null : address;
    const newImage = image === "" ? null : image;
    if (!id) {
      const newProducer = {
        isActive,
        name: newName,
        description: newDesc,
        address: newAddress,
        categoryId,
        image: newImage,
      };
      this.props.add_Producer(token, newProducer);
      this.setState({
        name: "",
        desc: "",
        address: "",
      });
    } else {
      const editProducer = {
        isActive,
        name: newName,
        description: newDesc,
        address: newAddress,
        categoryId,
        image: newImage,
      };
      await this.props.edit_Producer(token, id, editProducer);
      this.setState({
        redirectToProducer: true,
      });
    }
  };

  render() {
    const {
      isActive,
      name,
      desc,
      address,
      redirectToProducer,
      dataCategories,
      categoryId,
      loading,
      image,
      errors,
    } = this.state;
    if (redirectToProducer) {
      return <Redirect to="/producers"></Redirect>;
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
            <h2 className="no-margin-bottom">Nhà cung cấp</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active">Nhà cung cấp</li>
          </ul>
        </div>
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
                          Tên nhà cung cấp
                        </label>
                        <div className="col-sm-9">
                          <input
                            name="name"
                            onChange={this.handleChange}
                            value={name}
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          />
                          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Mô tả
                        </label>
                        <div className="col-sm-9">
                          <input
                            name="desc"
                            onChange={this.handleChange}
                            value={desc}
                            type="text"
                            placeholder="Note"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Địa chỉ
                        </label>
                        <div className="col-sm-9">
                          <input
                            name="address"
                            onChange={this.handleChange}
                            value={address}
                            type="text"
                            placeholder="Note"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Thể loại
                        </label>
                        <div className="col-sm-9">
                          {/* <textarea name="properties" onChange={this.handleChange} value={properties} rows="5" className="form-control" /> */}
                          {dataCategories && dataCategories.length
                            ? dataCategories.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="i-checks"
                                    style={{
                                      display: "inline-block",
                                      paddingRight: 35,
                                    }}>
                                    {item.id === categoryId ? (
                                      <input
                                        id={index}
                                        name="categoryId"
                                        checked
                                        value={categoryId}
                                        onChange={this.handleChange}
                                        type="radio"
                                        className="radio-template"
                                      />
                                    ) : (
                                      <input
                                        id={index}
                                        name="categoryId"
                                        value={categoryId}
                                        onChange={this.handleChange}
                                        type="radio"
                                        className="radio-template"
                                      />
                                    )}
                                    <label>{item.nameCategory}</label>
                                  </div>
                                );
                              })
                            : null}
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
                          <div className="fix-cart">
                            <img
                              src={
                                image || "http://via.placeholder.com/400x300"
                              }
                              id="output"
                              className="fix-img"
                              alt="avatar"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Trạng thái
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
                            <label htmlFor="checkboxCustom1"></label>
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <div className="col-sm-4 offset-sm-3">
                          <button
                            type="reset"
                            className="btn btn-secondary"
                            style={{ marginRight: 2 }}>
                            Hủy bỏ
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
    add_Producer: (token, newProducer) => {
      dispatch(actAddProducerRequest(token, newProducer));
    },
    get_Producer: (token, id) => {
      dispatch(actGetProducerRequest(token, id));
    },
    edit_Producer: (token, id, data) => {
      dispatch(actEditProducerRequest(token, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(ActionProducer);
