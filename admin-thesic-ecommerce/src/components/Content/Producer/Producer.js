import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actFetchProducersRequest,
  actDeleteProducerRequest,
  actFindProducersRequest,
} from "../../../redux/actions/producer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MyFooter from "../../MyFooter/MyFooter";
import Paginator from "react-js-paginator";
import { exportExcel } from "../../../utils/exportExcel";
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal);

let token;

class Producer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      total: 0,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.fetch_reload_data(); 
  }

  fetch_reload_data() {
    token = localStorage.getItem("_auth");
    this.props
      .fetch_producers(token)
      .then((res) => {
        this.setState({
          total: res.total,
          producers: res.results
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pageChange(content) {
    const limit = 10;
    const offset = limit * (content - 1);
    this.props.fetch_producers(token, offset);
    this.setState({
      currentPage: content,
    });
    window.scrollTo(0, 0);
  }
  
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
      try {
        if (result.value) {
          const res = await this.props.delete_producer(id, token);
          if (!res?.success){
            toast.error(res?.message || "Xóa nhà cung cấp không thành công");
            return;
          }
         
            Swal.fire("Xóa thành công", "Dữ liệu đã được xóa.", "success");
            this.fetch_reload_data(); 
          
       
        }
      } catch (error) {
        console.error("Error deleting category: ", error);
        toast.error("Đã xảy ra lỗi khi xóa nhà cung cấp.");
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
    this.props.find_producers(token, searchText).then((res) => {
      this.setState({
        total: res.total,
      });
    });
  };

  downloadExcel = () => {
    const key = "producers";
    exportExcel(key);
  };

  render() {
    let { producers } = this.state;
    const { searchText, total } = this.state;
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Nhà cung cấp</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Nhà cung cấp</li>
          </ul>
        </div>
        <section className="tables pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    {/* <h3 className="h4">Danh sách nhà cung cấp</h3> */}
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
                    <Link to="/producers/add" className="btn btn-primary">
                      {" "}
                      Thêm nhà cung cấp
                    </Link>
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Mã nhà cung cấp</th>
                            <th>Tên nhà cung cấp</th>
                            <th>Hình ảnh</th>
                            <th>Thể loại</th>
                            <th style={{ textAlign: "center" }}>Trạng thái</th>
                            <th style={{ textAlign: "center" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {producers && producers.length
                            ? producers.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td style={{ textAlign: "center" }}>
                                      <div className="fix-cart">
                                        <img
                                          src={
                                            item && item.image
                                              ? item.image
                                              : null
                                          }
                                          className="fix-img"
                                          alt="not found"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      {item.categories
                                        ? item.categories.nameCategory
                                        : null}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      {item.isActive ? (
                                        <div className="i-checks">
                                         <p>Đang hoạt động</p>
                                        </div>
                                      ) : (
                                        <div className="i-checks">
                                         <p>Ngừng hoạt động</p>
                                        </div>
                                      )}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <div>
                                        <span
                                          title="Edit"
                                          className="fix-action"
                                        >
                                          <Link
                                            to={`producers/edit/${item.id}`}
                                          >
                                            {" "}
                                            <i className="fa fa-edit"></i>
                                          </Link>
                                        </span>
                                        <span
                                          title="Delete"
                                          onClick={() =>
                                            this.handleRemove(item.id)
                                          }
                                          className="fix-action"
                                        >
                                          <Link to="#">
                                            {" "}
                                            <i
                                              className="fa fa-trash"
                                              style={{ color: "#ff00008f" }}
                                            ></i>
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
    producers: state.producers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_producers: (token, offset) => {
      return dispatch(actFetchProducersRequest(token, offset));
    },
    delete_producer: (id, token) => dispatch(actDeleteProducerRequest(id, token)),
    find_producers: (token, searchText) => {
      return dispatch(actFindProducersRequest(token, searchText));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Producer);
