import React from "react";

const Stock = (props) => {
  const { name, price, buy } = props;
  return (
    <div onClick={() => buy(name)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Stock;
