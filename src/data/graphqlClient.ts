import { createClient } from 'urql';

const getGraphqlClient = () => {
  const client = createClient({
    url: 'https://api.github.com/graphql',
  });

  return client;
};

export { getGraphqlClient };
