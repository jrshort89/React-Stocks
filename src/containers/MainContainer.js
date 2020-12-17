import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocksForSale: [],
    ownedStocks: [],
    sort: "Price",
    type: "",
  };

  async componentDidMount() {
    const rawText = await fetch("http://localhost:3000/stocks");
    const json = await rawText.json();
    this.setState({
      stocksForSale: json,
    });
  }

  buyStock = (name) => {
    const forSale = [...this.state.stocksForSale];
    const index = forSale.findIndex((stock) => stock.name === name);
    const boughtStock = forSale.splice(index, 1);
    const owned = [...this.state.ownedStocks, boughtStock[0]];
    this.setState({
      stocksForSale: forSale,
      ownedStocks: owned,
    });
  };

  sellStock = (name) => {
    const owned = [...this.state.ownedStocks];
    const index = owned.findIndex((stock) => stock.name === name);
    const boughtStock = owned.splice(index, 1);
    const forSale = [boughtStock[0], ...this.state.stocksForSale];
    this.setState({
      stocksForSale: forSale,
      ownedStocks: owned,
    });
  };

  setSort = (event) => {
    this.setState({
      sort: event.target.value,
    });
  };

  sortMyStocks = (array) => {
    if (this.state.sort === "Price") {
      array = array.sort((a, b) => a.price - b.price);
    } else if (this.state.sort === "Alphabetically") {
      array = array.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    return array;
  };

  setType = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  render() {
    const forSale =
      this.state.type !== ""
        ? this.state.stocksForSale.filter((elm) => elm.type === this.state.type)
        : this.state.stocksForSale;

    const owned =
      this.state.type !== ""
        ? this.state.ownedStocks.filter((elm) => elm.type === this.state.type)
        : this.state.ownedStocks;

    return (
      <div>
        <SearchBar sort={this.setSort} setType={this.setType} />
        <div className="row">
          <div className="col-8">
            <StockContainer
              stocksForSale={this.sortMyStocks(forSale)}
              buy={this.buyStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={this.sortMyStocks(owned)}
              sell={this.sellStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
