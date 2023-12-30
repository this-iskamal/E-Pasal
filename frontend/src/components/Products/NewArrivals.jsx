import React, { useState } from "react";

import server from "../../utils/server";

const NewArrivals = ({ filteredProducts }) => {
  const [displayedProducts, setDisplayedProducts] = useState(5);
   
  const handlebuynowclick = (id, name) => {
    window.open(`/products/${name}/${id}`, "_self");
  };

  const redirectToAllProducts = () => {
    window.open("/all-new-arrivals","_self");  // Navigate to the "All New Arrivals" page
  };

  const loadMoreProducts = () => {
    setDisplayedProducts((prevCount) => prevCount + 5);
  };

  return (
    <div style={{ backgroundColor: "white" }} className="rounded-md my-3 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-black font-bold text-xl">New Arrivals</span>
        <button
          onClick={redirectToAllProducts}
          className="bg-blue-700 text-white border border-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300"
        >
          Load more
        </button>
      </div>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredProducts.slice(0, displayedProducts).map((product) => (
          <div
            key={product.id}
            className="relative overflow-hidden transition duration-300 transform bg-gray-100 rounded-md shadow-md hover:shadow-lg"
            onClick={() =>
              handlebuynowclick(product.id, product.product_name)
            }
          >
            <div className="relative group">
              <img
                src={`${server}${product.image[0].image}`}
                alt={product.product_name}
                className="object-cover w-full h-40 sm:h-48 md:h-56 transition-transform transform-gpu group-hover:scale-105"
              />
              {product.discountRate && product.discountRate > 0 && (
                <div className="absolute top-0 left-0 p-2 bg-blue-500 text-white rounded-bl-md">
                  <span className="text-xs font-semibold">
                    Save Rs {product.discountRate.slice(0, -3)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-base font-semibold mb-2">
                {product.product_name.length > 20
                  ? `${product.product_name.slice(0, 20)}...`
                  : product.product_name}
              </h3>
              <div className="flex items-center mb-2">
                <span className="text-base font-bold mr-2 text-blue-500">
                  Rs {product.price - product.discountRate}
                </span>
                {product.discountRate && product.discountRate > 0 && (
                  <span className="text-xs text-red-500 line-through">
                    Rs {product.price.slice(0, -3)}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span
                  className={
                    product.freeDelivery ? "text-green-500" : "text-red-500"
                  }
                >
                  {product.freeDelivery
                    ? "Free Delivery"
                    : "Delivery Charges Apply"}
                </span>
                <span
                  className={
                    product.stocks ? "text-green-500" : "text-red-500"
                  }
                >
                  {product.stocks ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              {product.discount_percent !== undefined &&
                product.discount_percent > 0 && (
                  <div className="mt-1 text-xs text-gray-600">
                    {`Discount: ${product.discount_percent.toFixed(2)}%`}
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
