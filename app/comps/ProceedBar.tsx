import React from "react";

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
import { Item } from "../menu/page";

interface ProceedBarProps {
  orders: Item[];
}

export default function ProceedBar(props: ProceedBarProps) {
  return (
    <div className="justify-between flex flex-row gap-4 bg-secondary p-4 w-screen">
      <Button className="grow bg-green-500 text-white">Done</Button>
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
                  <div>{item.count}</div>
                </div>
              );
            })}
          </div>
          <DrawerFooter>
            <Button className="bg-green-500">Place Order</Button>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
