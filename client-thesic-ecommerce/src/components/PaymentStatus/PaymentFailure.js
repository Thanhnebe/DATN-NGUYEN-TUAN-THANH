import React, { Component } from 'react';
import './PaymentFailure.css'; // Đảm bảo tạo tệp CSS này với các kiểu dáng

class PaymentFailure extends Component {
  render() {
    return (
      <div className="payment-failure-container">
        <div className="payment-failure-content">
          <h1 className="payment-failure-title">Thanh Toán Thất Bại</h1>
          <p className="payment-failure-message">Rất tiếc, thanh toán của bạn đã không thành công. Vui lòng thử lại hoặc liên hệ với hỗ trợ khách hàng để được trợ giúp.</p>
          <div className="payment-failure-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <button className="payment-failure-button" onClick={() => window.location.href = '/'}>Quay về trang chủ</button>
        </div>
      </div>
    );
  }
}

export default PaymentFailure;
