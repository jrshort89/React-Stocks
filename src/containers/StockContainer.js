import React, { Component } from "react";
import Stock from "../components/Stock";

class StockContainer extends Component {
  render() {
    const stocks = this.props.stocksForSale.map((stock) => {
      const { id, ticker, name, type, price } = stock;
      return (
        <Stock
          key={id}
          ticker={ticker}
          name={name}
          type={type}
          price={price}
          buy={this.props.buy}
        />
      );
    });

    return (
      <div>
        <h2>Stocks</h2>
        {stocks}
      </div>
    );
  }
}

export default StockContainer;
