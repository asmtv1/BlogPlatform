import Article from "./Article";
import { ArticleInterface } from "./Article";

interface ArticleListProps {
  data: ArticleInterface[];
}
const ArticleList: React.FC<ArticleListProps> = ({ data }) => {
  return (
    <ul className="article-list">
      {data?.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </ul>
  );
};

export default ArticleList;
