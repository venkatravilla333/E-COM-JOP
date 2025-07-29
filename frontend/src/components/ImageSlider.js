import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ImageSlider() {
  
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mt-5"
      data-bs-ride="carousel"
      data-bs-interval="5000" // Auto-slide every 5 seconds
    >
      {/* Slide indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>

      {/* Slide images */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/1.png" className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="/images/2.png" className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="/images/3.png" className="d-block w-100" alt="Slide 3" />
        </div>
        <div className="carousel-item">
          <img src="/images/4.png" className="d-block w-100" alt="Slide 4" />
        </div>
      </div>

      {/* Navigation controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ImageSlider;
