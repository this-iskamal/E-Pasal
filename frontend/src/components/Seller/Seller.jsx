import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Spin, theme } from "antd";
import SellerDashboard from "../Dashboard_For_Seller/SellerDashboard";
import UploadProducts from "../Dashboard_For_Seller/UploadProducts";
import SellerNavbar from "../Dashboard_For_Seller/SellerNavbar";
import server from "../../utils/server";
import { useAuthSeller } from "../../utils/JWT";
import Page404 from "../Page404/Page404";
import SellerProducts from "../Dashboard_For_Seller/SellerProducts";
import SellerOrders from "../Dashboard_For_Seller/SellerOrders";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, onClick, children) {
  return {
    key,
    icon,
    onClick,
    children,
    label,
  };
}

const Seller = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const [user, setUser] = useState(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [breadcrumbitem, setBreadcrumbitem] = useState(["Dashboard"]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  // const [staff, setstaff] = useState(false);

  const user = useAuthSeller()

  



  const handledashboardclick = () => {
    setBreadcrumbitem(["Dashboard"]);
    setSelectedMenuItem("1");
  };
  const handleuploadproductsclick = () => {
    setBreadcrumbitem(["Upload Products"]);
    setSelectedMenuItem("10");
  };
  const handleproductsclick = () =>{
    setBreadcrumbitem(["Products"])
    setSelectedMenuItem("2")
  }
  const handleordersclick = () =>{
    setBreadcrumbitem(["Orders"])
    setSelectedMenuItem("7")
  }

  const items = [
    getItem("Dashboard", "1", <PieChartOutlined />, handledashboardclick),
    getItem("Products", "2", <DesktopOutlined />, handleproductsclick),
    getItem("Orders", "7", <UserOutlined />,handleordersclick),
    getItem("Invoices", "11", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem(
      "Upload Products",
      "10",
      <DesktopOutlined />,
      handleuploadproductsclick
    ),
    getItem("Files", "9", <FileOutlined />),
  ];

  return user && user.seller_status ? (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <SellerNavbar />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {breadcrumbitem.map((item) => {
              return <Breadcrumb.Item>{item}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {selectedMenuItem === "1" && <SellerDashboard user={user} />}
            {selectedMenuItem === "10" && <UploadProducts user={user} />}
            {selectedMenuItem === "2" && <SellerProducts user={user} />}
            {selectedMenuItem === "7" && <SellerOrders user={user} />}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          E-Pasal ©2023
        </Footer>
      </Layout>
    </Layout>
  ) : (<>

    <Spin tip="Loading..." size="large" style={{display:"flex", justifyContent:"center", alignItems:"center"}}/>
    <Page404 text={"You are not seller. Please redirect to login"}/>
    </>
  );
};
export default Seller;
