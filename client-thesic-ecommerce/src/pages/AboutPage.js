import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'

export default class AboutPage extends Component {
  render() {
    return (
      <div>
  <div className="breadcrumb-area">
    <div className="container">
      <div className="breadcrumb-content">
      <LinkHere url={"Về chúng tôi"}></LinkHere>
      </div>
    </div>
  </div>
  {/* Li's Breadcrumb Area End Here */}
  {/* about wrapper start */}
  <div className="about-us-wrapper pt-60 pb-40">
    <div className="container">
      <div className="row">
        {/* About Text Start */}
        <div className="col-lg-6 order-last order-lg-first">
          <div className="about-text-wrap">
            <h2><span>Cung cấp tốt nhất</span>sản phẩm cho bạn</h2>
            <p>Tỏa sáng với vẻ đẹp tự nhiên cùng Stone Shop. Sản phẩm của chúng tôi được tạo ra để nuôi dưỡng làn da, tôn lên vẻ đẹp vốn có của bạn. Hàng triệu khách hàng đã tin tưởng và lựa chọn chúng tôi. Cùng khám phá và yêu bản thân hơn mỗi ngày.</p>
            <p>Đẳng cấp mỹ phẩm, hiệu quả vượt trội. Với thành phần tự nhiên và công nghệ hiện đại, sản phẩm của Stone Shop mang đến hiệu quả rõ rệt ngay từ lần sử dụng đầu tiên. Đừng bỏ lỡ cơ hội trải nghiệm sự khác biệt!</p>
            <p>Chăm sóc da chưa bao giờ dễ dàng đến thế. Chúng tôi hiểu rằng làn da của bạn là tài sản quý giá. Vì vậy, Stone Shop luôn không ngừng nghiên cứu và phát triển những sản phẩm tốt nhất, phù hợp với mọi loại da. Hãy để chúng tôi đồng hành cùng bạn trên hành trình chinh phục vẻ đẹp hoàn hảo.</p>
          </div>
        </div>
        {/* About Text End */}
        {/* About Image Start */}
        <div className="col-lg-5 col-md-10">
          <div className="about-image-wrap">
            <img className="img-full" src="https://cocolux.com/storage/slider/larger/1722678938-sn%20NT2.webp" alt="About Us" />
          </div>
        </div>
        {/* About Image End */}
      </div>
    </div>
  </div>
  {/* about wrapper end */}
  {/* Begin Counterup Area */}
  <div className="counterup-area">
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-lg-3 col-md-6">
          {/* Begin Limupa Counter Area */}
          <div className="limupa-counter white-smoke-bg">
            <div className="container">
              <div className="counter-img">
                <img src="https://i.ibb.co/QKXDBNM/1.png" alt="" />
              </div>
              <div className="counter-info">
                <div className="counter-number">
                  <h3 className="counter">2169</h3>
                </div>
                <div className="counter-text">
                  <span>Khách hàng hài lòng</span>
                </div>
              </div>
            </div>
          </div>
          {/* limupa Counter Area End Here */}
        </div>
        <div className="col-lg-3 col-md-6">
          {/* Begin limupa Counter Area */}
          <div className="limupa-counter gray-bg">
            <div className="counter-img">
              <img src="https://i.ibb.co/f1Zj6SL/2.png" alt="" />
            </div>
            <div className="counter-info">
              <div className="counter-number">
                <h3 className="counter">869</h3>
              </div>
              <div className="counter-text">
                <span>Giải thưởng</span>
              </div>
            </div>
          </div>
          {/* limupa Counter Area End Here */}
        </div>
        <div className="col-lg-3 col-md-6">
          {/* Begin limupa Counter Area */}
          <div className="limupa-counter white-smoke-bg">
            <div className="counter-img">
              <img src="https://i.ibb.co/vBktQgS/3.png" alt="" />
            </div>
            <div className="counter-info">
              <div className="counter-number">
                <h3 className="counter">689</h3>
              </div>
              <div className="counter-text">
                <span>Giờ làm việc</span>
              </div>
            </div>
          </div>
          {/* limupa Counter Area End Here */}
        </div>
        <div className="col-lg-3 col-md-6">
          {/* Begin limupa Counter Area */}
          <div className="limupa-counter gray-bg">
            <div className="counter-img">
              <img src="https://i.ibb.co/z5t0Q7H/4.png" alt="" />
            </div>
            <div className="counter-info">
              <div className="counter-number">
                <h3 className="counter">2169</h3>
              </div>
              <div className="counter-text">
                <span>Dự án</span>
              </div>
            </div>
          </div>
          {/* limupa Counter Area End Here */}
        </div>
      </div>
    </div>
  </div>
</div>

    )
  }
}
