import Article from "./Articles";
import { ArticleInterface } from "./Articles";

interface ArticleListProps {
  data: ArticleInterface[];
}
const ArticleList: React.FC<ArticleListProps> = ({ data }) => {
  console.log(data);
  return (
    <ul className="article-list">
      {data?.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </ul>
  );
};

export default ArticleList;
