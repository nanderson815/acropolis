import React from 'react';
import {useBackground} from '../../shared/useBackground';
import {usePosts} from '../../shared/usePosts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Button, Card, Colors, View} from 'react-native-ui-lib';
import {Post} from '../../types/Post';

function renderCard(post: Post) {
  const screenHeight = Dimensions.get('window').height - 120;
  return (
    <Card
      key={post.id}
      style={{
        height: screenHeight,
        padding: 10,
        marginBottom: 10,
        backgroundColor: Colors.white,
      }}>
      <View flex style={{alignItems: 'center', justifyContent: 'center'}}>
        <Card.Section content={[{text: post.body, text60BL: true}]} />
        <View row>
          <View flex>
            <Button label="Agree" />
          </View>
          <View flex>
            <Button label="Disagree" />
          </View>
        </View>
      </View>
    </Card>
  );
}

export default function Home(): JSX.Element {
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
    flexGrow: 0,
  },
});
