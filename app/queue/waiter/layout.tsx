'use client'
import React, {
   SetStateAction,
   createContext,
   useState,
   useContext,
   useEffect,
} from 'react'
import { ItemType } from './order/page'

import { SocketContext } from '../layout'
import { useRouter } from 'next/navigation'

interface WaiterOrderType {
   waiterOrder: ItemType[]
   setWaiterOrder: React.Dispatch<SetStateAction<ItemType[]>>
}

export const WaiterOrderContext = createContext<WaiterOrderType>({
   waiterOrder: [],
   setWaiterOrder: () => {},
})

export default function layout({ children }: { children: React.ReactNode }) {
   const { socket } = useContext(SocketContext)
   const router = useRouter()
   useEffect(() => {
      console.log(waiterOrder)
      if (!socket) {
         router.push('/queue')
      }
   }, [])
   const [waiterOrder, setWaiterOrder] = useState<ItemType[]>([])
   return (
      <WaiterOrderContext.Provider value={{ waiterOrder, setWaiterOrder }}>
         {children}
      </WaiterOrderContext.Provider>
   )
}
