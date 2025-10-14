import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/hooks/queries/constantQueryKey';
import { apiWithLogin } from '@/app/hooks/helpers/helper';

// Kiểu user sau khi đăng nhập
export interface IUserLogin {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

// Kiểu response trả về từ API login
export interface ILoginResponse {
  accessToken: string;
  user: IUserLogin;
}

// Kiểu body gửi lên API
export interface ILoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const useAuthLogin = () => {
  return useMutation<ILoginResponse, Error, ILoginPayload>({
    mutationKey: [QUERY_KEY.POST_LOGIN],
    mutationFn: async (body) => {
      return apiWithLogin<ILoginResponse>('auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    },
  });
};
