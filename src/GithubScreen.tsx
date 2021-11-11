import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  ListRenderItemInfo,
} from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { gql, useQuery, useClient } from 'urql';

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
  const [searchText, setSearchText] = useState('');
  const client = useClient();
  const [result] = useQuery({
    query: REPO_QUERY,
    variables: { query: 'user:facebook' },
  });

  useEffect(() => {
    const repoQuery = async () => {
      const res = await client
        .query(REPO_QUERY, { query: `user:${searchText}` })
        .toPromise();
      return res;
    };

    repoQuery();
  }, [searchText, client]);

  const { data, fetching, error } = result;

  const handleSearchChange = (text: string) => setSearchText(text);
  const handleIconPress = async () => {
    const res = await client
      .query(REPO_QUERY, { query: `user:${searchText}` })
      .toPromise();

    console.log('>handleIconPress: ', res);
  };

  const renderItem = (info: ListRenderItemInfo<RepoEdge>) => {
    console.log('>renderItem: ', info);
    const { index } = info;
    if (index === 0) {
      return (
        <Searchbar
          style={styles.item}
          placeholder="Search"
          onChangeText={handleSearchChange}
          onIconPress={handleIconPress}
          value={searchText}
        />
      );
    } else {
      return <Item name={info.item?.node?.name} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {fetching && (
        <View style={styles.wrapper}>
          <ActivityIndicator animating={fetching} size="large" />
        </View>
      )}

      {error && <Text>Oh no... {JSON.stringify(error)}</Text>}
      {data && (
        <FlatList
          data={[0, ...(data?.search?.edges ?? [])]}
          renderItem={renderItem}
          keyExtractor={item => item?.node?.name}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
