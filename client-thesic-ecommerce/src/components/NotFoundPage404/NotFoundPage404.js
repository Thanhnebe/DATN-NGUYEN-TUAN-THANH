
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class NotFoundPage404 extends Component {
  render() {
    return (
      <div className="error404-area pt-30 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="error-wrapper text-center ptb-50 pt-xs-20">
                <div className="error-text">
                  <h1 style={{color: "#74dbef"}}>404</h1>
                  <h2>Trang hiện tại không khả dụng</h2>
                </div>
                <div className="error-button">
                  <Link to="/" className="btn btn-primary border-0">Quay lại trang chủ</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
