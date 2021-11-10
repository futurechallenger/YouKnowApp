import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  ListRenderItemInfo,
} from 'react-native';
import { gql, useQuery } from 'urql';

interface RepoEdgeNode {
  name: string;
}
interface RepoEdge {
  node: RepoEdgeNode;
}

const REPO_QUERY = gql`
  query searchRepos($query: String!) {
    search(query: $query, type: REPOSITORY, first: 50) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            name
          }
        }
      }
    }
  }
`;

const Item = ({ name }: RepoEdgeNode) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const GithubScreen = () => {
  const [result] = useQuery({
    query: REPO_QUERY,
    variables: { query: 'user:facebook' },
  });

  const { data, fetching, error } = result;

  const renderItem = (info: ListRenderItemInfo<RepoEdge>) => (
    <Item name={info.item?.node?.name} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      {fetching && <Text>Loading...</Text>}

      {error && <Text>Oh no... {JSON.stringify(error)}</Text>}

      <FlatList
        data={data?.search?.edges}
        renderItem={renderItem}
        keyExtractor={item => item?.node?.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#dadada',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export { GithubScreen };
