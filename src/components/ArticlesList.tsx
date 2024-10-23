import Article from "./Article";
import { ArticleInterface } from "./Article";

interface ArticleListProps {
  data: ArticleInterface[];
  page: number;
}
const ArticleList: React.FC<ArticleListProps> = ({ page, data }) => {
  return (
    <ul className="article-list">
      {data?.map((article) => (
        <Article key={article.slug} article={article} page={page} />
      ))}
    </ul>
  );
};

export default ArticleList;
