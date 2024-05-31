import React from 'react'

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

import { cookOrderType } from '../queue/cook/page'
import { cookOrderDetailsType } from '../queue/cook/page'

interface cookCardPropsType {
   order: cookOrderDetailsType
   orderCompleted: (id: string) => void
}

//ur getting the name and an array of orders

export default function CookCard(props: cookCardPropsType) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>
               <div className="flex flex-row items-center justify-between">
                  <h1>{props.order.id}</h1>
                  <Button onClick={() => props.orderCompleted(props.order.id)}>
                     Done
                  </Button>
               </div>
            </CardTitle>
         </CardHeader>
         <CardContent>
            {props.order.order.map((item, index) => {
               return (
                  <div key={index} className="grid grid-cols-5">
                     <div>{item.count} X </div>
                     <div className="col-span-2 text-left">{item.id}</div>
                     <div>{item.large ? 'L' : 'M'}</div>
                     <div>{item.boba ? 'Boba' : 'NB'}</div>
                  </div>
               )
            })}
         </CardContent>
      </Card>
   )
}
