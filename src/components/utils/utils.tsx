import { parseISO, format } from "date-fns";
import { ru } from "date-fns/locale";
import { Navigate } from "react-router-dom";

// Функция для безопасного парсинга даты
export const getParsedDate = (createdAt: string) => {
  try {
    return format(parseISO(createdAt), "LLLL d, yyyy", { locale: ru });
  } catch (error) {
    return "Дата неизвестна";
  }
};
// Удаляет всё кроме букв цифр и смайлов. из-за того придурка блять
export default function cleanText(text: string) {
  if (text)
    return text
      .replace(
        /[^a-zA-Zа-яА-ЯёЁ0-9\s\.,!?;:"'()\[\]{}\-—–\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F380}-\u{1F3FF}\u{1F1E6}-\u{1F1FF}\u{1F780}-\u{1F7FF}]/gu,
        ""
      )
      .trim();
  else {
    return text;
  }
}

//проверка на дауна
import markdownToJsx from "markdown-to-jsx";
import { renderToStaticMarkup } from "react-dom/server";
export function isMarkdown(text: string) {
  const renderedHtml = renderToStaticMarkup(markdownToJsx({ children: text }));
  // Сравниваем исходный текст с результатом рендера в HTML

  return renderedHtml !== text;
}
//Заносим API_KEY в LocalStorage
export const saveApiKeyToLocalStorage = (ApiKey: string) => {
  const sessionValue = ApiKey;
  const expires = new Date();
  expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 24 часа
  const sessionData = {
    sessionValue,
    expires: expires.getTime(), // Сохраняем срок действия в миллисекундах
  };
  localStorage.setItem("ApiKey", JSON.stringify(sessionData));
};

export const getApiKeyToLocalStorage = () => {
  const sessionData = localStorage.getItem("ApiKey");
  if (sessionData) {
    const { sessionValue, expires } = JSON.parse(sessionData);
    // Проверяем, не истек ли срок действия
    if (new Date().getTime() > expires) {
      localStorage.removeItem("ApiKey"); // Удаляем устаревшую сессию
      return null;
    }
    return sessionValue;
  } else {
    return null;
  }
};

interface PrivateRouteProps {
  element: React.ReactNode;
  isAuthenticated: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  isAuthenticated,
}) => {
  return isAuthenticated ? <>{element}</> : <Navigate to="/sign-in" />;
};
