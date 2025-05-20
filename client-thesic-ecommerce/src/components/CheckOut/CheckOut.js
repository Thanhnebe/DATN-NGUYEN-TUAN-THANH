import React, { Component } from "react";
import BillDetail from "./BillDetail";
import YourOrder from "./YourOrder";
import { connect } from "react-redux";
import callApi from "../../utils/apiCaller";
import { Redirect } from "react-router-dom";
import { actClearRequest, clearItemSelected, updateNewCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { startLoading, doneLoading } from "../../utils/loading";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./style.css";
const MySwal = withReactContent(Swal);

toast.configure();

let token, res, resultOrder;
class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCheckout: false,
      login: true,
      shippingAddress: false,
      checkout: false,
      result: false,
      paymentMethod: "",
    };
    this.billing = React.createRef();
    this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);
  }

  componentDidMount() {
    token = localStorage.getItem("_auth");
  }

  onChangePaymentMethod(method) {
    this.setState({ ...this.state, paymentMethod: method });
  }
  submitOrder = async () => {
    if (!this.state.paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }
    if (!this.props.selectedItems.length) {
      toast.error("Vui lòng chọn sản phẩm để đặt hàng");
      return;
    }
    MySwal.fire({
      title: "Bạn chắc chắn muốn thanh toán?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#74dbef",
      cancelButtonColor: "#F87474",
      confirmButtonText: "Đúng, thanh toán ngay",
      cancelButtonText: "Huỷ",
    }).then(async (result) => {
      if (result.value) {
        const { provinceData, stateData } = res; //get code
        const resData = await callApi("users/me", "GET", null, token);
        const userId = resData.data.results[0].id;
        if (res.name === "" || res.address === "" || res.phone === "") {
          return toast.error("Vui lòng nhập đầy đủ form trước khi thanh toán");
        }
        let addressProvince;
        if (res.provinces && res.provinces.length) {
          res.provinces.map((item) => {
            if (item.code === provinceData) {
              addressProvince = item.name;
              return addressProvince;
            }
            return { message: "error" };
          }); //output name province
        }

        let addressState;
        if (res.states && res.states.length) {
          res.states.map((item) => {
            if (item.code === stateData) {
              addressState = item.name;
              return addressState;
            }
            return { message: "error" };
          }); //output name state
        }

        const addressResult = {
          province: addressProvince,
          state: addressState,
          house: res.address,
          codeProvince: provinceData,
          codeState: stateData,
        }; // output address
        const note = res.note !== "" ? res.note : null;
        const resultOrder = {
          fullName: res.name,
          address: addressResult,
          note: note,
          phone: res.phone,
          userId,
          products: this.props.selectedItems.map((it) => ({
            productId: it.id,
            quantity: it.quantity,
          })),
          paymentMethod: this.state.paymentMethod,
        };
        //insert order to db
        startLoading();
        const orderDb = await callApi("orders", "POST", resultOrder, token); //method post nen truyen them token tren headers
        if (!orderDb) {
          doneLoading();
          return;
        }
        if (
          this.state.paymentMethod === "VNPAY" &&
          orderDb.status === 200 &&
          orderDb.data.vnPayUrl
        ) {
          this.deleteItemsBuy()
          window.location.href = orderDb.data.vnPayUrl;
        } else {
          // remove on cart
          MySwal.fire({
            position: "top-end",
            icon: "success",
            title: "Thành công!",
            showConfirmButton: true,
            timer: 15000,
          });
          this.setState({
            checkout: true,
            result: true,
          });
          doneLoading();
          this.deleteItemsBuy();
        }
      }
    });
  };

  toggleCheckout = async () => {
    if (!this.props.selectedItems.length) {
      toast.error("Vui lòng chọn sản phẩm để đặt hàng");
      return;
    }
    const { toggleCheckout, shippingAddress } = this.state;
    const auth = localStorage.getItem("_auth");
    if (!auth) {
      return toast.error("Vui lòng đăng nhập để thực hiện chức năng này");
    }
    res = this.billing.current.getBillingState();
    const { provinceData, stateData } = res; //get code
    const resData = await callApi("users/me", "GET", null, token);
    const userId = resData.data.results[0].id;
    const builder = localStorage.getItem("_cart");
    const dataCart = JSON.parse(builder);
    if (res.name === "" || res.address === "" || res.phone === "") {
      return toast.error("Vui lòng đăng nhập trước khi đặt hàng");
    }
    let addressProvince;
    if (res.provinces && res.provinces.length) {
      res.provinces.map((item) => {
        if (item.code === provinceData) {
          addressProvince = item.name;
          return addressProvince;
        }
        return { message: "error" };
      }); //output name province
    }

    let addressState;
    if (res.states && res.states.length) {
      res.states.map((item) => {
        if (item.code === stateData) {
          addressState = item.name;
          return addressState;
        }
        return { message: "error" };
      }); //output name state
    }

    const addressResult = {
      province: addressProvince,
      state: addressState,
      house: res.address,
      codeProvince: provinceData,
      codeState: stateData,
    }; // output address
    const note = res.note !== "" ? res.note : null;
    let amount = this.props.cartCalculateItems.itemAmount || 0;
    let dataItems = [];

    const itemIdsSelected = this.props.selectedItems.map((it) => it.id);
    const itemsSelected = dataCart.filter((item) =>
      itemIdsSelected.includes(item.id)
    );
    itemsSelected.forEach((item) => {
      dataItems.push({
        sku: item.id,
        name: item.nameProduct,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
      });
    });
    resultOrder = {
      fullName: res.name,
      address: addressResult,
      note: note,
      phone: res.phone,
      itemAmount: amount,
      promoTotal: 0,
      shippingTotal: this.props.cartCalculateItems.shippingTotal || 0,
      totalAmount: this.props.cartCalculateItems.totalAmount || 0,
      promoTotal: this.props.cartCalculateItems?.promoTotal || 0,
      orderBill: {
        customer: userId,
        total: amount,
        items: dataItems,
      },
      token,
    };
    this.setState({
      toggleCheckout: !toggleCheckout,
      shippingAddress: !shippingAddress,
    });
  };

  deleteItemsBuy() {
    const builder = localStorage.getItem("_cart");
    const dataCart = JSON.parse(builder);
    const itemIdsSelected = this.props.selectedItems.map((it) => it.id);
    const remainingItems = dataCart.filter((item) =>
      !itemIdsSelected.includes(item.id)
    );
    const newCart = remainingItems
    this.props.clearItemSelected()
    this.props.updateNewCart(newCart)
    localStorage.setItem("_cart", JSON.stringify(newCart))
  }

  render() {
    const { redirectTo, toggleCheckout, shippingAddress, checkout, result } =
      this.state;
    if (redirectTo) {
      return <Redirect to="/after-checkout"></Redirect>;
    }
    return (
      <div className="checkout-area pt-60 pb-30">
        <div className="container checkout-page-container">
          <div
            className="row"
            style={{ textAlign: "center", paddingBottom: 10 }}
          >
            <div className="col-3"></div>
            <div className="col-6">
              <div className="container">
                <ul className="progressbar">
                  <li className="active">Đăng nhập</li>
                  {shippingAddress ? (
                    <li className="active">Địa chỉ nhận hàng</li>
                  ) : (
                    <li>ĐỊA CHỈ NHẬN HÀNG</li>
                  )}
                  {checkout ? (
                    <li className="active">THANH TOÁN</li>
                  ) : (
                    <li>THANH TOÁN</li>
                  )}
                  {result ? (
                    <li className="active">KẾT QUẢ</li>
                  ) : (
                    <li>KẾT QUẢ</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
          {result ? (
            <div className="row">
              <div className="col-lg-12">
                <div className="error-wrapper text-center ptb-50 pt-xs-20">
                  <div>
                    <img
                      src="https://i.ibb.co/pvDhxPj/checked-ok-yes-icon-1320196391133448530.png" //change
                      alt="checked"
                      height="70px"
                    />
                    <h1>Cảm ơn bạn đã tin tưởng sản phẩm của chúng tôi</h1>
                  </div>
                  <div>
                    <h1>Đơn hàng của bạn đã được đặt thành công</h1>
                  </div>
                  <div>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {toggleCheckout ? (
                <YourOrder
                  changeToggle={(result) => this.changeToggle(result)}
                  order={resultOrder}
                  submitOrder={() => this.submitOrder()}
                  onChangePaymentMethod={this.onChangePaymentMethod}
                ></YourOrder>
              ) : (
                <BillDetail ref={this.billing}></BillDetail>
              )}
              <div className="col-12" style={{ textAlign: "center" }}>
                {!toggleCheckout ? (
                  <button
                    onClick={() => this.toggleCheckout()}
                    className="btn btn-primary btn-checkout"
                    style={{ marginTop: -25, marginBottom: 10 }}
                  >
                    Tiếp theo
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartCalculateItems: state.cartCalculateItems.data,
    selectedItems: state.cartCalculateItems.selectedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset_cart: () => {
      dispatch(actClearRequest());
    },
    clearItemSelected: () => {
      dispatch(clearItemSelected())
    },
    updateNewCart: (items) => {
      dispatch(updateNewCart(items))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
