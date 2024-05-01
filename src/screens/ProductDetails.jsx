import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase-config";
import StarRating from "../components/Ratings";
import Header from "../components/Header";
import Loading from "../components/Loading";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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

  const handleBuyNowClick = (e) => {
    e.preventDefault();
    const amount = product.Price * 100;
    const redirectUrl = window.location.href;

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Basic c2tfdGVzdF96RVM1WEszb1A1clplb0M0ckJOQVlnMmc6",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            line_items: [
              {
                currency: "PHP",
                amount: amount,
                description: `${product.Name}`,
                name: `${product.Description}`,
                quantity: 1,
              },
            ],
            payment_method_types: ["gcash"],
            success_url: redirectUrl,
            description: "Pay",
          },
        },
      }),
    };

    fetch("https://api.paymongo.com/v1/checkout_sessions", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const checkoutUrl = data.data.attributes.checkout_url;
        window.location.href = checkoutUrl;
      })
      .catch((err) => console.error(err));
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
          <label className="raleway-font font-bold font-logo text-dark">
            {product.Name}
          </label>
          <label className="raleway-font font-bold font-small text-dark">
            {product.Description}
          </label>
          <label className="raleway-font font-small text-dark">
            ₱{product.Price}
          </label>
          <label className="raleway-font font-small text-gray">
            <StarRating rating={product.Rating} />
          </label>
          <label className="raleway-font font-small text-gray">
            {product.Address}
          </label>
          <form className="mt-5" onSubmit={handleBuyNowClick}>
            <button className="btn-paymongo" type="submit">
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
