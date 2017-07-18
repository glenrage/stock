export const actions = {
  buy: 'buy',
  sell: 'sell'
}

export const exchanges = {
  nasdaq: 'NASDAQ',
  nyse: 'NYSE'
}

export const blank_ticker = {
  symbol: '',
  price: '',
  quantity: '',
  date: '',
  action: 'actions.buy',
  exchange: 'exchanges.nasdaq'
}

export const ticker_mode = {
  summary: 'summary',
  detail: 'detail'
}

export const LOCAL_KEY = 'appState'

export const GOOG = 'https://finance.google.com/finance/info?q=';
