// Middleware

import { ContactFormsParams } from "./types";
import apiMiddleware from "./apiMiddleware";

export const contactFormApi = apiMiddleware.injectEndpoints({
  endpoints: (builder) => ({
    contactForm: builder.mutation<void, ContactFormsParams>({
      query: (data) => ({
        url: "contactForms",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useContactFormMutation } = contactFormApi;
