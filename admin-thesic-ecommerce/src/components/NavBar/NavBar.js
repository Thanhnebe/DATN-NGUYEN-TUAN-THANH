import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import callApi from '../../utils/apiCaller';
import './navbar.css'
let token;
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }

  async componentDidMount() {
    token = localStorage.getItem('_auth');
    if (token) {
      const res = await callApi('users/me', 'GET', null, token);
      if (res && res.status === 200) {
        this.setState({
          user: res.data.results
        })
      }
    } else {
      this.setState({
        redirect: true
      })    
    }
  }

  render() {
    const { nameRole } = this.props;
    const { user } = this.state;
    const newUser = user && user.length ? user[0] : null
    return (
      <nav className="side-navbar">
        {/* Sidebar Header*/}
        <div className="sidebar-header d-flex align-items-center">
          <div className="avatar"><img src={newUser && newUser.avatar ? newUser.avatar : 'https://static.vecteezy.com/system/resources/previews/009/784/096/original/avatar-with-gear-flat-design-icon-of-manager-vector.jpg'} alt="notfound" className="img-fluid rounded-circle" /></div>
          <div className="title">
            <h1 className="h4">{newUser && newUser.name ? newUser.name : null}</h1>
            <p><b style={{fontWeight: 600}}>{newUser ? newUser.role.nameRole : null}</b></p>
          </div>
        </div>
        {/* Sidebar Navidation Menus*/}
        {/* <span className="heading">Main</span> */}
        {(nameRole === 'superadmin' || nameRole === 'admin') ?
          <ul className="list-unstyled">
            <li><Link to="/"> <i className="icon-home" />Dashboard </Link></li>
            <li><Link to="/orders"> <i className="icon icon-bill" />Đơn hàng</Link></li>
            <li><Link to="/categories"> <i className="icon-interface-windows" />Danh mục</Link></li>
            <li><Link to="/products"> <i className="icon icon-website" />Danh sách sản phẩm</Link></li>
            <li><Link to="/producers"> <i className="icon icon-list-1" />Nhà cung cấp</Link></li>
            <li><Link to="/transactions"> <i className="icon icon-check" />Danh sách giao dịch</Link></li>
            <li><Link to="/ratings">  <i className="icon icon-check" />Đánh giá</Link></li>
            <li><Link to="/users"> <i className="icon icon-user" />Khách hàng</Link></li>
            {/* <li><Link to="/roles"> <i className="icon icon-bars" />Vai trò</Link></li> */}
            <li> <Link to="/contacts"> <i className="icon-mail" />Phản hồi của khách hàng</Link></li>
            <li> <Link to="/chats"> <i className="icon-mail" />Tin nhắn</Link></li>
          </ul>
          :
          <ul className="list-unstyled">
            <li><Link to="/"> <i className="icon-home" />Dashboard </Link></li>
            <li><Link to="/orders"> <i className="icon icon-bill" />Đơn hàng</Link></li>
            <li><Link to="/categories"> <i className="icon-interface-windows" />Danh mục</Link></li>
            <li><Link to="/products"> <i className="icon icon-website" />Danh sách sản phẩm</Link></li>
            <li><Link to="/producers"> <i className="icon icon-list-1" />Nhà cung cấp</Link></li>
            <li><Link to="/transactions"> <i className="icon icon-check" />Danh sách giao dịch</Link></li>
            <li><Link to="/ratings">  <i className="icon icon-check" />Đánh giá</Link></li>
            <li> <Link to="/contacts"> <i className="icon-mail" />Phản hồi của khách hàng</Link></li>
            <li> <Link to="/chats"> <i className="icon-mail" />Tin nhắn</Link></li>
            {/* <li> <Link to="/contacts"> <i className="icon-mail" />Phản hồi của khách hàng</Link></li> */}
          </ul>
        }
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nameRole: state.nameRole,
  }
}

export default connect(mapStateToProps, null)(NavBar)