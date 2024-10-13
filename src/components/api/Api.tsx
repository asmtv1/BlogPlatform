import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export async function fetchArticleList(page: number) {
  try {
    const response = await axios.get(
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
    queryFn: () => fetchArticleList(page),
    staleTime: 5 * 60 * 1000,
    select: (response) => ({
      articles: response.articles,
      articlesCount: response.articlesCount,
    }),
    keepPreviousData: true,
  } as UseQueryOptions<any, Error, any, [string, number]>);
}

export async function fetchArticle(slug: string) {
  try {
    const response = await axios.get(
      `https://blog-platform.kata.academy/api/articles/${slug}`
    );
    return response.data; // Возвращаем только данные
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Пробрасываем ошибку, чтобы её можно было обработать позже
  }
}

