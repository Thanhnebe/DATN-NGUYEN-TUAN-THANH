import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatNumber } from '../../config/TYPE'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class SumTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectYourOrder: false,
      redirectYourLogin: false
    }
  }


  checkAuthenticate = () => {
    const { user, cartCalculateItems } = this.props;
    if (!cartCalculateItems.itemAmount) {
      return toast.error('Xin vui lòng chọn sản phẩm trước khi đặt hàng');
    }
    if (user) {
      this.setState({
        redirectYourOrder: true
      })
    } else {
      toast.error('Bạn phải đăng nhập trước khi thanh toán');
      this.setState({
        redirectYourLogin: true
      })
    }
  }

  render() {
    const { redirectYourOrder, redirectYourLogin } = this.state;
    const { cartCalculateItems } = this.props;
    if (redirectYourOrder) {
      return <Redirect to="/checkout"></Redirect>
    }
    if (redirectYourLogin) {
      return <Redirect to="/login-register"></Redirect>
    }
    return (
      <div>
        <div className="cart-page-total">
          <h2>Tổng tiền giỏ hàng</h2>
          <ul>
            <li>Tổng tiền <span>{cartCalculateItems.itemAmount ? formatNumber.format(cartCalculateItems.itemAmount) : 0}</span></li>
            <li>Phí vận chuyển <span>{formatNumber.format(cartCalculateItems.shippingTotal || 0)}</span></li>
            <li>Giảm giá  <span>{formatNumber.format(cartCalculateItems.promoTotal || 0)}</span></li>
            <li style={{ color: 'red' }}>Tổng <span>{cartCalculateItems.totalAmount ? formatNumber.format(cartCalculateItems.totalAmount) : 0}</span></li>
          </ul>
          <button onClick={() => this.checkAuthenticate()} className="fix-text-checkout" style={{cursor: 'pointer'}}>Đặt hàng</button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.auth,
    cartCalculateItems: state.cartCalculateItems.data
  }
}
export default connect(mapStateToProps, null)(SumTotal)
