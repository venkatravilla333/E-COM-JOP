import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import axios from 'axios'

function Products() {
  let [loading, setLoading] = useState(false);
  let [products, setProducts] = useState([]);
  let [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8000/api/v1/products')
      .then((res) => {
        console.log(res.data)
        setProducts(res.data.products)
        setLoading(false)
       })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
       })
  }, [])
  return <div>
    {
      loading ? <h4>Loading</h4> : error ? <h3>{error}</h3> :
        <div>
          {
            products.map((prod) => {
              return <Product prod={prod} />
            })
          }
        </div>
    }
  </div>;
}

export default Products;
