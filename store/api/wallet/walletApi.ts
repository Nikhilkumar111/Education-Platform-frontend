
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/store/constant";


export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
        url: "/wallet/create-order",
        method: "POST",
        body,
      }),
    }),
    verifyPayment: builder.mutation<any, any>({
      query: (body) => ({
        url: "/wallet/verify",
        method: "POST",
        body,
      }),
     invalidatesTags: ["Wallet"],  
    }),
getWalletBalance:builder.query<{balance:number},void>({
  query:()=>"/wallet/balance",
}),

}),
});

export const 
{ useCreateOrderMutation,
   useVerifyPaymentMutation,
   useGetWalletBalanceQuery
  
 } = walletApi;
