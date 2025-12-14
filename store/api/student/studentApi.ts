import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/students",
    credentials: "include", // ✅ Required for cookies
  }),
  tagTypes: ["StudentProfile"],
  endpoints: (builder) => ({
    // GET student profile
    getStudentProfile: builder.query<any, void>({
      query: () => "/me",
      providesTags: ["StudentProfile"],
    }),

    // UPDATE student profile
    updateStudentProfile: builder.mutation<any, Partial<any>>({
      query: (formData) => ({
        url: "/update",
        method: "PUT",
       body: formData, // 👈 FormData
      }),
      invalidatesTags: ["StudentProfile"],
    }),
  }),
});

export const {
  useGetStudentProfileQuery,
  useUpdateStudentProfileMutation,
} = studentApi;
