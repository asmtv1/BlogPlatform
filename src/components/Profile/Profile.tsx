import { SubmitHandler, useForm } from "react-hook-form";
import "./Profile.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { editUser } from "../api/Api";
import { DataUser, Myform } from "../intefface";

const Profile: React.FC = () => {
  const { data } = useQuery<DataUser>({
    queryKey: ["user"],
  });
  const queryClient = useQueryClient();
  const {
    setError,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Myform>({
    mode: "onBlur",
  });
  useEffect(() => {
    if (data) {
      reset({
        username: data.user?.username,
        email: data.user?.email,
        avatarImage: data.user?.image,
      });
    }
  }, [data, reset]);
  const submit: SubmitHandler<Myform> = async (data) => {
    try {
      const user = await editUser(
        data.email,
        data.username,
        data.newPassword,
        data.avatarImage
      );
      queryClient.setQueryData(["user"], user); // по новой кэшируем
    } catch (error: any) {
      const errorKey = Object.keys(error.response.data.errors)[0];
      switch (errorKey) {
        case "username":
          setError("username", {
            type: "manual",
            message: "Имя пользователя занято",
          });
          break;
        case "email":
          setError("email", {
            type: "manual",
            message: "Такой адрес занят",
          });
          break;
        default:
          console.log("Чт-то пошло не так");
      }
    }
  };
  return (
    <div className="profile">
      <h1 className="profile__title">Edit Profile</h1>
      <form className="profile__form" onSubmit={handleSubmit(submit)}>
        <label className="profile__label">
          Username
          <input
            className={`profile__input ${errors.username ? "error" : ""}`}
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
            <span className="profile__error">{errors.username.message}</span>
          )}
        </label>
        <label className="profile__label">
          Email address
          <input
            className={`profile__input ${errors.email ? "error" : ""}`}
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
            <span className="profile__error">{errors.email.message}</span>
          )}
        </label>
        <label className="profile__label">
          New password
          <input
            className={`profile__input ${errors.newPassword ? "error" : ""}`}
            type="password"
            placeholder="New password"
            {...register("newPassword", {
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
          {errors.newPassword && (
            <span className="profile__error">{errors.newPassword.message}</span>
          )}
        </label>
        <label className="profile__label">
          Avatar image (url)
          <input
            className={`profile__input ${errors.avatarImage ? "error" : ""}`}
            type="url"
            placeholder="Avatar image"
            {...register("avatarImage")}
          />
          {errors.avatarImage && (
            <span className="profile__error">{errors.avatarImage.message}</span>
          )}
        </label>

        <button className="profile__button">Save</button>
      </form>
    </div>
  );
};
export default Profile;
