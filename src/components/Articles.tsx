const Article = () => {
  return (
    <li className="article-list__item">
      <div className="article-list__header-left">
        <h1 className="article-list__title">Some article title</h1>
        <ul className="article-list__tag-list">
          <li className="article-list__tag-item">Tag 1</li>
          <li className="article-list__tag-item">Tag 2</li>
        </ul>
      </div>
      <div className="article-list__header-right">
        <div>
          <p className="article-list__author">John Doe</p>
          <div className="article-list__date">March 5, 2020</div>
        </div>
        <div className="article-list__avatar"></div>
      </div>

      <p className="article-list__description article-list__footer">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </li>
  );
};
export default Article;
