import { useSelector } from "react-redux";
import { selectAccount } from "../store/account/selectors";
import { Route, Routes } from "react-router-dom";
import { Wrapper } from "../components";
import { Dashboard, News, Auth } from "../pages";
import { NewsDetails } from "../pages/News/NewsDetails.page";

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
      </Routes>
    </Wrapper>
  );
};
