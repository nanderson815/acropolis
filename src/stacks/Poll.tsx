import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Card,
  TextField,
  View,
  Text,
  Button,
  TextFieldRef,
} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Post} from '../types/Post';
import {useAuthUser} from '../shared/userAuthUser';
import {PollProps} from '../types/RouteProps';
import {useBackground} from '../shared/useBackground';

export default function Poll({navigation}: PollProps): JSX.Element {
  const {backgroundStyle} = useBackground();

  const {user, loading: userLoading} = useAuthUser();

  const questionRef = React.createRef<TextFieldRef>();
  const [question, setQuestion] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  async function createPoll() {
    console.log(submitting);
    setSubmitting(true);
    const document: Partial<Post> = {
      agreeBy: [],
      agreeCount: 0,
      body: question,
      commentCount: 0,
      disagreeBy: [],
      disagreeCount: 0,
      userId: user?.uid,
    };
    const ref = firestore().collection('posts');
    await ref.add({
      ...document,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    setSubmitting(false);
    setQuestion('');
    navigation.navigate('Feed');
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.sectionContainer}>
        <Card style={styles.card}>
          <View>
            <Text text80 grey10>
              Ask a question or make a statment that is phrased in such a way
              that people can agree or disagree.
            </Text>
            <TextField
              ref={questionRef}
              style={styles.questionInput}
              multiline={true}
              placeholder="Vanilla ice cream is better than chocolate ice cream."
              validate={['required']}
              enableErrors
              validationMessage={['Whoops! You forgot to ask a question.']}
              onChangeText={setQuestion}
              value={question}
            />
            <Button
              disabled={submitting}
              label="Submit"
              onPress={() => {
                const valid = questionRef.current?.validate?.();
                if (valid && !!user) {
                  createPoll();
                }
              }}
            />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
    flexGrow: 0,
    display: 'flex',
  },
  card: {
    padding: 20,
    display: 'flex',
  },
  questionInput: {
    marginTop: 20,
    padding: 7,
    minHeight: 75,
    borderColor: 'gray',
    borderStartWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
});
