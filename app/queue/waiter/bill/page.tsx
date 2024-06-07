'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { WaiterOrderContext } from '../layout'
import { SocketContext } from '../../layout'

import QRCode from 'qrcode'

//shadcn imports**
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

//type imports**
import { socketCallbackType } from '../../page'
import { ItemType } from '../order/page'

const receiver = 'ak.s.hatoff@okaxis'

export default function page() {
   const { toast } = useToast()
   const router = useRouter()
   const { waiterOrder } = useContext(WaiterOrderContext)

   //deguging
   console.log(waiterOrder)

   const { socket } = useContext(SocketContext)

   const [QR, setQR] = useState<string>('')

   useEffect(() => {
      const price = calcCost(waiterOrder)
      const url = `upi://pay?pa=${receiver}&am=${price}`
      QRCode.toDataURL(url).then(setQR)
   }, [])

   //used to properly format the data for sending
   const genOrderStructure = () => {
      return {
         uniqueId: name,
         time: new Date(),
         order: waiterOrder.map((item) => {
            return {
               id: item.id,
               count: item.count,
               large: item.large,
               boba: item.boba,
            }
         }),
         cost: calcCost(waiterOrder),
      }
   }

   //calculate the cost of the order
   const calcCost = (waiterOrder: ItemType[]) => {
      let total = waiterOrder.reduce((acc, currentItem) => {
         return acc + currentItem.price * currentItem.count
      }, 0)
      return total
   }

   const [name, setName] = useState<string>('')
   const handleNameField = (e: any) => {
      setName(e.target.value)
   }

   const handleOrderPaid = () => {
      const orderDetails = genOrderStructure()
      console.log(orderDetails)
      socket?.emit(
         'confirmedOrder',
         orderDetails,
         (res: socketCallbackType) => {
            if (res && res.status == 'received') {
               console.log('order sent succesfully')
               toast({
                  title: `${orderDetails.uniqueId}'s order has been received`,
                  variant: 'valid',
               })
            }
         }
      )
      router.push('/queue/waiter/order')
   }
   return (
      <div className="p-4">
         <Card>
            <CardHeader>
               <span className="text-end">
                  <Link href="/queue/waiter/order">Cancel</Link>
               </span>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-between gap-4">
               <h1 className="text-2xl font-bold">₹{calcCost(waiterOrder)}</h1>

               <div>
                  <img src={QR} alt="" className="w-[70vw]" />
               </div>
               <Input
                  placeholder="Enter Name"
                  onChange={handleNameField}
                  value={name}
                  className="w-[70vw]"
               />
               <div className="flex w-full items-center gap-4">
                  <Button className="grow" onClick={handleOrderPaid}>
                     Cash
                  </Button>
                  <Button
                     className="grow bg-green-500"
                     onClick={handleOrderPaid}
                  >
                     Done
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
