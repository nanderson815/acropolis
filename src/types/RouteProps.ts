import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Feed: undefined;
  Home: undefined;
  Poll: undefined;
  Profile: {name: string};
};

export type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type FeedProps = NativeStackScreenProps<RootStackParamList, 'Feed'>;
export type PollProps = NativeStackScreenProps<RootStackParamList, 'Poll'>;
