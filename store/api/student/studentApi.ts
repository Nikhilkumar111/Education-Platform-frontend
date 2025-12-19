import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL }  from "@/store/constant.js"

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // ✅ Required for cookies
  }),
  tagTypes: ["StudentProfile"],
  endpoints: (builder) => ({
    // GET student profile
    getStudentProfile: builder.query<any, void>({
      query: () => "/students/me",
      providesTags: ["StudentProfile"],
    }),

    // UPDATE student profile
    updateStudentProfile: builder.mutation<any, Partial<any>>({
      query: (formData) => ({
        url: "/students/update",
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
