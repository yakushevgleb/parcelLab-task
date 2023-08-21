import { UseQueryResult, useQuery } from "react-query";
import { OrderResponse, FetchOrderParams, Props } from "./types";
import { ErrorMessages, api } from "../utils";

const fetchOrder = (params: FetchOrderParams) => 
  (): Promise<OrderResponse> => fetch(`${api}/orders/${params.orderNumber}?zipCode=${params.zipCode}`)
    .then(res => {
      if (res.status === 404) {
        throw new Error(ErrorMessages.NOT_FOUND);
      }
      if (!res.ok) {
        throw new Error(ErrorMessages.DEFAULT)
      }
      return res.json() as Promise<OrderResponse>
    })

export default function useOrder(props: Props): Partial<UseQueryResult<OrderResponse>> {
  const { orderNumber, zipCode, enabled, retry } = props;
  if (orderNumber == null || zipCode == null) {
    return {};
  }
  const result = useQuery<OrderResponse>({
    queryKey: [`/orders/${orderNumber}?zipCode=${zipCode}`],
    queryFn: fetchOrder({ orderNumber, zipCode }),
    enabled,
    retry
  })

  return {
    ...result
  }
}
