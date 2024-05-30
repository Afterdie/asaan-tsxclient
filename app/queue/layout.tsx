'use client'
import React, { SetStateAction, createContext, useState } from 'react'
import { Socket } from 'socket.io-client'

interface SocketTypes {
   socket: Socket | null
   setSocket: React.Dispatch<SetStateAction<Socket | null>>
}

export const SocketContext = createContext<SocketTypes>({
   socket: null,
   setSocket: () => {},
})

export default function layout({ children }: { children: React.ReactNode }) {
   const [socket, setSocket] = useState<Socket | null>(null)
   return (
      <SocketContext.Provider value={{ socket, setSocket }}>
         {children}
      </SocketContext.Provider>
   )
}
