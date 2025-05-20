import React, { Component } from "react";
import ProductGridContent from "./ProductGridContent";

export default class ProductGrid extends Component {
  render() {
    return (
      <div className="product-area">
        <div className="container topSell-container">
          <div className="topSell-container">
            <div className="row">
              <div className="col-lg-12">
                <p className="topSell-label">{this.props.title || ''}</p>
              </div>
            </div>
            <ProductGridContent products={this.props.products} />
          </div>
        </div>
      </div>
    );
  }
}
