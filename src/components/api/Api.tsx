import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { ArticleInterface } from "../Article";

interface ArticleResponse {
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
