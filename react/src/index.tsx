import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ApolloProvider, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { ApolloClient, InMemoryCache } from "@apollo/client"

// const client = new ApolloClient({
//   uri: "http://localhost:4000",
//   cache: new InMemoryCache(),
// })

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("AUTH_TOKEN")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
