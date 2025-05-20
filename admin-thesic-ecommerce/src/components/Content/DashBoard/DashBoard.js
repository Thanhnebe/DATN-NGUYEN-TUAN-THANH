import React, { Component } from "react";
import MyFooter from "../../MyFooter/MyFooter";
import {
  actFetchDashboardRequest,
  actFetchDashboardTopNotSellingRequest,
  actFetchDashboardTopSellingRequest,
} from "../../../redux/actions/dashboard";
import { connect } from "react-redux";
import { Line, HorizontalBar, Pie } from "react-chartjs-2";
import "./style.css";
import callApi from "../../../utils/apiCaller";
import { actTokenRequest } from "../../../redux/actions/auth";
import { Card, DatePicker, Space, Table, Tag } from "antd";
import { formatNumber } from "../../../utils";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

let token;
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
      January1: 0,
      February1: 0,
      March1: 0,
      April1: 0,
      May1: 0,
      June1: 0,
      July1: 0,
      August1: 0,
      September1: 0,
      October1: 0,
      November1: 0,
      December1: 0,
      labelsPie: [],
      dataShowPie: [],
      timeSelectedTopSelling: "thisYear",
      timeSelectedTopNotSelling: "thisYear",
      dates: [dayjs().subtract(1, "month"), dayjs()],
    };
    this.onChangeRangePicker = this.onChangeRangePicker.bind(this);
  }

  callFetchDashboard(token) {
    const startDate = this.state.dates?.[0].format("YYYY-MM-DD");
    const endDate = this.state.dates?.[1].format("YYYY-MM-DD");
    if (startDate && endDate) {
      this.props.fetch_dashboard(token, startDate, endDate);
    }
  }

  callFetchDashboardTopSellingRequest() {
    token = localStorage.getItem("_auth");
    if (token) {
      this.props.fetchDashboardTopSellingRequest(
        token,
        this.state.timeSelectedTopSelling
      );
    }
  }
  callFetchDashboardTopNotSellingRequest() {
    token = localStorage.getItem("_auth");
    if (token) {
      this.props.fetchDashboardTopNotSellingRequest(
        token,
        this.state.timeSelectedTopNotSelling
      );
    }
  }

  async componentDidMount() {
    token = localStorage.getItem("_auth");
    this.callFetchDashboardTopSellingRequest();
    this.callFetchDashboardTopNotSellingRequest();

    if (token) {
      // this.props.fetch_dashboard(token, "2024-09-23", "2024-09-27");
      this.callFetchDashboard(token);
      const category = callApi("reports/products", "GET", null, token);
      const income = callApi("reports/income", "GET", null, token);
      const contact = callApi("reports/contacts", "GET", null, token);
      const [resCategory, resIncome, resContact] = await Promise.all([
        category,
        income,
        contact,
      ]);
      if (resIncome) {
        resIncome.data.forEach((item) => {
          if (item.month === "01") {
            this.setState({
              January: item.total,
            });
          }
          if (item.month === "02") {
            this.setState({
              February: item.total,
            });
          }
          if (item.month === "03") {
            this.setState({
              March: item.total,
            });
          }
          if (item.month === "04") {
            this.setState({
              April: item.total,
            });
          }
          if (item.month === "05") {
            this.setState({
              May: item.total,
            });
          }
          if (item.month === "06") {
            this.setState({
              June: item.total,
            });
          }
          if (item.month === "07") {
            this.setState({
              July: item.total,
            });
          }
          if (item.month === "08") {
            this.setState({
              August: item.total,
            });
          }
          if (item.month === "09") {
            this.setState({
              September: item.total,
            });
          }
          if (item.month === "10") {
            this.setState({
              October: item.total,
            });
          }
          if (item.month === "11") {
            this.setState({
              November: item.total,
            });
          }
          if (item.month === "12") {
            this.setState({
              December: item.total,
            });
          }
        });
      }
      if (resContact) {
        resContact.data.forEach((item) => {
          if (item.month === "01") {
            this.setState({
              January1: item.count,
            });
          }
          if (item.month === "02") {
            this.setState({
              February1: item.count,
            });
          }
          if (item.month === "03") {
            this.setState({
              March1: item.count,
            });
          }
          if (item.month === "04") {
            this.setState({
              April1: item.count,
            });
          }
          if (item.month === "05") {
            this.setState({
              May1: item.count,
            });
          }
          if (item.month === "06") {
            this.setState({
              June1: item.count,
            });
          }
          if (item.month === "07") {
            this.setState({
              July1: item.count,
            });
          }
          if (item.month === "08") {
            this.setState({
              August1: item.count,
            });
          }
          if (item.month === "09") {
            this.setState({
              September1: item.count,
            });
          }
          if (item.month === "10") {
            this.setState({
              October1: item.count,
            });
          }
          if (item.month === "11") {
            this.setState({
              November1: item.count,
            });
          }
          if (item.month === "12") {
            this.setState({
              December1: item.count,
            });
          }
        });
      }
      if (resCategory) {
        this.setState({
          labelsPie: resCategory.data.map((e) => e.nameCategory),
          dataShowPie: resCategory.data.map((e) => e.count),
        });
      }
    } else {
      this.props.add_token_redux(null);
    }
  }

  onChangeRangePicker(dates, dateStrings) {
    this.setState({ dates }, () => {
      token = localStorage.getItem("_auth");
      if (token) {
        this.callFetchDashboard(token);
      }
    });
  }

  render() {
    const {
      January,
      February,
      March,
      April,
      May,
      June,
      July,
      August,
      September,
      October,
      November,
      December,
      January1,
      February1,
      March1,
      April1,
      May1,
      June1,
      July1,
      August1,
      September1,
      October1,
      November1,
      December1,
      labelsPie,
      dataShowPie,
    } = this.state;
    const dataLine = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Number",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            January1,
            February1,
            March1,
            April1,
            May1,
            June1,
            July1,
            August1,
            September1,
            October1,
            November1,
            December1,
          ],
        },
      ],
    };
    const dataHozi = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "ORDER",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [
            January,
            February,
            March,
            April,
            May,
            June,
            July,
            August,
            September,
            October,
            November,
            December,
          ],
        },
      ],
    };

    // Function to generate a random hex color
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Function to lighten a hex color by a given percentage
    const lightenColor = (hex, percent) => {
      const num = parseInt(hex.slice(1), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = ((num >> 8) & 0x00ff) + amt;
      const B = (num & 0x0000ff) + amt;

      return (
        "#" +
        (
          0x1000000 +
          (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
          (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
          (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
          .toString(16)
          .slice(1)
      );
    };

    // Function to generate random light colors
    const getRandomLightColor = () => {
      let color = getRandomColor();
      return lightenColor(color, 40); // Lighten the random color by 40%
    };

    // Function to generate unique, lighter colors
    const generateLighterUniqueColors = (baseColors, length) => {
      const extendedColors = [
        ...baseColors.map((color) => lightenColor(color, 40)),
      ]; // Lighten base colors

      while (extendedColors.length < length) {
        const newColor = getRandomLightColor();
        if (!extendedColors.includes(newColor)) {
          extendedColors.push(newColor);
        }
      }

      return extendedColors.slice(0, length);
    };

    // Predefined base colors
    const baseColors = ["#FF6384", "#36A2EB", "#FFCE56", "#b42b2b", "#6aea5a"];

    // Generate enough unique lighter colors for each product
    const backgroundColors = generateLighterUniqueColors(
      baseColors,
      dataShowPie.length
    );
    const hoverBackgroundColors = generateLighterUniqueColors(
      baseColors,
      dataShowPie.length
    );

    const dataPie = {
      labels: labelsPie,
      datasets: [
        {
          data: dataShowPie,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors,
        },
      ],
    };

    const columns1 = [
      {
        title: "Mã sản phẩm",
        dataIndex: "productId",
        key: "productId",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "nameProduct",
        key: "nameProduct",
      },
      {
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        render: (text) => (
          <img
            src={text || null}
            className="fix-img"
            alt="not found"
            style={{ maxWidth: 200 }}
          />
        ),
      },
      {
        title: "Đã bán",
        dataIndex: "totalSold",
        key: "totalSold",
      },
    ];
    const columns2 = [
      {
        title: "Mã sản phẩm",
        dataIndex: "productId",
        key: "productId",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "nameProduct",
        key: "nameProduct",
      },
      {
        title: "Hình ảnh",
        dataIndex: "image",
        key: "image",
        render: (text) => (
          <img
            src={text || null}
            className="fix-img"
            alt="not found"
            style={{ maxWidth: 200 }}
          />
        ),
      },
      {
        title: "Tồn kho",
        dataIndex: "numberAvailable",
        key: "numberAvailable",
      },
    ];
    //thisWeek, lasWeek, thisMonth, lastMonth, q1, q2, q3, q4, lastYear, thisYear
    const timeSelectItems = [
      { title: "Tuần này", value: "thisWeek" },
      { title: "Tuần trước", value: "lasWeek" },
      { title: "Tháng này", value: "thisMonth" },
      { title: "Tháng trước", value: "lastMonth" },
      { title: "Quý 1", value: "q1" },
      { title: "Quý 2", value: "q2" },
      { title: "Quý 3", value: "q3" },
      { title: "Quý 4", value: "q4" },
      { title: "Năm trước", value: "lastYear" },
      { title: "Năm nay", value: "thisYear" },
    ];

    const { dashboard } = this.props;
    console.log("===dashboard", dashboard);
    const data1 = dashboard.topSelling.products;
    const data2 = dashboard.topNotSelling.products;
    return (
      <div className="content-inner">
        {/* Page Header*/}
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Thống kê</h2>
          </div>
        </header>
        {/* Dashboard Counts Section*/}
        <section className="dashboard-counts no-padding-bottom">
          <div className="container-fluid">
            <RangePicker
              // onChange={(dates, dateStrings) =>
              //   console.log("object", dates, dateStrings)

              // }
              format="YYYY-MM-DD"
              value={this.state.dates}
              onChange={this.onChangeRangePicker}
              allowClear={false}
            />
            <div className="row bg-white has-shadow" style={{ marginTop: 10 }}>
              <div className="col-xl-6 col-sm-6">
                <div className="item d-flex align-items-center justify-content-center">
                  <div className="icon bg-red">
                    <i className="icon-padnote" />
                  </div>
                  <div style={{ margin: 20 }}>
                    <div className="title" style={{ flex: "none" }}>
                      <span>Tổng đơn hàng</span>
                      <div className="progress">
                        <div
                          role="progressbar"
                          style={{ width: "100%", height: "4px" }}
                          className="progress-bar bg-red fix-processbar"
                        />
                      </div>
                    </div>
                    <div className="number">
                      <strong>{dashboard.revenues.totalOrder || 0}</strong>
                    </div>
                  </div>
                </div>
              </div>
              {/* Item */}
              <div className="col-xl-6 col-sm-6">
                <div className="item d-flex align-items-center justify-content-center">
                  <div className="icon bg-orange">
                    <i className="icon-check" />
                  </div>
                  <div style={{ margin: 20 }}>
                    <div className="title" style={{ flex: "none" }}>
                      <span>Tổng doanh thu</span>
                      <div className="progress">
                        <div
                          role="progressbar"
                          style={{ width: "100%", height: "4px" }}
                          className="progress-bar bg-orange fix-processbar"
                        />
                      </div>
                    </div>
                    <div className="number">
                      <strong>
                        {formatNumber.format(dashboard.revenues.revenue || 0)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <h3 style={{ paddingTop: 20 }}>Thể loại</h3>
            <Pie width={100} height={25} data={dataPie} /> */}
            <br />
            <div style={{ display: "flex", width: "100%" }}>
              <Card
                title="Sản phẩm bán chạy"
                extra={
                  <select
                    value={this.state.timeSelectedTopSelling}
                    onChange={(event) =>
                      this.setState(
                        {
                          timeSelectedTopSelling: event.target.value,
                        },
                        () => this.callFetchDashboardTopSellingRequest()
                      )
                    }
                  >
                    {timeSelectItems.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                }
                style={{ flex: 1 }}
              >
                <Table
                  columns={columns1}
                  dataSource={data1}
                  pagination={false}
                />
              </Card>
              <Card
                title="Sản phẩm bán chậm"
                extra={
                  <select
                    value={this.state.timeSelectedTopNotSelling}
                    onChange={(event) =>
                      this.setState(
                        {
                          timeSelectedTopNotSelling: event.target.value,
                        },
                        () => this.callFetchDashboardTopNotSellingRequest()
                      )
                    }
                  >
                    {timeSelectItems.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                }
                style={{ flex: 1, marginLeft: 5 }}
              >
                <Table
                  columns={columns2}
                  dataSource={data2}
                  pagination={false}
                />
              </Card>
            </div>

            <br />
            {/* <h3>Tổng thu nhập</h3>
            <HorizontalBar width={100} height={30} data={dataHozi} />
            <br />
            <br />
            <h3>Liên hệ</h3>
            <Line width={100} height={15} data={dataLine} /> */}
          </div>
        </section>
        <MyFooter></MyFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_dashboard: (token, startDate, endDate) => {
      dispatch(actFetchDashboardRequest(token, startDate, endDate));
    },
    fetchDashboardTopSellingRequest: (token, time) => {
      dispatch(actFetchDashboardTopSellingRequest(token, time));
    },
    fetchDashboardTopNotSellingRequest: (token, time) => {
      dispatch(actFetchDashboardTopNotSellingRequest(token, time));
    },
    add_token_redux: (token) => {
      dispatch(actTokenRequest(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
