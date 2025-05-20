import React, { Component } from 'react';
import './PaymentSuccess.css'; // Đảm bảo tạo tệp CSS này với các kiểu dáng

class PaymentSuccess extends Component {
  render() {
    return (
      <div className="payment-success-container">
        <div className="payment-success-content">
          <h1 className="payment-success-title">Thanh Toán Thành Công</h1>
          <p className="payment-success-message">Cảm ơn bạn đã mua sắm với chúng tôi. Đơn hàng của bạn đã được xác nhận và sẽ được xử lý trong thời gian sớm nhất.</p>
          <div className="payment-success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <button className="payment-success-button" onClick={() => window.location.href = '/profile'}>Xem đơn hàng</button>
        </div>
      </div>
    );
  }
}

export default PaymentSuccess;
