import OrderDataProvider from "@root/context/OrderDataProvider"
import ProvidersWrapper from "@root/testUtils/ProvidersWrapper"
import { render, screen } from "@testing-library/react"
import orderDataJson from '@root/mocks/orders/jsonData/orders.json'
import StatusTile from "./StatusTile"
import { format, parse } from "date-fns"

describe('<StatusTile />', () => {
  test('should render basic info correctly', async () => {
    const firstOrder = orderDataJson[0];
    const orderNumber = firstOrder.delivery_info.orderNo;
    const zipCode = firstOrder.zip_code;
    render(
      <ProvidersWrapper>
        <OrderDataProvider orderNumber={orderNumber} zipCode={zipCode}>
          <StatusTile />
        </OrderDataProvider>
      </ProvidersWrapper>
    )

    expect(await screen.findByRole('heading', {  name: firstOrder.checkpoints[0].status })).toBeInTheDocument()
    expect(await screen.findByRole('heading', {  name: firstOrder.checkpoints[0].status_details })).toBeInTheDocument()
  })
  test('should render announcment date for specific order state', async () => {
    const firstOrder = orderDataJson[0];
    const orderNumber = firstOrder.delivery_info.orderNo;
    const zipCode = firstOrder.zip_code;
    const formatedAnnouncedDeliveryDate = format(parse(firstOrder.delivery_info.announced_delivery_date, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy')
    render(
      <ProvidersWrapper>
        <OrderDataProvider orderNumber={orderNumber} zipCode={zipCode}>
          <StatusTile />
        </OrderDataProvider>
      </ProvidersWrapper>
    )

    expect(await screen.findByText(`Approximate delivery date is ${formatedAnnouncedDeliveryDate}`)).toBeInTheDocument()
  })
  //And so on by analogie
})
