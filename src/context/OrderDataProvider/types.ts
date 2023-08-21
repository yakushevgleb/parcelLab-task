import { OrderResponse } from "../../api/useOrder/types";

export interface Props {
  zipCode: string;
  orderNumber: string;
}

export interface ContextValue {
  data?: OrderResponse;
  isLoading?: boolean;
}
