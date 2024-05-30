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

//type imports**
import { socketCallbackType } from '../../page'

const price = 100
const name = 'BobaLand'
const receiver = 'ak.s.hatoff@okaxis'
const url = `upi://pay?pa=${receiver}&pn=${name}%20Name&am=${price}&cu=INR`

export default function page() {
   const router = useRouter()
   const { waiterOrder } = useContext(WaiterOrderContext)
   const { socket } = useContext(SocketContext)

   const [QR, setQR] = useState<string>('')

   useEffect(() => {
      QRCode.toDataURL(url).then(setQR)
   }, [])

   const [name, setName] = useState<string>('')
   const handleNameField = (e: any) => {
      setName(e.target.value)
   }
   const handleOrderPaid = () => {
      const timeStamp = new Date()
      socket?.emit(
         'confirmedOrder',
         { waiterOrder, timeStamp },
         (res: socketCallbackType) => {
            if (res && res.status == 'received') {
               console.log('order sent succesfully')
               router.push('/queue/waiter/order')
            }
         }
      )
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
               <h1 className="text-2xl font-bold">₹{price}</h1>

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
