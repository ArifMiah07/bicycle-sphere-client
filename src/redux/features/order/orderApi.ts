import baseApi from '@/redux/api/baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: `/orders`,
        method: 'GET',
      }),
    }),
    getOrdersByEmail: builder.query({
      query: ({ email }: { email: string }) => `/orders?email=${email}`,
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: '/orders/verify',
        params: { order_id },
        method: 'GET',
      }),
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetAllOrderQuery,
  useGetOrdersByEmailQuery,
  useVerifyOrderQuery,
} = orderApi;
export default orderApi;
