import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default class FooterMiddle extends Component {
  render() {
    return (
      <div className="footer-static-middle">
        <div className="container">
          <div className="footer-logo-wrap pt-50 pb-35">
            <div className="row">
              {/* Begin Footer Logo Area */}
              <div className="col-lg-4 col-md-6">
                <div className="footer-logo">
                  <img
                    src="/images/logo.png"
                    alt="Footer Logo"
                    style={{ width: 150, height: 150 }}
                  />
                  <p className="info">
                    Stone Shop là hệ thống phân phối mỹ phẩm chính hãng uy tín
                    và dịch vụ chăm sóc khách hàng tận tâm. Đến với Stone Shop
                    bạn có thể hoàn toàn yên tâm khi lựa chọn cho mình những bộ
                    sản phẩm phù hợp và ưng ý từ các nhãn hàng nổi tiếng trên
                    toàn thế giới.
                  </p>
                </div>
                <ul className="des">
                  <li>
                    <span>Địa chỉ: </span>Số 80 Phố Chùa Bộc, Phường Quang Trung,
                    Quận Đống Đa, Thành phố Hà Nội, Việt Nam
                  </li>
                  <li>
                    <span>Phone: </span>
                    <a href="/">(+84) 868 299 812</a>
                  </li>
                  <li>
                    <span>Email: </span>
                    <a href="stoneshop@gmail.com">stoneshop@gmail.com</a>
                  </li>
                </ul>
              </div>
              {/* Footer Logo Area End Here */}
              {/* Begin Footer Block Area */}
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer-block">
                  <h3 className="footer-block-title">Sản phẩm</h3>
                  <ul>
                    <li>
                      <Link to="/products">Sản phẩm mới ra mắt</Link>
                    </li>
                    <li>
                      <Link to="/products">Sản phẩm mới</Link>
                    </li>
                    <li>
                      <Link to="/products">Bán chạy nhất</Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Footer Block Area End Here */}
              {/* Begin Footer Block Area */}
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer-block">
                  <h3 className="footer-block-title">Cửa hàng của chúng tôi</h3>
                  <ul>
                    <li>
                      <Link to="/">Vận chuyển</Link>
                    </li>
                    <li>
                      <Link to="/">Thông báo pháp lý</Link>
                    </li>
                    <li>
                      <Link to="/about">Về chúng tôi</Link>
                    </li>
                    <li>
                      <Link to="/contact">Liên hệ với chúng tôi</Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Footer Block Area End Here */}
              {/* Begin Footer Block Area */}
              <div className="col-lg-4">
                <div className="footer-block">
                  <h3 className="footer-block-title">Theo dõi chúng tôi tại</h3>
                  <ul className="social-link">
                    <li className="twitter">
                      <a
                        href="https://twitter.com/"
                        data-toggle="tooltip"
                        title="Twitter"
                      >
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li className="rss">
                      <a
                        href="https://rss.com/"
                        data-toggle="tooltip"
                        title="RSS"
                      >
                        <i className="fa fa-rss" />
                      </a>
                    </li>
                    <li className="google-plus">
                      <a
                        href="https://www.plus.google.com/discover"
                        data-toggle="tooltip"
                        title="Google Plus"
                      >
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li className="facebook">
                      <a
                        href="https://www.facebook.com/"
                        data-toggle="tooltip"
                        title="Facebook"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li className="youtube">
                      <a
                        href="https://www.youtube.com/"
                        data-toggle="tooltip"
                        title="Youtube"
                      >
                        <i className="fa fa-youtube" />
                      </a>
                    </li>
                    <li className="instagram">
                      <a
                        href="https://www.instagram.com/"
                        data-toggle="tooltip"
                        title="Instagram"
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Begin Footer Newsletter Area */}
                {/**
                 *  <div className="footer-newsletter">
                  <h4>Sign up to newsletter</h4>
                  <form action="/" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="footer-subscribe-form validate" noValidate>
                    <div id="mc_embed_signup_scroll">
                      <div id="mc-form" className="mc-form subscribe-form form-group">
                        <input id="mc-email" type="email" autoComplete="off" placeholder="Enter your email" />
                        <button className="btn" id="mc-submit">Subscribe</button>
                      </div>
                    </div>
                  </form>
                </div>
                 */}

                {/* Footer Newsletter Area End Here */}
              </div>
              {/* Footer Block Area End Here */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
