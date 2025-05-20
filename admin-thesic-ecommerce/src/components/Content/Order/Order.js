import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  actFetchOrdersRequest,
  actDeleteOrderRequest,
  actFindOrdersRequest,
} from "../../../redux/actions/order";
import Swal from "sweetalert2";
import Moment from "react-moment";
import withReactContent from "sweetalert2-react-content";
import MyFooter from "../../MyFooter/MyFooter";
import Paginator from "react-js-paginator";
import { exportExcel } from "../../../utils/exportExcel";
import { formatNumber } from "../../../utils";
const MySwal = withReactContent(Swal);

let token;

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      total: 0,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.fetch_reload_data(); //recive data from return promise dispatch
  }

  fetch_reload_data() {
    token = localStorage.getItem("_auth");
    console.log("this.props: ", this.props)
    this.props
      .fetch_orders(token)
      .then((res) => {
        this.setState({
          total: res.total,
          activeTab: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pageChange(content) {
    const limit = 10;
    const offset = limit * (content - 1);
    this.props.fetch_orders(token, offset) 
    .then((res) => {
      this.setState({
        total: res.total,
        currentPage: content,
        activeTab: "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
   
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
        await this.props.delete_order(id, token);
        Swal.fire(
          "Xoá đơn hàng thành công",
          "Đơn hàng của bạn đã được xoá",
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
    const { searchText, filterStatus } = this.state;
    this.props.find_order(token, searchText, filterStatus).then((res) => {
      this.setState({
        total: res.total,
      });
    });
  };

  downloadExcel = () => {
    const key = "orders";
    exportExcel(key);
  };

  showOrder(status) {
    const mappedStatus = {
      Unconfirm: "Chưa xác nhận",
      Confirm: "Đã xác nhận",
      Shipping: "Đang vận chuyển",
      Complete: "Hoàn thành",
      Canceled: "Hủy bỏ",
    };

    const statusStyles = {
      Unconfirm: {
        backgroundColor: "#FF9966",
        color: "#5A5A5A",
      },
      Confirm: {
        backgroundColor: "#33FFFF",
        color: "#3A3A3A",
      },
      Shipping: {
        backgroundColor: "#CC99FF",
        color: "#333333",
      },
      Complete: {
        backgroundColor: "#339900",
        color: "#2F4F4F",
      },
      Canceled: {
        backgroundColor: "#CC3300",
        color: "#4A4A4A",
      },
    };

    return (
      <div className="col-md-3">
        <label
          className="fix-status"
          style={{
            ...statusStyles[status],
            padding: "6px 12px",
            borderRadius: "5px", // Bo góc tròn
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Bóng đổ nhẹ
            // fontWeight: "bold", // In đậm
            fontSize: "14px", // Kích thước chữ
          }}>
          {mappedStatus[status]}
        </label>
      </div>
    );
  }

  // showOrder(status) {
  //   const mappedStatus = {
  //     Unconfirm: "Chưa xác nhận",
  //     Confirm: "Đã xác nhận",
  //     Shipping: "Đang vận chuyển",
  //     Complete: "Hoàn thành",
  //     Canceled: "Hủy bỏ",
  //   };
  //   if (status === "Unconfirm") {
  //     return (
  //       <div className="col-md-3">
  //         <label
  //           className="fix-status"
  //           style={{ background: "#ff9800", padding: "3px 4px" }}>
  //           {mappedStatus[status]}
  //         </label>
  //       </div>
  //     );
  //   }
  //   if (status === "Confirm") {
  //     return (
  //       <div className="col-md-3">
  //         <label
  //           className="fix-status"
  //           style={{ background: "#337ab7", padding: "3px 4px" }}>
  //           {mappedStatus[status]}
  //         </label>
  //       </div>
  //     );
  //   }
  //   if (status === "Shipping") {
  //     return (
  //       <div className="col-md-3">
  //         <label
  //           className="fix-status"
  //           style={{ background: "#634a41", padding: "3px 4px" }}>
  //           {mappedStatus[status]}
  //         </label>
  //       </div>
  //     );
  //   }
  //   if (status === "Complete") {
  //     return (
  //       <div className="col-md-3">
  //         <label
  //           className="fix-status"
  //           style={{ background: "#5cb85c", padding: "3px 4px" }}>
  //           {mappedStatus[status]}
  //         </label>
  //       </div>
  //     );
  //   }
  //   if (status === "Canceled") {
  //     return (
  //       <div className="col-md-3">
  //         <label
  //           className="fix-status"
  //           style={{ background: "#d9534f", padding: "3px 4px" }}>
  //           {mappedStatus[status]}
  //         </label>
  //       </div>
  //     );
  //   }
  // }

  handleFilterChange = (event) => {
    const newValue = event.target.value;

    this.setState({ filterStatus: newValue }, () => {
      // Call API to fetch orders based on the selected filter status
      const token = localStorage.getItem("_auth");
      const { searchText, filterStatus } = this.state; // If you are also using search text for filtering

      this.props
        .find_order(token, searchText, newValue)
        .then((res) => {
          this.setState({
            total: res.total,
            filterStatus,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  handleFilterChangeDropdown = (event) => {
    const newValue = event.target.value;
    this.setState({ filterStatus: newValue, activeTab: newValue }, () => {
      this.fetchOrders();
    });
  };

  handleFilterChangeTab = (status) => {
    this.setState({ filterStatus: status, activeTab: status }, () => {
      this.fetchOrders();
    });
  };

  fetchOrders = () => {
    const token = localStorage.getItem("_auth");
    const { searchText, filterStatus } = this.state;
    this.props
      .find_order(token, searchText, filterStatus)
      .then((res) => {
        this.setState({ total: res.total });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { orders } = this.props;
    const { searchText, total, activeTab } = this.state;
    return (
      <div className="content-inner">
        {/* Page Header */}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Danh sách đơn hàng</h2>
          </div>
        </header>
        {/* Breadcrumb */}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Danh sách đơn hàng</li>
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
                        background: "#74DBEF",
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
                            activeTab === "Unconfirm" ? "active" : ""
                          }`}
                          onClick={() =>
                            this.handleFilterChangeTab("Unconfirm")
                          }>
                          Chưa xác nhận
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "Confirm" ? "active" : ""
                          }`}
                          onClick={() => this.handleFilterChangeTab("Confirm")}>
                          Đã xác nhận
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "Shipping" ? "active" : ""
                          }`}
                          onClick={() =>
                            this.handleFilterChangeTab("Shipping")
                          }>
                          Đang vận chuyển
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "Complete" ? "active" : ""
                          }`}
                          onClick={() =>
                            this.handleFilterChangeTab("Complete")
                          }>
                          Hoàn thành
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "Canceled" ? "active" : ""
                          }`}
                          onClick={() =>
                            this.handleFilterChangeTab("Canceled")
                          }>
                          Hủy bỏ
                        </button>
                      </li>
                    </ul>
                  </div>
                  <form
                    onSubmit={this.handleSubmit}
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
                    <Link to="/orders/add" className="btn btn-primary">
                      Thêm đơn hàng
                    </Link>
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Mã đơn hàng</th>
                            <th>Khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Tình trạng thanh toán</th>
                            <th>Số lượng</th>
                            <th>Phí vận chuyển</th>
                            <th>Giảm giá</th>
                            <th>Thành tiền</th>
                            <th>Ghi chú</th>
                            <th>Thời gian đặt</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders && orders.length
                            ? orders.map((item, index) => (
                                <tr key={index}>
                                  <td>{item?.id}</td>
                                  <td>{item?.fullName}</td>
                                  <td>{item?.phone}</td>
                                  <td>{this.showOrder(item.status)}</td>
                                  <td>
                                    {item?.isPaid
                                      ? "Đã thanh toán"
                                      : "Chưa thanh toán"}
                                  </td>
                                  <td>
                                    {formatNumber.format(item?.itemAmount)}
                                  </td>
                                  <td>
                                    {formatNumber.format(item?.shippingTotal)}
                                  </td>
                                  <td>
                                    {formatNumber.format(item?.promoTotal)}
                                  </td>
                                  <td>
                                    {formatNumber.format(item?.totalAmount)}
                                  </td>
                                  <td>{item.note}</td>
                                  <td>
                                    <Moment format="YYYY/MM/DD">
                                      {item.createdAt}
                                    </Moment>
                                  </td>
                                  <td>
                                    <div>
                                      <span title="Edit" className="fix-action">
                                        <Link to={`/orders/edit/${item.id}`}>
                                          <i className="fa fa-edit"></i>
                                        </Link>
                                      </span>
                                      {/* <span title='Delete' onClick={() => this.handleRemove(item.id)} className="fix-action">
                                    <Link to="#"><i className="fa fa-trash" style={{ color: '#ff00008f' }}></i></Link>
                                  </span> */}
                                    </div>
                                  </td>
                                </tr>
                              ))
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
                      onPageChangeCallback={this.pageChange.bind(this)}
                    />
                  </ul>
                </nav>
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
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_orders: (token, offset) => {
      return dispatch(actFetchOrdersRequest(token, offset));
    },
    delete_order: (id, token) => {
      dispatch(actDeleteOrderRequest(id, token));
    },
    find_order: (token, searchText, status) => {
      return dispatch(actFindOrdersRequest(token, searchText, status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
