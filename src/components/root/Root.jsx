import { Outlet } from "react-router-dom";
import { Header } from "../header/header";
import { Layout } from "../layout/layout";
import { Footer } from "../footer/footer";

export const Root = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
};
