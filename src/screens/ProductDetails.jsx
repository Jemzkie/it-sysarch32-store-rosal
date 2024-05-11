import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase-config";
import StarRating from "../components/Ratings";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PEvNOEoCKfVp71pGchlLLSILQp5clDkfWmBfoh0mvVdoyBfGM6x6AWyd2EchcTruN343g3RrkhPe4MeyLCsyHPj00KmIPxHxC'); // Replace with your publishable key

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(1000); // Default price is $10.00
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, "Products", productId);
        const productSnapshot = await getDoc(productDoc);
        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

    // Handle the click event when the user clicks the "Checkout" button
    const handleClick = async () => {
      const stripe = await stripePromise;
  
      // Send a request to the backend to create a checkout session
      const response = await fetch('http://35.232.195.230/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, price }), // Send product name and price to the backend
      });
  
      if (response.ok) {
        // If the request is successful, retrieve the session ID from the response
        const session = await response.json();
  
        // Redirect the user to the Stripe Checkout page using the session ID
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
        if (result.error) {
          // If there is an error during the redirect, display the error message
          setError(result.error.message);
        }
      } else {
        // If there is an error creating the checkout session, display an error message
        setError('Error creating checkout session');
      }
    };
  
    // Handle the change event when the user enters a product name
    const handleProductNameChange = (event) => {
      setProductName(event.target.value);
    };
  
    // Handle the change event when the user enters a price
    const handlePriceChange = (event) => {
      setPrice(event.target.value * 100); // Convert price to cents for Stripe
    };
    

  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="wrapper mt-5">
        <div className="select-main">
          <div className="product-details">
            <img
              className="detail-image"
              src={product.Image}
              alt={product.Name}
            />
          </div>
        </div>
        <div className="select-side">
          <div className="raleway-font font-bold font-logo text-dark">
            {product.Name}
          </div>
          <label className="raleway-font font-bold font-small text-dark">
            {product.Description}
          </label>
          <div className="raleway-font font-small text-dark">
            ₱{product.Price}
          </div>
          <label className="raleway-font font-small text-gray">
            <StarRating rating={product.Rating} />
          </label>
          <label className="raleway-font font-small text-gray">
            {product.Address}
          </label>
            <button onClick={handleClick} className="btn-paymongo">
              Buy Now
            </button>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
