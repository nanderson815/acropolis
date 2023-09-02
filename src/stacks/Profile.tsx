import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  useColorScheme,
  View,
  Text,
  SafeAreaView,
  TextInput,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button, TextField} from 'react-native-ui-lib';
import {useAuthUser} from '../shared/userAuthUser';
import {useBackground} from '../shared/useBackground';

const Profile = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {backgroundStyle} = useBackground();

  const {user, loading} = useAuthUser();

  // Set an initializing state whilst Firebase connects
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  function handleLogin() {
    if (!email || !password) return;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  const handelLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}>
        {!user && (
          <View>
            <Text>Login to get started</Text>
            <TextField
              placeholder={'Email'}
              floatingPlaceholder
              onChangeText={setEmail}
              enableErrors
              validate={['required', 'email']}
              validationMessage={['Field is required', 'Email is invalid']}
            />
            <TextInput
              placeholder="Password"
              onChangeText={val => setPassword(val)}
              secureTextEntry={true}
            />
            <Button label="Login" onPress={handleLogin} />
          </View>
        )}
        {user && (
          <View>
            <Text>Welcome {user.email}</Text>
            <Button label="Sign out" onPress={handelLogout} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;