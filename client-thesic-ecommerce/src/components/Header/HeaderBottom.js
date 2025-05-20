import './header-bottom.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchCategoryTreeRequest } from '../../redux/actions/category';
import { actGetProductOfCategoryRequest, actFetchProductsRequest } from '../../redux/actions/products';
import { startLoading, doneLoading } from '../../utils/loading';
import { actFetchProducersRequest } from '../../redux/actions/producer';

class HeaderBottom extends Component {
  componentDidMount() {
    this.props.fetchCategoryTree(); // Fetch danh mục dạng cây
  }

  getIdCategory = async (id) => {
    startLoading();
    const getProduct = this.props.getAllProductOfCategory(id);
    const getProducer = this.props.fetch_producers(id);
    await Promise.all([getProduct, getProducer]);
    doneLoading();
  }

  loaddingPage = () => {
    startLoading();
    doneLoading();
  }

  // Hàm render để hiển thị danh mục dạng cây
   renderCategoryTree = (categories) => {
    if (!categories || categories.length === 0) {
      return <li>Không có danh mục</li>; 
    }

    return categories.map((category) => (
      <li key={category.id} style={{ paddingRight: '50px', display:'block'}}>
        <Link to={`/categories/${category.id}`} onClick={() => this.getIdCategory(category.id)}>
          {category.nameCategory}
        </Link>
        {category.children && category.children.length > 0 && (
          <ul style={{ paddingLeft: '20px' }}> 
            {this.renderCategoryTree(category.children)}
          </ul>
        )}
      </li>
    ));
  }

  render() {
    const { categories } = this.props;
   
    return (
      <div className="header-bottom header-sticky d-lg-block d-xl-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hb-menu">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                  <Link className="navbar-brand" to="/">
                    <img src="https://i.ibb.co/t8T3s70/icons8-home-30.png" alt="not found" style={{ height: 30, width: 30 }} />
                  </Link>
                  <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">TRANG CHỦ</Link>
                      </li>
                      <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">DANH MỤC</Link>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                          <ul className="category-list">
                            {this.renderCategoryTree(categories)}
                          </ul>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link onClick={() => this.loaddingPage()} className="nav-link" to="/products">SẢN PHẨM</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={() => this.loaddingPage()} className="nav-link" to="/about">VỀ CHÚNG TÔI</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={() => this.loaddingPage()} className="nav-link" to="/contact">LIÊN HỆ</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories 
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryTree: () => {
    dispatch(actFetchCategoryTreeRequest());
  },
  getAllProductOfCategory: (id) => {
    dispatch(actGetProductOfCategoryRequest(id));
  },
  fetch_products: (q, idCateogry) => {
    dispatch(actFetchProductsRequest(q, idCateogry));
  },
  fetch_producers: (id) => {
    dispatch(actFetchProducersRequest(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBottom);
