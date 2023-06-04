import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-ap-south-1.hygraph.com/v2/clh8oeyju8tup01t8fiqi13ms/master",
  cache: new InMemoryCache(),
});

export default client;
