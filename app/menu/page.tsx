"use client";
import React, { useState } from "react";
import data from "../../../menu.json";

//component imports**
import ProductButton from "../comps/ProductButton";
import ProceedBar from "../comps/ProceedBar";

//type imports
import { ButtonType } from "../comps/ProductButton";

export interface Item {
  id: string;
  count: number;
  large: boolean;
  boba: boolean;
}

interface Order {
  item: Item[];
}

export default function page() {
  const [order, setOrder] = useState<Item[]>([]);

  const onButtonClickGeneric = (id: string, buttonType: ButtonType): void => {
    console.log(order);
    //all three button lead here therefore the logic
    setOrder((prevOrder) => {
      const existingItem = prevOrder.findIndex(
        (orderItem) => orderItem.id === id
      );

      if (buttonType === ButtonType.delete)
        return prevOrder.filter((item) => item.id !== id);

      if (existingItem !== -1) {
        return prevOrder.map((orderItem, index) =>
          index === existingItem
            ? {
                ...orderItem,
                count:
                  buttonType === ButtonType.count
                    ? orderItem.count + 1
                    : orderItem.count,
                large:
                  buttonType === ButtonType.large
                    ? !orderItem.large
                    : orderItem.large,
                boba:
                  buttonType === ButtonType.boba
                    ? !orderItem.boba
                    : orderItem.boba,
              }
            : orderItem
        );
      } else {
        const newEntry = {
          id: id,
          count: 1,
          large: buttonType === ButtonType.large ? true : false,
          boba: buttonType === ButtonType.boba ? true : false,
        };
        return [...prevOrder, newEntry];
      }
    });
  };

  return (
    <div className="relative">
      <div className="grid md:grid-cols-6 grid-cols-2 gap-4">
        {data.map((item, index) => {
          const orderItem = order.find(
            (orderItem) => orderItem.id === item.name
          );
          return (
            <ProductButton
              productDetails={{ id: item.name, large: item.large }}
              orderDetails={{
                count: orderItem?.count || 0,
                large: orderItem?.large || false,
                boba: orderItem?.boba || false,
              }}
              onButtonClickGeneric={onButtonClickGeneric}
              key={index}
            ></ProductButton>
          );
        })}
      </div>
      <div className="fixed bottom-0">
        {order.length > 0 && <ProceedBar orders={order} />}
      </div>
    </div>
  );
}
