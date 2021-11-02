import { createClient } from 'urql';
import { Platform } from 'react-native';

const getToken = async () => {
  let res: any;
  if (Platform.OS === 'web') {
    res = await import('react-dotenv');
  } else {
    res = await import('react-native-dotenv');
  }

  return res?.REACT_APP_GITHUB_AUTH_TOKEN;
};

const getGraphqlClient = async () => {
  const token = await getToken();

  const client = createClient({
    url: 'https://api.github.com/graphql',
    fetchOptions: () => ({
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }),
  });

  return client;
};

export { getGraphqlClient };
