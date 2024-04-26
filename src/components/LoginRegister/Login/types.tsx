import {UseApiResponseReturnParams} from '@src/hooks/types';

export type LoginComponentParams = {
  setLogin: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;

  login: {
    email: string;
    password: string;
  };
  // pageTransitionLoginHandler: () => void;
  apiResponse?: UseApiResponseReturnParams;
  remember: {
    setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
    rememberMe: boolean;
  };
};

export type ForgotPasswordComponentParams = {
  pageTransitionForgotHandler: () => void;
  apiResponse: UseApiResponseReturnParams;
};
