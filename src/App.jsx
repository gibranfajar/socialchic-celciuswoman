import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProductView } from "./pages/ProductView";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/product/:productSlug/:productSku"
          element={<ProductView />}
        />
        <Route exact path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
