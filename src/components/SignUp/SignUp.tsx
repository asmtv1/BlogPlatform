import { Link } from "react-router-dom";
import "./SignUp.scss";
import { useState } from "react";

const SignUp: React.FC = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!isChecked) {
      alert("Необходимо согласиться с условиями.");
      return;
    }
    console.log("Форма отправлена");
    // Обработка отправки формы
  };
  return (
    <div className="sign-up">
      <h1 className="sign-up__title">Create new account</h1>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <label className="sign-up__label">
          Username
          <input
            className="sign-up__input"
            type="text"
            placeholder="Username"
            required
            name="username"
          />
        </label>
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
        <label className="sign-up__label">
          Repeat Password
          <input
            className="sign-up__input"
            type="password"
            placeholder="Repeat Password"
            required
          />
        </label>
        <label className="sign-up__checkbox-label">
          <input
            className="sign-up__checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={(event) => setIsChecked(event.target.checked)}
            required
          />
          <span className="sign-up__checkbox-box" />I agree to the processing of
          my personal information
        </label>
        <button type="submit" className="sign-up__button">
          Create
        </button>
        <p className="sign-up__signin-prompt">
          Already have an account?
          <Link className="link " to={`/sign-in`}>
            <span> </span>Sign In.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
