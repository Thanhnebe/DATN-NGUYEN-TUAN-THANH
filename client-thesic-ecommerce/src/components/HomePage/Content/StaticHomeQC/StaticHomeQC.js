import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class StaticHomeQC extends Component {
  render() {
    return (
      <div className="li-static-home mt-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Begin Li's Static Home Image Area */}
              <div className="li-static-home-image" />
              {/* Li's Static Home Image Area End Here */}
              {/* Begin Li's Static Home Content Area */}
              <div className="li-static-home-content">
                <p>Giảm giá lên đến <span>-20%</span> trong hôm nay</p>
                <h2>Mỹ phẩm chính hãng</h2>
                <h2>Phù hợp mọi lứa tuổi</h2>
                <p className="schedule">
                  Giá chỉ từ
                <span>230 000 VND</span>
                </p>
                <div className="default-btn">
                  <Link to="#" className="links">Mua ngay</Link>
                </div>
              </div>
              {/* Li's Static Home Content Area End Here */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
