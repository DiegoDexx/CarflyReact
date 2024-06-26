import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OtherSections = ({  }) => {


return (

    <>
      <div className="row content-container">
        <div className="text-content2 col-1-2">
          <hr className="text-content2__separator" />
          <h3 className="text-content2__title">Múltiples funcionalidades</h3>
          <p className="text-content2__description">Desde opciones para desarrolladores, creación de blogs, y optimizadores, haz tu web todo-terreno.</p>
          <button className="bt4">Saber más</button>
        </div>
        <div className="container-img col-1-2">
          <div className="photo img3"><img src="./img/illustration2.jpg" alt="Image 3" /></div>
        </div>
      </div>

      <div className="row container-news">
        <div className="container-img3 row--col-1-2">
          <div className="img3"><img src="./img/seophoto1.png" alt="SEO" /></div>
        </div>
        <div className="text-content3 row--col-1-2">
          <h3 className="text-content3__title">¡Conviértete en un maestro del SEO en un solo paso!</h3>
          <p className="text-content3__description">Posiciona tu página web y consigue tu objetivo de visitas.</p>
          <button className="btn bt5">Comienza ya</button>
        </div>
      </div>

      <section className="container-plans">
        <div className="container-plans__title">
          <h2>Nuestros planes</h2>
        </div>

        <div className="row pricing-section">
          <div className="pricing-card row--col-1-3">
            <div className="card-header">
              <div className="card-price">
                <div className="card-price__title">BÁSICO</div>
                <span className="card-price__big">9,99</span>
                <small className="card-price__small">€ p/m</small>
              </div>
            </div>
            <ul className="pricing-card__list">
              <li>
                <img src="./img/tick.png" alt="Tick" />5 plantillas
              </li>
              <li>
                <img src="./img/tick.png" alt="Tick" />Límite de 20 páginas
              </li>
              <li>
                <img src="./img/tick.png" alt="Tick" />Hasta 10 ‘dev-tools’
              </li>
              <li>
                <img src="./img/wrong.png" alt="Wrong" />Hosting
              </li>
              <li>
                <img src="./img/wrong.png" alt="Wrong" />Uso de plantillas SEO
              </li>
            </ul>
            <div className="cont-button">
              <button className="btn buy-button">Comprar</button>
            </div>
          </div>

          <div className="pricing-card row--col-1-3">
            <div className="card-header">
              <div className="card-price">
                <div className="card-price__title">AVANZADO</div>
                <span className="card-price__big">24,99</span>
                <small className="card-price__small">€ p/m</small>
              </div>
            </div>
            <ul className="pricing-card__list">
              <li>
                <img src="./img/tick.png" alt="Tick" />10 plantillas
              </li>
              <li>
                <img src="./img/tick.png" alt="Tick" />Límite de 100 páginas
              </li>
              <li>
                <img src="./img/tick.png" alt="Tick" />Hasta 25 ‘dev-tools’
              </li>
              <li>
                <img src="./img/wrong.png" alt="Wrong" />Hosting
              </li>
              <li>
                <img src="./img/tick.png" alt="Tick" />Uso de plantillas SEO
              </li>
            </ul>
            <div className="cont-button">
              <button className="btn buy-button">Comprar</button>
            </div>
          </div>

          <div className="pricing-card row--col-1-3">
            <div className="card-header">
              <div className="card-price">
                <div className="card-price__title">BUSINESS</div>
                <span className="card-price__big">59,99</span>
                <small className="card-price__small">€ p/m</small>
              </div>
            </div>
            <ul className="pricing-card__list">
              <li>
                <img src="../assets/img/tick.png" alt="Tick" />Todas las plantillas
              </li>
              <li>
                <img src="./assets/img/tick.png" alt="Tick" />Sin limite de páginas
              </li>
              <li>
                <img src="./assets/img/tick.png" alt="Tick" />Todas las ‘dev-tools’
              </li>
              <li>
                <img src="./assets/img/tick.png" alt="Tick" />Hosting
              </li>
              <li>
                <img src="./assets/img/tick.png" alt="Tick" />Uso de plantillas SEO
              </li>
            </ul>
            <div className="cont-button">
              <button className="btn buy-button">Comprar</button>
            </div>
          </div>
        </div>
      </section>
    </>

);
};

export default OtherSections;