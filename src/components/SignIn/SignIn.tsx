import { Link } from "react-router-dom";
import "./SignIn.scss";

const SignIn: React.FC = () => {
  return (
    <div className="sign-in">
      <h1 className="sign-up__title">Sign In</h1>
      <form className="sign-up__form">
        <label className="sign-up__label">
          Email address
          <input
            className="sign-up__input"
            type="email"
            placeholder="Email address"
            required
            name="email"
          />
        </label>
        <label className="sign-up__label">
          Password
          <input
            className="sign-up__input"
            type="password"
            placeholder="Password"
            required
            name="password"
          />
        </label>

        <button type="submit" className="sign-up__button">
          Login
        </button>
        <p className="sign-up__signin-prompt">
          Don`t have an account?
          <Link className="link " to={`/sign-up`}>
            <span> </span> Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
