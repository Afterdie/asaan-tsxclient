'use client'
import React, {
   SetStateAction,
   createContext,
   useState,
   useContext,
} from 'react'
import { ItemType } from '../queue/waiter/order/page'

interface contextType {
   waiterOrder: ItemType[]
   setWaiterOrder: React.Dispatch<SetStateAction<ItemType[]>>
}

const WaiterOrderContext = createContext<contextType>({
   waiterOrder: [],
   setWaiterOrder: () => {},
})

export function WaiterOrderWrapper({
   children,
}: {
   children: React.ReactNode
}) {
   const [waiterOrder, setWaiterOrder] = useState<ItemType[]>([])

   return (
      <WaiterOrderContext.Provider value={{ waiterOrder, setWaiterOrder }}>
         {children}
      </WaiterOrderContext.Provider>
   )
}

export function useWaiterOrderContext() {
   return useContext(WaiterOrderContext)
}
