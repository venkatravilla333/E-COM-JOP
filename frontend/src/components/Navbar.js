import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Eshop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>

          <form className="d-flex me-3" role="search" >
            <input
              className="form-control form-control-sm me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value=""
              
            />
            <button className="btn btn-outline-light btn-sm" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          <div className="d-flex align-items-center gap-3">
            <Link to="/cart" className="btn btn-outline-light position-relative">
              <i className="bi bi-cart3 fs-6"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
