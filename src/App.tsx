import { useState } from "react";
import "./App.scss";
import ArticleList from "./components/ArticlesList";
import Header from "./components/Header";
import Pagination from "@mui/material/Pagination";
import { useArticles } from "./components/api/Api";
import GradientCircularProgress from "./components/GradientCircularProgress";

function App() {
  const [page, setPage] = useState<number>(0);
  const { data, error, isLoading } = useArticles(page); // Используем кастомный хук
  console.log(data);
  if (error) {
    return <div></div>;
  }

  return (
    <>
      <Header />
      {isLoading && (
        <div className="loading">
          <GradientCircularProgress />
        </div>
      )}
      <ArticleList data={data?.articles} />
      <footer>
        <div className="pagination">
          <Pagination
            onChange={(_event: React.ChangeEvent<unknown>, newPage: number) =>
              setPage((newPage - 1) * 5)
            }
            count={Math.ceil(data?.articlesCount / 5) || 0}
            // Используем количество статей из данных
            shape="rounded"
            size="small"
            defaultPage={1}
          />
        </div>
      </footer>
    </>
  );
}

export default App;
