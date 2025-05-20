import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actFetchCategoriesRequest,
  actDeleteCategoryRequest,
  actFindCategoriesRequest,
  actFetchCategoriesTreeRequest,
} from "../../../redux/actions/category";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MyFooter from "../../MyFooter/MyFooter";
import Paginator from "react-js-paginator";
import { exportExcel } from "../../../utils/exportExcel";
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal);
let token;
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      total: 0,
      currentPage: 1,
      categories: [],
      openCategoryIds: [],
    };
  }

  componentDidMount() {
    this.fetch_reload_data(); // Fetch data when component mounts
  }

  fetch_reload_data() {
    token = localStorage.getItem("_auth");
    this.props
      .fetch_categories_tree()
      .then((res) => {
        // Update state with fetched categories
        this.setState({
          categories: res,
          total: res.length, // Assuming res contains the categories
        });
      })
      .catch((err) => {
        console.error("Error fetching categories tree: ", err);
      });
  }

  handleRemove = (id) => {
    MySwal.fire({
      title: "Bạn chắn chắn muốn xóa?",
      text: "Bạn không thể khôi phục lại danh mục",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then(async (result) => {
      if (result.value) {
        try {
          const res =  await this.props.delete_category(id, token);
          if (!res?.success){
            toast.error(res?.message || "Xóa danh mục không thành công");
           return;
          }
          Swal.fire("Đã xóa!", "Bạn đã xóa danh mục thành công", "success");
          this.fetch_reload_data(); // Refresh data after deletion
        } catch (err) {
          console.error("Error deleting category: ", err);
        }
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
    const { searchText } = this.state;
    this.props.find_categories(searchText).then((res) => {
      this.setState({
        total: res.total,
        categories: res.categories, // Update categories based on search results
      });
    });
  };

  downloadExcel = () => {
    const key = "categories";
    exportExcel(key);
  };

  pageChange = (page) => {
    const limit = 10;
    const offset = limit * (page - 1);
    this.props.fetch_categories(offset).then((res) => {
      this.setState({
        currentPage: page,
        categories: res.categories, // Update categories based on page change
        total: res.total,
      });
    });
    window.scrollTo(0, 0);
  };

  toggleCategory(id) {
    this.setState((prevState) => {
      const { openCategoryIds } = prevState;
      const isOpen = openCategoryIds.includes(id);
      const newOpenCategoryIds = isOpen
        ? openCategoryIds.filter((catId) => catId !== id) // Đóng danh mục
        : [...openCategoryIds, id]; // Mở danh mục

      return { openCategoryIds: newOpenCategoryIds };
    });
  }

  renderCategory(category, level = 0) {
    return (
      <React.Fragment key={category.id}>
        <tr>
          <td>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                paddingLeft: `${level * 20}px`, // Indentation based on the level
              }}
              onClick={() => this.toggleCategory(category.id)}>
              {/* Arrow Icon */}
              {category.children && category.children.length > 0 && (
                <i
                  className={`fa ${
                    this.state.openCategoryIds.includes(category.id)
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  }`}
                  style={{ marginRight: 10 }}></i>
              )}
  
              {/* Category Name */}
              <span
                style={{
                  fontWeight:
                    category.children && category.children.length > 0
                      ? "bold"
                      : "normal",
                }}>
                {category.nameCategory}
              </span>
            </div>
          </td>
          <td>{category.id}</td>
          <td style={{ textAlign: "center" }}>
            <div className="fix-cart2">
              <img src={category.image} className="fix-img2" alt="avatar" />
            </div>
          </td>
          {/* <td style={{ textAlign: "center" }}>
            {category.isActive ? (
              <div className="i-checks">
                <p>Đang hoạt động</p>
              </div>
            ) : (
              <div className="i-checks">
                <p>Ngừng hoạt động</p>
              </div>
            )}
          </td> */}
          <td style={{ textAlign: "center" }}>
            <div>
              <span title="Edit" className="fix-action">
                <Link to={`categories/edit/${category.id}`}>
                  <i className="fa fa-edit"></i>
                </Link>
              </span>
              <span
                title="Delete"
                onClick={() => this.handleRemove(category.id)}
                className="fix-action">
                <Link to="#">
                  <i className="fa fa-trash" style={{ color: "#ff00008f" }}></i>
                </Link>
              </span>
            </div>
          </td>
        </tr>
        {this.state.openCategoryIds.includes(category.id) &&
          category.children &&
          category.children.length > 0 && (
            <React.Fragment>
              {category.children.map((child) =>
                this.renderCategory(child, level + 1) // Pass the incremented level for child categories
              )}
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
  
  render() {
    const { searchText, total, categories } = this.state;

    return (
      <div className="content-inner">
        {/* Page Header */}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Thể loại</h2>
          </div>
        </header>
        {/* Breadcrumb */}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Thể loại</li>
          </ul>
        </div>
        <section className="tables pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
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
                  <form
                    onSubmit={(event) => this.handleSubmit(event)}
                    className="form-inline md-form form-sm mt-0"
                    style={{
                      justifyContent: "flex-end",
                      paddingTop: 5,
                      paddingRight: 20,
                    }}>
                    {/* <div>
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
                    </div> */}
                    <Link to="/categories/add" className="btn btn-primary">
                      {" "}
                      Thêm thể loại
                    </Link>
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Tên danh mục</th>
                            <th>Mã danh mục</th>
                            <th>Hình ảnh</th>
                            {/* <th style={{ textAlign: "center" }}>Trạng thái</th> */}
                            <th style={{ textAlign: "center" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories && categories.length
                            ? categories.map((category) =>
                                this.renderCategory(category)
                              )
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <nav
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
                </nav> */}
              </div>
            </div>
          </div>
        </section>
        {/* Page Footer */}
        <MyFooter></MyFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categoriesTree, // Make sure this matches your reducer state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_categories: (offset) =>
      dispatch(actFetchCategoriesRequest(null, offset)),
    fetch_categories_tree: () => dispatch(actFetchCategoriesTreeRequest()),
    delete_category: (id, token) => dispatch(actDeleteCategoryRequest(id, token)),
    find_categories: (searchText) =>
      dispatch(actFindCategoriesRequest(null, searchText)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
