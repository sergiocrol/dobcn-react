import React, { Component } from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import logo from "../images/logo.svg";
import Parser from 'html-react-parser';

class ProductPage extends Component {
  state = {
    loading: true,
    product: {}
  }

  componentDidMount() {
    const id = this.props['*'];
    fetch(`https://dobcn-api.herokuapp.com/products/product/${id}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          product: json,
          loading: false
        })
      })
  }

  expandSection = (element) => {
    const sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + 'px';
    element.addEventListener('transitioned', (event) => {
      element.style.height = null;
    });
    element.setAttribute('data-collapsed', 'false');
  }

  collapseSection = (element) => {
    const sectionHeight = element.scrollHeight;
    const elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(function () {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(function () {
        element.style.height = 0 + 'px';
      });
    });

    element.setAttribute('data-collapsed', true);
  }

  collapse = (event) => {
    const name = event.target.name;
    const section = document.getElementById(name);
    const isCollapsed = section.getAttribute('data-collapsed') === 'true';
    if (isCollapsed) {
      this.expandSection(section);
      section.setAttribute('data-collapsed', 'false');
    } else {
      this.collapseSection(section);
    }

  }

  render() {
    let title = 'epaplus';
    let family = '';
    if (this.state.product[0]) {
      title = this.state.product[0].title;
      family = this.state.product[0].family;
    }
    const { loading, product } = this.state;
    return (
      <Layout>
        <SEO title={title} />
        <section className="index-header" id={family}>
          <img src={logo} alt="epaplus logo" />
          <p>{title}</p>
          <div className="triangle" id={`triangle-${family}`}></div>
        </section>
        <section className="product-main">
          <div className="product-main-container">
            {
              loading ? <h1>Cargando...</h1> : product.map(el => {
                return (
                  <div key={el._id}>
                    <section className="product-main-header">
                      <img src={el.image} alt={el.title} />
                      <div className="spec-box">
                        <section className="product-card-name">
                          <h2>{el.title}</h2>
                          <p>{el.subtitle}</p>
                        </section>
                        <section className="product-card-specs" >
                          <p>{el.packing}</p>
                          <p>{el.cn}</p>
                        </section>
                        <Link to={`/product/`} className={`button ${family}`}>Dónde comprar</Link>
                      </div>
                      <div>
                        <p className="description-box">{el.description}</p>
                        <div className="features-box">
                          {
                            el.features.map((feat, i) => {
                              return (
                                <div key={i}>
                                  <img src={feat.icon} alt={feat.name} />
                                  <span>{feat.name}</span>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </section>
                    <section className="collapsible-body">
                      <a className="collapse-button" name="formula" onClick={(event) => { this.collapse(event) }}>Fórmula</a>
                      <section data-collapsed="true" id="formula" className="section formula">
                        {Parser(el.formula[0])}
                      </section>
                      <a className="collapse-button" name="format" onClick={(event) => { this.collapse(event) }}>Formato</a>
                      <section data-collapsed="true" id="format" className="section formato">
                        {el.format}
                      </section>
                      <a className="collapse-button" name="empleo" onClick={(event) => { this.collapse(event) }}>Empleo</a>
                      <section data-collapsed="true" id="empleo" className="section empleo">
                        {el.use}
                      </section>
                      <a className="collapse-button" name="warning" onClick={(event) => { this.collapse(event) }}>Advertencias</a>
                      <section data-collapsed="true" id="warning" className="section warning">
                        {Parser(el.warning)}
                      </section>
                      <a className="collapse-button" name="info" onClick={(event) => { this.collapse(event) }}>Información técnica</a>
                      <section data-collapsed="true" id="info" className="section info" dangerouslySetInnerHTML={{ __html: el.info[0] }}>

                      </section>
                    </section>
                  </div>
                )
              })
            }
          </div>
        </section>
      </Layout>
    )
  }
}

export default ProductPage