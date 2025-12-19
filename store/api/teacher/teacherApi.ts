import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/store/constant";


export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // ✅ base API root
    credentials: "include",
  }),
  tagTypes: ["TeacherProfile", "TeacherTests", "Teachers"],
  endpoints: (builder) => ({

    /* ================= TEACHER PROFILE ================= */

    // GET logged-in teacher profile
    getTeacherProfile: builder.query<any, void>({
      query: () => "/teachers/me",
      providesTags: ["TeacherProfile"],
    }),

    // UPDATE teacher profile
    updateTeacherProfile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/teachers/update",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["TeacherProfile", "Teachers"],
    }),

    /* ================= ALL TEACHERS ================= */

    // GET all teachers (for listing)
    getAllTeachers: builder.query<any, void>({
      query: () => "/teachers",
      providesTags: ["Teachers"],
    }),

  //get teacher by id -->> It means its profile 
  
getTeacherById: builder.query<any, string>({
  query: (id) => `/teachers/${id}`,
    providesTags: ["Teachers"],
}),




    /* ================= TEST MANAGEMENT ================= */

    // CREATE test
    createTest: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/teachers/tests/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TeacherTests"],
    }),


    // GET all tests created by teacher
    showTests: builder.query<any, void>({
      query: () => "/teachers/tests/all",
      providesTags: ["TeacherTests"],
    }),

  }),
});

/* ================= EXPORT HOOKS ================= */

export const {
  useGetTeacherProfileQuery,
  useUpdateTeacherProfileMutation,
  useGetAllTeachersQuery,
  useGetTeacherByIdQuery,
  useCreateTestMutation,
  useShowTestsQuery,

} = teacherApi;
