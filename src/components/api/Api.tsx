import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { ArticleInterface } from "../Article";
import {
  getApiKeyToLocalStorage,
  saveApiKeyToLocalStorage,
} from "../utils/utils";

// Интерфейсы
interface ArticleResponse {
  article: ArticleInterface;
}

interface RegisterResponse {
  user: {
    username: string;
    email: string;
    token: string;
  };
}

interface LoginResponse {
  user: any;
  email: string;
  token: string;
  username: string;
  bio: string;
  image: any;
}
//список постов
async function getArticleList(page: number): Promise<ArticleResponse> {
  try {
    const response = await axios.get<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles?&limit=5&offset=${page}`,
      {
        headers: {
          Authorization: `Token ${getApiKeyToLocalStorage()}`, // Используйте шаблонную строку для добавления токена
        },
      }
    );
    return response.data; // Возвращаем только данные
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Пробрасываем ошибку, чтобы её можно было обработать позже
  }
}

export function useArticles(page: number) {
  return useQuery({
    queryKey: ["ArticleList", page],
    queryFn: () => getArticleList(page),

    select: (response) => ({
      articles: response.articles,
      articlesCount: response.articlesCount,
    }),
    keepPreviousData: true,
  } as UseQueryOptions<any, Error, any, [string, number]>);
}

// конкретная статья
async function gethArticleSlug(slug: string): Promise<ArticleResponse> {
  try {
    const response = await axios.get<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles/${slug}`,
      {
        headers: {
          Authorization: `Token ${getApiKeyToLocalStorage()}`, // Используйте шаблонную строку для добавления токена
        },
      }
    );
    return response.data; // Возвращаем только данные
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Пробрасываем ошибку, чтобы её можно было обработать позже
  }
}

export function useArticleSlug(slug: string) {
  return useQuery({
    queryKey: ["ArticleSlug", slug],
    queryFn: () => gethArticleSlug(slug),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  } as UseQueryOptions<any, Error, any, [string, string]>);
}

// регистрация пользователя
export async function createNewUser(
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  try {
    const response = await axios.post<RegisterResponse>(
      `https://blog-platform.kata.academy/api/users`,
      { user: { username, email, password } }
    );
    console.log(response.data.user.token); // Обработка ответа
    saveApiKeyToLocalStorage(response.data.user.token); // Сохранение токена
    return response.data; // Возвращаем данные
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Пробрасываем ошибку, чтобы её можно было обработать позже
  }
}
// рекатирование пользователя
export async function editUser(
  email: string,
  username: string,
  password: string,
  image: string
): Promise<LoginResponse> {
  try {
    const userData: any = { user: { email, username, image } }; // Объект по умолчанию

    if (password !== "") {
      userData.user.password = password; // Добавляем пароль, если он не пустой
    }

    const response = await axios.put<LoginResponse>(
      `https://blog-platform.kata.academy/api/user`,
      userData, // Передаем данные в запросе
      {
        headers: {
          Authorization: `Token ${getApiKeyToLocalStorage()}`,
        },
      }
    );

    console.log("посмотри", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}

//вход по токену
export async function loginTokenUser(token: string): Promise<LoginResponse> {
  if (!token) {
    throw new Error("Invalid token"); // Пробрасываем ошибку, если токен недействителен
  }

  try {
    const response = await axios.get<LoginResponse>(
      `https://blog-platform.kata.academy/api/user`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    console.log(response.data);
    return response.data; // Возвращаем данные ответа
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}

//вход по по логину с паролем
export async function loginUserAxion(
  email: string,
  password: string
): Promise<RegisterResponse> {
  try {
    const response = await axios.post<RegisterResponse>(
      `https://blog-platform.kata.academy/api/users/login`,
      { user: { email, password } }
    );
    saveApiKeyToLocalStorage(response.data.user.token);
    console.log(response.data);
    return response.data; // Возвращаем данные ответа
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}
export async function updateUserAxion(
  email: string,
  password: string
): Promise<RegisterResponse> {
  try {
    const response = await axios.post<RegisterResponse>(
      `https://blog-platform.kata.academy/api/users/login`,
      { user: { email, password } }
    );
    saveApiKeyToLocalStorage(response.data.user.token);
    console.log(response.data);
    return response.data; // Возвращаем данные ответа
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}
//создание статьи
export async function createNewArticle(
  title: string,
  description: string,
  body: string,
  tagList: string[]
): Promise<ArticleResponse> {
  try {
    const response = await axios.post<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles`,
      {
        article: { title, description, body, tagList },
      },
      {
        headers: {
          Authorization: `Token ${getApiKeyToLocalStorage()}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}
//редактирование статьи
export async function editArticle(
  title: string,
  description: string,
  body: string,
  tagList: string[],
  slug: string
): Promise<ArticleResponse> {
  try {
    const response = await axios.put<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles/${slug}`,
      {
        article: { title, description, body, tagList },
      },
      {
        headers: {
          Authorization: `Token ${getApiKeyToLocalStorage()}`,
        },
      }
    );
    console.log("что тут?", response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}
//удаление статьи
export async function deleteArticle(slug: string): Promise<ArticleResponse> {
  try {
    const response = await axios.delete<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles/${slug}`,

      {
        headers: {
          Authorization: `Token ${getApiKeyToLocalStorage()}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}

//лайк
export async function favorited(slug: string): Promise<ArticleResponse> {
  try {
    const response = await axios.post<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${getApiKeyToLocalStorage()}`, // Используйте шаблонную строку для добавления токена
        },
      }
    );

    console.log("посмотри", response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}
//унлайк
export async function unfavorited(slug: string): Promise<ArticleResponse> {
  try {
    const response = await axios.delete<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
      {
        headers: {
          Authorization: `Token ${getApiKeyToLocalStorage()}`,
        },
      }
    );

    console.log("посмотри", response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
