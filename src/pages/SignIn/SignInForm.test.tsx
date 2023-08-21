import ProvidersWrapper from "@root/testUtils/ProvidersWrapper"
import userEvent from '@testing-library/user-event';
import { render, screen } from "@testing-library/react"
import SignInForm from "./SignInForm"
import { Route, Routes } from "react-router-dom"
import ordersDataJson from '@root/mocks/orders/jsonData/orders.json'

describe('<SignInForm />', () => {
  test('should render correctly', () => {
    render(<ProvidersWrapper><SignInForm /></ProvidersWrapper>)

    const orderNumberInput = screen.getByRole('textbox', { name: 'Order number' })
    const zipCodeInput = screen.getByRole('textbox', { name: 'Zip code' })
    expect(orderNumberInput).toBeInTheDocument()
    expect(orderNumberInput).toBeRequired();
    expect(zipCodeInput).toBeRequired();
    expect(zipCodeInput).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Track'})).toBeInTheDocument()
  })
  test('should enter correct zip code and order number and be redirected to order page', async () => {
    const orderNumber = ordersDataJson[0].delivery_info.orderNo;
    const zipCode = ordersDataJson[0].zip_code;
    render(
      <ProvidersWrapper initialEntries={['/', `/order/${orderNumber}`]} initialIndex={0}>
        <Routes>
          <Route element={<SignInForm />} path='/' />
          <Route element={<div>redirected</div>} path='/order/:orderNumber' />
        </Routes>
      </ProvidersWrapper>
    )

    await userEvent.type(screen.getByRole('textbox', { name: 'Order number' }), orderNumber);
    await userEvent.type(screen.getByRole('textbox', { name: 'Zip code' }), zipCode);
    await userEvent.click(screen.getByRole('button', { name: 'Track' }))

    expect(await screen.findByText('redirected')).toBeInTheDocument();
  })
  test('should show not found alert if no order was found', async () => {
    render(<ProvidersWrapper><SignInForm /></ProvidersWrapper>)

    await userEvent.type(screen.getByRole('textbox', { name: 'Order number' }), '123');
    await userEvent.type(screen.getByRole('textbox', { name: 'Zip code' }), '123');
    await userEvent.click(screen.getByRole('button', { name: 'Track' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('No order was found. Please check fields and try again')
  })
})
