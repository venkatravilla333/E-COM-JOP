import React from 'react';
import { Link } from 'react-router-dom';


function Product({ prod }) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="card h-100 shadow-sm">
        <Link to={`/product/${prod._id}`} className="text-decoration-none text-dark">
          <img
            src={prod.image[0].url}
            alt={prod.name}
            className="card-img-top img-fluid p-3"
            style={{ maxHeight: '200px', objectFit: 'contain' }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{prod.name}</h5>
            <p className="card-text">
              <strong>Price:</strong> ₹{prod.price}/-
            </p>
            
            <Link to={`/product/${prod._id}`} className="btn btn-primary w-100">
              View Details
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Product;
