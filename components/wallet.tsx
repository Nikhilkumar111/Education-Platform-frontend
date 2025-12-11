"use client"

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Wallet as WalletIcon } from 'lucide-react'
import { Button } from './ui/button'
import { motion } from 'framer-motion'

interface WalletProps {
  walletBalance: number
  onOpenWallet: () => void
}

export const Wallet: React.FC<WalletProps> = ({ walletBalance, onOpenWallet }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 w-full max-w-md ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <WalletIcon className="w-5 h-5" />
            Wallet & Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-800 mb-4">
            Upload report cards, view student scores, and manage your wallet balance.
          </p>
          <Button
            onClick={onOpenWallet}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-800"
          >
            <WalletIcon className="w-4 h-4 mr-2" />
            Recharge Wallet (₹{walletBalance})
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
