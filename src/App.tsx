import {
  RouterProvider, createBrowserRouter,
} from "react-router-dom";
import { ProductLayout } from "./component/Layout";
import { ProductContainer } from "./pages/product-listing/component/Product";
import ProductFilterProvider from "./provider/ProductFilter/ProductFilterProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <ProductFilterProvider>
        <ProductLayout>
          <ProductContainer />
        </ProductLayout>
      </ProductFilterProvider>
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
