import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api',
    baseUrl: 'https://bicycle-sphere.vercel.app/api',
    credentials: 'include',
  }),
  tagTypes: ['Bicycle'],
  endpoints: () => ({}),
});
export default baseApi;
