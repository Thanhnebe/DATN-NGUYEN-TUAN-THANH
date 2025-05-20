import React, { Component } from "react";
import "./style.css";
class LeftOptions extends Component {

  render() {
    let { rangePrice, onChangeRangePrice } = this.props;
    return (
      <div className="col-lg-3 order-2 order-lg-1">
        <div className="sidebar-categores-box">
          <div className="sidebar-title">
            <h2 className="fix-producers">Lọc theo</h2>
          </div>
          {
            !!rangePrice && <button onClick={() => onChangeRangePrice(rangePrice)} className="btn-clear-all">Xoá tất cả</button>
          }
          <div className="filter-sub-area pt-sm-10 pt-xs-10">
            <h5 className="fix-producers filter-sub-titel">Giá</h5>
            <div className="size-checkbox">
              <form action="/">
                <ul>
                  <li
                    className={rangePrice === 1 ? "range-price-selected" : ""}
                    onClick={() => onChangeRangePrice(1)}
                    style={{cursor: 'pointer'}}
                  >
                    Từ 0 đến 100.000₫
                  </li>
                  <li
                    className={rangePrice === 2 ? "range-price-selected" : ""}
                    onClick={() => onChangeRangePrice(2)}
                    style={{cursor: 'pointer'}}
                  >
                    Từ 100.000₫ đến 500.000₫
                  </li>
                  <li
                    className={rangePrice === 3 ? "range-price-selected" : ""}
                    onClick={() => onChangeRangePrice(3)}
                    style={{cursor: 'pointer'}}
                  >
                    Từ 500.000₫ đến 1.000.000₫
                  </li>
                  <li
                    className={rangePrice === 4 ? "range-price-selected" : ""}
                    onClick={() => onChangeRangePrice(4)}
                    style={{cursor: 'pointer'}}
                  >
                    Nhiều hơn 1.000.000₫
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftOptions;
