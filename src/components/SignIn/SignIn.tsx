import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import "./SignIn.scss";
import { useQueryClient } from "@tanstack/react-query";
import { loginUserAxion } from "../api/Api";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { Typography } from "@mui/material";

interface Myform {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Myform>({ mode: "onBlur" });

  const submit: SubmitHandler<Myform> = async (data) => {
    try {
      const userData = await loginUserAxion(data.email, data.password);
      queryClient.setQueryData(["user"], userData);
      reset();
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1000); // немного посмотри на зеленый алерт, порадуйся )
    } catch (error: any) {
      error.status === 422
        ? setErrorMessage("Не верный логин или пароль")
        : setErrorMessage("Чт-то пошло не так");
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert
          className="sign-in__server-error"
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
      {success && (
        <Alert className="sign-in__success-sign-in" severity="success">
          "Вы успешно вошли!"
        </Alert>
      )}
      {!success && (
        <div className="sign-in">
          <h1 className="sign-in__title">Sign In</h1>
          <form className="sign-in__form" onSubmit={handleSubmit(submit)}>
            <label className="sign-in__label">
              Email address
              <input
                className={`sign-in__input ${errors.email ? "error" : ""}`}
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
                <span className="sign-in__error">{errors.email.message}</span>
              )}
            </label>
            <label className="sign-in__label">
              Password
              <input
                className={`sign-in__input ${errors.password ? "error" : ""}`}
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Your password needs to be at least 6 characters.",
                  },
                })}
              />
              {errors.password && (
                <span className="sign-up__error">
                  {errors.password.message}
                </span>
              )}
            </label>

            <button type="submit" className="sign-in__button">
              Login
            </button>
            <p className="sign-in__signin-prompt">
              Don`t have an account?
              <Link className="link " to={`/sign-up`}>
                <span> </span> Sign Up.
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignIn;
