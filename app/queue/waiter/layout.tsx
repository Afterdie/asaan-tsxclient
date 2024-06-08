'use client'
import React, { useEffect, ReactNode } from 'react'

import { useSocketContext } from '@/app/socketContext'

import { useRouter } from 'next/navigation'
import { WaiterOrderWrapper } from '@/app/waiterOrderContext'

type WaiterLayoutProps = {
   children: ReactNode
}

const WaiterLayout: React.FC<WaiterLayoutProps> = ({ children }) => {
   const { socket } = useSocketContext()
   const router = useRouter()

   useEffect(() => {
      if (!socket) {
         router.push('/queue')
      }
   }, [router, socket])

   return <WaiterOrderWrapper>{children}</WaiterOrderWrapper>
}

export default WaiterLayout
