'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { WaiterOrderContext } from '../layout'
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

const price = 100
const name = 'BobaLand'
const receiver = 'ak.s.hatoff@okaxis'
const url = `upi://pay?pa=${receiver}&pn=${name}%20Name&am=${price}&cu=INR`

export default function page() {
   const router = useRouter()
   const { waiterOrder } = useContext(WaiterOrderContext)
   const [QR, setQR] = useState<string>('')

   useEffect(() => {
      QRCode.toDataURL(url).then(setQR)
   })

   const [name, setName] = useState<string>('')
   const handleNameField = (e: any) => {
      setName(e.target.value)
   }
   const handleOrderPaid = () => {
      router.push('/queue/waiter/order')
   }
   console.log(waiterOrder)
   return (
      <div className="bg-secondary h-screen p-4">
         <Card className="h-full">
            <CardHeader className="flex flex-row justify-between">
               <CardTitle className="flex-1">320</CardTitle>
               <Link href="/queue/waiter/order">Back</Link>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-between gap-4">
               <div>
                  <img src={QR} alt="" className="w-[70vw]" />
               </div>
               <Input
                  placeholder="Enter Name"
                  onChange={handleNameField}
                  value={name}
                  className="w-[70vw]"
               />
               <h1>or</h1>
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
