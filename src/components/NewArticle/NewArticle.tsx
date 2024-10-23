import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import "./NewArticle.scss";
import { createNewArticle, editArticle } from "../api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { ArticleForm, ArticleLocation } from "../intefface";

const NewArticle: React.FC = () => {
  const location = useLocation();
  const article = location.state?.article as ArticleLocation | undefined;

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ArticleForm>({
    mode: "onBlur",
    defaultValues: {
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });

  const submit: SubmitHandler<ArticleForm> = async (data) => {
    try {
      let slug;

      if (article) {
        queryClient.invalidateQueries({
          queryKey: ["ArticleSlug", article.slug],
        }); //инвалидируем конкретную статью.
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "ArticleList",
        }); // инвалидируем список всех статей :(
        slug = await editArticle(
          data.title,
          data.shortDescription,
          data.text,
          data.tags,
          article.slug
        );
      } else {
        // Создание новой статьи
        slug = await createNewArticle(
          data.title,
          data.shortDescription,
          data.text,
          data.tags
        );
      }
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "ArticleList",
      }); //инвалидируем артиклист
      console.log(data);
      setSuccess(true); // Показываем зеленый алерт (успешное выполнение)
      reset(); // Сбрасываем форму

      // Навигация с задержкой, чтобы пользователь мог увидеть успешный алерт
      const timer = setTimeout(() => {
        navigate(`/article/${slug.article.slug}`);
      }, 1500);

      return () => clearTimeout(timer);
    } catch (error: any) {
      error.status === 422 || 401
        ? setErrorMessage("Что-то не так в статье")
        : setErrorMessage("Чт-то пошло не так");
    }
  };

  useEffect(() => {
    if (article) {
      reset({
        text: article?.body,
        shortDescription: article?.description,
        title: article?.title,
        tags: article?.tagList,
      });
    }
  }, [article, reset]); //вставляем из кэша, если есть

  return (
    <>
      {errorMessage && (
        <Alert
          className="new-article__server-error"
          onClose={() => {
            setErrorMessage("");
          }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
      {success && (
        <Alert className="new-article__success-sign-in" severity="success">
          "Статья успешно создана \ обнавлена"
        </Alert>
      )}
      {!success && (
        <div className="new-article">
          <h1 className="new-article__title">Create new article</h1>
          <form className="new-article__form" onSubmit={handleSubmit(submit)}>
            {/* Title */}
            <label className="new-article__label">
              Title
              <textarea
                className={`new-article__input ${errors.title ? "error" : ""}`}
                placeholder="Title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 1,
                    message: "Your Title needs to be at least 1 character.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Your Title should not exceed 50 characters.",
                  },
                })}
              />
              {errors.title && (
                <span className="new-article__error">
                  {errors.title.message}
                </span>
              )}
            </label>

            {/* Short Description */}
            <label className="new-article__label">
              Short description
              <textarea
                className={`new-article__input ${
                  errors.shortDescription ? "error" : ""
                }`}
                placeholder="Short description"
                {...register("shortDescription", {
                  required: "Short description is required",
                  minLength: {
                    value: 1,
                    message:
                      "Your Short description needs to be at least 1 character.",
                  },
                  maxLength: {
                    value: 500,
                    message:
                      "Your Short description should not exceed 500 characters.",
                  },
                })}
              />
              {errors.shortDescription && (
                <span className="new-article__error">
                  {errors.shortDescription.message}
                </span>
              )}
            </label>

            {/* Боди */}
            <label className="new-article__label">
              Text
              <textarea
                className={`new-article__input ${errors.text ? "error" : ""}`}
                placeholder="Text"
                {...register("text", {
                  required: "Text is required",
                  minLength: {
                    value: 1,
                    message: "Your Text needs to be at least 1 character.",
                  },
                  maxLength: {
                    value: 4000,
                    message: "Your Text should not exceed 4000 characters.",
                  },
                })}
              />
              {errors.text && (
                <span className="new-article__error">
                  {errors.text.message}
                </span>
              )}
            </label>

            {/* Тэги */}
            <div>
              <label className="new-article__label">Tags</label>
              <div className="new-article__add-tag-wrapper">
                <div className="new-article__map-tag-wrapper">
                  {fields.map((field, index) => (
                    <div key={field.id} className="new-article__tag-row">
                      <input
                        placeholder="Tag"
                        className={`new-article__input-tag ${
                          errors?.tags?.[index] ? "error" : ""
                        }`}
                        {...register(`tags.${index}` as const, {
                          maxLength: {
                            value: 10,
                            message: "Tag should not exceed 10 characters.",
                          },
                          validate: (value) =>
                            value.trim() !== "" ||
                            "Поле не может быть пустым, иначе удали его",
                        })}
                      />
                      {errors?.tags?.[index] && (
                        <span className="new-article__error">
                          {errors.tags[index]?.message}
                        </span>
                      )}
                      <button
                        type="button"
                        className="new-article__delete-button"
                        onClick={() => remove(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="new-article__add-button"
                  onClick={() => append("")}
                >
                  Add tag
                </button>
              </div>
            </div>
            {/* Общий сабмит */}
            <button className="new-article__button" type="submit">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewArticle;
