// src/pages/Home.jsx
import React from 'react';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '/comerlat.png';

const Home = () => {
  return (
    <div>
      <header>
        <nav>
          <div className="nav-logo">
            <img src={logo} alt="Logo de la empresa" className="logo" />
          </div>
          <ul>
            <li className="dropdown">
              <a href="/">Principal</a>
            </li>
            <li className="dropdown">
              <a href="#">Productos</a>
            </li>
            
            {/*<li><a href="#">Conocenos</a></li>*/}
            <li><a href="#">Eventos</a></li>
            <li><a href="/signin">Iniciar sesión</a></li>
          </ul>
        </nav>
      </header>

      {/*----------------------CARRUSEL-------------------------------- */}
      <div className="hero">
        <div className="hero-background"></div>
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <div className="d-block w-100 carousel-content">
                <h1>VINILO WORLD</h1><br></br>
                <h2>Revive el sonido clásico, apuesta por él</h2>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <div className="d-block w-100 carousel-content">
                <h1>Tu pasión por los vinilos</h1>
                <h2>¡al mejor postor!</h2>
                {/*<a href="#" className="cta-button">Participarrmación</a>*/}
              </div>
            </div>
            <div className="carousel-item">
              <div className="d-block w-100 carousel-content">
                <h1>Vinilos únicos, ofertas únicas</h1>
                <a href="#" className="cta-button">¡Apuesta ya!</a>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/*----------------------SOBRE NOSOTROS-------------------------------- */}
      <section className="about-us">
        <h1>NUESTROS PRODUCTOS</h1>
        <h3>Descubre joyas musicales</h3>
        <div className="about-us-container">
          <div className="about-us-item">
            <h4>Nuestro Propósito</h4>
            <p>En Vinilo World creemos en preservar la magia del sonido analógico y en brindar a los coleccionistas y entusiastas la oportunidad de descubrir auténticas joyas musicales. 
            Nos esforzamos por fomentar una comunidad vibrante y apasionada por el vinilo, ofreciendo un espacio confiable para encontrar, pujar y adquirir los discos que hacen vibrar tu alma.
            </p>
            {/*<button className="learn-more">Learn More</button>*/}
          </div>
          <div className="about-us-image">
            <img src="/Single_syringe.png" alt="Coffee_Splashing" />
          </div>
          <div className="about-us-item">
            <h4>Productos y garantía</h4>
            <p>Ofrecemos una amplia variedad de discos de vinilo, que incluyen ediciones vintage difíciles de encontrar, lanzamientos modernos y reediciones de clásicos imprescindibles. Todos nuestros productos son cuidadosamente revisados para garantizar su calidad, desde el estado del disco hasta la integridad de su portada.</p>
          {/*
           <ul>
              <li>Gestión de calidad certificada.</li>
              <li>Equipo dirigido a la mejora continua.</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
            <button className="learn-more">Learn More</button>*/}
          </div>
        </div>
      </section>

      {/*----------------------EVENTOS-------------------------------- */}
      <section className="services">
  <h2>NUESTROS SERVICIOS</h2>
  
  <div className="services-container">
    {/* Subastas Exclusivas */}
    <div className="service-item">
      <h3>Subastas Exclusivas</h3>
      <p>
        Encuentra vinilos únicos y ediciones especiales en nuestras subastas en línea. Participa y lleva a casa una joya musical para tu colección.
      </p>
      <div className="service-icon">
        <img src="/subasta-icon.png" alt="Subastas Exclusivas" className="rounded-circle" />
      </div>
      <a href="#" className="read-more">Participar</a>
    </div>

    {/* Garantía de Calidad */}
    <div className="service-item">
      <h3>Garantía de Calidad</h3>
      <p>
        Todos los vinilos pasan por inspecciones detalladas para garantizar que cumplen con los estándares más altos en sonido y presentación.
      </p>
      <div className="service-icon">
        <img src="/calidad-icon.png" alt="Garantía de Calidad" className="rounded-circle" />
      </div>
      <a href="#" className="read-more">Conocer más</a>
    </div>

    {/* Soporte Personalizado */}
    <div className="service-item">
      <h3>Soporte Personalizado</h3>
      <p>
        ¿Tienes dudas o necesitas ayuda? Nuestro equipo está listo para asistirte en cada paso de tu experiencia en Vinilo World.
      </p>
      <div className="service-icon">
        <img src="/soporte-icon.png" alt="Soporte Personalizado" className="rounded-circle" />
      </div>
      <a href="#" className="read-more">Contactar</a>
    </div>
  </div>
</section>

      <footer className="footer">
        <div className="footer-container">
        </div>
      </footer>

    </div>
  );
};

export default Home;