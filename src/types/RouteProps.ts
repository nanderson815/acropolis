import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Feed: undefined;
  Profile: {name: string};
};

export type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Feed'>;
