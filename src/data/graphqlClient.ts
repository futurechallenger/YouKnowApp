import { createClient } from 'urql';
import { token } from './envToken';

const getGraphqlClient = async () => {
  const client = createClient({
    url: 'https://api.github.com/graphql',
    fetchOptions: () => ({
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }),
  });

  return client;
};

export { getGraphqlClient };
