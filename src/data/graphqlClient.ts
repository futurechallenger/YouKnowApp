import { createClient, makeOperation } from 'urql';
import { authExchange, AuthConfig } from '@urql/exchange-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GITHUB_TOKEN_KEY } from '../utils/constants';

type AuthState = {
  token: string;
};

const authConfig: AuthConfig<AuthState> = {
  addAuthToOperation: ({ authState, operation }) => {
    // the token isn't in the auth state, return the operation without changes
    if (!authState?.token) {
      return operation;
    }

    // fetchOptions can be a function (See Client API) but you can simplify this based on usage
    const fetchOptions =
      typeof operation.context.fetchOptions === 'function'
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: authState.token,
        },
      },
    });
  },
  getAuth: async ({ authState }): Promise<AuthState | null> => {
    try {
      if (!authState) {
        const token = await AsyncStorage.getItem(GITHUB_TOKEN_KEY);
        return { token } as AuthState;
      }
      return null;
    } catch (e) {
      return null;
    }
  },
};

const getGraphqlClient = () => {
  const client = createClient({
    url: 'https://api.github.com/graphql',
    exchanges: [
      authExchange({
        ...authConfig,
      }),
    ],
  });

  return client;
};

export { getGraphqlClient };
