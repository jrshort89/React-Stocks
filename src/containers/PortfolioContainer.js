import React, { Component } from "react";
import Stock from "../components/Stock";

class PortfolioContainer extends Component {
  render() {
    const stocks = this.props.stocks.map((stock) => {
      const { ticker, name, type, price } = stock;
      return (
        <Stock
          key={name}
          ticker={ticker}
          name={name}
          type={type}
          price={price}
          buy={this.props.sell}
        />
      );
    });

    return (
      <div>
        <h2>My Portfolio</h2>
        {stocks}
      </div>
    );
  }
}

export default PortfolioContainer;
