import React, { Component } from "react";
import { actFetchProductsOtherRequest } from "../../redux/actions/products";
import { connect } from "react-redux";
import { actAddCartRequest } from "../../redux/actions/cart";
import {
  actFetchRatingsRequest,
  actAddFavoriteRequest,
} from "../../redux/actions/rating";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatNumber } from "../../config/TYPE";
import { startLoading, doneLoading } from "../../utils/loading";
import { Link } from "react-router-dom";
import BeautyStars from "beauty-stars";
import "./style.css";
toast.configure();
let token;
class ShopCategoryItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      quantity: 1,
    };
  }
  componentDidMount() {
    token = localStorage.getItem("_auth");
  }

  addItemToFavorite = (id) => {
    startLoading();
    if (!token) {
      return toast.error(
        "Vui lòng đăng nhập trước khi thêm sản phẩm vào danh sách yêu thích"
      );
    }
    this.props.addFavorite(id, token);
    doneLoading();
  };

  upItem = (quantity) => {
    // if (quantity >= 5) {
    //   toast.error('Bạn chỉ có thể mua tối đa 5 sản phẩm')
    //   return
    // }
    this.setState({
      quantity: quantity + 1,
    });
  };
  downItem = (quantity) => {
    if (quantity <= 1) {
      return;
    }
    this.setState({
      quantity: quantity - 1,
    });
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  addItemToCart2 = (event, product) => {
    event.preventDefault();
    const { quantity } = this.state;
    startLoading();
    this.props.addCart(product, quantity);
    doneLoading();
  };

  addItemToCart = (product) => {
    return this.props.addCart(product);
  };

  render() {
    const { product, getProduct } = this.props;
    const { quantity } = this.state;
    let sumRating = 0;
    let count = 0;
    if (product.rating && product.rating.length > 0) {
      let totalRating = 0;
      product.rating.map((item) => {
        return count++, (totalRating = totalRating + item.point);
      });
      sumRating = Math.round(totalRating / count);
    }
    return (
      <div className="col-lg-4 col-md-4 col-sm-6 item-product">
        <div className="single-product-wrap">
          <div className="fix-img-div product-image">
            <Link to={`/products/${product.id}`}>
              <img
                className="fix-img"
                src={product.image ? product.image : null}
                alt="eror"
              />
            </Link>
          </div>
          <div className="product_desc">
            <div className="product_desc_info">
              <div className="product-review">
                <h5 className="manufacturer">
                  <Link to={`/categories/${product.categoryId}`}>
                    {product.categories && product.categories.nameCategory
                      ? product.categories.nameCategory
                      : null}
                  </Link>
                </h5>
                <div className="rating-box">
                  <ul className="rating">
                    <BeautyStars
                      size={10}
                      activeColor={"#ed8a19"}
                      inactiveColor={"#c1c1c1"}
                      value={sumRating}
                      editable={false}
                    />
                  </ul>
                </div>
              </div>
              <h4>
                <Link
                  className="product_name text-truncate"
                  to={`/products/${product.id}`}
                >
                  {product.nameProduct}
                </Link>
              </h4>
              <div className="price-box">
                <span className="new-price">
                  {formatNumber.format(product.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*// QUICK VIEW */}
        <div className="modal fade modal-wrapper" id="exampleModalCenter1">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <div className="modal-inner-area row">
                  <div className="col-lg-5 col-md-6 col-sm-6">
                    {/* Product Details Left */}
                    <div className="product-details-left">
                      <div className="product-details-images slider-navigation-1">
                        <div className="lg-image">
                          <img src={getProduct.image} alt="not found" />
                        </div>
                      </div>
                    </div>
                    {/*// Product Details Left */}
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6">
                    <div className="product-details-view-content pt-60">
                      <div className="product-info">
                        <h2>{getProduct.nameProduct}</h2>
                        <div className="rating-box"></div>
                        <div className="price-box pt-20">
                          <span className="new-price new-price-2">
                            {formatNumber.format(getProduct.price)}
                          </span>
                        </div>
                        <div className="product-desc">
                          <p>
                            <span>{getProduct.description}</span>
                          </p>
                        </div>
                        <div className="product-variants"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* single-product-wrap end */}
        {!!product.percentDiscount && (
          <div className="flash-sale-container">
            <img
              alt="ic-fs"
              src="/images/icon-flash-sale.png"
              style={{ height: 30 }}
            />
            <span>{`-${product.percentDiscount}%`}</span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getProduct: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (item, quantity) => {
      dispatch(actAddCartRequest(item, quantity));
    },
    setProductsOther: (q, idCateogry) => {
      dispatch(actFetchProductsOtherRequest(q, idCateogry));
    },
    fetch_product_ratings: (id) => {
      dispatch(actFetchRatingsRequest(id));
    },
    addFavorite: (id, token) => {
      dispatch(actAddFavoriteRequest(id, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopCategoryItems);
