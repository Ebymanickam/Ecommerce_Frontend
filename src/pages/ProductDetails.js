import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify';

export default function ProductDetails({cartItems, setCartItems}){

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);   // Add the quantity from intial value
    const {id} = useParams();


    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + '/product' +id)  // passing the id in API request(url)
            .then(res=>res.json())
            .then(res=> setProduct(res.product)); // .product is from API url
    },[])

    function addToCart() {
        const itemExist = cartItems.find((item) => item.product._id == product._id) // ItemsExist - the items are in the Array 
        if (!itemExist) {                            // if itemExist is not, we can add the qty in the cart
            const newItem = {product, qty}; 
            setCartItems((state) => [...state, newItem]);
            toast.success("Cart Item added succesfully!")
        }     // type=success-green colored
    }

    function increaseQty() {
        if (product.stock == qty) {  // stock of product (9) == qty
            return;
        }
        setQty((state) => state + 1); // product increase by button (+) obj
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1); // product decrease by button (-) obj
        }
    }


          // tf the product is null, the condtion will be failed, we can't acccess the image product with null
   return product && <div className="container container-fluid">
    <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img src={product.images[0].image} alt="sdf" height="500" width="500" />  
        </div>

        <div className="col-12 col-lg-5 mt-5">
            {/* API/product/name */}
            <h3>{product.name}</h3>
            <p id="product_id">Product #{product._id}</p>

            <hr />

            <div className="rating-outer">
                <div className="rating-inner" style={{width : `${product.ratings/5 * 100}%`}}></div>
            </div>
    

            <hr />

            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
                 <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>  {/*decrease the qty */}

                <input type="number" className="form-control count d-inline" value={qty} readOnly />

                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>   {/* increase the qty */}
             </div>                                  {/*  if the stock is not available, than the Add cart buuton will be disabled */}
            <button type="button" onClick={addToCart} disabled={product.stock == 0}   id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

            <hr />
                                                  {/*  if the product is out of stock than the danger color will be applied on the screen / if the product stock is empty, then its come out of stock (0) */}
            <p>Status: <span id="stock_status" className={product.stock > 0 ?'text-success':'text-danger'}>{product.stock > 0  ?'In Stock' : 'Out of Stock'}</span></p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
            
            <div className="rating w-50"></div>
                    
        </div>

    </div>
</div> 

}