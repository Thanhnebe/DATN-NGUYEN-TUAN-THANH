import React, { Component } from "react";
import LeftOptions from "./LeftOptions";
import ShopCategoryItems from "./ShopCategoryItems";
import { connect } from "react-redux";
import { actGetProductV2 } from "../../redux/actions/products";
import { Pagination } from "antd";

const RangePrices = {
  1: {
    minPrice: 1,
    maxPrice: 100000,
  },
  2: {
    minPrice: 100000,
    maxPrice: 500000,
  },
  3: {
    minPrice: 500000,
    maxPrice: 1000000,
  },
  4: {
    minPrice: 1000000,
    maxPrice: null,
  },
};
class ShopCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      total: 50,
      rangePrice: 0,
      orderBy: "",
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRangePrice = this.onChangeRangePrice.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  componentDidUpdate() {
  }

  getData() {
    const type = this.props.type;

    const params = {
      page: this.state.currentPage || 1,
      pageSize: 10,
    };
    if (type === "searchProductByCategory") {
      params.categoryId = this.props.categoryId;
    } else if (type === "searchProductByKeyword") {
      params.searchName = this.props.keywordSearch;
    } else if (type === "allProduct") {
    }
    if (this.state.rangePrice) {
      const range = RangePrices[this.state.rangePrice];
      if (range.minPrice) {
        params.minPrice = range.minPrice;
      }
      if (range.maxPrice) {
        params.maxPrice = range.maxPrice;
      }
    }
    if (this.state.orderBy) {
      params.orderBy = this.state.orderBy;
    }

    this.props.actGetProductV2(params, type);
  }

  onChangePage(page) {
    this.setState({ ...this.state, currentPage: page }, () => {
      this.getData();
    });
  }
  onChangeRangePrice(rangePrice) {
    this.setState(
      {
        ...this.state,
        rangePrice: rangePrice === this.state.rangePrice ? 0 : rangePrice,
      },
      () => {
        this.getData();
      }
    );
  }

  handleChangeSelectSort = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState(
      {
        ...this.state,
        orderBy: value,
      },
      () => {
        this.getData();
      }
    );
  };

  render() {
    const { productByCategory, productByKeyword, allProduct, type } = this.props;
    const productsWithPagination = (() => {
      switch (type) {
        case "searchProductByCategory":
          return productByCategory;
        case "searchProductByKeyword":
          return productByKeyword;
        case "allProduct":
          return allProduct;

        default:
          return { products: [], pagination: {} };
      }
    })();
    const { products, pagination } = productsWithPagination;

    return (
      <div className="content-wraper pt-10 pb-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-2 product-right">
              <div className="shop-top-bar">
                <div className="shop-bar-inner">
                  <div className="product-view-mode">
                    <ul className="nav shop-item-filter-list" role="tablist">
                      <li role="presentation">
                        <a
                          data-toggle="tab"
                          role="tab"
                          aria-controls="grid-view"
                          href="#grid-view"
                        >
                          <i className="fa fa-th" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-select-box">
                  <div className="product-short">
                    <p>Sắp xếp theo:</p>
                    <select
                      className="nice-select"
                      onChange={(event) => this.handleChangeSelectSort(event)}
                    >
                      <option value="">Tất cả</option>
                      <option value="nameProduct">Tên (A - Z)</option>
                      <option value="-nameProduct">Tên (Z - A)</option>
                      <option value="price">Giá (thấp &gt; cao)</option>
                      <option value="-price">Giá (cao &gt; thấp)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="shop-products-wrapper">
                {products.length ? (
                  <div className="tab-content">
                    <div id="grid-view">
                      <div className="product-area shop-product-area">
                        <div className="row">
                          {products.map((product, index) => {
                            return (
                              <ShopCategoryItems
                                key={index}
                                product={product}
                              ></ShopCategoryItems>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="paginatoin-area">
                      <div className="row" style={{ alignItems: "center" }}>
                        <div className="col-lg-3 col-md-3">
                          <p>{`Hiển thị từ ${
                            ((pagination.page || 1) - 1) * 10 + 1
                          } đến ${
                            ((pagination.page || 1) - 1) * 10 +
                            (products.length || 0)
                          }`}</p>
                        </div>
                        <div
                          className="col-lg-9 col-md-9"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Pagination
                            current={pagination.page || 1}
                            onChange={this.onChangePage}
                            total={(pagination.totalPages || 1) * 10}
                            showSizeChanger={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginTop: 60 }}>
                    Không có sản phẩm
                  </div>
                )}
              </div>
            </div>
            <LeftOptions
              rangePrice={this.state.rangePrice}
              onChangeRangePrice={this.onChangeRangePrice}
            ></LeftOptions>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productByCategory: state.productsV2.productByCategory,
    productByKeyword: state.productsV2.productByKeyword,
    allProduct: state.productsV2.allProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actGetProductV2: (params, type) => {
      return dispatch(actGetProductV2(params, type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory);
