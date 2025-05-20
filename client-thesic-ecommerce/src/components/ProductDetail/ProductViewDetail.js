import React, { Component } from "react";
import { formatNumber } from "../../config/TYPE";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { actAddCartRequest } from "../../redux/actions/cart";
import {
  actAddRatingRequest,
  actFetchRatingsRequest,
} from "../../redux/actions/rating";
import BeautyStars from "beauty-stars";
import Modal from "react-modal";
import callApi from "../../utils/apiCaller";
import {
  actGetProductRequest,
  actFetchProductsOtherRequest,
} from "../../redux/actions/products";
import Slider from "react-slick";
import "./style.css";
import { EditFilled } from "@ant-design/icons";
toast.configure();

let token;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
};
class ProductViewDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      ratingPoint: 0,
      modalIsOpen: false,
      textRating: "",
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    token = localStorage.getItem("_auth");
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#2d3136";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChangeRating = (value) => {
    this.setState({
      ratingPoint: value,
    });
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitRating = async (event, productId) => {
    event.preventDefault();
    const { ratingPoint, textRating } = this.state;
    if (!ratingPoint) {
      return toast.error("Vui lòng đánh giá điểm trước khi gửi");
    }
    const newTextRating = textRating ? textRating : null;
    const data = {
      point: ratingPoint,
      content: newTextRating,
    };
    if (!token) {
      return toast.error("Vui lòng đăng nhập trước khi viết đánh giá");
    }
    this.props.add_rating(productId, data, token);
    this.setState({
      modalIsOpen: false,
      ratingPoint: 0,
    });
  };

  upItem = () => {
    let quantity = this.state.quantity;
    // if (quantity >= 5) {
    //   return toast.error("Bạn chỉ có thể mua tối đa 5 sản phẩm");
    // }
    this.setState({
      quantity: ++quantity,
    });
  };

  downItem = () => {
    let quantity = this.state.quantity;
    if (quantity <= 1) {
      return toast.error("Bạn chỉ có thể giảm xuống còn 1 sản phẩm");
    }
    this.setState({
      quantity: --quantity,
    });
  };

  addItemToCart = (product) => {
    const { quantity } = this.state;
    this.props.addCart(product, quantity);
  };
  render() {
    const settings = {
      customPaging: function (i) {
        return (
          <Link to="#">
            <img
              style={{ height: 50, width: "auto" }}
              src={product.gallery[i]}
              alt="not found"
            />
          </Link>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const { quantity, ratingPoint } = this.state;
    const { product, productRatings } = this.props;
    let sumRating = 0;
    let count = productRatings.length ? productRatings.length : 0;
    if (productRatings && productRatings.length > 0) {
      let totalRating = 0;
      productRatings.forEach((item) => {
        totalRating = totalRating + item.point;
      });
      sumRating = Math.round(totalRating / count);
    }
    return (
      <div className="content-wraper">
        <div className="container product-detail">
          <div className="row single-product-area">
            <div className="col-lg-5 col-md-6 single-product-left">
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <h4 ref={(subtitle) => (this.subtitle = subtitle)}>Review</h4>
                <div
                  className="modal-content"
                  style={{ width: "auto", border: 0 }}
                >
                  <div className="modal-body">
                    <h3 className="review-page-title">Viết đánh giá của bạn</h3>
                    <div className="modal-inner-area row">
                      <div className="col-lg-12">
                        <div className="li-review-content">
                          {/* Begin Feedback Area */}
                          <div className="feedback-area">
                            <div className="feedback">
                              <h3 className="feedback-title">
                                Đánh giá về chúng tôi
                              </h3>
                              <form action="/">
                                <p className="your-opinion">
                                  <label>Đánh giá của bạn</label>
                                  <div>
                                    <BeautyStars
                                      size={12}
                                      activeColor={"#ed8a19"}
                                      inactiveColor={"#c1c1c1"}
                                      value={ratingPoint}
                                      onChange={(ratingPoint) =>
                                        this.handleChangeRating(ratingPoint)
                                      }
                                    />
                                  </div>
                                </p>
                                <p className="feedback-form">
                                  <label htmlFor="feedback">Your Review</label>
                                  <textarea
                                    onChange={this.handleChange}
                                    id="textRating"
                                    name="textRating"
                                    cols={45}
                                    rows={8}
                                  />
                                </p>
                                <div className="feedback-input">
                                  <div className="feedback-btn pb-15">
                                    <button
                                      onClick={(event) =>
                                        this.handleSubmitRating(
                                          event,
                                          product.id
                                        )
                                      }
                                      className="btn mr-1"
                                      style={{
                                        background: "#e80f0f",
                                        color: "white",
                                      }}
                                    >
                                      Gửi
                                    </button>
                                    <button
                                      onClick={this.closeModal}
                                      className="btn mr-1"
                                      style={{
                                        background: "#fed700",
                                        color: "white",
                                      }}
                                    >
                                      Đóng
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          {/* Feedback Area End Here */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal>
              <div className="product-details-left">
                <div className="product-details-images slider-navigation-1">
                  {/* <div className="lg-image"> */}
                  <div className="fix-width-slick">
                    <Slider {...settings}>
                      {product.gallery && product.gallery.length
                        ? product.gallery.map((item, index) => {
                            return (
                              <div key={index} className="fix-img-div-slick">
                                <img
                                  className="fix-img-slick"
                                  src={item}
                                  alt="not found"
                                />
                              </div>
                            );
                          })
                        : null}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="product-details-view-content sp-normal-content pt-60">
                <div className="product-info">
                  <h2>{product.nameProduct}</h2>
                  <span className="product-details-ref">
                    {product.categories && product.categories.nameCategory
                      ? product.categories.nameCategory
                      : null}
                  </span>
                  <div className="rating-box pt-20">
                    <ul className="rating rating-with-review-item">
                      <div
                        className="rating-box"
                        style={{ display: "inline-block", marginRight: 30 }}
                      >
                        <BeautyStars
                          size={10}
                          activeColor={"#ed8a19"}
                          inactiveColor={"#c1c1c1"}
                          value={sumRating}
                          editable={false}
                        />
                      </div>
                      <button
                        className="fix-btn-review btn"
                        onClick={this.openModal}
                      >
                        <span className="review-item">
                          <EditFilled />
                          <span style={{ marginLeft: 5 }}>Đánh giá</span>
                        </span>
                      </button>
                    </ul>
                    <li>
                      <Link to="#">{count} đánh giá</Link>
                    </li>
                  </div>
                  <div className="price-box pt-20">
                    <div
                      style={{
                        marginBottom: 10,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span className="new-price new-price-2">
                        {formatNumber.format(product.price)}
                      </span>
                      {!!product.percentDiscount && (
                        <div className="flash-sale-container-2">
                          <img
                            alt="ic-fs"
                            src="/images/icon-flash-sale.png"
                            style={{ height: 30 }}
                          />
                          <span>{`-${product.percentDiscount}%`}</span>
                        </div>
                      )}
                    </div>
                    {!!product.originalPrice && (
                      <span
                        className="new-price new-price-2 origin-price"
                        style={{ fontSize: 20 }}
                      >
                        {formatNumber.format(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {/* <div className="product-desc">
                    <p>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      ></span>
                    </p>
                  </div> */}
                  <div className="single-add-to-cart">
                    <form className="cart-quantity">
                      <div className="quantity">
                        <label>Số lượng</label>
                        <div className="cart-plus-minus">
                          <input
                            onChange={(event) => {
                              this.setState({ quantity: event.target.value });
                            }}
                            className="cart-plus-minus-box"
                            value={quantity ? quantity : 1}
                            type="number"
                          />
                          <div
                            onClick={() => this.downItem()}
                            className="dec qtybutton"
                          >
                            <i className="fa fa-angle-down" />
                          </div>
                          <div
                            onClick={() => this.upItem()}
                            className="inc qtybutton"
                          >
                            <i className="fa fa-angle-up" />
                          </div>
                        </div>
                      </div>
                      <div style={{ paddingTop: 13 }}>
                        <Link
                          onClick={() => this.addItemToCart(product)}
                          to="#"
                          className="add-to-cart"
                        >
                          Thêm vào giỏ hàng
                        </Link>
                      </div>
                    </form>
                  </div>
                  <span style={{ marginTop: 10 }}>
                    (Chúng tôi có{" "}
                    {product.numberAvailable ? product.numberAvailable : 0} sản
                    phẩm có sẵn)
                  </span>
                  {/* <div className="product-additional-info">
                    <div className="product-social-sharing">
                      <ul>
                        <li className="facebook">
                          <a href="/">
                            <i className="fa fa-facebook" />
                            Facebook
                          </a>
                        </li>
                        <li className="twitter">
                          <a href="/">
                            <i className="fa fa-twitter" />
                            Twitter
                          </a>
                        </li>
                        <li className="google-plus">
                          <a href="/">
                            <i className="fa fa-google-plus" />
                            Google +
                          </a>
                        </li>
                        <li className="instagram">
                          <a href="/">
                            <i className="fa fa-instagram" />
                            Instagram
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (item, quantity) => {
      dispatch(actAddCartRequest(item, quantity));
    },
    add_rating: (productId, rating, token) => {
      dispatch(actAddRatingRequest(productId, rating, token));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductViewDetail);
