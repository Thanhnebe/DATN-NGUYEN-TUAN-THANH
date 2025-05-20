import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyFooter from "../../MyFooter/MyFooter";
import Paginator from "react-js-paginator";
import "./style.css";
import {
  actFetchTransactionsRequest,
  actFindTransactionsRequest,
} from "../../../redux/actions/transaction";
import { connect } from "react-redux";
import { exportExcel } from "../../../utils/exportExcel";
import { formatNumber } from "../../../utils";

let token;
class Transaction extends Component {
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
      .fetch_transaction(token)
      .then((res) => {
        this.setState({
          total: res.total,
          transactions: res.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pageChange(content) {
    const limit = 10;
    const offset = limit * (content - 1);
    this.props.fetch_transaction(token, offset);
    this.setState({
      currentPage: content,
    });
    window.scrollTo(0, 0);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchText } = this.state;
    this.props.find_transactions(token, searchText).then((res) => {
      this.setState({
        total: res.total,
        transactions: res?.results || []
      });
    });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  downloadExcel = () => {
    const key = "transactions";
    exportExcel(key);
  };

 convertToVietnamTime = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
  
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
 
    const options = {
      timeZone: "Asia/Ho_Chi_Minh", 
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
  
    return date.toLocaleString("vi-VN", options);
  };

  render() {
    let { transactions } = this.state;
    const { searchText, total } = this.state;
    const vnPayStatus = {
      "00": "Giao dịch thành công",
      "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
      "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
      10: "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
      11: "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
      12: "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
      13: "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
      24: "Giao dịch không thành công do: Khách hàng hủy giao dịch",
      51: "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
      65: "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
      75: "Ngân hàng thanh toán đang bảo trì.",
      79: "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
      99: "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
    };
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Danh sách giao dịch</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Danh sách giao dịch</li>
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
                  </form>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Mã giao dịch</th>
                            <th>Mã đơn hàng</th>
                            <th>Tổng tiền</th>
                            <th>Thời gian</th>
                            <th>Trạng thái</th>
                            <th>Phương thức thanh toán</th>
                            {/* <th style={{ textAlign: "center" }}></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {transactions && transactions.length
                            ? transactions.map((item, index) => {
                                const statusColor =
                                  item?.status === "00" ? "green" : "red";
                              
                                return (
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item?.transactionCode}</td>
                                    <td>{item?.orderId}</td>
                                    <td>{formatNumber.format(item?.amount)}</td>
                                    <td>
                                      {this.convertToVietnamTime(
                                        item.paymentDate
                                      )}
                                    </td>
                                    <td style={{ color: statusColor }}>
                                      {vnPayStatus[item?.status]}
                                    </td>
                                    <td style={{color: '#00CCFF', fontWeight: 'bolder'}}>{item.type}</td>
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
    transactions: state.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_transaction: (token, offset) => {
      return dispatch(actFetchTransactionsRequest(token, offset));
    },
    find_transactions: (token, searchText) => {
      return dispatch(actFindTransactionsRequest(token, searchText));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
