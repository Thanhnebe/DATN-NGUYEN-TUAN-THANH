import React, { Component } from "react";
import { connect } from "react-redux";
import BeautyStars from "beauty-stars";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { actAddRatingRequest } from "../../redux/actions/rating";
import { toast } from "react-toastify";
import Modal from "react-modal";
import moment from "moment";
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

class ProductProducer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingPoint: 0,
      modalIsOpen: false,
      textRating: "",
      viewAllRating: false,
    };
  }

  componentDidMount() {
    token = localStorage.getItem("_auth");
  }

  render() {
    const { product,  } = this.props;
    const {productionDate, expDate} = product || {}
    const producer = product.producers;

    return (
      <div className="product-area">
        <div className="container product-description-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="li-product-tab">
                <ul className="nav li-product-menu">
                  <li>
                    <a className="active" data-toggle="tab" href="#description">
                      <span>Hãng sản xuất</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="tab-content">
            <div
              id="description"
              className="tab-pane active show"
              role="tabpanel"
            >
              <div className="product-description">
                {producer && (
                  <div
                    className="producer-info"
                    style={{ color: "black", fontSize: "15px" }}
                  >
                    <p
                      style={{
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <strong style={{ marginRight: "10px" }}>Tên hãng:</strong>
                      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {producer?.name || ""}
                      </span>
                    </p>
                    {producer?.image && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <strong style={{ marginRight: "10px" }}>
                          Hình ảnh:
                        </strong>
                        <img
                          src={producer?.image}
                          alt={producer?.name}
                          style={{
                            width: "100px",
                            height: "auto",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    )}
                    {producer?.description && (
                      <p style={{ color: "black", fontSize: "15px" }}>
                        <strong>Mô tả:</strong> {producer?.description || ""}
                      </p>
                    )}
                  </div>
                )}
                {productionDate && (
                  <p style={{ color: "black", fontSize: "15px" }}>
                    <strong>Ngày sản xuất:</strong> {moment(productionDate).format("DD/MM/YYYY")}
                  </p>
                )}
                {expDate && (
                  <p style={{ color: "black", fontSize: "15px" }}>
                    <strong>Hạn sử dụng:</strong> {moment(expDate).format("DD/MM/YYYY")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   render() {
  //     const { product } = this.props;
  //     const producer = product.producers
  //     console.log("=============product===========: ", producer)
  //     return (
  //       <div className="product-area">
  //         <div className="container product-description-container">
  //           <div className="row">
  //             <div className="col-lg-12">

  //               <div className="li-product-tab">
  //                 <ul className="nav li-product-menu">
  //                   <li>
  //                     <a className="active" data-toggle="tab" href="#description">
  //                       <span>Hãng sản xuất</span>
  //                     </a>
  //                   </li>
  //                 </ul>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="tab-content">
  //             <div
  //               id="description"
  //               className="tab-pane active show"
  //               role="tabpanel"
  //             >
  //               <div className="product-description">
  //                 <span
  //                   dangerouslySetInnerHTML={{ __html: product.description }}
  //                 ></span>

  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //       </div>
  //     );
  //   }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    productRatings: state.productRatings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_rating: (productId, rating, token) => {
      dispatch(actAddRatingRequest(productId, rating, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductProducer);
