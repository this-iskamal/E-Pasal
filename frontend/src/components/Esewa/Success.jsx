import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "animate.css/animate.min.css"; // Import the Animate.css library
import server from "../../utils/server";
import axios from "axios";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import { useAuth } from "../../utils/JWT";

function Success() {
  const user = useAuth();

  const location = useLocation();
  const { q } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const oid = searchParams.get("oid");
  const amt = searchParams.get("amt");
  const refId = searchParams.get("refId");

  const [showSpinner, setShowSpinner] = useState(true);
  const [item, setItem] = useState();

  useEffect(() => {
    console.log(oid.slice(14));
    const timeout = setTimeout(() => {
      setShowSpinner(false);
      savePurchaseHistory();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [user, item]);

  const [radius, setRadius] = useState(10);
  const [strokeWidth, setStrokeWidth] = useState(2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRadius = Math.random() * 10 - 5;
      const newStrokeWidth = Math.random() * 3 - 1;

      setRadius(newRadius);
      setStrokeWidth(newStrokeWidth);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const list = [
    {
      title: item ? item.product_name : null,
      img: item ? `${server}/${item.image[0].image}` : null,
      price: item ? item.price : null,
    },
  ];
  useEffect(() => {
    axios
      .get(`${server}/api/products/ProuctName/${oid.slice(14)}/`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const savePurchaseHistory = () => {
    console.log(user);
    axios
      .post(`${server}/api/purchase-history/create/`, {
        user: user.id,
        product: item.id,
        quantity: parseInt(q, 10),
        total_cost: parseInt(amt, 10),
        shipping_address: (user.addresss[0].addresss),
      })
      .then((response) => {
        console.log("Purchase history saved:", response.data);
   

      })
      .catch((error) => {
        console.error("Error saving purchase history:", error);
      });
  };

  return (
    <div
      style={{ backgroundColor: "#F1DEC9" }}
      className="h-screen bg-blue flex items-center justify-center"
    >
      <div className="text-black text-center">
        {showSpinner ? (
          <div className="animate__animated animate__spin animate__infinite animate__slow">
            <h1 className="text-4xl font-bold mb-4">Purchase Processing!</h1>

            {/* Spinning circle */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-40 h-40 text-gray-500 mx-auto"
            >
              <circle
                cx="12"
                cy="12"
                r={radius}
                stroke="green"
                strokeWidth={strokeWidth}
                fill="none"
              />
            </svg>
          </div>
        ) : (
          <div className="animate__animated animate__bounceIn animate__delay-0s">
            <h1 className="text-4xl font-bold mb-4">Purchase Successful!</h1>

            {/* Checkmark icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-40 h-40 text-green-500 mx-auto"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        )}
        {!showSpinner && (
          <div className="flex flex-col justify-center items-center">
            {list.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{item.title}</b>
                  <p className="text-default-500">{item.price}</p>
                </CardFooter>
              </Card>
            ))}
            <p className="mt-4">
              Thank you for your purchase. Your order is:{" "}
              <b>{item && item.title}</b>
            </p>
            <p>
              Amount Paid: <b>{item && amt}</b>{" "}
            </p>
            <p>
              Reference ID: <b>{item && refId}</b>
            </p>
            {/* Add any additional information or links as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Success;
