"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { WaiterOrderContext } from "../layout";

export default function page() {
  const { waiterOrder } = useContext(WaiterOrderContext);
  console.log(waiterOrder);
  return (
    <div>
      <Link href="/queue/waiter/order">Back</Link>
    </div>
  );
}
