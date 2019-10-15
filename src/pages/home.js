import React, { Component } from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ProductCard from "../components/Product-card";
import logo from "../images/logo.svg";

class HomePage extends Component {
  state = {
    loading: true,
    lang: 'es',
    products: [],
    filters: []
  }

  componentDidMount() {
    const { lang } = this.state;
    fetch(`https://dobcn-api.herokuapp.com/products/all/${lang}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          products: json,
          loading: false
        })
      })
  }

  filterFunction = (nam) => {
    let newFilters = [...this.state.filters];
    if (newFilters.includes(nam)) {
      newFilters = newFilters.filter(el => el !== nam);
    } else {
      newFilters.push(nam);
    }
    return newFilters;
  }

  filterProduct = event => {
    let newFilter = [];
    const name = event.target.name;
    if (name === "mantener-recuperar-redensificar") {
      const elements = (event.target.name).split('-');
      elements.forEach(el => {
        const n = this.filterFunction(el);
        newFilter = [...n]
      })
    } else {
      newFilter = this.filterFunction(name);
    }

    this.setState({
      filters: newFilter
    })
  }

  changeLanguage = (event) => {
    const lang = event.target.value;
    fetch(`https://dobcn-api.herokuapp.com/products/all/${lang}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          lang,
          products: json,
          loading: false
        })
      })
  }

  render() {
    const { loading, products, filters } = this.state;
    return (
      <Layout>
        <SEO title="Catálogo" />
        <section className="index-header">
          <select onChange={(event) => { this.changeLanguage(event) }} id="lang">
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </select>
          <img src={logo} alt="epaplus logo" />
          <p>Salud científicamente probada</p>
          <div className="triangle"></div>
        </section>
        <section className="index-description">
          <h2>Nuestra gama de productos</h2>
          <p>Soluciones para el cuidado de articulaciones, bienestar digestivo, un sueño reparador, y para reforzar el sistema inmunitario</p>
        </section>
        <section className="index-main">
          <section className="filter-box">
            <div className="filter-box-container">
              <a className={`filter-button ${filters.includes('redensificar') ? 'active' : ''}`} name="mantener-recuperar-redensificar" onClick={(event) => { this.filterProduct(event) }}>Articulaciones y huesos</a>
              <a className={`filter-button ${filters.includes('digestcare') ? 'active' : ''}`} name="digestcare" onClick={(event) => { this.filterProduct(event) }}>Aparato digestivo</a>
              <a className={`filter-button ${filters.includes('immuncare') ? 'active' : ''}`} name="immuncare" onClick={(event) => { this.filterProduct(event) }}>Sistema inmunitario</a>
              <a className={`filter-button ${filters.includes('sleepcare') ? 'active' : ''}`} name="sleepcare" onClick={(event) => { this.filterProduct(event) }}>Sueño y descanso</a>
              <a className={`filter-button ${filters.includes('vigorcare') ? 'active' : ''}`} name="vigorcare" onClick={(event) => { this.filterProduct(event) }}>Vigor sexual</a>
              <a className={`filter-button ${filters.includes('vitalcare') ? 'active' : ''}`} name="vitalcare" onClick={(event) => { this.filterProduct(event) }}>Vitalidad y energia</a>
            </div>
          </section>
          <div className="index-main-container">
            {
              loading ?
                <h1 className="loading">cargango...</h1>
                : products.map(product => {
                  return (
                    (filters.length === 0 || filters.includes(product.family)) ?
                      <ProductCard key={product._id} product={product} /> :
                      null
                  )
                }
                )
            }
          </div>
        </section>
      </Layout>
    );
  }
}

export default HomePage;
