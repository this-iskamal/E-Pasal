import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBIcon,MDBTypography } from "mdb-react-ui-kit";

import { useAuth } from "../../utils/JWT";
import server from "../../utils/server";


const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const user = useAuth();




  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get(`${server}/api/purchase-history`, {
          user_ko_id: user.id,
        });
        setPurchaseHistory(response.data);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      }
    };

    fetchPurchaseHistory();
  }, [user]);




  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
        <MDBTypography tag="h5">
          <a
            href="#!"
            className="text-red-500 "
            onClick={() => {
              window.history.back();
            }}
          >
            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
          </a>
        </MDBTypography>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Product</th>
            <th className="p-2">Purchase Date</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((purchase) => (
            <tr key={purchase.id} className="border-b border-gray-300">
              <td className="p-2">{purchase.product.product_name}</td>
              <td className="p-2">
                {new Date(purchase.purchase_date).toLocaleDateString()}
              </td>
              <td className="p-2">{purchase.quantity}</td>
              <td className="p-2">Rs {purchase.total_cost.slice(0,-3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default PurchaseHistory;
