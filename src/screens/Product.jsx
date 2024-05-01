import { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import { useNavigate, Link } from "react-router-dom";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import Header from "../components/Header.jsx";
import StarRating from "../components/Ratings.jsx";
import Loading from "../components/Loading.jsx";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        isLoading(true);
        const productCollection = collection(db, "Products");
        const currentSnapshot = await getDocs(productCollection);
        const currentData = currentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(currentData);
        isLoading(false);
      } catch (error) {
        isLoading(false);
        console.error(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="wrapper mt-5">
        <div className="main">
          <label className="raleway-font font-bold font-big text-white">
            Genshin Merch Shop
          </label>
          <label className="raleway-font font-thin text-white">
            Buy Genshin Merches Here!
          </label>
          <button className="raleway-font font-small">See Repository</button>
        </div>
        <div className="side">
          <div className="child-1">
            <label className="raleway-font font-logo font-bold text-white">
              Shirts
            </label>
            <label className="raleway-font font-small text-white">
              For Men and Women
            </label>
          </div>
          <div className="child-2">
            <label className="raleway-font font-logo font-bold text-white">
              Accessories
            </label>
            <label className="raleway-font font-small text-white">
              All Kinds of Wearables
            </label>
          </div>
          <div className="child-3">
            <label className="raleway-font font-logo font-bold text-white">
              Phone Cases
            </label>
            <label className="raleway-font font-small text-white">
              Apple and Android Devices
            </label>
          </div>
          <div className="child-4">
            <label className="raleway-font font-logo font-bold text-white">
              Sales
            </label>
            <label className="raleway-font font-small text-white">
              Available Everyday
            </label>
          </div>
        </div>
      </div>
      <div className="product-header">
        <label className="raleway-font font-bold font-big text-dark">
          Genshin Merch List
        </label>
      </div>
      <div className="products-layer mt-3">
        {loading ? (
          <Loading />
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-cards">
              <Link to={`/product/${product.id}`}>
                <img
                  className="product-image"
                  src={product.Image}
                  alt={product.Name}
                />
              </Link>
              <label className="raleway-font font-bold font-small text-dark text-center">
                {product.Name}
              </label>
              <label className="raleway-font font-bold font-small text-dark text-center">
                {product.Description}
              </label>
              <label className="raleway-font font-small text-dark text-center">
                ₱{product.Price}
              </label>
              <label className="raleway-font font-small text-gray">
                <StarRating rating={product.Rating} />
              </label>
              <label className="raleway-font font-small text-gray text-center">
                {product.Address}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Product;
