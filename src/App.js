import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Main } from "./components/main/main";
import { Layout } from "./components/layout/layout";

const App = () => {
  return (
    <Layout>
      <Header />
      <Main/>
      <Footer />
    </Layout>
  );
}

export default App;
