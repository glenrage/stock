export const actions = {
  buy: 'buy',
  sell: 'sell'
}

export const exchanges = {
  nasdaq: 'NASDAQ',
  nyse: 'NYSE'
}

export const blank_stock = {
  symbol: '',
  price: '',
  quantity: '',
  date: '',
  action: 'actions.buy',
  exchange: 'exchanges.nasdaq'
}

export const stock_mode = {
  summary: 'summary',
  detail: 'detail'
}
