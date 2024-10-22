import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ArticleInterface } from "../Article";
import {
  getApiKeyToLocalStorage,
  saveApiKeyToLocalStorage,
} from "../utils/utils";

interface ArticleResponse {
  [x: string]: any;
  article: ArticleInterface;
}

async function getArticleList(page: number): Promise<ArticleResponse> {
  try {
    const response = await axios.get<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles?&limit=5&offset=${page}`
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
    staleTime: 5 * 60 * 1000,
    select: (response) => ({
      articles: response.articles,
      articlesCount: response.articlesCount,
    }),
    keepPreviousData: true,
  } as UseQueryOptions<any, Error, any, [string, number]>);
}

async function gethArticleSlug(slug: string): Promise<ArticleResponse> {
  try {
    const response = await axios.get<ArticleResponse>(
      `https://blog-platform.kata.academy/api/articles/${slug}`
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
// регистрация
interface RegisterResponse {
  user: {
    username: string;
    email: string;
    token: string; // Добавляем поле token в ответ
  };
}

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

//вход по токену
interface LoginResponse {
  user: any;
  email: string;
  token: string;
  username: string;
  bio: string;
  image: any;
}

export async function loginTokenUser(token: string): Promise<LoginResponse> {
  try {
    const response = await axios.get<LoginResponse>(
      `https://blog-platform.kata.academy/api/user`,
      {
        headers: {
          Authorization: `Token ${token}`, // Используйте шаблонную строку для добавления токена
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Пробрасываем ошибку для дальнейшей обработки
  }
}

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
