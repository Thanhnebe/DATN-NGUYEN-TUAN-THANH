import React, { Component } from "react";
import { formatNumber } from "../../config/TYPE";
import {
  actRemoveCartRequest,
  actUpdateCartRequest,
} from "../../redux/actions/cart";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import callApi from "../../utils/apiCaller";

toast.configure();

class ShoppingCartItems extends Component {
  state = {
    isSelected: false,
  };

  handleCheckboxChange = () => {
    this.setState((prevState) => ({
      isSelected: !prevState.isSelected,
    }));
    this.props.toggleSelectItem(this.props.item, !this.state.isSelected);
  };

  handleQuantityChange = async (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    const id = this.props.item.id;
    const currentQuantity = this.props.item.quantity; // Lưu lại số lượng hiện tại

    if (id) {
      const resData = await callApi(`products/${id}`, "GET", null);
      const numberAvailable = resData?.data?.numberAvailable;

      if (numberAvailable) {
        if (newQuantity > numberAvailable) {
          toast.error("Vượt quá số lượng tồn kho");

          // Cập nhật lại số lượng về giá trị trước đó nếu vượt quá số lượng tồn kho
          let updatedItem = { ...this.props.item, quantity: currentQuantity };
          this.props.changQuantityItem(updatedItem);
          return; // Dừng lại không cập nhật số lượng mới
        }
      }
    }

    if (newQuantity >= 1) {
      let updatedItem = { ...this.props.item, quantity: newQuantity };
      this.props.changQuantityItem(updatedItem);
    }
  };

  // handleQuantityChange = async (event) => {
  //   const newQuantity = parseInt(event.target.value, 10);
  //   const id = this.props.item.id;
  //   if (id) {
  //     const resData = await callApi(`products/${id}`, "GET", null);
  //     const numberAvailable = resData?.data?.numberAvailable;
  //     if (numberAvailable){
  //       if (newQuantity > numberAvailable) {
  //         toast.error("Vượt quá số lượng tồn kho");
  //       }
  //     }
  //   }
  //   if (newQuantity >= 1) {
  //     let updatedItem = { ...this.props.item, quantity: newQuantity };
  //     this.props.changQuantityItem(updatedItem);
  //   }
  // };

  removeItem = (item) => {
    this.props.removeItem(item);
    toast.success("Xoá sản phẩm thành công");
  };

  render() {
    const { item } = this.props;
    const { isSelected } = this.state;

    return (
      <tr>
        <td className="li-product-select">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={this.handleCheckboxChange}
            style={{ width: 15 }}
          />
        </td>

        <td className="li-product-thumbnail d-flex justify-content-center">
          <a href="/">
            <div className="fix-cart">
              <img
                className="fix-img"
                src={item.image ? item.image : null}
                alt="Li's Product"
              />
            </div>
          </a>
        </td>
        <td className="li-product-name">
          <a className="text-dark" href="/">
            {item.nameProduct}
          </a>
        </td>
        <td className="product-subtotal">
          <span className="amount">{formatNumber.format(item.price)}</span>
        </td>
        <td className="quantity">
          <div className="cart-plus-minus">
            <input
              type="number"
              className="cart-plus-minus-box"
              value={item.quantity || 1}
              onChange={this.handleQuantityChange}
              min="1"
            />
          </div>
        </td>
        <td className="product-subtotal">
          <span className="amount">
            {formatNumber.format(item.price * item.quantity)}
          </span>
        </td>
        <td className="li-product-remove">
          <Link to="#">
            <i
              style={{ fontSize: 20 }}
              onClick={() => this.removeItem(item)}
              className="fa fa-trash"
            />
          </Link>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (item) => {
      dispatch(actRemoveCartRequest(item));
    },
    changQuantityItem: (item) => {
      dispatch(actUpdateCartRequest(item));
    },
  };
};

export default connect(null, mapDispatchToProps)(ShoppingCartItems);
