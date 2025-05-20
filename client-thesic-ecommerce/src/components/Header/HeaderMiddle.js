import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { startLoading, doneLoading } from "../../utils/loading";
import { actSearchProductsRequest } from "../../redux/actions/products";
import { toast } from "react-toastify";
import { actFetchFavoritesRequest } from "../../redux/actions/rating";
import { Avatar, Dropdown, Menu as AntdMenu, notification } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { actTokenRequest } from "../../redux/actions/auth";
import Menu from "./Menu";
import callApi from "../../utils/apiCaller";
import { CHAT_CLIENT_ID_KEY } from "../ChatPopup/ChatPopup";
let token;
class HeaderMiddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
      showMenu: false,
      notifications: [],
      countNotification: 0,
      avatar: "",
    };
    this.prevKeywordSearch = "";
  }

  componentDidMount() {
    this.getNotiData();
  }

  async getNotiData() {
    try {
      token = localStorage.getItem("_auth");
      if (token) {
        const resData = await callApi("users/me", "GET", null, token);
        const userId = resData?.data?.results?.[0]?.id;
        const avatar = resData?.data?.results?.[0]?.avatar || "";
        this.setState({
          avatar,
        });
        if (userId) {
          const notiData = await callApi(
            `notifications?userId=${userId}`,
            "GET",
            null,
            token
          );
          const notiCountData = await callApi(
            `notifications/count?userId=${userId}`,
            "GET",
            null,
            token
          );
          this.setState({
            notifications: notiData.data?.notifications || [],
            countNotification: notiCountData.data?.quantity?.count || 0,
          });
        }
        this.handleChangeUserId(userId || "");
      } else {
        this.handleChangeUserId("");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  handleChangeUserId(userId) {
    
  }

  componentDidUpdate() {
    const queryParams = new URLSearchParams(window.location.search);
    const keywordSearch = queryParams.get("q");
    if (this.prevKeywordSearch !== keywordSearch) {
      this.prevKeywordSearch = keywordSearch;
      this.setState({ textSearch: keywordSearch || "" });
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleClickMenu = () => {
    this.setState({
      ...this.state,
      showMenu: !this.state.showMenu,
    });
  };

  handleClick = () => {
    const { textSearch } = this.state;
    if (textSearch === "" || textSearch === null) {
      return toast.error("Vui lòng nhập ký tự tìm kiếm ...");
    }
    startLoading();
    // this.props.searchProduct(textSearch);
    this.setState({
      textSearch: null,
    });
    doneLoading();
  };

  loadingPage = () => {
    startLoading();
    doneLoading();
  };

  handleFetchFavorites = () => {
    if (!token) {
      return toast.error(
        "Vui lòng đăng nhập trước khi xem danh sách yêu thích"
      );
    } else {
      this.props.fetch_productFavorites(token);
    }
  };

  logOut = async () => {
    localStorage.removeItem("_auth");
    const token = null;
    startLoading();
    await this.props.setTokenRedux(token);
    doneLoading();
    window.location.href = '/'
  };

  async onClickItemNotification(item) {
    if (item.viewed) {
      return;
    }
    try {
      token = localStorage.getItem("_auth");
      const resData = await callApi("users/me", "GET", null, token);
      const userId = resData?.data?.results?.[0]?.id;
      if (userId) {
        const notiData = await callApi(
          `notifications`,
          "PUT",
          {
            userId: `${userId}`,
            notificationIds: [`${item.id}`],
          },
          token
        );
        if (notiData.status === 200) {
          this.getNotiData();
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  render() {
    const { textSearch, avatar } = this.state;
    const { countCart, user } = this.props;
    const count = countCart?.length > 0 ? countCart?.length : 0;

    const items = !user
      ? [
          {
            key: "1",
            label: <Link to="/login-register">Đăng nhập</Link>,
          },
        ]
      : [
          {
            key: "2",
            label: <Link to="/profile">Thông tin cá nhân</Link>,
          },
          {
            key: "3",
            label: (
              <Link onClick={this.logOut} to="#">
                Đăng xuất
              </Link>
            ),
          },
        ];

    const { notifications, countNotification } = this.state;

    const customMenuItemStyle = {
      padding: "0px 0px",
      marginTop: 10,
    };

    const menu = (
      <AntdMenu>
        {notifications.length ? (
          <>
            {notifications.map((item, index) => (
              <AntdMenu.Item
                key={`noti-key-${index}`}
                style={customMenuItemStyle}
                onClick={() => this.onClickItemNotification(item)}
              >
                <div
                  style={{
                    width: 300,
                    border: "1px solid #ccc",
                    padding: "0px 10px",
                    borderRadius: 5,
                    ...(!item.viewed && {
                      backgroundColor: "#f0f0f0",
                      borderColor: "#f0f0f0",
                    }),
                  }}
                >
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </div>
              </AntdMenu.Item>
            ))}
          </>
        ) : (
          <AntdMenu.Item key="1" style={customMenuItemStyle}>
            <div style={{ padding: "0px 10px" }}>
              <p>{"Không có thông báo"}</p>
            </div>
          </AntdMenu.Item>
        )}
      </AntdMenu>
    );

    return (
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container">
          <div className="row row-header">
            <div className="col-lg-3 row-header-left">
              <div className="logo pb-sm-30 pb-xs-30">
                <Link onClick={() => this.loadingPage()} to="/">
                  <img
                    src="/images/logo.png"
                    alt=""
                    style={{ width: "80px", height: "80px" }} // Updated width and height
                  />
                </Link>
              </div>
            </div>

            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
              <form className="hm-searchbox">
                <input
                  name="textSearch"
                  value={textSearch}
                  type="text"
                  onChange={this.handleChange}
                  placeholder="Nhập từ khoá ..."
                />
                <Link
                  onClick={this.handleClick}
                  to={`/products/search?q=${this.state.textSearch}`}
                >
                  <button className="li-btn" type="submit">
                    <i className="fa fa-search" />
                  </button>
                </Link>
              </form>
              <div className="header-middle-right">
                <ul className="hm-menu">
                  <li className="hm-wishlist">
                    <Dropdown
                      // menu={itemsNotification}
                      trigger={["click"]}
                      placement="bottomRight"
                      overlay={menu}
                    >
                      <a>
                        <span className="cart-item-count wishlist-item-count">
                          {countNotification}
                        </span>
                        <i className="fa fa-bell-o ic-bell" />
                      </a>
                    </Dropdown>
                  </li>
                  <li className="hm-minicart">
                    <Link to="/cart">
                      <div className="hm-minicart-trigger">
                        <span className="item-icon" />
                        <span className="item-text">
                          <span className="cart-item-count">
                            {count ? count : 0}
                          </span>
                        </span>
                      </div>
                    </Link>
                    <span />
                  </li>
                  <li className="profile-button">
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <Avatar size={45} src={avatar} icon={<UserOutlined />} />
                    </Dropdown>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countCart: state.cart,
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (q) => {
      dispatch(actSearchProductsRequest(q));
    },
    fetch_productFavorites: (token) => {
      dispatch(actFetchFavoritesRequest(token));
    },
    setTokenRedux: (token) => {
      dispatch(actTokenRequest(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMiddle);
