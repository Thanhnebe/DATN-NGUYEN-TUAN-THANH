import React, { Component } from "react";
import "./style.css";
import ProductItems from "../ProductSlider/ProductItems";

class ProductGridContent extends Component {

  render() {
    const { products } = this.props;
    return (
      <div className="tab-content mt-2">
        <div id="li-new-product">
          <div className="product-total-list">
            {products && products.length ? products.map((product, index) => {
              return (
               <ProductItems key={`product-item-${index}`} product={product} />
              )
            }) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ProductGridContent
