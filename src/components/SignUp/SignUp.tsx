import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNewUser } from "../api/Api";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Typography } from "@mui/material";

interface Myform {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agree: boolean;
}
const SignUp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Myform>({
    mode: "onBlur",
  });

  const navigate = useNavigate(); // Импорт и инициализация navigate

  const submit: SubmitHandler<Myform> = async (data) => {
    try {
      await createNewUser(data.username, data.email, data.password);
      reset(); // Убедитесь, что у вас есть функция reset для сброса формы
      navigate("/welcome"); // Перенаправление на другую страницу после успешной регистрации
    } catch (error: any) {
      error.status === 422
        ? setErrorMessage(
            "Чт-то на сервере пошло не так.\nИзмените Username или Email address"
          )
        : setErrorMessage("Чт-то пошло не так");
    }
  };

  const password = watch("password");

  return (
    <>
      {errorMessage && (
        <Alert
          className="sign-up__server-error"
          onClose={() => {
            setErrorMessage("");
          }}
          severity="error"
        >
          <Typography style={{ whiteSpace: "pre-line" }}>
            {errorMessage}
          </Typography>
        </Alert>
      )}
      <div className="sign-up">
        <h1 className="sign-up__title">Create new account</h1>
        <form className="sign-up__form" onSubmit={handleSubmit(submit)}>
          <label className="sign-up__label">
            Username
            <input
              className={`sign-up__input ${errors.username ? "error" : ""}`}
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message:
                    "You can use only lowercase English letters and numbers",
                },
                minLength: {
                  value: 3,
                  message: "Your Username needs to be at least 3 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Your Username should not exaggerate 20 characters.",
                },
              })}
            />
            {errors.username && (
              <span className="sign-up__error">{errors.username.message}</span>
            )}
          </label>
          <label className="sign-up__label">
            Email address
            <input
              className={`sign-up__input ${errors.email ? "error" : ""}`}
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="sign-up__error">{errors.email.message}</span>
            )}
          </label>
          <label className="sign-up__label">
            Password
            <input
              className={`sign-up__input ${errors.password ? "error" : ""}`}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Your Password needs to be at least 6 characters.",
                },
                maxLength: {
                  value: 40,
                  message: "Your Password should not exaggerate 40 characters.",
                },
              })}
            />
            {errors.password && (
              <span className="sign-up__error">{errors.password.message}</span>
            )}
          </label>
          <label className="sign-up__label">
            Repeat Password
            <input
              className={`sign-up__input ${
                errors.repeatPassword ? "error" : ""
              }`}
              type="password"
              placeholder="Repeat Password"
              {...register("repeatPassword", {
                required: "Repeat Password is required",
                validate: (value) =>
                  value === password || "Passwords must match",
              })}
            />
            {errors.repeatPassword && (
              <span className="sign-up__error">
                {errors.repeatPassword.message}
              </span>
            )}
          </label>
          <label className="sign-up__checkbox-label">
            <div className="sign-up__checkbox-label-wraper">
              <input
                className="sign-up__checkbox"
                type="checkbox"
                {...register("agree", { required: "You mast be agree" })}
              />
              <span className="sign-up__checkbox-box" />
              <p>
                I agree to the processing of my personal information <br />
              </p>
            </div>
            {errors.agree && (
              <span className="sign-up__error">{errors.agree.message} </span>
            )}
          </label>
          <button className="sign-up__button">Create</button>
          <p className="sign-up__signin-prompt">
            Already have an account?
            <Link className="link " to={`/sign-in`}>
              <span> </span>Sign In.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
