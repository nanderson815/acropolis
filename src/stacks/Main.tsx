import React, {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  useColorScheme,
  View,
  Text,
  SafeAreaView,
  Button,
  TextInput,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HomeProps} from '../types/RouteProps';

export default function Main({navigation}: HomeProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Set an initializing state whilst Firebase connects
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
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
    auth().signOut().then(() => {
      console.log('User signed out!');
    });
  };

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
            <TextInput
              placeholder="Email"
              onChangeText={val => setEmail(val)}
            />
            <TextInput
              placeholder="Password"
              onChangeText={val => setPassword(val)}
              secureTextEntry={true}
              
            />
            <Button title="Login" onPress={handleLogin} />
          </View>
        )}
        {user && (
          <View>
            <Text>Welcome {user.email}</Text>
            <Button title="Sign out" onPress={handelLogout} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
