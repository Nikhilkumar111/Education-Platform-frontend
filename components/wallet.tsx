"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wallet as WalletIcon } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { setWalletBalance } from "@/store/feature/wallet/walletSlice";
import { useGetWalletBalanceQuery } from "@/store/api/wallet/walletApi";
import { useRazorpayWallet } from "@/store/hooks/useRazorpayWallet";

export const Wallet = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  // Redux wallet
  const walletBalance = useSelector((state: RootState) => state.wallet.balance);

  // Fetch balance from backend
  const { data, isLoading } = useGetWalletBalanceQuery(undefined, { skip: !token });

  useEffect(() => {
    if (data?.balance !== undefined) {
      dispatch(setWalletBalance(data.balance));
    }
  }, [data, dispatch]);

  const { rechargeWallet } = useRazorpayWallet(userId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex justify-center"
    >
      <Card className="w-full max-w-md border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <WalletIcon className="w-5 h-5" />
            Wallet & Payments
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-yellow-800 mb-2">Available Balance</p>
          <p className="text-2xl font-bold text-yellow-900 mb-4">
            ₹{isLoading ? "..." : walletBalance}
          </p>

          <Button
            onClick={() => rechargeWallet(500)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-800"
          >
            <WalletIcon className="w-4 h-4 mr-2" />
            Recharge ₹500
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
