"use client";

import { useDispatch } from "react-redux";
import { addWalletBalance } from "@/store/feature/wallet/walletSlice";
import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "@/store/api/wallet/walletApi";

import { useRazorpayScript } from "./useRazorpayScript";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpayWallet = (userId: string) => {
  useRazorpayScript();
  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const rechargeWallet = async (amount: number) => {
    try {
      if (!amount) return;

      // 1️⃣ Create order
      const response = await createOrder({ amount }).unwrap(); // ✅ use unwrap
      const order = response.order;

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      // 2️⃣ Open Razorpay
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: async (razorpayResponse: any) => {
          // 3️⃣ Verify payment
          try {
            const verifyResult = await verifyPayment({
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
          //     userId,
              amount,
            }).unwrap();

            if (verifyResult.success) {
              dispatch(addWalletBalance(amount));
              alert("Wallet recharged successfully!");
            } else {
              alert("Payment verification failed");
            }
          } catch (verifyErr) {
            console.error("Verify failed:", verifyErr);
            alert("Payment verification failed");
          }
        },
        theme: { color: "#FACC15" },
      });

      rzp.open();
    } catch (err) {
      console.error("Recharge failed:", err);
      alert("Recharge failed. Check console for details.");
    }
  };

  return { rechargeWallet };
};
