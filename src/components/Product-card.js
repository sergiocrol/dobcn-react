import React, { Component } from 'react'
import { Link } from "gatsby";

class ProductCard extends Component {
  render() {
    const { image, title, subtitle, cn, packing, family, _id } = this.props.product;

    return (
      <div className="product-card">
        <img src={image} alt={title} />
        <section className="product-card-name">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </section>
        <section className="product-card-specs" >
          <p>{packing}</p>
          <p>{cn}</p>
        </section>
        <Link to={`/product/${_id}`} className={`button ${family}`}>ver producto</Link>
      </div>
    )
  }
}

export default ProductCard;