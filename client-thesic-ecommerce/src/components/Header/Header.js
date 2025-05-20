import React, { Component } from 'react'
import HeaderMiddle from './HeaderMiddle'
import HeaderMobile from './HeaderMobile'
import './style.css'

export default class Header extends Component {
  render() {
    return (
      <header>
        {/* Begin Header Top Area */}
        {/* <HeaderTop></HeaderTop> */}
        {/* End Header Top Area */}

        {/* Begin Header Middle Area */}
        <HeaderMiddle></HeaderMiddle>
        {/* End Header Middle Area */}

        {/* Begin Header Bottom Menu Area */}
        {/* <HeaderBottom></HeaderBottom> */}
        {/* End Header Bottom Menu Area */}

        {/* Begin Header Mobile Menu Area */}
        <HeaderMobile></HeaderMobile>
        {/* End Header Mobile Menu Area */}

      </header>
    )
  }
}
