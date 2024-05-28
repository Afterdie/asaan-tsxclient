import React from "react";

//shadcn imports**
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductDetails {
  id: string;
  large: boolean;
}
interface OrderDetails {
  count: number;
  large: boolean;
  boba: boolean;
}
export enum ButtonType {
  count,
  boba,
  large,
  delete,
}
interface Props {
  productDetails: ProductDetails;
  orderDetails: OrderDetails;
  onButtonClickGeneric: (id: string, buttonType: ButtonType) => void;
}

export default function ProductButton(props: Props) {
  return (
    <div className="flex flex-col gap-2 justify-between">
      <Card
        onClick={() =>
          props.onButtonClickGeneric(props.productDetails.id, ButtonType.count)
        }
        className={`grow ${
          props.orderDetails.count > 0 ? "bg-green-500 text-white" : ""
        }`}
      >
        <CardHeader>
          <CardTitle>{props.productDetails.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card</p>
        </CardContent>
      </Card>
      <div className="flex flex-row justify-between gap-2">
        {props.productDetails.large && (
          <Button
            className="grow"
            variant={props.orderDetails.large ? "default" : "secondary"}
            onClick={() =>
              props.onButtonClickGeneric(
                props.productDetails.id,
                ButtonType.large
              )
            }
          >
            L
          </Button>
        )}
        <Button
          variant={"outline"}
          onClick={() => {
            if (props.orderDetails.count == 0) return;
            props.onButtonClickGeneric(
              props.productDetails.id,
              ButtonType.delete
            );
          }}
          className={`${
            props.orderDetails.count == 0 ? "" : "bg-red-500 text-white"
          }`}
        >
          {props.orderDetails.count}
        </Button>
        <Button
          className="grow"
          variant={props.orderDetails.boba ? "default" : "secondary"}
          onClick={() =>
            props.onButtonClickGeneric(props.productDetails.id, ButtonType.boba)
          }
        >
          B
        </Button>
      </div>
    </div>
  );
}
