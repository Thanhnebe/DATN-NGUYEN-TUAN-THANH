import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actFetchProductsRequest,
  actDeleteProductRequest,
  actFindProductsRequest,
} from "../../../redux/actions/product";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MyFooter from "../../MyFooter/MyFooter";
import { exportExcel } from "../../../utils/exportExcel";
import Paginator from "react-js-paginator";
import callApi from "../../../utils/apiCaller";
import { formatNumber } from "../../../utils";

const MySwal = withReactContent(Swal);

let token;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      currentPage: 1,
      searchText: "",
      categories: [],
      categoryId: null,
      activeTab: "",
      properties: null
    };
  }

  async componentDidMount() {
    this.fetch_reload_data();
    const res = await callApi("categories/tree", "GET", null);
    console.log("categories: ", res?.data?.results);
    this.setState({
      categories: res?.data?.results,
    });
  }

  fetch_reload_data() {
    token = localStorage.getItem("_auth");
    this.props
      .fetch_products(token)
      .then((res) => {
        this.setState({
          total: res.total,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pageChange(content) {
    const limit = 10;
    const offset = limit * (content - 1);
    this.props.fetch_products(token, offset);
    this.setState({
      currentPage: content,
    });
    window.scrollTo(0, 0);
  }

  handleRemove = (id) => {
    MySwal.fire({
      title: "Bạn chắc chắn muốn xoá?",
      text: "Bạn không thể khôi phục sau khi xoá!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.value) {
        await this.props.delete_product(id, token);
        Swal.fire(
          "Xoá sản phẩm thành công",
          "Sản phẩm của bạn đã được xoá",
          "Thành công"
        );
      }
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchText, filter } = this.state;
    this.props
      .find_products(token, searchText, JSON.stringify(filter))
      .then((res) => {
        this.setState({
          total: res.total,
        });
      });
  };

  downloadExcel = () => {
    const key = "products";
    exportExcel(key);
  };

  handleCategorySelect = (event) => {
    this.setState({ categoryId: event.target.value }, () => {
      const categoryId = this.state.categoryId;
      let filter = {};
      if (categoryId) {
        filter = { categoryId };
        this.setState({ filter: { categoryId } });
      }
      const { searchText } = this.state;
      this.props
        .find_products(token, searchText, JSON.stringify(filter))
        .then((res) => {
          this.setState({
            total: res.total,
          });
        });
    });
  };

  renderCategoryOptions = (categories, level = 0) => {
    return categories?.map((category) => (
      <React.Fragment key={category?.id}>
        <option
          value={category?.id}
          style={{ fontWeight: level === 0 ? "bold" : "normal" }}>
          {`${"\u00A0".repeat(level * 2)}${category?.nameCategory}`}{" "}
        </option>

        {category?.children && category?.children?.length > 0
          ? this.renderCategoryOptions(category?.children, level + 1)
          : null}
      </React.Fragment>
    ));
  };

  handleFilterChangeTab = (status) => {
    const value = status;
    if (status === "isHot")
      status = `{"isHot":true,"isBestSelling":false}`;
    else if (status === "isBestSelling")
      status = `{"isHot":false,"isBestSelling":true}`;
    else if (status === 'isActive') status = `{"isActive":true}`;
    else if (status === 'notActive') status = `{"isActive":false}`;
    const filterStatus = status;
    this.setState({ status: filterStatus });
    this.setState({ activeTab: value }, () => {
      // this.fetchOrders();
      const { searchText } = this.state;
      if (status) {
        this.props
          .find_products(token, searchText, filterStatus)
          .then((res) => {
            this.setState({
              total: res?.total || 0,
            });
          });
      } else {
        this.props.find_products(token, searchText).then((res) => {
          this.setState({
            total: res.total,
          });
        });
      }
    });
  };

  render() {
    let { products } = this.props;
    const { searchText, total, categories, activeTab } = this.state;
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Sản phẩm</h2>
          </div>
        </header>
        {/* Breadcrumb*/}

        <section className="tables pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    {/* <h3 className="h4">Danh sách sản phẩm</h3> */}

                    <button
                      onClick={this.downloadExcel}
                      style={{
                        border: 0,
                        background: "green",
                        borderRadius: 3,
                      }}>
                      <h3
                        className="fa fa-file-excel-o"
                        style={{
                          fontSize: 18,
                          color: "white",
                          padding: "5px 6px",
                        }}>
                        {" "}
                        Xuất Excel
                      </h3>
                    </button>
                  </div>

                  <div>
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "" ? "active" : ""
                          }`}
                          onClick={() => this.handleFilterChangeTab("")}>
                          Tất cả
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "isHot" ? "active" : ""
                          }`}
                          onClick={() => this.handleFilterChangeTab("isHot")}>
                          Sản phẩm HOT
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "isBestSelling" ? "active" : ""
                          }`}
                          onClick={() =>
                            this.handleFilterChangeTab("isBestSelling")
                          }>
                          Sản phẩm bán chạy
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "isActive" ? "active" : ""
                          }`}
                          onClick={() => this.handleFilterChangeTab("isActive")}>
                          Đang bán
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "notActive" ? "active" : ""
                          }`}
                          onClick={() => this.handleFilterChangeTab("notActive")}>
                          Ngừng bán
                        </button>
                      </li>
                   
                      {/* <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "isFeature" ? "active" : ""
                          }`}
                          onClick={() =>
                            this.handleFilterChangeTab("isFeature")
                          }>
                          Sản phẩm nổi bật
                        </button>
                      </li> */}
                    </ul>
                  </div>

                  <form
                    onSubmit={(event) => this.handleSubmit(event)}
                    className="form-inline md-form form-sm mt-0"
                    style={{
                      justifyContent: "flex-end",
                      paddingTop: 5,
                      paddingRight: 20,
                    }}>
                    <div>
                      <input
                        name="searchText"
                        onChange={this.handleChange}
                        value={searchText}
                        className="form-control form-control-sm ml-3 w-75"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                      />

                      <button
                        style={{
                          border: 1,
                          background: "green",
                          color: "white",
                        }}>
                        {" "}
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </div>
                    <select
                      style={{ marginRight: "5px", borderRadius: "5px" }}
                      onChange={this.handleCategorySelect}>
                      <option value="">Chọn danh mục</option>
                      {this.renderCategoryOptions(categories)}
                    </select>

                    <Link to="/products/add" className="btn btn-primary">
                      Thêm sản phẩm
                    </Link>
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>

                            <th>Giá</th>
                            <th>Số lượng</th>

                            <th style={{ textAlign: "center" }}>Hình ảnh</th>
                            <th style={{ textAlign: "center" }}>Trạng thái</th>
                            <th style={{ textAlign: "center" }}>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products && products.length
                            ? products.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{item?.id}</td>
                                    <td>{item?.nameProduct}</td>
                                    <td>{formatNumber.format(item?.price)}</td>
                                    <td>{item?.numberAvailable}</td>
                                    <td style={{ textAlign: "center" }}>
                                      <div className="fix-cart">
                                        <img
                                          src={
                                            item && item?.image
                                              ? item?.image
                                              : null
                                          }
                                          className="fix-img"
                                          alt="not found"
                                        />
                                      </div>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      {item?.isActive ? (
                                        <div className="i-checks">
                                          {/* <input type="checkbox" checked={true} className="checkbox-template" /> */}
                                          <p>Đang bán</p>
                                        </div>
                                      ) : (
                                        <div className="i-checks">
                                          <p>Ngừng bán</p>
                                          {/* <input type="checkbox" checked={false} className="checkbox-template" /> */}
                                        </div>
                                      )}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <div>
                                        <span
                                          title="Edit"
                                          className="fix-action">
                                          <Link
                                            to={`/products/edit/${item?.id}`}>
                                            {" "}
                                            <i className="fa fa-edit"></i>
                                          </Link>
                                        </span>
                                        <span
                                          title="Delete"
                                          onClick={() =>
                                            this.handleRemove(item.id)
                                          }
                                          className="fix-action">
                                          <Link to="#">
                                            {" "}
                                            <i
                                              className="fa fa-trash"
                                              style={{
                                                color: "#ff00008f",
                                              }}></i>
                                          </Link>
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <nav
                  aria-label="Page navigation example"
                  style={{ float: "right" }}>
                  <ul className="pagination">
                    <Paginator
                      pageSize={10}
                      totalElements={total}
                      onPageChangeCallback={(e) => {
                        this.pageChange(e);
                      }}
                    />
                  </ul>
                </nav>
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

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products: (token, offset) => {
      return dispatch(actFetchProductsRequest(token, offset));
    },
    delete_product: (id, token) => {
      dispatch(actDeleteProductRequest(id, token));
    },
    find_products: (token, searchText, filter) => {
      return dispatch(actFindProductsRequest(token, searchText, filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
