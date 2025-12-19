"use client"


// You need the logged-in student’s profile because we’ll use it to:

// Check wallet balance.

// Get current subscriptions.

// Assign teacher.


// import { useSelector } from "react-redux";
// import { RootState } from "@/store";

// const student = useSelector((state: RootState) => state.student.profile);


// *************************************************


// Step 2: Get active subscriptions

// This will tell us if the student:

// Already has max 3 teachers.

// Already assigned this teacher.

// import { useGetActiveSubscriptionQuery } from "@/store/api/subscription/subscriptionApi";

// const { data: activeSubscriptions, isLoading: isChecking } = useGetActiveSubscriptionQuery(student?._id || "");


// activeSubscriptions = array of all active subscriptions for this student.

// You can filter by teacher._id or subject if needed.


// *************************************************************

// Step 3: Setup mutation to assign teacher

// Use useCreateSubscriptionMutation from your subscription API.

// import { useCreateSubscriptionMutation } from "@/store/api/subscription/subscriptionApi";

// const [createSubscription, { isLoading: isAssigning }] = useCreateSubscriptionMutation();


// ****************************************************************

