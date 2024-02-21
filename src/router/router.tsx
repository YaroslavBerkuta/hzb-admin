import { useSelector } from "react-redux";
import { selectAccount } from "../store/account/selectors";
import { Route, Routes } from "react-router-dom";
import { Wrapper } from "../components";
import {
  Dashboard,
  News,
  Auth,
  Regions,
  CreateRegion,
  Production,
  Projects,
  NewProject,
  NewProduction,
  Quality,
  Labolatory,
  Products,
} from "../pages";
import { NewsDetails } from "../pages/News/NewsDetails.page";
import { Awards } from "../pages/Awards/Awards.page";
import { NewAwards } from "../pages/Awards/NewAwards.page";
import { NewQuality } from "../pages/Quality/NewQuality";
import { NewLabolatory } from "../pages/Labolatory/NewLabolatory";
import { Partner } from "../pages/Partners/Partner.page";
import { CreatePartner } from "../pages/Partners/CreatePartner.page";
import { CreateProduct } from "../pages/Products/CreateProduct.page";
import { Categories } from "../pages/Categories/Categories.page";
import { CreateCategory } from "../pages/Categories/CreateCategory.page";

export const Router = () => {
  const user = useSelector(selectAccount);

  if (!user.data) {
    return (
      <Routes>
        <Route index element={<Auth />} />
      </Routes>
    );
  }
  return (
    <Wrapper>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route element={<News />} path="/news" />
        <Route element={<NewsDetails />} path="/news/:id" />
        <Route element={<NewsDetails />} path="/news/create" />
        <Route element={<Awards />} path="/awards" />
        <Route element={<NewAwards />} path="/awards/create" />
        <Route element={<Regions />} path="/regions" />
        <Route element={<CreateRegion />} path="/regions/create" />
        <Route element={<Production />} path="/production" />
        <Route element={<NewProduction />} path="/production/create" />
        <Route element={<Projects />} path="/projects" />
        <Route element={<NewProject />} path="/projects/create" />
        <Route element={<Quality />} path="/quality" />
        <Route element={<NewQuality />} path="/quality/create" />
        <Route element={<Labolatory />} path="/labolatory" />
        <Route element={<NewLabolatory />} path="/labolatory/create" />
        <Route element={<Partner />} path="/partners" />
        <Route element={<CreatePartner />} path="/partners/create" />
        <Route element={<Products />} path="/products" />
        <Route element={<CreateProduct />} path="/products/create" />
        <Route element={<Categories />} path="/category" />
        <Route element={<CreateCategory />} path="/category/create" />
      </Routes>
    </Wrapper>
  );
};
