'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SocketContext } from '../layout'

import { ItemType } from '../waiter/order/page'
import CookCard from '@/app/comps/CookCard'

export interface cookOrderType {
   id: string
   count: number
   large: boolean
   boba: boolean
}

export interface cookOrderDetailsType {
   id: string
   order: cookOrderType[]
}

export default function page() {
   const router = useRouter()
   const { socket } = useContext(SocketContext)
   const [orders, setOrders] = useState<cookOrderDetailsType[]>([])

   //check if the user refereshed if so then send them back to choose role page
   useEffect(() => {
      console.log(orders)
      if (!socket) router.push('/queue')
   }, [orders])

   socket?.on('newOrder', (props) => {
      //do something with the timeStamp
      setOrders([props, ...orders])
   })

   const handleOrderCompleted = (id: string) => {
      //emit a socket signal here
      setOrders(orders.filter((item) => item.id != id))
   }
   return (
      <div className="flex flex-col-reverse gap-2 p-2 ">
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
