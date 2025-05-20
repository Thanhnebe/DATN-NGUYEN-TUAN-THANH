import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductFavoriteItem from './ProductFavoriteItem';
import './style.css'
class ProductFavotire extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="Shopping-cart-area pt-30 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-xs-12">
              <form>
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="li-product-remove">Hành động</th>
                        <th className="li-product-thumbnail">Ảnh</th>
                        <th className="cart-product-name">Tên sản phẩm</th>
                        <th className="li-product-price">Giá</th>
                        <th className="li-product-subtotal">Mua ngay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products && products.length ? products.map((item, index) => {
                        return (
                          <ProductFavoriteItem key={index} value={index} product={item}></ProductFavoriteItem>
                        )
                      }) : null}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.favorites
  }
}

export default connect(mapStateToProps, null)(ProductFavotire)
