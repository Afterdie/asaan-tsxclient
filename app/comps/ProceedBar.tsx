"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";

//shadcn imports**
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

//type import**
import { ItemType } from "../queue/waiter/order/page";

interface ProceedBarProps {
  orders: ItemType[];
}

import { WaiterOrderContext } from "../queue/waiter/layout";

export default function ProceedBar(props: ProceedBarProps) {
  const router = useRouter();
  const { setWaiterOrder } = useContext(WaiterOrderContext);

  const calcPrice = (item: ItemType) => {
    var finalCost = item.price * item.count;
    if (item.boba) finalCost += 20;
    return finalCost;
  };

  const handlePlaceOrder = () => {
    setWaiterOrder(props.orders);
    router.push("/queue/waiter/bill");
  };
  return (
    <div className="justify-between flex flex-row gap-4 bg-secondary p-4 w-screen">
      <Button
        className=" bg-green-500 text-white grow"
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
                  <div>SIZE:{item.large ? "L" : "M"}</div>
                  <div>{item.boba ? "BOBA" : "NA"}</div>

                  {/* the price function will be called here */}
                  <div>2</div>
                </div>
              );
            })}
          </div>
          <DrawerFooter>
            <Button className="bg-green-500 grow" onClick={handlePlaceOrder}>
              Place Order
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
