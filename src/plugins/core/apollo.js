import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

import { base_url } from '~/consts/const'
const httpLink = new HttpLink({
  uri: base_url+"/query",
});

// Cache implementation
const cache = new InMemoryCache({
  addTypename: false
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: cache,
});

export const posHttpLink = new HttpLink({
  uri: 'https://pos.tatatonga.com/query',

})

const posClient = new ApolloClient({
  link: posHttpLink,
  cache: cache,
});

export const inventoryHttpLink = new HttpLink({
  uri: 'https://inventory.mcpc.mn/query',

})

const inventoryClient = new ApolloClient({
  link: inventoryHttpLink,
  cache: cache,
});
export const financeHttpLink = new HttpLink({
  uri: 'https://finance.mcpc.mn/query',

})

const financeClient = new ApolloClient({
  link: financeHttpLink,
  cache: cache,
});
export const attendanceHttpLink = new HttpLink({
  uri: 'https://attendance.mcpc.mn/query',
})

const attendanceClient = new ApolloClient({
  link: attendanceHttpLink,
  cache: cache,
});

export default createApolloProvider({
  defaultClient: apolloClient,
  clients:{
    posClient:posClient,
    inventoryClient:inventoryClient,
    financeClient:financeClient,
    attendanceClient:attendanceClient,
  }
});
