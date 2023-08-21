import { rest } from 'msw';
import ordersJsonData from './jsonData/orders.json';
import { api } from '../../api/utils';

export const getOrderById = rest.get(`${api}/orders/:orderNumber`, (req, res, ctx) => {
  const zipCode = req.url.searchParams.get('zipCode');
  const orderNumber = req.params.orderNumber;
  if (!zipCode) {
    return res(ctx.status(500), ctx.text('Zip code is required'));
  }
  const foundOrder = ordersJsonData.find((order) => order.zip_code === zipCode && order.delivery_info.orderNo === orderNumber);
  if (foundOrder) {
    return res(ctx.json(foundOrder))
  }
  if (!foundOrder) {
    return res(ctx.status(404))
  }
  return res(ctx.status(500));
});

