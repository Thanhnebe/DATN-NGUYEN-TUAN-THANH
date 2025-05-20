import React, { Component } from "react";
import callApi from "../../utils/apiCaller";

export default class BillDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: null,
      states: null,
      name: "",
      address: "",
      phone: "",
      note: "",
      provinceData: "01",
      stateData: "001",
      wards: null,
      wardData: "00001",
    };
  }

  async componentDidMount() {
    try {
      const myProvinces = await callApi("provinces", "GET", null);
      const myStates = await callApi("provinces/01/states", "GET", null); //set static
      const myWards = await callApi("provinces/001/wards", "GET", null);
      this.setState({
        provinces: myProvinces?.data,
        states: myStates?.data,
        wards: myWards?.data,
      });
    } catch (err) {}
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  getBillingState = (event) => {
    return this.state; //ref react
  };

  handleChangeSelectProvince = async (event) => {
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const res = await callApi(`provinces/${value}/states`, "GET", null);
    const resWard = await callApi(`provinces/${res?.data[0].code}/wards`, "GET", null);
    this.setState({
      states: res.data,
      provinceData: value,
      stateData: res?.data[0].code,
      wards: resWard?.data,
      wardData: resWard?.data[0]?.code
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
      wards: res?.data,
      wardData: res?.data[0]?.code,
    });
  };

  handleChangeSelectWard = async (event) => {
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      wardData: value,
    });
  };

  render() {
    const {
      provinces,
      states,
      provinceData,
      stateData,
      wards,
      wardData,
      name,
      address,
      phone,
      note,
    } = this.state;
    return (
      <div className="col-12" style={{ margin: "auto", padding: 40 }}>
        <form>
          <div className="checkbox-form">
            <h3>Địa chỉ giao hàng</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="country-select clearfix">
                  <label>
                    Tỉnh/ thành phố <span className="required">*</span>
                  </label>
                  <select
                    onChange={this.handleChangeSelectProvince}
                    className="nice-select wide"
                    name="provinces"
                    value={provinceData}
                  >
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
              </div>
              <div className="col-md-6">
                <div className="country-select clearfix">
                  <label>
                    Quận/huyện <span className="required">*</span>
                  </label>
                  <select
                    onChange={this.handleChangeSelectState}
                    className="nice-select wide"
                    name="state"
                    value={stateData}
                  >
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
              </div>
              <div className="col-md-6">
                <div className="country-select clearfix">
                  <label>
                    Phường/Xã <span className="required">*</span>
                  </label>
                  <select
                    onChange={this.handleChangeSelectWard}
                    className="nice-select wide"
                    name="ward"
                    value={wardData}
                  >
                    {wards && wards.length
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
              <div className="col-md-6">
                <div className="checkout-form-list">
                  <label>
                    Họ tên <span className="required">*</span>
                  </label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    value={name}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="checkout-form-list">
                  <label>
                    Số điện thoại <span className="required">*</span>
                  </label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="phone"
                    value={phone}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="checkout-form-list">
                  <label>
                    Địa chỉ nhận hàng <span className="required">*</span>
                  </label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    name="address"
                    value={address}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="order-notes">
                  <div className="checkout-form-list">
                    <label>Ghi chú</label>
                    <textarea
                      value={note}
                      onChange={this.handleChange}
                      id="checkout-mess"
                      cols="30"
                      rows="10"
                      name="note"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
