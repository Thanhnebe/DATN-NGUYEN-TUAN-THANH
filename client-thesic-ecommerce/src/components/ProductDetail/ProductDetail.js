import React, { Component } from "react";
import ProductViewDetail from "./ProductViewDetail";
import ProductDescription from "./ProductDescription";
import ProductSlider from "../HomePage/Content/ProductSlider/ProductSlider";
import { connect } from "react-redux";
import {
  actGetProductRequest,
  actGetProductV2,
} from "../../redux/actions/products";
import { actFetchRatingsRequest } from "../../redux/actions/rating";
import ProductProducer from "./ProductProducer";

let token;
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.productId = "";
  }

  async componentDidMount() {
    token = localStorage.getItem("_auth");
    const { id } = this.props;
    this.props.fetch_ratings(id);
    this.props.get_product(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== this.productId) {
      this.productId = this.props.id;
      this.props.fetch_ratings(this.props.id);
      this.props.get_product(this.props.id);
    }
    const { id, categoryId } = this.props.product;
    if (id && id !== prevProps.product.id) {
      this.getProductGameCategory(categoryId, id);
    }
  }

  getProductGameCategory(categoryId, productId) {
    this.props.actGetProductV2(
      {
        categoryId,
        productId,
        page: 1,
        pageSize: 20,
      },
      "getProductsSameCategory"
    );
  }

  render() {
    window.scrollTo(0, 0);
    const { product, productRatings, productSameCategory } = this.props;
    return (
      <div>
        <ProductViewDetail
          id={this.props.id}
          product={product}
          productRatings={productRatings}
        ></ProductViewDetail>
        <ProductProducer id={this.props.id}></ProductProducer>
        <ProductDescription id={this.props.id}></ProductDescription>
        {productSameCategory.products.length && (
          <ProductSlider
            title="SẢN PHẨM TƯƠNG TỰ"
            products={productSameCategory.products}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productSameCategory: state.productsV2.productSameCategory,
    product: state.product,
    productRatings: state.productRatings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actGetProductV2: (params, type) => {
      return dispatch(actGetProductV2(params, type));
    },
    get_product: (productId) => {
      dispatch(actGetProductRequest(productId));
    },
    fetch_ratings: (productId) => {
      dispatch(actFetchRatingsRequest(productId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
