import {useEffect, useState} from 'react';
import {Post} from '../../types/Post';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

function convertDataToPost(
  id: string,
  data: FirebaseFirestoreTypes.DocumentData,
): Post {
  return {
    id: id,
    agreeBy: data.agreeBy,
    agreeCount: data.agreeCount,
    body: data.body,
    commentCount: data.commentCount,
    createdAt: data.createdAt,
    disagreeBy: data.disagreeBy,
    disagreeCount: data.disagreeCount,
    editedAt: data.editedAt,
    title: data.title,
    userId: data.userId,
  };
}

export const usePosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    setLoading(true);
    try {
      firestore()
        .collection('posts')
        .get()
        .then(querySnapshot => {
          setCount(querySnapshot.size);
          const results: Post[] = [];

          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            results.push(convertDataToPost(documentSnapshot.id, data));
          });
          setPosts(results);
        });
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [shouldRefetch]);

  return {loading, posts, error, count, refetch: () => refetch({})};
};
