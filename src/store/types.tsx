// ROUTE
export type RouteSliceParams = {
  path: "RootNavigator" | "AuthNavigator";
};

// THEME
export type ThemeSliceParams = {
  mode: "light" | "dark" | "system";
};
// USER
export type UserInfoParams = {
  user: {
    id: string;
    status?: boolean;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    birthdate: string;
    gender?: number;
  };
};
export type UserSessionInfoParams = {
  token: string;
};
export type UserSliceParams = {
  userInfo: UserInfoParams;
  userSessionInfo: UserSessionInfoParams;
  remember_me?: boolean;
};

export type LangugeSliceParams = {
  id: string;

  code: string;
};
