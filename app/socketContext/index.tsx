'use client'
import React, {
   createContext,
   useContext,
   useState,
   SetStateAction,
} from 'react'
import { Socket } from 'socket.io-client'

interface contextType {
   socket: Socket | null
   setSocket: React.Dispatch<SetStateAction<Socket | null>>
}

const SocketContext = createContext<contextType>({
   socket: null,
   setSocket: () => {},
})

export function SocketWrapper({ children }: { children: React.ReactNode }) {
   const [socket, setSocket] = useState<Socket | null>(null)

   return (
      <SocketContext.Provider value={{ socket, setSocket }}>
         {children}
      </SocketContext.Provider>
   )
}

export function useSocketContext() {
   return useContext(SocketContext)
}
