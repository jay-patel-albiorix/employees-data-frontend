import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { BrowserRouter } from 'react-router-dom'

import store from './state/store'
import './index.css';
import App from './App';
import { cache } from './cache'

const server = "http://localhost:4000"
const link = createUploadLink({
  uri: `${server}/graphql`,
  headers: {
    "keep-alive": "true"
  },
})

const client = new ApolloClient({
  cache,
  link,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
