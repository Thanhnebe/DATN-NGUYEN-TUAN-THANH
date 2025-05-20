import { Radio, Space } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { formatNumber } from "../../config/TYPE";
class YourOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: "",
      paymentMethod: ""
    };
  }

  handSubmit = () => {
    this.props.submitOrder();
  };
  onChange = (e) => {
    this.setState({
      ...this.state,
      paymentMethod: e.target.value
    })
    this.props.onChangePaymentMethod(e.target.value)
  };
  getPaymentMethod = (event) => {
    return this.state.paymentMethod
  }

  render() {
    const { order } = this.props;
    const {orderBill, itemAmount, shippingTotal, totalAmount, promoTotal} = order
    const {items} = orderBill
    let count = itemAmount
    return (
      <div className="col-lg-10 col-12 mb-2" style={{ margin: "auto" }}>
        <div className="your-order">
          <h3>Đơn hàng của bạn</h3>
          <div className="your-order-table table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th className="cart-product-name">Sản phẩm</th>
                  <th className="cart-product-total">Tổng</th>
                </tr>
              </thead>
              <tbody>
                {items && items.length
                  ? items.map((item, index) => {
                      return (
                        <tr className="cart_item" key={index}>
                          <td className="cart-product-name">
                            {item.name}
                            <strong
                              className="product-quantity"
                              style={{
                                paddingLeft: 10,
                                color: "coral",
                                fontStyle: "italic",
                              }}
                            >
                              x{item.quantity}
                            </strong>
                          </td>
                          <td className="cart-product-total">
                            <span className="amount">
                              {formatNumber.format(item.quantity * item.price)}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
              <tfoot>
                <tr className="cart-subtotal">
                  <th>Tổng tiền</th>
                  <td>
                    <span className="amount">
                      {count ? formatNumber.format(count) : 0}
                    </span>
                  </td>
                </tr>
                <tr className="cart-subtotal">
                  <th>Phí vận chuyển</th>
                  <td>
                    <span className="amount">
                      {shippingTotal ? formatNumber.format(shippingTotal) : 0}
                    </span>
                  </td>
                </tr>
                <tr className="cart-subtotal">
                  <th>Giảm giá</th>
                  <td>
                    <span className="amount">
                      {promoTotal ? formatNumber.format(promoTotal) : 0}
                    </span>
                  </td>
                </tr>
                <tr className="order-total">
                  <th>Tổng đơn hàng</th>
                  <td>
                    <strong>
                      <span className="amount" style={{ color: "red" }}>
                        {formatNumber.format(totalAmount)}
                      </span>
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="payment-accordion">
            <div className="select-payment-text">Chọn phương thức thanh toán</div>
            <Radio.Group onChange={this.onChange} value={this.state.paymentMethod}>
              <Space direction="vertical">
                <Radio value={"COD"}>COD - Thanh toán khi nhận hàng</Radio>
                <Radio value={"VNPAY"}>Thanh toán qua VNPAY</Radio>
              </Space>
            </Radio.Group>
            <div
              onClick={this.props.submitOrder}
              className="order-button-payment"
            >
              <input type="submit" value="Thanh toán" />
            </div>
          </div>
          {/* {config.paypal.secretKey ? (
            <div className="mt-2" style={{ textAlign: "center" }}>
              <PaypalCheckoutButton
                changeToggle={(result) => this.props.changeToggle(result)}
                order={order}
              ></PaypalCheckoutButton>
              <VNPayCheckoutButton  changeToggle={(result) => this.props.changeToggle(result)}
                order={order}></VNPayCheckoutButton>
            </div>
          ) : (
            <div className="mt-2" style={{ textAlign: "center" }}></div>
          )} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // items: state.cart,
  };
};

export default connect(mapStateToProps, null)(YourOrder);
