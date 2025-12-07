"use client"

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { MessageSquare } from 'lucide-react'
import { Button } from './ui/button'
import { motion } from 'framer-motion'

interface CommunicationProps {
  onOpenMessages: () => void
}

export const Communication: React.FC<CommunicationProps> = ({ onOpenMessages }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <MessageSquare className="w-5 h-5" />
            Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-800 mb-4">
            Message your teachers directly and get replies through the system.
          </p>
          <Button 
            onClick={onOpenMessages}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Open Messages
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
