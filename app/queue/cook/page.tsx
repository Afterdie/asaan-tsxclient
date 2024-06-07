'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SocketContext } from '../layout'

import { ItemType } from '../waiter/order/page'
import CookCard from '@/app/comps/CookCard'
import { socketCallbackType } from '../page'

//shadcn imports**
import { useToast } from '@/components/ui/use-toast'
export interface cookOrderType {
   id: string
   count: number
   large: boolean
   boba: boolean
}

export interface cookOrderDetailsType {
   uniqueId: string
   order: cookOrderType[]
}

export default function page() {
   const { toast } = useToast()

   const router = useRouter()
   const { socket } = useContext(SocketContext)
   const [orders, setOrders] = useState<cookOrderDetailsType[]>([])
   const [fetching, setFetching] = useState<boolean>(true)

   //check if the user refereshed if so then send them back to choose role page
   useEffect(() => {
      if (!socket) router.push('/queue')
      //fetch all ongoing order on first time join
   }, [orders])

   useEffect(() => {
      //gets the ongoing orders using the api
      try {
         const getOngoingOrders = async () => {
            console.log(
               process.env.NEXT_PUBLIC_DEV_SERVER_URL + '/api/ongoingorders'
            )
            const response = await fetch(
               process.env.NEXT_PUBLIC_DEV_SERVER_URL + '/api/ongoingorders'
            )
            const data = await response.json()
            setOrders(data.orders)
         }

         getOngoingOrders()
      } catch (err) {
         toast({ title: 'Something went wrong', variant: 'destructive' })
      }
      //api fetch for the lates orders at teh moment
      setFetching(false)
   }, [])

   socket?.on('message', (msg) => {
      toast({ title: msg, variant: 'valid' })
   })
   socket?.on('newOrder', (props) => {
      //do something with the timeStamp
      setOrders([props, ...orders])
   })

   const handleOrderCompleted = (uniqueId: string) => {
      socket?.emit(
         'completedOrder',
         { uniqueId },
         (res: socketCallbackType) => {
            if (res && res.status === 'completed') {
               //if the emit is successfull the item is removed from screen for cook
               setOrders(orders.filter((item) => item.uniqueId != uniqueId))
            }
         }
      )
   }
   return (
      <div className="flex flex-col-reverse gap-2 p-2 ">
         {fetching && <pre>Getting the ongoing order one sec</pre>}
         {orders &&
            orders.map((order, index) => (
               <div key={index}>
                  <CookCard
                     order={order}
                     orderCompleted={handleOrderCompleted}
                  />
               </div>
            ))}
      </div>
   )
}
