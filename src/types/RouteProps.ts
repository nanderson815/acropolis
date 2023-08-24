import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Profile: {name: string};
};

export type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
