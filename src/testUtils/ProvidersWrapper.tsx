import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

interface Props {
  initialEntries?: string[];
  initialIndex?: number;
}
export default function ProvidersWrapper(props: PropsWithChildren<Props>) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialIndex={props.initialIndex} initialEntries={props.initialEntries}>
        {props.children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}
