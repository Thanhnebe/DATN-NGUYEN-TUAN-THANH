/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import callApi from "../utils/apiCaller";
import { Button, Card, Divider } from "antd";
import { formatNumber } from "../config/TYPE";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const StatusOrders = {
  Unconfirm: {
    text: "Chưa xác nhận",
    color: "gray",
  },
  Confirm: {
    text: "Đã xác nhận",
    color: "blue",
  },
  Shipping: {
    text: "Đang giao hàng",
    color: "yellow",
  },
  Complete: {
    text: "Hoàn thành",
    color: "green",
  },
  Canceled: {
    text: "Hủy bỏ",
    color: "red",
  },
};

const PaymentMethods = {
  COD: "Thanh toán khi nhận hàng",
  VNPAY: "Thanh toán qua VNPay",
};

function OrderHistoryPage({ match }) {
  const { id } = match.match.params;
  console.log("object", id);

  const [data, setData] = useState(null);
  const [dataOrderDetail, setDataOrderDetail] = useState(null);
  const dataOrderDetails = dataOrderDetail || data?.orderDetails;
  const [loading, setLoading] = useState(true);
  console.log("===data", data);

  const getData = async () => {
    const token = localStorage.getItem("_auth");
    if (token) {
      const res = await callApi(`orders/${id}`, "GET", null, token);
      const res2 = await callApi(
        `order/${id}/orderDetails`,
        "GET",
        null,
        token
      );
      setData(res.data);
      setDataOrderDetail(res2.data?.results);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleCancelOrder = () => {
    const token = localStorage.getItem("_auth");
    if (!token) return;
    
    MySwal.fire({
      title: "Bạn chắc chắn muốn huỷ?",
      text: "Bạn không thể khôi phục",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Huỷ",
    }).then(async (result) => {
      if (result.value) {
        const res = await callApi(
          `users/order/${id}/cancel`,
          "PUT",
          null,
          token
        );
        if (res && res.status === 200) {
          Swal.fire(
            "Huỷ thành công!",
            "Đơn hàng của bạn đã được huỷ",
            "success"
          );
          getData();
        }
      }
    });
  }

  const getAddress = (data) => {
    if (!data) return "";
    return `${data.address.house}, ${data.address.state}, ${data.address.province}`;
  };

  return (
    <div>
      <div className="container OrderHistoryPage">
        <h3>Chi tiết đơn hàng</h3>
        <Divider />
        {loading && <div>Đang tải...</div>}
        {data && (
          <>
            <div className="line">
              <p className="order-title-row">Mã đơn hàng: </p>
              <p className="order-line-value">{data?.id}</p>
            </div>
            <div className="line">
              <p className="order-title-row">Tên người nhận: </p>
              <p className="order-line-value">{data?.fullName}</p>
            </div>
            <div className="line">
              <p className="order-title-row">Địa chỉ: </p>
              <p className="order-line-value">{getAddress(data)}</p>
            </div>
            {data.note && (
              <div className="line">
                <p className="order-title-row">Ghi chú: </p>
                <p className="order-line-value">{data.note}</p>
              </div>
            )}

            <div className="line">
              <p className="order-title-row">Sản phẩm: </p>
              <div style={{ marginLeft: 40, flex: 1 }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOrderDetails && dataOrderDetails.length
                      ? dataOrderDetails.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.nameProduct}</td>
                              <td>
                                <div
                                  style={{
                                    width: 60,
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={
                                      item.product
                                        ? item.product?.image
                                        : item.imageProduct
                                    }
                                    alt="not found"
                                    style={{
                                      height: "100%",
                                      width: "100%",
                                      objectFit: "contain",
                                    }}
                                  />
                                </div>
                              </td>
                              <td>{item.quantity || 0}</td>

                              <td>
                                {formatNumber.format(
                                  item.quantity * item.price
                                )}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="line">
              <div className="line">
                <p className="order-title-row">Tổng tiền sản phẩm: </p>
                <p className="order-line-value">
                  {formatNumber.format(data?.itemAmount || 0)}
                </p>
              </div>
              <div className="line" style={{ marginLeft: 40 }}>
                <p className="order-title-row">Phí vận chuyển: </p>
                <p className="order-line-value">
                  {formatNumber.format(data?.shippingTotal || 0)}
                </p>
              </div>
            </div>
            <div className="line">
              <div className="line">
                <p className="order-title-row">Tổng giảm giá: </p>
                <p className="order-line-value">
                  {formatNumber.format(data?.promoTotal || 0)}
                </p>
              </div>
              <div className="line" style={{ marginLeft: 40 }}>
                <p className="order-title-row">Tổng tiền: </p>
                <p className="order-line-value">
                  {formatNumber.format(data?.totalAmount || 0)}
                </p>
              </div>
            </div>
            <div className="line">
              <p className="order-title-row">Trạng thái: </p>
              <p
                className="order-line-value"
                style={{
                  color: data?.status ? StatusOrders[data.status].color : "",
                  backgroundColor: "#74dbef",
                  padding: "0px 5px",
                }}
              >
                {data?.status ? StatusOrders[data.status].text : ""}
              </p>
            </div>
            <div className="line">
              <p className="order-title-row">Phương thức thanh toán: </p>
              <p className="order-line-value">
                {data?.paymentMethod ? PaymentMethods[data.paymentMethod] : ""}
              </p>
            </div>
            <div className="line">
              <img
                src={`/images/${data?.isPaid ? "ic-paid" : "ic-unpaid"}.png`}
                alt="ic-paid"
                style={{ width: 150 }}
              />
            </div>
            <div className="line" style={{ justifyContent: "center" }}>
              <Button
                type="primary"
                danger
                disabled={data.status !== "Unconfirm"}
                onClick={handleCancelOrder}
              >
                Hủy đơn hàng
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderHistoryPage;
