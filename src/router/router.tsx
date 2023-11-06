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
} from "../pages";
import { NewsDetails } from "../pages/News/NewsDetails.page";
import { Awards } from "../pages/Awards/Awards.page";
import { NewAwards } from "../pages/Awards/NewAwards.page";

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
      </Routes>
    </Wrapper>
  );
};
