'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SocketContext } from '../layout'

import { ItemType } from '../waiter/order/page'

export default function page() {
   const router = useRouter()
   const { socket } = useContext(SocketContext)
   const [orders, setOrders] = useState<ItemType[] | null>(null)

   //check if the user refereshed if so then send them back to choose role page
   useEffect(() => {
      if (!socket) router.push('/queue')
   }, [])

   socket?.on('newOrder', ({ id, order }) => {
      //do something with the timeStamp
      console.log(id)
      console.table(order)
   })
   orders?.map((item) => console.log(item))
   return <div>test</div>
}
