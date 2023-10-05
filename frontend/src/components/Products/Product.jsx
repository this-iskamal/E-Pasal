import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "antd";
import server from "../../utils/server";
function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API when the component mounts
    axios.get(`${server}/api/products/view`).then((response) => {
      setProducts(response.data); // Assuming the response contains an array of products
    });
  }, []);

  return (
    <div className="container mx-auto p-2 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">View Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product.id} // Assuming each product has a unique id
            hoverable
            // cover={<img alt={product.product_name} src={`${server}/${product.image}`} className="h-40" />} // Replace 'image_url' with the actual field name containing the image URL
          >
            {product.image.length > 0 && (
              <img
                alt={product.product_name}
                src={`${server}${product.image[0].image}`} // Assuming 'server' variable holds the base URL
                className="h-40 align-center"
              />
            )}
            <Card.Meta
              title={product.product_name}
              description={`Price: ${product.price}`}
            />
            {/* Add more product details as needed */}
            <Button type="secondary">Add to Cart</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Product;
