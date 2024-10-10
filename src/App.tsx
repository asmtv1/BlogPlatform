import "./App.scss";
import ArticleList from "./components/ArticlesList";
import Pagination from "@mui/material/Pagination";

function App() {
  return (
    <>
      <header className="header">
        <p className="header__title">Realworld Blog</p>
        <div className="header__button">
          <button className="header__sign-in-button">Sign In</button>
          <button className="header__sign-up-button">Sign Up</button>
        </div>
      </header>
      <main>
        <ArticleList />
      </main>
      <footer>
        <div className="pagination">
          <Pagination
            count={20}
            shape="rounded"
            size="small"
            defaultPage={1} //Начальная страница
          />
        </div>
      </footer>
    </>
  );
}

export default App;
