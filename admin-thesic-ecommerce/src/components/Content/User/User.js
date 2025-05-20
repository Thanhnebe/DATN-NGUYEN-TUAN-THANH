import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actFetchUsersRequest,
  actDeleteUserRequest,
  actFindUsersRequest,
} from "../../../redux/actions/user";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MyFooter from "../../MyFooter/MyFooter";
import Paginator from "react-js-paginator";
import { exportExcel } from "../../../utils/exportExcel";
const MySwal = withReactContent(Swal);

let token;
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      total: 0,
      currentPage: 1,
      activeTab: "user",
    };
  }

  componentDidMount() {
    this.fetch_reload_data();
  }

  fetch_reload_data() {
    token = localStorage.getItem("_auth");
    this.props
      .fetch_users(token)
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
    this.props.fetch_users(token, offset);
    this.setState({
      currentPage: content,
    });
    window.scrollTo(0, 0);
  }

  // handleRemove = (id) => {
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //   }).then(async (result) => {
  //     if (result.value) {
  //       await this.props.delete_user(id, token);
  //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //     }
  //   });
  // };
  handleRemove = (id) => {
    MySwal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Bạn không thể khôi phục",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.value) {
        await this.props.delete_user(id, token);
        Swal.fire("Xóa thành công", "Dữ liệu đã được xóa.", "success");
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
    const { searchText, activeTab } = this.state;
    this.props.find_users(token, searchText, activeTab).then((res) => {
      this.setState({
        total: res.total,
      });
    });
  };

  downloadExcel = () => {
    const key = "users";
    exportExcel(key);
  };

  handleFilterChangeTab = (type)=>{
    const { searchText } = this.state;
    this.props.find_users(token, searchText, type).then((res) => {
      this.setState({
        total: res.total,
      });
    });
    this.setState({activeTab: type})
  }

  render() {
    let { users } = this.props;
    const { searchText, total, activeTab } = this.state;
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Khách hàng</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        {/* <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active">Khách hàng</li>
          </ul>
        </div> */}
        <section className="tables pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                  <button
                      onClick={this.downloadExcel}
                      style={{ border: 0, background: "green", borderRadius: 3 }}>
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
                            activeTab === "user" ? "active" : ""
                          }`}
                          onClick={() => this.handleFilterChangeTab("user")}>
                          Khách hàng
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "staff" ? "active" : ""
                          }`}
                          onClick={() => this.handleFilterChangeTab("staff")}>
                          Nhân viên
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "admin" ? "active" : ""
                          }`}
                          onClick={() => this.handleFilterChangeTab("admin")}>
                          Quản trị viên
                        </button>
                      </li>
                    </ul>
                  </div>
                  <form
                    onSubmit={(event) => this.handleSubmit(event)}
                    className="form-inline md-form form-sm mt-0"
                    style={{
                      justifyContent: "flex-end",
                      paddingTop: 5,
                      paddingRight: 20,
                    }}
                  >
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
                    <Link to="/users/add" className="btn btn-primary">
                      {" "}
                      Thêm mới
                    </Link>
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Mã khách hàng</th>
                            <th>Email</th>
                            <th>Tên khách hàng</th>
                            {/* <th style={{ textAlign: "center" }}>Admin</th>
                            <th style={{ textAlign: "center" }}>Staff</th>
                            <th style={{ textAlign: "center" }}>User</th> */}
                            <th style={{ textAlign: "center" }}>Xác thực email</th>
                            <th style={{ textAlign: "center" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {users && users.length
                            ? users.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    {/* <td style={{ textAlign: "center" }}>
                                      <div class="i-checks">
                                        {item.role.nameRole === "admin" ? (
                                          <input
                                            type="radio"
                                            checked={true}
                                            onChange={() =>
                                              this.handleChangeRadio
                                            }
                                            class="radio-template"
                                          />
                                        ) : (
                                          <input
                                            type="radio"
                                            checked={false}
                                            onChange={() =>
                                              this.handleChangeRadio
                                            }
                                            class="radio-template"
                                          />
                                        )}
                                      </div>
                                    </td> */}
                                    {/* <td style={{ textAlign: "center" }}>
                                      <div class="i-checks">
                                        {item.role.nameRole === "staff" ? (
                                          <input
                                            type="radio"
                                            checked={true}
                                            onChange={() =>
                                              this.handleChangeRadio
                                            }
                                            class="radio-template"
                                          />
                                        ) : (
                                          <input
                                            type="radio"
                                            checked={false}
                                            onChange={() =>
                                              this.handleChangeRadio
                                            }
                                            class="radio-template"
                                          />
                                        )}
                                      </div>
                                    </td> */}
                                    {/* <td style={{ textAlign: "center" }}>
                                      <div class="i-checks">
                                        {item.role.nameRole === "user" ? (
                                          <input
                                            type="radio"
                                            checked={true}
                                            onChange={() =>
                                              this.handleChangeRadio
                                            }
                                            class="radio-template"
                                          />
                                        ) : (
                                          <input
                                            type="radio"
                                            checked={false}
                                            onChange={() =>
                                              this.handleChangeRadio
                                            }
                                            class="radio-template"
                                          />
                                        )}
                                      </div>
                                    </td> */}
                                    <td style={{ textAlign: "center" }}>
                                      {item.isVerifyEmail ? (
                                        <div className="i-checks">
                                          <p>Đã xác thực</p>
                                          {/* <input
                                            type="checkbox"
                                            checked={true}
                                            onChange={() =>
                                              this.handleChangeCheckBox
                                            }
                                            className="checkbox-template"
                                          /> */}
                                        </div>
                                      ) : (
                                        <div className="i-checks">
                                           <p>Chưa xác thực</p>
                                          {/* <input
                                            type="checkbox"
                                            checked={false}
                                            onChange={() =>
                                              this.handleChangeCheckBox
                                            }
                                            className="checkbox-template"
                                          /> */}
                                        </div>
                                      )}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <div>
                                        <span
                                          title="Edit"
                                          className="fix-action"
                                        >
                                          <Link to={`/users/edit/${item.id}`}>
                                            {" "}
                                            <i className="fa fa-edit"></i>
                                          </Link>
                                        </span>
                                        {/* <span title='Delete' onClick={() => this.handleRemove(item.id)} className="fix-action"><Link to="#"> <i className="fa fa-trash" style={{ color: '#ff00008f' }}></i></Link></span>
                                         */}
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
                  style={{ float: "right" }}
                >
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_users: (token, offset) => {
      return dispatch(actFetchUsersRequest(token, offset));
    },
    delete_user: (id, token) => {
      dispatch(actDeleteUserRequest(id, token));
    },
    find_users: (token, searchText, filter) => {
      return dispatch(actFindUsersRequest(token, searchText, filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
