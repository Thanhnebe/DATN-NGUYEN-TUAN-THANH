import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import ShopCategory from '../components/ShopCategory/ShopCategory'
export default class ProductPage extends Component {
  render() {
    return (
      <div>
        <LinkHere crumbs={[`Tất cả sản phẩm`]} />
        <ShopCategory type='allProduct'></ShopCategory>
      </div>
    )
  }
}

