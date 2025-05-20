import React, { Component } from "react";
import Slider from "react-slick";
import ProductItems from "./ProductItems";
import "./style.css";

class ProductContent extends Component {
  render() {
    const { products = {} } = this.props;
    let productShows = products;
    if (productShows.length && productShows.length < 5) {
      const addCount = 5 - productShows.length;
      for (let i = 0; i < addCount; i++) {
        productShows.push(i < products.length ? productShows[i] : productShows[0])
      }
    }
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      cssEase: "linear",
    };
    return (
      <div className="tab-content mt-2">
        <div id="li-new-product">
          {/* <div className="row"> */}
          <Slider {...settings}>
            {productShows && productShows.length
              ? productShows.map((product, index) => {
                  return (
                    <ProductItems
                      key={`product-item-${index}`}
                      product={product}
                    />
                  );
                })
              : null}
          </Slider>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default ProductContent;
