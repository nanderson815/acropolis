import React from 'react';
import {Button, Text, View} from 'react-native';
import {ProfileProps} from '../types/RouteProps';

const Profile = (props: ProfileProps) => {
  const {name} = props.route.params;
  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}>
      <Button
        title="Back to home"
        onPress={() => props.navigation.goBack()}
      />
      <Text>This is {name}'s profile</Text>
    </View>
  );
};

export default Profile;
