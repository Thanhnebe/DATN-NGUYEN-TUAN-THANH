import React, { Component } from "react";
import ProductContent from "./ProductContent";

export default class ProductSlider extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="product-area">
        <div className="container topSell-container">
          <div className="topSell-container">
            <div className="row">
              <div className="col-lg-12">
                <p className="topSell-label">{this.props.title || 'SẢN PHẨM HOT'}</p>
              </div>
            </div>
            <ProductContent products={this.props.products} />
          </div>
        </div>
      </div>
    );
  }
}
