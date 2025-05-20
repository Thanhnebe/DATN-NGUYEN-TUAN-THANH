import React from "react";
import { Link } from "react-router-dom";

function BannerTop() {
  return (
    <div className="container" style={{marginTop: 40}}>
      <Link to={'#'}>
        <img src={'https://bizweb.dktcdn.net/100/370/289/themes/750565/assets/slider_2.jpg?1699514276127'} alt="Banner" style={{width: '100%'}} />
      </Link>
    </div>
  );
}

export default BannerTop;
