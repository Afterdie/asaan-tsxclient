import React from 'react'
import { useRouter } from 'next/navigation'

//shadcn imports**
import { Button } from '@/components/ui/button'
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from '@/components/ui/drawer'

//type import**
import { ItemType } from '../queue/waiter/order/page'

interface ProceedBarProps {
   orders: ItemType[]
}

import { useWaiterOrderContext } from '../waiterOrderContext'

const bobaPrice = 20
export default function ProceedBar(props: ProceedBarProps) {
   const router = useRouter()
   const { setWaiterOrder } = useWaiterOrderContext()

   const calcPrice = (item: ItemType) => {
      let basePrice = item.price
      if (item.boba) basePrice += bobaPrice
      return basePrice * item.count
   }

   const handlePlaceOrder = () => {
      setWaiterOrder(props.orders)
      router.push('/queue/waiter/bill')
   }
   return (
      <div className="flex w-screen flex-row justify-between gap-4 bg-secondary p-4">
         <Button
            className=" grow bg-green-500 text-white"
            onClick={handlePlaceOrder}
         >
            Done
         </Button>
         <Drawer>
            <DrawerTrigger className="grow">View Order</DrawerTrigger>
            <DrawerContent>
               <DrawerHeader>
                  <DrawerTitle>Items in this order</DrawerTitle>
               </DrawerHeader>
               <div className="flex flex-col">
                  {props.orders.map((item, index) => {
                     return (
                        <div key={index} className="grid grid-cols-4 p-2">
                           <div>
                              {item.count} X {item.id}
                           </div>
                           <div>SIZE:{item.large ? 'L' : 'M'}</div>
                           <div>{item.boba ? 'BOBA' : 'NB'}</div>

                           {/* the price function will be called here */}
                           <div>{calcPrice(item)}</div>
                        </div>
                     )
                  })}
               </div>
               <DrawerFooter>
                  <Button
                     className="grow bg-green-500"
                     onClick={handlePlaceOrder}
                  >
                     Place Order
                  </Button>
                  <DrawerClose asChild>
                     <Button variant="outline">Close</Button>
                  </DrawerClose>
               </DrawerFooter>
            </DrawerContent>
         </Drawer>
      </div>
   )
}
