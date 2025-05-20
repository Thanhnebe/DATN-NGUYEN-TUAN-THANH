import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default class BannerMiddle extends Component {
  render() {
    const banners = [
      { key: "banner-1", link: "#", image: "https://bizweb.dktcdn.net/100/454/277/themes/861257/assets/slider_2.jpg?1710323085655" },
      { key: "banner-2", link: "#", image: "https://bizweb.dktcdn.net/thumb/grande/100/297/201/themes/927444/assets/slider_1.jpg?1700218386175" },
      { key: "banner-3", link: "#", image: "https://bizweb.dktcdn.net/thumb/grande/100/297/201/themes/927444/assets/slider_2.jpg?1700218386175" },
    ];
    return (
      <div className="li-static-banner">
        <div className="container">
          <div className="row">
            {banners.map((banner) => (
              <div key={banner.key} className="col-lg-4 col-md-4 text-center">
                <div className="single-banner">
                  <Link to={banner.link}>
                    <img src={banner.image} alt="Li's Static Banner" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
