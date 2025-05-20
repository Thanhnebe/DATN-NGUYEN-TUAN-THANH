import React, { Component } from 'react'
// import FooterTop from './FooterTop'
import FooterMiddle from './FooterMiddle'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        {/* Begin Footer Static Top Area */}
        {/**   <FooterTop></FooterTop> */}
      
        {/* Footer Static Top Area End Here */}

        {/* Begin Footer Static Middle Area */}
        <FooterMiddle></FooterMiddle>
        {/* Footer Static Middle Area End Here */}
      </div>
    )
  }
}
