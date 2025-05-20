import React from 'react';

export class ProductListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataOrderDetails: this.props.dataOrderDetails || [], 
    };
    console.log("this.state: ", this.state)
  }

  handleEdit = (index, field, value) => {
    const updatedDetails = [...this.state.dataOrderDetails];
    updatedDetails[index][field] = value;
    this.setState({ dataOrderDetails: updatedDetails });
  };

  handleDelete = (index) => {
    const updatedDetails = this.state.dataOrderDetails.filter(
      (_, i) => i !== index
    );
    this.setState({ dataOrderDetails: updatedDetails });
  };

  render() {
    const { dataOrderDetails } = this.state;
    const {
      orderDetailAmount,
      itemAmount,
      shippingTotal,
      promoTotal,
      totalAmount,
      code,
    } = this.props;

    return (
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
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOrderDetails && dataOrderDetails.length ? (
                      dataOrderDetails.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.nameProduct}</td>
                            <td>
                              <div className="fix-cart">
                                <img
                                  src={item.product ? item.product.image : null}
                                  className="fix-img"
                                  alt="not found"
                                />
                              </div>
                            </td>
                            <td>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  this.handleEdit(
                                    index,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                className="form-control"
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td>{item.quantity * item.price}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => this.handleDelete(index)}>
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          Không có sản phẩm trong đơn hàng
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan="4">
                        <b style={{ fontSize: 16 }}>Tổng sản phẩm</b>
                      </td>
                      <td>
                        <b style={{ fontSize: 16 }}>{orderDetailAmount} VND</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="line" />
        {/* Order details and amounts */}
        <div className="form-group row">
          <label className="col-sm-3 form-control-label">Mã đơn hàng</label>
          <div className="col-sm-3">
            <input disabled value={code} type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 form-control-label">Tiền sản phẩm</label>
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
        <div className="form-group row">
          <label className="col-sm-3 form-control-label">Tổng giảm giá</label>
          <div className="col-sm-3">
            <input
              name="promoTotal"
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
              name="totalAmount"
              disabled
              value={totalAmount}
              onChange={this.handleChange}
              type="number"
              className="form-control"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListComponent;
