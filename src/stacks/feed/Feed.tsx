import React from 'react';
import {FeedProps} from '../../types/RouteProps';
import {Card} from 'react-native-ui-lib';
import {RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {usePosts} from '../../shared/usePosts';
import {Post} from '../../types/Post';
import {useBackground} from '../../shared/useBackground';

function renderCard(post: Post) {
  return (
    <Card key={post.id} style={{marginBottom: 10}}>
      <Card.Section
        content={[{text: post.body, text90: true}]}
        style={{padding: 10}}
      />
    </Card>
  );
}

export default function Feed({navigation}: FeedProps): JSX.Element {
  const {backgroundStyle} = useBackground();

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
