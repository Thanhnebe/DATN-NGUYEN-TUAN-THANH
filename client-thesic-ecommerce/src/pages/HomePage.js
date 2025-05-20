import React, { Component } from "react";
import Slider from "../components/HomePage/Slider/Slider";
import BannerMiddle from "../components/HomePage/Content/BannerMiddle/BannerMiddle";
import BannerTop from "../components/HomePage/Content/BannerTop";
import { actGetProductV2 } from "../redux/actions/products";
import { connect } from "react-redux";
import ProductSlider from "../components/HomePage/Content/ProductSlider/ProductSlider";
import ProductGrid from "../components/HomePage/Content/ProductGrid/ProductGrid";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.actGetProductV2({
      isHot: true,
      page: 1,
      pageSize: 20
    }, 'getProductsHot');
    this.props.actGetProductV2({
      isFeature: true,
      page: 1,
      pageSize: 20
    }, 'getProductsFeature');
    this.props.actGetProductV2({
      isBestSelling: true,
      page: 1,
      pageSize: 20
    }, 'getProductsBestSelling');
  }

  componentDidUpdate() {
    // console.log(this.props.productsV2);
  }

  render() {
    const { productHot, productFeature, productBestSelling} = this.props.productsV2
    return (
      <div>
        <Slider></Slider>
        <BannerTop />
        <ProductSlider title='SẢN PHẨM HOT' products={productHot.products} />
        <BannerMiddle></BannerMiddle>
        <ProductSlider title='SẢN PHẨM BÁN CHẠY' products={productBestSelling.products} />
        <ProductGrid title='SẢN PHẨM KHÁC' products={productFeature.products} />
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productsV2: state.productsV2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actGetProductV2: (params, type) => {
      return dispatch(actGetProductV2(params, type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
