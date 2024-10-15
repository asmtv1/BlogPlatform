import { Link, Outlet } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <p className="header__title">Realworld Blog</p>
        </Link>
        <div className="header__button">
          <Link className="link " to={`/sign-in`}>
            <button className="header__sign-in-button">Sign In</button>
          </Link>
          <Link className="link " to={`/sign-up`}>
            <button className="header__sign-up-button">Sign Up</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Header;
