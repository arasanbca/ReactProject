import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify'

export default function Cart({ cartItems, setcartItems }) {
    const [complete, setComplete] = useState(false);

     function increase(item){
    if (item.qty >= item.product.stock){
      return;
    }
    const updateItems = cartItems.map((a) => {
        if(a.product._id === item.product._id)
        {
            a.qty++
        }
        return a;
    })
    setcartItems(updateItems)
  }
  function decrease(item){
    if (item.qty > 1){
      const updateItems = cartItems.map((a) => {
        if(a.product._id === item.product._id)
        {
            a.qty--
        }
        return a;
    })
    setcartItems(updateItems)
    }
  }

  function removeitem(item){
    const updateItems = cartItems.filter((a) => a.product._id !== item.product._id);   
    
    setcartItems(updateItems)
  }
  

  function placeorder(){
    fetch(process.env.REACT_APP_API_URL + "/or/order",{
        method:'POST',
        headers:{'content-Type':'application/json'},
        body: JSON.stringify(cartItems)
    })
    .then(()=> {
        setcartItems([]);
        setComplete(true);
        toast.success('Order Placed Successfully!')
    })
  }
  return (
    cartItems.length > 0 ?<Fragment>
    <div class="container container-fluid">
      <h2 class="mt-5">
        Your Cart: <b>{cartItems.length} items</b>
      </h2>

      <div class="row d-flex justify-content-between">
        <div class="col-12 col-lg-8">
          {cartItems.map((item) =>
          (<Fragment>
            <hr />
            <div class="cart-item">
              <div class="row">
                <div class="col-4 col-lg-3">
                  <img
                    src={item.product.images[0].image}
                    alt={item.product.name}
                    height="90"
                    width="115"
                  />
                </div>

                <div class="col-5 col-lg-3">
                  <Link to={"/product/"+item.product._id}>
                    {item.product.name}
                  </Link>
                </div>

                <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p id="card_item_price">${item.product.price}</p>
                </div>

                <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                  <div class="stockCounter d-inline">
                    <span class="btn btn-danger minus" onClick={()=> decrease(item)}>-</span>
                    <input
                      type="number"
                      class="form-control count d-inline"
                      value={item.qty}
                      readOnly
                    />

                    <span class="btn btn-primary plus" onClick={() => increase(item)}>+</span>
                  </div>
                </div>

                <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                  <i onClick={()=>removeitem(item)}
                    id="delete_cart_item"
                    class="fa fa-trash btn btn-danger"
                  ></i>
                </div>
              </div>
            </div>
          </Fragment>)
          )}
        </div>

        <div class="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span class="order-summary-values">{cartItems.reduce((acc,item)=>(acc + item.qty), 0)} (Units)</span>
            </p>
            <p>
              Est. total: <span class="order-summary-values">${Number(cartItems.reduce((acc,item)=>(acc + item.product.price * item.qty), 0)).toFixed(2)} </span>
            </p>

            <hr />
            <button id="checkout_btn" onClick={placeorder} class="btn btn-primary btn-block">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
    </Fragment> : (!complete ? <h1 className="mt-5">Your Cart is Empty</h1> 
    :<Fragment><h2>ORDER COMPLETED!</h2>
    <p>Your Order has Placed Successfully</p>
    </Fragment>)
  );
}
