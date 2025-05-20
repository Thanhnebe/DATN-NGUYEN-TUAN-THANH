import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default class SliderLeft extends Component {
  render() {
    const sliders = [
      {
        id: "1",
        image: "https://vietwave.com.vn/mediqueens/upload/files/chung/banner-1.jpg",
        link: "/",
      },
      {
        id: "2",
        image: "https://vietwave.com.vn/mediqueens/upload/files/chung/banner-2.jpg",
        link: "/",
      },
      {
        id: "3",
        image: "https://theme.hstatic.net/1000342714/1000664932/14/slider_1.png?v=26",
        link: "/",
      },
    ];
    return (
      <div className="slider-container">
        <Carousel
          autoPlay={true}
          interval={2000}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          onClickItem={(index, obj) => {
            try {
              if (obj?.props?.href) {
                window.open(obj.props.href, "_blank");
              }
            } catch (ex) {}
          }}
          className="sliderSectionCarousel"
        >
          {sliders.map((item) => (
            <a
              key={item.id}
              href={item.link}
              id={item.id}
              target="_blank"
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt="image" />
            </a>
          ))}
        </Carousel>
      </div>
    );
  }
}
