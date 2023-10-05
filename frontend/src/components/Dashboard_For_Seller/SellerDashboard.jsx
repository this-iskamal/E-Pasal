import React from "react";
import { Card, CardHeader} from "@nextui-org/react";

function SellerDashboard() {
  return (
    <>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        <Card
          className="py-4"
          style={{
            maxWidth: "300px",
            minWidth:'200px',
            width: "100%",
            background: "linear-gradient(to left, #4eda89, #1a9f53",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
            <h4 className="font-bold text-large">Total Products</h4>
            
            <h4 className="font-bold text-large">241</h4>
          </CardHeader>
        </Card>
        <Card
          className="py-4"
          style={{
            maxWidth: "300px",
            minWidth:'200px',
            width: "100%",
            background: "linear-gradient(to left, #ed68ff, #be0ee1)",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
            <h4 className="font-bold text-large">Total Orders</h4>
            
            <h4 className="font-bold text-large">541</h4>
          </CardHeader>
        </Card>
        <Card
          className="py-4"
          style={{
            maxWidth: "300px",
            minWidth:'200px',
            width: "100%",
            background: "linear-gradient(to left, #f4d02b, #e1940e)",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start" >
            <h4 className="font-bold text-large">Total Users</h4>
            
            <h4 className="font-bold text-large">200</h4>
          </CardHeader>
        </Card>
        <Card
          className="py-4"
          style={{
            maxWidth: "300px",
            minWidth:'200px',
            width: "100%",
            background: "linear-gradient(to left, #64b3f6, #2b77e5)",
          }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
            <h4 className="font-bold text-large">Total Sales</h4>
            
            <h4 className="font-bold text-large">NPR 22,500.0</h4>
          </CardHeader>
        </Card>
       
      </div>
    </>
  );
}

export default SellerDashboard;
