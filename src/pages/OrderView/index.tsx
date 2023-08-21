import { Box } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createContext } from "react";
import OrderDataProvider from "../../context/OrderDataProvider";
import OrderView from "./OrderView";

export const OrderViewContext = createContext({});

export function Component() {
  const navigate = useNavigate();
  const { orderNumber } = useParams();
  const [searchParams] = useSearchParams();
  const zipCode = searchParams.get('zipCode') || undefined;

  if (!orderNumber || !zipCode) {
    navigate('/error')
    return null;
  }
  return (
    <OrderDataProvider orderNumber={orderNumber} zipCode={zipCode}>
      <Box display='flex' gap={3} alignItems='center' justifyContent='center' height='100%'>
        <OrderView />
      </Box>
    </OrderDataProvider>
  )
};

Component.displayName = 'OrderView';
