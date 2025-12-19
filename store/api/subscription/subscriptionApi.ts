import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL }  from "@/store/constant.js"

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({

    // ✅ Get all subscriptions for a student (Student Profile)
    getStudentSubscriptions: builder.query<any, string>({
      query: (studentId) => `/subscriptions/student/${studentId}/active`,
      providesTags: ["Subscription"],
    }),


    

    // ✅ Get all subscriptions for a teacher (Teacher Profile)
    getTeacherSubscriptions: builder.query<any, string>({
      query: (teacherId) => `/subscriptions/teacher/${teacherId}`,
      providesTags: ["Subscription"],
    }),

    // ✅ Create a new subscription (student assigns teacher)
    createSubscription: builder.mutation<any, any>({
      query: (data) => ({
        url: "/subscriptions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // ✅ Update subscription (status/payment/etc)
    updateSubscription: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/subscriptions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // ✅ Get active subscription for a student (used in Teacher Profile / Assign logic)
    getActiveSubscription: builder.query<any, string>({
      query: (studentId) => `/subscriptions/active/${studentId}`,
      providesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetStudentSubscriptionsQuery,      // Student Profile: list of assigned teachers
  useGetTeacherSubscriptionsQuery,      // Teacher Profile: list of assigned students
  useCreateSubscriptionMutation,        // Assign teacher → deduct student wallet, add teacher earnings
  useUpdateSubscriptionMutation,        // Update subscription (expired, grace period, paid)
  useGetActiveSubscriptionQuery,        // Check if student has active subscription with a teacher
} = subscriptionApi;
