
import {Fragment, useEffect, useState} from 'react';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
            // data's inside the products
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(()=>{  // get the data's from Api
      fetch(process.env.REACT_APP_API_URL + '/products' + searchParams)
      .then(res => res.json())
      .then(res => setProducts(res.products)); // API/object/products-data's
    },[searchParams]);
      
    return <Fragment> 
                        {/* // we use fragment  for to return the templete codes */}

    <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      
      <div className="row">

        {/* map method */}
        {                                         
          products.map((product) =><ProductCard product = {product}/>)
        }


      </div>
    </section>

   

    </Fragment>

  }
