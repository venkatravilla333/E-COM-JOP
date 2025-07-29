import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">

          {/* Contact Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-semibold text-uppercase">Contact Us</h5>
            <p className="mb-2">
              <i className="bi bi-telephone-fill me-2"></i>
              Phone: +888888888
            </p>
            <p className="mb-0">
              <i className="bi bi-envelope-fill me-2"></i>
              Email: venkat@gmail.com
            </p>
          </div>

          {/* Social Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-semibold text-uppercase">Follow Me</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              <a href="#" target="_blank" className="text-light fs-4">
                <i className="bi bi-github"></i>
              </a>
              <a href="#" target="_blank" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" target="_blank" className="text-light fs-4">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" target="_blank" className="text-light fs-4">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-semibold text-uppercase">About</h5>
            <p className="mb-0">
              Providing web development tutorials and courses to help you grow your skills.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-top border-secondary pt-3 text-center mt-4">
          <p className="mb-0 small">&copy; 2025 Eshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
