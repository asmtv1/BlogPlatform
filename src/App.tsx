import "./App.scss";
//хуки и прочее
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

//get запросы
import { useArticles } from "./components/api/Api";

//импорт копонентов
import ArticleList from "./components/ArticlesList";
import Header from "./components/Header/Header";
import GradientCircularProgress from "./components/GradientCircularProgress/GradientCircularProgress";
import ArticleSlug from "./components/ArtickeSlug/ArtickeSlug";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Welcome from "./components/Welcome/Welcome";
import Profile from "./components/Profile/Profile";
import NewArticle from "./components/NewArticle/NewArticle";

function App() {
  const [page, setPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading } = useArticles(page); // Используем кастомный хук
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
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<ArticleList data={data?.articles} />} />
          <Route
            path="article"
            element={<ArticleList data={data?.articles} />}
          />
          <Route path="/article/:slug" element={<ArticleSlug />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-article" element={<NewArticle />} />
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
