import React, { Component } from 'react'
import LinkHere from '../components/LinkHere/LinkHere'
import ProductSearch from '../components/ProductAll/ProductSearch'
import { useLocation } from 'react-router-dom';
import ShopCategory from '../components/ShopCategory/ShopCategory';

const ProductSearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const keywordSearch = queryParams.get('q')
  return (
    <div>
      <LinkHere crumbs={[`Kết quả tìm kiếm "${keywordSearch}"`]} ></LinkHere>
      {/* <ProductSearch></ProductSearch> */}
      <ShopCategory keywordSearch={keywordSearch} type='searchProductByKeyword' />
    </div>
  )
}

export default ProductSearchPage