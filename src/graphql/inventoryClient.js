import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import ls from "~/utils/Storage";
import {ACCESS_TOKEN} from "~/store/mutation-types";

const cache = new InMemoryCache({
  addTypename: false
});

let authToken = null;  // Initially null, can be set later.

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: authToken ? `Bearer ${authToken}` : "",
    }
  }
});

const gqlHttpLink = new HttpLink({
  uri: 'https://api.amjilt.com/document/query'
});

const gqlHttpLinkInventory = new HttpLink({
  uri: 'https://api.amjilt.com/inventory/query'
});

export const inventoryClient = new ApolloClient({
  link: authLink.concat(gqlHttpLinkInventory), // Concatenate the auth link and the HTTP link
  cache: cache,
});
export function setAuthToken(token) {
  authToken = token;
}


export function  initClient() {
  const token = ls.get(ACCESS_TOKEN)
  if(token){
    setAuthToken(token)
  }
}