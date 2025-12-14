import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/wallet",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    
  }
),
tagTypes:["Wallet"],


  endpoints: (builder) => ({
    createOrder: builder.mutation<any, { amount: number }>({
      query: (body) => ({
        url: "/create-order",
        method: "POST",
        body,
      }),
    }),
    verifyPayment: builder.mutation<any, any>({
      query: (body) => ({
        url: "/verify",
        method: "POST",
        body,
      }),
     invalidatesTags: ["Wallet"],  
    }),
getWalletBalance:builder.query<{balance:number},void>({
  query:()=>"/balance",
}),

}),
});

export const 
{ useCreateOrderMutation,
   useVerifyPaymentMutation,
   useGetWalletBalanceQuery
  
 } = walletApi;
