import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

export default class LinkHere extends Component {
  render() {
    const asPath = window.location.pathname;
    const segments = asPath.split("/").filter((segment) => segment !== "");
    const crumbsArr = this.props.crumbs || segments
    const items = [{ title: <Link to="/">Trang chủ</Link> }].concat(
      crumbsArr.map((item, index) => {
        const isLastSegment = index === segments.length - 1;
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        return {
          title: isLastSegment ? (
            <span>{item}</span>
          ) : (
            <Link to={href}>{item}</Link>
          ),
        };
      })
    );
    return (
      <div className="container">
        <Breadcrumb items={items} separator=">" />
      </div>
    );
  }
}
