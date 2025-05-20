import React, { Component } from "react";
import MyFooter from "../../MyFooter/MyFooter";
import { connect } from "react-redux";
import callApi from "../../../utils/apiCaller";
import {
  actAddOrderRequest,
  actGetOrderRequest,
  actEditOrderRequest,
} from "../../../redux/actions/order";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
let token;
let id;

class ActionOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      address: "",
      note: null,
      phone: "",
      totalAmount: 0,
      itemAmount: 0,
      promoTotal: 0,
      shippingTotal: 0,
      paypalCode: "",
      status: "Unconfirm",
      isPaid: false,
      code: 0,
      // isPaymentOnline: false,
      redirectToOrder: false,
      provinceData: "01",
      stateData: "001",
      wardData: "00001",
      provinces: null,
      states: null,
      wards: null,
      dataOrderDetails: [],
      products: [],
      product: null,
      users: [],
      userId: null,
      paymentMethod: 'COD'
    };
    id = this.props.id;
  }

  async componentDidMount() {
    token = localStorage.getItem("_auth");
    const myProvinces = await callApi("provinces", "GET", null);
    const products = await callApi("products", "GET", null);
    const users = await callApi("users", "GET", null, token);

    if (id) {
      const res = await callApi(`orders/${id}`, "GET", null, token);
      const [myStates, wards, resOrderDetails] = await Promise.all([
        callApi(
          `provinces/${res.data.address.codeProvince}/states`,
          "GET",
          null
        ),
        callApi(`provinces/${res.data.address.codeState}/wards`, "GET", null),
        callApi(`order/${id}/orderDetails`, "GET", null, token),
      ]);

      const selectedUser = users.data.results.find(
        (p) => p.id == res.data.userId
      );
      const updatedUsers = users.data.results.filter(
        (p) => p.id !== res.data.userId
      );

      this.setState({
        provinces: myProvinces.data,
        products: products?.data?.results,
        product: products?.data?.results[0] || null,
        states: myStates.data,
        fullName: res.data.fullName,
        address: res.data.address.house,
        // paypalCode: res.data.paypalCode,
        provinceData: res.data.address.codeProvince,
        stateData: res.data.address.codeState,
        wardData: res.data.address.codeWard,
        wards: wards.data,
        note: res.data.note,
        phone: res.data.phone,
        totalAmount: res.data.totalAmount,
        itemAmount: res.data.itemAmount,
        promoTotal: res.data.promoTotal,
        shippingTotal: res.data.shippingTotal,
        paymentMethod: res.data.paymentMethod,
        status: res.data.status,
        isPaid: res.data.isPaid,
        code: res.data.id,
        // isPaymentOnline: res.data.isPaymentOnline,
        dataOrderDetails: resOrderDetails.data.results,
        users: [selectedUser, ...updatedUsers],
        userId: res.data.userId,
      });
    } else {
      const myStates = await callApi("provinces/01/states", "GET", null);
      const wards = await callApi(`provinces/001/wards`, "GET", null);
      this.setState({
        provinces: myProvinces.data,
        states: myStates.data,
        wards: wards.data,
        products: products?.data?.results,
        product: products?.data?.results[0] || null,
        quantity: 1,
        quantityProduct: null,
        users: users?.data?.results || [],
        userId: users?.data?.results[0]?.id || null,
      });
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  validate = () => {
    const { fullName, address, userId, phone } = this.state;
    const errors = {};
    
    if (!fullName) errors.fullName = "Họ tên khách hàng không được để trống";
    if (!address) errors.address = 'Địa chỉ giao hàng không được để trống';
    if (!userId) errors.user = 'Khách hàng không được để trống';
    if (!phone)  errors.phone = 'Số điện thoại không được để trống'
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.validate()) return;
    const {
      fullName,
      address,
      phone,
      isPaid,
      // isPaymentOnline,
      paymentMethod,
      status,
      note,
      states,
      provinces,
      provinceData,
      stateData,
      wards,
      wardData,
      dataOrderDetails,
      userId,
    } = this.state;
    let addressProvince;
  
    if (provinces && provinces.length) {
      provinces.map((item) => {
        if (item.code === provinceData) {
          addressProvince = item.name;
          return addressProvince;
        }
        return { message: "error" };
      }); //output name province
    }

    let addressState;
    if (states && states.length) {
      states.map((item) => {
        if (item.code === stateData) {
          addressState = item.name;
          return addressState;
        }
        return { message: "error" };
      });
    }

    let addressWard;
    if (wards && wards.length) {
      wards.map((item) => {
        if (item.code === wardData) {
          addressWard = item.name;
          return addressWard;
        }
        return { message: "error" };
      });
    }

    const addressResult = {
      province: addressProvince,
      state: addressState,
      house: address,
      codeProvince: provinceData,
      codeState: stateData,
      ward: addressWard, // ward,
      codeWard: wardData, // code ward
    }; // output address

    const newFullName = fullName === "" ? null : fullName;
    const newAddress = address === "" ? null : addressResult;
    const newPhone = phone === "" ? null : phone;
    const newNote = note === "" ? null : note;
    const newUserId = userId === "" ? null : +userId
    const newPaymentMethod = paymentMethod==="" ? null : paymentMethod

    if (!id) {
      const newProducts = dataOrderDetails.map((item) => {
        return { quantity: item?.quantity || 1, productId: item.id };
      });
      const newOrder = {
        fullName: newFullName,
        address: newAddress,
        note: newNote,
        phone: newPhone,
        isPaid,
        userId: newUserId,
        paymentMethod: newPaymentMethod,
        status,
        products: newProducts
      };
    
      this.props.add_order(token, newOrder);
      this.setState({
        fullName: "",
        address: "",
        note: "",
        phone: "",
        itemAmount: 0,
        promoTotal: 0,
        shippingTotal: 0,
        totalAmount: 0,
        isPaid: isPaid,
        paymentMethod: "COD",
        status: "Unconfirm",
        dataOrderDetails: [],
        userId: null,
      });
    } else {
      const editOrder = {
        fullName: newFullName,
        address: newAddress,
        note: newNote,
        phone: newPhone,
        isPaid,
        paymentMethod,
        status,
        userId,
      };

      await this.props.edit_order(token, id, editOrder);
      this.setState({
        redirectToOrder: true,
      });
    }
  };

  sumTotal = (itemAmount, shippingTotal, promoTotal) => {
    const newitemAmount = itemAmount ? itemAmount : 0;
    const newShippingTotal = shippingTotal ? shippingTotal : 0;
    const newpPomoTotal = promoTotal ? promoTotal : 0;

    const result =
      parseInt(newitemAmount) +
      parseInt(newShippingTotal) -
      parseInt(newpPomoTotal);
    if (result < 0) {
      return toast.error("Số lượng không thể nhỏ hơn 0");
    }
    return result;
  };

  handleChangeSelectProvince = async (event) => {
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const res = await callApi(`provinces/${value}/states`, "GET", null);
    const resWard = await callApi(
      `provinces/${res.data[0].code}/wards`,
      "GET",
      null
    );
    this.setState({
      states: res.data,
      provinceData: value,
      stateData: res.data[0].code,
      wardData: resWard.data[0].code,
      wards: resWard.data,
    });
  };

  handleChangeSelectState = async (event) => {
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const res = await callApi(`provinces/${value}/wards`, "GET", null);
    this.setState({
      stateData: value,
      wardData: res.data[0].code,
      wards: res.data,
    });
  };

  handleChangeSelectWard = (event) => {
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      wardData: value,
    });
  };

  handleAddProduct = async (event) => {
    event.preventDefault();
    const { product, dataOrderDetails, userId } = this.state;
    const newData = { ...product, quantity: 1 };
    const dataOrder = [...dataOrderDetails, newData];
    // Call api checkout
    const productRequest = dataOrder?.map((item) => {
      return { productId: item.id, quantity: item.quantity };
    });

    const checkout = await callApi(`orders/checkout`, "POST", {
      products: productRequest,
      userId
    });
    console.log("===============userId===================: ", userId)
    const resultCheck = checkout?.data;
    if (resultCheck){
      const { totalAmount, shippingTotal, promoTotal, itemAmount } = resultCheck;

      this.setState({
        dataOrderDetails: dataOrder,
        totalAmount,
        shippingTotal,
        promoTotal,
        itemAmount,
      });
    }
  };

  handleRemoveProduct = (index) => {
    // Xóa sản phẩm khỏi danh sách dựa vào index
    this.setState((prevState) => ({
      dataOrderDetails: prevState.dataOrderDetails.filter(
        (item, i) => i !== index
      ),
    }));
  };

  handleSelectProduct = async (event) => {
    const selectedId = event.target.value;
    const selectedProduct = this.state.products.find((p) => p.id == selectedId);
    const updatedProducts = this.state.products.filter(
      (p) => p.id !== selectedId
    );
    const newProducts = [selectedProduct, ...updatedProducts];

    this.setState({
      product: selectedProduct,
      products: newProducts,
    });
  };

  handleQuantityChange = async (event, productId) => {
    // Call api checkout
    const { value } = event.target;
    const { dataOrderDetails } = this.state;
    const newDataOrderDetails = dataOrderDetails.map((item) => {
      if (item.id == productId) return { ...item, quantity: +value };
      return item;
    });

    // Call api checkout
    const productRequest = (newDataOrderDetails || []).map((item) => {
      return { productId: item?.id, quantity: item?.quantity || 1 };
    });

    const checkout = await callApi(`orders/checkout`, "POST", {
      products: productRequest,
    });

    const resultCheck = checkout?.data;
    const totalAmount = resultCheck?.totalAmount || 0;
    const shippingTotal = resultCheck?.shippingTotal || 0;
    const promoTotal = resultCheck?.promoTotal || 0;
    const itemAmount = resultCheck?.itemAmount || 0;

    this.setState((prevState) => ({
      quantity: {
        ...prevState.quantity,
        [productId]: value,
      },
    }));

    this.setState({
      dataOrderDetails: newDataOrderDetails,
      totalAmount,
      shippingTotal,
      promoTotal,
      itemAmount,
    });
  };

  handleChangeSelectUser = async (event) => {
    const selectedId = event.target.value;
    const selectedUser = this.state.users.find((p) => p.id == selectedId);
    const updatedUsers = this.state.users.filter((p) => p.id !== selectedId);

    this.setState({
      userId: selectedId,
      users: [selectedUser, ...updatedUsers],
    });
  };

  handleChangeStatus = async (event) => {
    const value = event.target.value;
    this.setState({
      status: value,
    });
  };

  render() {
    const {
      // paypalCode,
      dataOrderDetails,
      provinces,
      states,
      wards,
      wardData,
      provinceData,
      stateData,
      fullName,
      address,
      note,
      code,
      phone,
      totalAmount,
      promoTotal,
      shippingTotal,
      itemAmount,
      paymentMethod,
      isPaid,
      products,
      // isPaymentOnline,
      status,
      redirectToOrder,
      users,
      errors
    } = this.state;
    let orderDetailAmount = 0;
    if (dataOrderDetails.length > 0) {
      orderDetailAmount = dataOrderDetails.reduce((sum, item) => {
        return (sum += item.quantity * item.price);
      }, 0);
    }

    if (redirectToOrder) {
      return <Redirect to="/orders"></Redirect>;
    }

    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Đơn hàng</h2>
          </div>
        </header>
        {/* Breadcrumb*/}
        {/* <div className="breadcrumb-holder container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item active">Order</li>
          </ul>
        </div> */}
        {/* Forms Section*/}
        <section className="forms">
          <div className="container-fluid">
            <div className="row">
              {/* Form Elements */}
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center">
                    <h3 className="h4">Mô tả</h3>
                  </div>
                  <div className="card-body">
                    <form
                      className="form-horizontal"
                      onSubmit={(event) => this.handleSubmit(event)}>
                      {id ? (
                        <div className="form-group row">
                          <label className="col-sm-3 form-control-label">
                            Mã đơn hàng
                          </label>
                          <div className="col-sm-3">
                            <input
                              disabled
                              value={code}
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="line" />
                        </div>
                      ) : null}

                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Người dùng
                        </label>
                        <div className="col-sm-3">
                          <select
                            name="users"
                            value={users}
                            onChange={this.handleChangeSelectUser}
                            // className="form-control mb-3"
                            className={`form-control mb-3 ${errors?.userId ? 'is-invalid' : ''}`}
                            >
                            {users && users.length
                              ? users.map((user, index) => {
                                  return (
                                    <option key={index} value={user.id}>
                                      {user.id} - {user.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                          {errors?.userId && <div className="invalid-feedback">{errors?.userId}</div>}
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Tên người nhận
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={this.handleChange}
                            // className="form-control"
                            className={`form-control ${errors?.fullName ? 'is-invalid' : ''}`}
                          />
                          {errors?.fullName && <div className="invalid-feedback">{errors?.fullName}</div>}
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Tỉnh/Thành phố
                        </label>
                        <div className="col-sm-3">
                          <select
                            name="provinces"
                            value={provinceData}
                            onChange={this.handleChangeSelectProvince}
                            className="form-control mb-3">
                            {provinces && provinces.length
                              ? provinces.map((province, index) => {
                                  return (
                                    <option key={index} value={province.code}>
                                      {province.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        <label
                          className="col-sm-3 form-control-label"
                          style={{ textAlign: "center" }}>
                          Quận/huyện
                        </label>
                        <div className="col-sm-3">
                          <select
                            name="state"
                            value={stateData}
                            onChange={this.handleChangeSelectState}
                            className="form-control mb-3">
                            {states && states.length
                              ? states.map((state, index) => {
                                  return (
                                    <option key={index} value={state.code}>
                                      {state.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                        <label
                          className="col-sm-3 form-control-label"
                          style={{ textAlign: "center" }}>
                          Phường/xã
                        </label>
                        <div className="col-sm-3">
                          <select
                            name="ward"
                            value={wardData}
                            onChange={this.handleChangeSelectWard}
                            className="form-control mb-3">
                            {Array.isArray(wards)
                              ? wards.map((ward, index) => {
                                  return (
                                    <option key={index} value={ward.code}>
                                      {ward.name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Địa chỉ nhà
                        </label>
                        <div className="col-sm-3">
                          <input
                            name="address"
                            value={address}
                            onChange={this.handleChange}
                            type="text"
                            className={`form-control ${errors?.address ? 'is-invalid' : ''}`}
                          />
                           {errors?.address && <div className="invalid-feedback">{errors?.address}</div>}
                        </div>
                        <label
                          className="col-sm-3 form-control-label"
                          style={{ textAlign: "center" }}>
                          Số điện thoại
                        </label>
                        <div className="col-sm-3">
                          <input
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                            type="text"
                            className={`form-control ${errors?.phone ? 'is-invalid' : ''}`}
                          />
                           {errors?.phone && <div className="invalid-feedback">{errors?.phone}</div>}
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Ghi chú
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            name="note"
                            value={note}
                            onChange={this.handleChange}
                            type="text"
                            rows={3}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="line" />
                      {!id && (
                        <div>
                          <div className="form-group row">
                            <label
                              className="col-sm-3 form-control-label"
                              style={{ paddingTop: 50 }}>
                              Chọn sản phẩm
                            </label>
                            <div className="col-sm-3">
                              <select
                                name="products"
                                value={products}
                                onChange={this.handleSelectProduct}
                                className="form-control mb-3"
                         >
                                {products && products.length
                                  ? products.map((product, index) => {
                                      return (
                                        <option key={index} value={product?.id}>
                                          {product?.id} - {product?.nameProduct}
                                        </option>
                                      );
                                    })
                                  : null}
                              </select>
                            </div>
                            <button
                              className="btn btn-primary"
                              onClick={this.handleAddProduct}>
                              Thêm sản phẩm
                            </button>
                          </div>
                        </div>
                      )}

                      {
                        <div>
                          <div className="line" />
                          <div className="form-group row">
                            <label
                              className="col-sm-3 form-control-label"
                              style={{ paddingTop: 50 }}>
                              Sản phẩm
                            </label>
                            <div className="col-sm-9">
                              <div className="card-body">
                                <div className="table-responsive">
                                  <table className="table table-hover">
                                    <thead>
                                      <tr>
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Ảnh</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>

                                        {!id ? <th></th> : null}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {dataOrderDetails &&
                                      dataOrderDetails.length
                                        ? dataOrderDetails.map(
                                            (item, index) => {
                                              return (
                                                <tr key={index}>
                                                  <th scope="row">
                                                    {index + 1}
                                                  </th>
                                                  <td>{item?.nameProduct}</td>
                                                  <td>
                                                    <div className="fix-cart">
                                                      <img
                                                        src={
                                                          item && item.product
                                                            ? item?.product
                                                                ?.image
                                                            : item?.image
                                                        }
                                                        className="fix-img"
                                                        alt="not found"
                                                      />
                                                    </div>
                                                  </td>
                                                  {!id && item?.id ? (
                                                    <input
                                                      type="number"
                                                      name="quantity"
                                                      value={
                                                        this.state?.quantity[
                                                          item?.id
                                                        ] ||
                                                        item?.quantity ||
                                                        1
                                                      }
                                                      onChange={(e) =>
                                                        this.handleQuantityChange(
                                                          e,
                                                          item.id
                                                        )
                                                      }
                                                      min="1"
                                                      className="form-control"
                                                    />
                                                  ) : (
                                                    <td>
                                                      {item?.quantity ||
                                                        item?.product?.quantity}
                                                    </td>
                                                  )}

                                                  <td>
                                                    {item?.quantity *
                                                      item?.price}
                                                  </td>
                                                  <td
                                                    style={{
                                                      cursor: "pointer",
                                                      color: "red",
                                                      fontWeight: "bold",
                                                      textAlign: "center",
                                                    }}
                                                    onClick={() =>
                                                      this.handleRemoveProduct(
                                                        index
                                                      )
                                                    }>
                                                    X
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )
                                        : null}
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>
                                        <b style={{ fontSize: 16 }}>
                                          Tổng sản phẩm{" "}
                                        </b>
                                      </td>
                                      <td>
                                        <b style={{ fontSize: 16 }}>
                                          {orderDetailAmount} VND
                                        </b>
                                      </td>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="line" />
                          <div className="line" />
                          <div className="form-group row">
                            <label className="col-sm-3 form-control-label">
                              Tiền sản phẩm
                            </label>
                            <div className="col-sm-3">
                              <input
                                name="itemAmount"
                                disabled
                                value={itemAmount}
                                onChange={this.handleChange}
                                type="number"
                                className="form-control"
                              />
                            </div>
                            <label
                              className="col-sm-3 form-control-label"
                              style={{ textAlign: "center" }}>
                              Phí vận chuyển
                            </label>
                            <div className="col-sm-3">
                              <input
                                name="shippingTotal"
                                disabled
                                value={shippingTotal}
                                onChange={this.handleChange}
                                type="number"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="line" />
                          <div className="form-group row">
                            <label className="col-sm-3 form-control-label">
                              Tổng giảm giá
                            </label>
                            <div className="col-sm-3">
                              <input
                                name="shippingTotal"
                                disabled
                                value={promoTotal}
                                onChange={this.handleChange}
                                type="number"
                                className="form-control"
                              />
                            </div>
                            <label
                              className="col-sm-3 form-control-label"
                              style={{ textAlign: "center" }}>
                              Tổng tiền
                            </label>
                            <div className="col-sm-3">
                              <input
                                disabled
                                name="totalAmount"
                                value={totalAmount}
                                onChange={this.handleChange}
                                type="number"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      }
                      <div className="line" />
                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Trạng thái
                        </label>
                        <div className="col-sm-9">
                          <select
                            className="form-control mb-3"
                            name="status"
                            value={status}
                            onChange={this.handleChangeStatus}>
                            <option value="Unconfirm">Chưa xác nhận</option>
                            <option value="Confirm">Đã xác nhận</option>
                            <option value="Shipping">Đang giao hàng</option>
                            <option value="Complete">Hoàn thành</option>
                            <option value="Canceled">Hủy bỏ</option>
                          </select>
                        </div>
                      </div>
                      <div className="line" />

                      <div className="form-group row">
                        <label className="col-sm-3 form-control-label">
                          Trả tiền
                        </label>
                        <div className="col-sm-3">
                          <div className="i-checks">
                            <input
                              type="checkbox"
                              onChange={this.handleChange}
                              name="isPaid"
                              checked={isPaid}
                              className="checkbox-template"
                            />
                          </div>
                        </div>
                        <div className="line" />
                        <div className="form-group row">
                          <label className="col-sm-3 form-control-label3">
                            Phương thức thanh toán
                          </label>
                          <div className="col-sm-9">
                            <select
                              className="form-control mb-3"
                              name="paymentMethod"
                              value={paymentMethod}
                              onChange={this.handleChange}>
                              <option value="COD">
                                Thanh toán khi nhận hàng
                              </option>
                              <option value="VNPAY">
                                Thanh toán qua VNPay
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="line" />
                      <div className="form-group row">
                        <div className="col-sm-4 offset-sm-3">
                          <button
                            type="reset"
                            className="btn btn-secondary"
                            style={{ marginRight: 2 }}>
                            Huỷ bỏ
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Lưu thay đổi
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Page Footer*/}
        <MyFooter></MyFooter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_order: (token, newOrder) => {
      dispatch(actAddOrderRequest(token, newOrder));
    },
    get_order: (token, id) => {
      dispatch(actGetOrderRequest(token, id));
    },
    edit_order: (token, id, data) => {
      dispatch(actEditOrderRequest(token, id, data));
    },
  };
};
export default connect(null, mapDispatchToProps)(ActionOrder);
