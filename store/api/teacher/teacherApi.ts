import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/teachers",
    credentials: "include", // ✅ required for cookies (auth)
  }),
  tagTypes: ["TeacherProfile", "TeacherTests"],
  endpoints: (builder) => ({

    /* ================= TEACHER PROFILE ================= */

    // GET teacher profile
    getTeacherProfile: builder.query<any, void>({
      query: () => "/me",
      providesTags: ["TeacherProfile"],
    }),

    // UPDATE teacher profile
    updateTeacherProfile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/update",
        method: "PUT",
        body: formData, // ✅ FormData supported
      }),
      invalidatesTags: ["TeacherProfile"],
    }),

    /* ================= TEST MANAGEMENT ================= */

    // CREATE test
    createTest: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/tests/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TeacherTests"],
    }),

    // GET all tests created by teacher
   // GET all tests for teacher
    showTests: builder.query<any, void>({
      query: () => "/tests/all", // GET request
    }),

  }),
});

/* ================= EXPORT HOOKS ================= */

export const {
  useGetTeacherProfileQuery,
  useUpdateTeacherProfileMutation,
  useCreateTestMutation,
  useShowTestsQuery,
} = teacherApi;
