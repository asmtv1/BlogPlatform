import { Link, useParams } from "react-router-dom";
import { favorited, unfavorited, useArticleSlug } from "../api/Api";
import GradientCircularProgress from "../GradientCircularProgress/GradientCircularProgress";
import cleanText, { getApiKeyToLocalStorage } from "../utils/utils";
import { nanoid } from "nanoid"; //пока оставлю
import { getParsedDate } from "../utils/utils";
import styles from "./ArtickeSlug.module.scss";
import Markdown from "markdown-to-jsx";
import { isMarkdown } from "../utils/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Confirm from "../Confirm/Confirm";
import { ChangeEvent } from "react";
import { DataUser } from "../intefface";
const ArticleSlug: React.FC = () => {
  const { slug } = useParams();

  const { data: datauser } = useQuery<DataUser | undefined>({
    queryKey: ["user"],
  });

  if (!slug) {
    // Если slug отсутствует, можно вернуть компонент загрузки или ошибку
    return <div>Error: Slug not found</div>;
  }

  const { data: { article } = {}, error, isLoading } = useArticleSlug(slug);
  const queryClient = useQueryClient();
  const DisabledLike = !!getApiKeyToLocalStorage();
  async function handleChange(e: ChangeEvent<HTMLInputElement>, slug: string) {
    const isFavorited = e.target.checked
    try {
      // лайк\дизлайк
      const updatedArticle = isFavorited
        ? await favorited(slug)
        : await unfavorited(slug);
      queryClient.setQueryData(["ArticleSlug", slug], updatedArticle);
    } catch (error) {
      console.error("Ошибка лайка:", error);
    }
  }

  if (isLoading) {
    return <GradientCircularProgress />; // вставить в ретурн внутри и убрать отсюда
  }
  if (error) {
    return <div></div>;
  }

  return (
    <>
      <div className={`article-list__item ${styles.articlePost}`}>
        <div className={`article-list__header-left `}>
          <div className="article-list__wrapper">
            <h1 className={`article-list__title ${styles.articleListTitle}`}>
              {cleanText(article.title)}
            </h1>
            <label className="article-list__label">
              <input
                onChange={(e) => handleChange(e, slug)}
                className="article-list__check-input"
                type="checkbox"
                checked={article.favorited}
                disabled={!DisabledLike}
              />
              <span className="article-list__check-box"></span>
              {article?.favoritesCount}
            </label>
          </div>
          <ul className={`article-list__tag-list `}>
            {article.tagList?.map((tag: string) => (
              <li key={nanoid()} className="article-list__tag-item">
                {cleanText(tag)}
              </li>
            ))}
          </ul>
        </div>
        <div className="article-list__header-right">
          {article.author?.username === datauser?.user?.username && (
            <div className={styles.changes}>
              <Confirm slug={article?.slug}></Confirm>

              <Link className="link" to="/new-article" state={{ article }}>
                <button className={styles.edit}>Edit</button>
              </Link>
            </div>
          )}
          <div>
            <p className="article-list__author">{article.author?.username}</p>
            <div className="article-list__date">
              {getParsedDate(article.createdAt)}
            </div>
          </div>
          <img
            className="article-list__avatar"
            src={`${article.author?.image}`}
            width="46"
            height="46"
            onError={(e) => {
              //заглушка на аватарку!
              e.currentTarget.src =
                'data:image/svg+xml,<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect y="3.05176e-05" width="46" height="46" fill="url(%23pattern0_9582_3)"/><defs><pattern id="pattern0_9582_3" patternContentUnits="objectBoundingBox" width="1" height="1"><use xlink:href="%23image0_9582_3" transform="scale(0.00666667)"/></pattern><image id="image0_9582_3" width="150" height="150" xlink:href="data:image/png;base64,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"/></defs></svg>';
            }}
          />
        </div>

        <div className="article-list__footer">
          <p
            className={`article-list__description ${styles.articleListDescription}`}
          >
            {cleanText(article.description)}
          </p>
          {isMarkdown(article.body) ? ( // пришел ли там маркдаун или говна напихали как обычно
            <Markdown
              className={`markdown ${styles.articleListBody}`}
              style={{ padding: "revert" }} //костыль от обнуления стилей
            >
              {article.body}
            </Markdown>
          ) : (
            <div className={` ${styles.articleListBody}`}>{article.body}</div>
          )}
        </div>
      </div>
      <div className={styles.Bottom}></div>
    </>
  );
};
export default ArticleSlug;
