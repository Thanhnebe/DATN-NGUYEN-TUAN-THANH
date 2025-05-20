import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
import './VNPay.css'

let token = "";
let order = {};
class VNPayCheckoutButton extends Component {
  componentDidMount() {
    token = localStorage.getItem("_auth");
    // order = this.props.order;
    order = {
      amount: 10000,
      orderDescription: "đơn hàng",
      orderId: "14",
      orderType: "string",
      language: "vn",
    };
  }

  static defaultProps = {
    description: "",
  };

  createPayment = async () => {
    const resData = await callApi("payment/vn-pay-add", "POST", order, token);
   if (resData?.data) {
    window.location.href = resData.data;
  } else {
    console.error('Dữ liệu nhập vào không hợp lệ:', resData?.data);
  }
  };

  render() {
    return (
        <button className="vnpay-button" onClick={this.createPayment}>
          <img src="images/payment/vnpay.png" alt="VNPay Logo" className="vnpay-logo" />
          Thanh toán qua VNPay
        </button>
      );
  }
}

export default VNPayCheckoutButton;
