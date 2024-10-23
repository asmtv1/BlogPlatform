import "./App.scss";
//хуки и прочее
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

//get запросы
import { useArticles } from "./components/api/Api";
// utils
import { PrivateRoute } from "./components/utils/utils";

//импорт копонентов
import ArticleList from "./components/ArticlesList";
import Header from "./components/Header/Header";
import GradientCircularProgress from "./components/GradientCircularProgress/GradientCircularProgress";
import ArticleSlug from "./components/ArtickeSlug/ArtickeSlug";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Profile/Profile";
import NewArticle from "./components/NewArticle/NewArticle";
import { useQuery } from "@tanstack/react-query";
import { DataUser } from "./components/intefface";

function App() {
  const [page, setPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading } = useArticles(page); // Используем кастомный хук
  const { data: userData } = useQuery<DataUser>({
    queryKey: ["user"],
  });
  const location = useLocation();
  const isArticleListRoute =
    location.pathname === "/" || location.pathname === "/article";

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage((newPage - 1) * 5);
    setCurrentPage(newPage);
  };

  if (error) {
    return <div></div>;
  }

  return (
    <>
      <Header page={page} />
      <Routes>
        <Route path="/">
          <Route
            index
            element={<ArticleList page={page} data={data?.articles} />}
          />
          <Route
            path="article"
            element={<ArticleList page={page} data={data?.articles} />}
          />
          <Route path="/article/:slug" element={<ArticleSlug />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<Profile />}
                isAuthenticated={!!userData}
              />
            }
          />
          <Route
            path="/new-article"
            element={
              <PrivateRoute
                element={<NewArticle />}
                isAuthenticated={!!userData}
              />
            }
          />
        </Route>
      </Routes>
      {isLoading && isArticleListRoute
        ? isArticleListRoute && <GradientCircularProgress />
        : isArticleListRoute && (
            <Pagination
              className="pagination"
              onChange={handlePageChange}
              count={Math.ceil((data?.articlesCount || 0) / 5)} //тут кстати переделать надо на проверку чётности страниц
              shape="rounded"
              size="small"
              page={currentPage}
            />
          )}
    </>
  );
}

export default App;
