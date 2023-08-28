import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HomeProps} from '../../types/RouteProps';
import {Card} from 'react-native-ui-lib';
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {usePosts} from './usePosts';
import {Post} from '../../types/Post';

function renderCard(post: Post) {
  return (
    <Card key={post.id} style={{marginBottom: 10}}>
      <Card.Section
        content={[
          {text: post.title, text70: true},
          {text: post.body, text90: true},
        ]}
        style={{padding: 10}}
      />
    </Card>
  );
}

export default function Feed({navigation}: HomeProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {loading, posts, refetch} = usePosts();

  return (
    <SafeAreaView style={backgroundStyle}>
      <FlatList
        style={styles.sectionContainer}
        data={posts}
        renderItem={({item}) => renderCard(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
    height: '100%',
  },
});
