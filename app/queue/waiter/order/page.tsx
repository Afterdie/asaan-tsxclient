'use client'
import React, { useState } from 'react'
import data from '../../../../../menu.json'

//component imports**
import ProductButton from '../../../comps/ProductButton'
import ProceedBar from '../../../comps/ProceedBar'

//type imports
import { ButtonType } from '../../../comps/ProductButton'

export interface ItemType {
   id: string
   count: number
   large: boolean
   boba: boolean
   price: number
}

//centralise this variable in the future to make it generalised for different business
const bobaCost = 20

export default function page() {
   const [order, setOrder] = useState<ItemType[]>([])

   const onButtonClickGeneric = (id: string, buttonType: ButtonType): void => {
      console.log(order)

      //all three button lead here therefore the logic
      setOrder((prevOrder) => {
         //get the index for the item in the order -1 if not found
         const existingItem = prevOrder.findIndex(
            (orderItem) => orderItem.id === id
         )

         //filter method returns all objects that hold true for the given condition
         if (buttonType === ButtonType.delete)
            return prevOrder.filter((item) => item.id !== id)

         //ref of the item from the catalogue
         const item = data.find((item) => item.name === id)

         //case: found in order
         if (existingItem !== -1) {
            //reference for the order in the current array
            const itemref = prevOrder.find((item) => item.id === id)

            //checking what changes are made for price
            var basePrice: number
            if (buttonType === ButtonType.large)
               basePrice = item?.price[Number(!itemref?.large)] || 0
            else basePrice = item?.price[Number(itemref?.large)] || 0

            const bobaPrice = buttonType === ButtonType.boba ? bobaCost : 0

            return prevOrder.map((orderItem, index) =>
               index === existingItem
                  ? {
                       ...orderItem,
                       count:
                          buttonType === ButtonType.count
                             ? orderItem.count + 1
                             : orderItem.count,
                       //toggles large
                       large:
                          buttonType === ButtonType.large
                             ? !orderItem.large
                             : orderItem.large,
                       //toggles boba
                       boba:
                          buttonType === ButtonType.boba
                             ? !orderItem.boba
                             : orderItem.boba,
                       //if neither buttons were pressed then no change in the price
                       price:
                          buttonType === ButtonType.boba ||
                          buttonType === ButtonType.large
                             ? basePrice + bobaPrice
                             : orderItem.price,
                    }
                  : orderItem
            )
         }
         //case: not found
         else {
            //this is critical code*************************************************
            const basePrice =
               item?.price[Number(buttonType === ButtonType.large)] || -999
            const bobaPrice = buttonType === ButtonType.boba ? bobaCost : 0

            //here all buttons except the delete button will enable themselves and/or increment count
            const newEntry = {
               id: id,
               count: 1,
               large: buttonType === ButtonType.large ? true : false,
               boba: buttonType === ButtonType.boba ? true : false,
               price: basePrice + bobaPrice,
            }
            return [...prevOrder, newEntry]
         }
      })
   }

   return (
      <div className="relative">
         <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {data.map((item, index) => {
               const orderItem = order.find(
                  (orderItem) => orderItem.id === item.name
               )
               return (
                  <ProductButton
                     productDetails={{
                        id: item.name,
                        large: item.large,
                     }}
                     orderDetails={{
                        count: orderItem?.count || 0,
                        large: orderItem?.large || false,
                        boba: orderItem?.boba || false,
                     }}
                     onButtonClickGeneric={onButtonClickGeneric}
                     key={index}
                  />
               )
            })}
         </div>
         <div
            className={`fixed bottom-0 transition-all duration-100 ease-in-out ${
               order.length > 0 ? '' : 'translate-y-[100px]'
            }`}
         >
            <ProceedBar orders={order} />
         </div>
      </div>
   )
}
