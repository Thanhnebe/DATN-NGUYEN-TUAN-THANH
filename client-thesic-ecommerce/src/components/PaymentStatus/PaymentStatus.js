import React, { Component } from "react";
import "./PaymentFailure.css";
import { withRouter } from 'react-router-dom';
import callApi from "../../utils/apiCaller";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailure from './PaymentFailure';

class PaymentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentStatus: null, // Track payment status for rendering
      loading: true, // Track loading state
    };
  }

  async componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const data = {};
    
    // Populate the data object with query parameters
    for (const [key, value] of queryParams.entries()) {
      data[key] = value;
    }
   
    try {
      const checkPaymentStatus = await callApi("payment/vn-pay-check", "POST", data, null);
      
      this.setState({ 
        paymentStatus: checkPaymentStatus.data.success,
        loading: false, 
      });

      // if (checkPaymentStatus.data.success) {
      //   this.props.history.push("/payment-success");
      // } else {
      //   this.props.history.push("/payment-failure");
      // }
    } catch (error) {
      console.error("Error checking payment status:", error);
      this.setState({
        paymentStatus: false,
        loading: false,
      });
      this.props.history.push("/payment-error");
    }
  }

  render() {
    const { paymentStatus, loading } = this.state;
  
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang xử lý thanh toán...</p>
        </div>
      );
    }
  
    if (paymentStatus === false) {
      return <PaymentFailure />;
    } else {
      return <PaymentSuccess />;
    }
  }
}



export default withRouter(PaymentStatus);
