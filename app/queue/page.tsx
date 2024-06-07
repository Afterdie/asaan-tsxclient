'use client'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { SocketContext } from './layout'

import io from 'socket.io-client'

//shadcn import
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'

enum roleTypes {
   'cook',
   'waiter',
}

export interface socketCallbackType {
   status: string
}
const roomname: string = 'boba'
export default function page() {
   const { toast } = useToast()

   const { setSocket } = useContext(SocketContext)

   const router = useRouter()
   const handleRoomJoin = (e: any) => {
      try {
         const socket = io(`${process.env.NEXT_PUBLIC_PROD_SERVER_URL}`)
         const role: roleTypes = e.target.id
         socket.emit(
            'joinRoom',
            { roomname, role },
            (res: socketCallbackType) => {
               if (res && res.status === 'success') {
                  //not sure if i should put it here or after the connection is made
                  setSocket(socket)
                  router.push(`/queue/${role}`)
               } else
                  toast({ title: 'joinRoom failed', variant: 'destructive' })
            }
         )
      } catch (err) {
         toast({ title: 'Failed to create room', variant: 'destructive' })
      }
   }

   return (
      <div>
         Choose a role:
         <Button id="waiter" onClick={handleRoomJoin}>
            waiter
         </Button>
         <Button id="cook" onClick={handleRoomJoin}>
            Cook
         </Button>
      </div>
   )
}
