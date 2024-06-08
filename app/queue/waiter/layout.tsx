'use client'
import React, { useEffect, ReactNode } from 'react'

import { useSocketContext } from '@/app/socketContext'

import { useRouter } from 'next/navigation'
import { WaiterOrderWrapper } from '@/app/waiterOrderContext'
import { useToast } from '@/components/ui/use-toast'

type WaiterLayoutProps = {
   children: ReactNode
}

const WaiterLayout: React.FC<WaiterLayoutProps> = ({ children }) => {
   const { toast } = useToast()
   const { socket } = useSocketContext()
   const router = useRouter()

   useEffect(() => {
      if (!socket) {
         router.push('/queue')
      }
   }, [router, socket])

   socket?.on('notifyOrderComplete', (msg: string) => {
      toast({ title: msg, variant: 'valid' })
   })

   return <WaiterOrderWrapper>{children}</WaiterOrderWrapper>
}

export default WaiterLayout
