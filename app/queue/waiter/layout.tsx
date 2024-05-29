'use client'
import React, { SetStateAction, createContext, useState } from 'react'

import { ItemType } from './order/page'

interface WaiterOrderType {
   waiterOrder: ItemType[]
   setWaiterOrder: React.Dispatch<SetStateAction<ItemType[]>>
}

export const WaiterOrderContext = createContext<WaiterOrderType>({
   waiterOrder: [],
   setWaiterOrder: () => {},
})

export default function layout({ children }: { children: React.ReactNode }) {
   const [waiterOrder, setWaiterOrder] = useState<ItemType[]>([])
   return (
      <WaiterOrderContext.Provider value={{ waiterOrder, setWaiterOrder }}>
         {children}
      </WaiterOrderContext.Provider>
   )
}
