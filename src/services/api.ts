import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { getToken } from './token.ts';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const getErrorMessage = (error: AxiosError<DetailMessageType>): string => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    // Если есть сообщение от сервера
    if (data && typeof data === 'object' && 'message' in data) {
      return data.message;
    }

    // Fallback сообщения в зависимости от статуса
    switch (status) {
      case StatusCodes.BAD_REQUEST:
        return 'Некорректный запрос. Проверьте введенные данные.';
      case StatusCodes.UNAUTHORIZED:
        return 'Требуется авторизация.';
      case StatusCodes.NOT_FOUND:
        return 'Запрашиваемый ресурс не найден.';
      default:
        return 'Произошла ошибка. Попробуйте позже.';
    }
  }

  // Если нет ответа от сервера (например, проблемы с сетью)
  if (error.request) {
    return 'Ошибка соединения с сервером. Проверьте подключение к интернету.';
  }

  return 'Произошла неизвестная ошибка.';
};

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        // Не показываем ошибку для проверки авторизации (checkAuth)
        const isAuthCheck = error.config?.url?.includes('/login') && error.config?.method === 'get';

        if (!isAuthCheck) {
          const errorMessage = getErrorMessage(error);
          toast.warn(errorMessage);
        }
      }

      throw error;
    }
  );

  return api;
};
