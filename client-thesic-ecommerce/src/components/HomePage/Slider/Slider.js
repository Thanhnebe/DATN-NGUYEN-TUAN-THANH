import React, { Component } from 'react'
import SliderLeft from './SliderLeft'
import BannerRight from './BannerRight'
import Category from './Category'
import './style.css'

export default class Slider extends Component {
  render() {
    return (
      <div className="slider-with-banner">
        <div className="container">
          <div className="row-container">
            {/* Begin Slider Area */}
            <div className='category-container'>
              <Category />
            </div>
            <SliderLeft></SliderLeft>
            {/* Slider Area End Here */}

            {/* Begin Li Banner Area */}
            {/* <BannerRight></BannerRight> */}
            {/* Li Banner Area End Here */}
          </div>
        </div>
      </div>
    )
  }
}
