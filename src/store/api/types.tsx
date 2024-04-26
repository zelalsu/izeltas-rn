export type LoginApiResponseParams = {
  status: boolean;
  data: {
    user: {
      id: string;
      status: boolean;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      birthdate: string;
      gender: number;
    };
    token: string;
  };
  message: string;
};

export type LoginApiParams = {
  email: string;
  password: string;
  remember_me?: boolean;
};

export type NewsApiParamsRequest = {
  status?: boolean;
  data?: [
    {
      id: string;
      status: number;
      release_date: string;
      translation: {
        id: string;
        news_id: string;
        language_id: string;
        title: string;
        description: null;
        content: string;
        slug: string;
      };
    }
  ];
  message?: boolean;
};
export type NewsApiParams = {
  id?: string;
  status?: number;
  release_date?: string;
  translation?: {
    id: string;
    news_id: string;
    language_id: string;
    title: string;
    description: null;
    content: string;
    slug: string;
  };
};

export type NewsApiGetParamsRequest = {
  status?: boolean;
  data?: {
    item?: [
      {
        id: string;
        status: number;
        release_date: string;
        translation: {
          id: string;
          language_id: string;
          title: string;
          description: string;
          content: string;
          slug: string;
        };
      }
    ];
    meta?: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
  message?: string;
};
export type NewsApiGetParams = {
  id?: string;
  status?: number;
  release_date?: string;
  translation?: {
    id: string;
    language_id: string;
    title: string;
    description: string;
    content: string;
    slug: string;
  };
};

export type CityApiParamsRequest = {
  status?: boolean;
  data?: [
    {
      id: string;
      name: string;
    }
  ];
  message?: string;
};
export type CityApiParams = {
  id: string;
  name: string;
};

export type ProductTypeApiResponseParams = {
  status?: boolean;
  data: {
    item: [
      {
        id: string;
        status: number;
        order: number;
        product_series_count: number;
        translation: {
          id: string;
          product_type_id: string;
          language_id: string;
          title: string;
        };
      }
    ];
    meta?: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
  message?: string;
};

export type ProductTypeApiParams = {
  id: string;
  status?: number;
  order?: number;
  product_series_count: number;
  translation: {
    id: string;
    language_id: string;
    title: string;
  };
};
export type ProductSeriesApiResponseParams = {
  status: boolean;
  data: {
    item: [
      {
        id: string;
        status: number;
        order: number;
        product_type_id: string;
        translation: {
          id: string;
          product_series_id: string;
          language_id: string;
          title: string;
        };
      }
    ];
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
  message: string;
};

export type ProductSeriesApiParams = {
  id: string;
  status: number;
  order: number;
  product_type_id: string;
  translation: {
    id: string;
    product_series_id: string;
    language_id: string;
    title: string;
  };
};

export type SellerApiResponseParams = {
  status?: boolean;
  data: {
    item: [
      {
        id: string;
        status: boolean;
        is_online: boolean;
        title: string;
        address: string;
        country_id: null;
        city_id: string;
        phone_number: string;
        website: string;
        email: string;
        first_name: string;
        last_name: string;
        opening_time: string;
        closing_time: string;
        lat: string;
        long: string;
      }
    ];
    meta?: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
  message?: string;
};
export type SellerApiParams = {
  id: string;
  status: boolean;
  is_online: boolean;
  title: string;
  address: string;
  country_id: null;
  city_id: string;
  phone_number: string;
  website: string;
  email: string;
  first_name: string;
  last_name: string;
  opening_time: string;
  closing_time: string;
  lat: string;
  long: string;
};
export type SellerGetAllParams = {
  data: [
    {
      id: string;
      status: boolean;
      is_online: boolean;
      title: string;
      address: string;
      country_id: null;
      city_id: string;
      phone_number: string;
      website: string;
      email: string;
      first_name: string;
      last_name: string;
      opening_time: string;
      closing_time: string;
      lat: string;
      long: string;
    }
  ];
};

export type ContactFormsParams = {
  contact_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  comment: string;
};
export type RegisterApiParams = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type RegisterResponseApiParams = {
  message: string;
  errors: {
    email: string[];
    password: string[];
  };
};

export type ChangePasswordResponseParams = {
  id: string;
  password: string;
  new_password: string;
  new_password_confirmation: string;
};
