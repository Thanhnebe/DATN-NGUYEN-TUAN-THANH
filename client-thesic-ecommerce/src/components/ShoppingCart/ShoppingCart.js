import React, { Component } from "react";
import ShoppingCartItems from "./ShoppingCartItems";
import {
  actCalculateCartItems,
  actCalculateCartItemsSuccess,
  actFetchCartRequest,
  setSelectedItems,
} from "../../redux/actions/cart";
import { connect } from "react-redux";
import SumTotal from "./SumTotal";
import _ from "lodash";
import callApi from "../../utils/apiCaller";
let token
class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.toggleSelectItem = this.toggleSelectItem.bind(this);
    this.itemsSelected = []
  }

  componentDidMount() {
    token = localStorage.getItem("_auth") || null;
    this.props.fetch_items();
  }

  async componentDidUpdate(prevProps, prevState) {
    const itemIdsSelected = this.props.selectedItems.map((it) => it.id);
    const itemsSelected = this.props.items
      .filter((it) => itemIdsSelected.includes(it.id))
      .map((it) => ({ productId: it.id, quantity: it.quantity }));
    if (!_.isEqual(itemsSelected, this.itemsSelected)) {
      let userId = null;
      this.itemsSelected = itemsSelected;
      if (itemsSelected.length) {
        let resData = null;
        if (token){
          resData = await callApi("users/me", "GET", null, token);
          resData?.data?.results?.length ? userId = resData?.data?.results[0]?.id : userId = null;
        }
        this.props.actCalculateCartItems(itemsSelected, userId);
      } else {
        this.props.clearCalculateCartItems();
      }
    }
  }
  
  toggleSelectItem(item, isSelect) {
    if (isSelect) {
      const newSelectedItems = [...this.props.selectedItems, { id: item.id, quantity: item.quantity }]
      this.props.setSelectedItems(newSelectedItems)
    } else {
      const newSelectedItems = this.props.selectedItems.filter(
        (it) => it.id !== item.id
      );
      this.props.setSelectedItems(newSelectedItems)
    }
  }

  showItem(items) {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <ShoppingCartItems
            key={index}
            item={item}
            toggleSelectItem={this.toggleSelectItem}
          ></ShoppingCartItems>
        );
      });
    }
    return result;
  }

  render() {
    const { items } = this.props;
    return (
      <div className="Shopping-cart-area pt-30 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-xs-12">
              <form>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="li-product-select"></th>
                        <th className="li-product-thumbnail">Ảnh</th>
                        <th className="cart-product-name">Sản phẩm</th>
                        <th className="li-product-price">Giá</th>
                        <th className="li-product-quantity">Số lượng</th>
                        <th className="li-product-subtotal">Thành tiền</th>
                        <th className="li-product-remove"></th>
                      </tr>
                    </thead>
                    <tbody>{this.showItem(items)}</tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className="col-sm-4 col-xs-12">
              <SumTotal></SumTotal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart,
    cartCalculateItems: state.cartCalculateItems.data,
    selectedItems: state.cartCalculateItems.selectedItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_items: () => {
      dispatch(actFetchCartRequest());
    },
    actCalculateCartItems: (items, userId) => {
      dispatch(actCalculateCartItems(items, userId));
    },
    clearCalculateCartItems: () => {
      dispatch(
        actCalculateCartItemsSuccess({
          totalAmount: 0,
          itemAmount: 0,
          promoTotal: 0,
          shippingTotal: 0,
        })
      );
    },
    setSelectedItems: (items) => {
      dispatch(setSelectedItems(items))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
