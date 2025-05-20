import React, { Component } from 'react'
import ProductItem from './ProductItem'
import { connect } from 'react-redux'
import { actFetchProductsRequest } from '../../redux/actions/products';

class ProductSearch extends Component {
  render() {
    let { products } = this.props;
    return (
      <div className="content-wraper pt-60 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Begin Li's Banner Area */}
              <div className="single-banner shop-page-banner">
                <a href="/">
                  <img src="https://i.ibb.co/rfh0sf4/2.jpg" alt="Li's Static Banner" />
                </a>
              </div>
              
              {/* Li's Banner Area End Here *presentation/}
              {/* shop-top-bar start */}
              <div className="shop-top-bar mt-30">
                <div className="shop-bar-inner">
                  <div className="product-view-mode">
                    {/* shop-item-filter-list start */}
                    <ul className="nav shop-item-filter-list" role="tablist">
                      <li className="active" role="presentation"><a aria-selected="true" className="active show" data-toggle="tab" role="tab" aria-controls="grid-view" href="#grid-view"><i className="fa fa-th" /></a></li>
                    </ul>
                    {/* shop-item-filter-list end */}
                  </div>
                  <div className="toolbar-amount">
                    <span>Hiển thị từ 1 đến 12</span>
                  </div>
                </div>
                {/* product-select-box start */}
                <div className="product-select-box">
                  <div className="product-short">
                    <p>Sắp xếp theo:</p>
                    <select className="nice-select" onChange={this.handleChangeSelectSort} >
                      <option value="createdAt">All</option>
                      <option value="nameProduct">Tên (A - Z)</option>
                      <option value="-nameProduct">Tên (Z - A)</option>
                      <option value="price">Giá (Thấp &gt; Cao)</option>
                      <option value="-price">Giá (Cao &gt; Thấp)</option>
                    </select>
                  </div>
                </div>
                {/* product-select-box end */}
              </div>
              {/* shop-top-bar end */}
              {/* shop-products-wrapper start */}
              <div className="shop-products-wrapper">
                <div className="tab-content">
                  <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                    <div className="product-area shop-product-area">
                      <div className="row">
                        {
                          products && products.length ? products.map((item, index) => {
                            return (
                              <ProductItem key={index} product={item} ></ProductItem>
                            )
                          }) : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* shop-products-wrapper end */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_products: (value) => {
      dispatch(actFetchProductsRequest(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch)
