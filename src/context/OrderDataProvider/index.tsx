import { PropsWithChildren, createContext } from "react";
import useOrder from "@root/api/useOrder";
import { ContextValue, Props } from "./types";
import { useNavigate } from "react-router-dom";

export const OrderDataContext = createContext<ContextValue>({});

export default function OrderDataProvider(props: PropsWithChildren<Props>) {
  const { orderNumber, zipCode } = props;
  const navigate = useNavigate();
  const { data, isError, isLoading } = useOrder({
    orderNumber,
    zipCode
  })
  const ctxValue: ContextValue = {
    data,
    isLoading
  }
  if (isError) {
    navigate('/error')
  }
  return (
    <OrderDataContext.Provider value={ctxValue}>
      {props.children}
    </OrderDataContext.Provider>
  )
}
