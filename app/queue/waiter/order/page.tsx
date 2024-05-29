"use client";
import React, { useState, useContext } from "react";
import data from "../../../../../menu.json";

//component imports**
import ProductButton from "../../../comps/ProductButton";
import ProceedBar from "../../../comps/ProceedBar";

//type imports
import { ButtonType } from "../../../comps/ProductButton";

export interface ItemType {
  id: string;
  count: number;
  large: boolean;
  boba: boolean;
  price: number;
}

interface Order {
  item: ItemType[];
}

export default function page() {
  const [order, setOrder] = useState<ItemType[]>([]);

  const onButtonClickGeneric = (id: string, buttonType: ButtonType): void => {
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
          price: data.find((item) => item.name === id)?.price || -999,
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
            />
          );
        })}
      </div>
      <div
        className={`fixed bottom-0 transition-all ease-in-out duration-100 ${
          order.length > 0 ? "" : "translate-y-[100px]"
        }`}
      >
        <ProceedBar orders={order} />
      </div>
    </div>
  );
}
