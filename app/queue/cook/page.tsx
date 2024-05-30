'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SocketContext } from '../layout'

export default function page() {
   const router = useRouter()
   const { socket } = useContext(SocketContext)

   //check if the user refereshed if so then send them back to choose role page
   useEffect(() => {
      if (!socket) router.push('/queue')
   }, [])
   socket?.on('newOrder', ({ waiterOrder, timeStamp }) => {
      console.log(waiterOrder, timeStamp)
   })
   return <div>test</div>
}
