import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/messaging';
import {Text, TextInput, Button, SafeAreaView, View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import {getToken} from './src/utils/FirebaseUtils';
export default function Login({user, setUser, setSignedIn}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setuserName] = useState('');
  //const [fcmToken, setFcmToken] = useState('');
  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function signUpFunction(email: string, password: string) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log(user);
        setSignedIn(true);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
 

  function loginFunction(email: string, password: string) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(user);
        setSignedIn(true);
      })
      .catch((err) => console.log(err));
  }

 

  if (initializing) {
    return null;
  }

  return (
    <>
    <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <SafeAreaView>
      
        <View>
          <TextInput
            placeholder="email"
            placeholderTextColor = "#9a73ef"
            value={email}
            onChangeText={(emailText) => setEmail(emailText)}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor = "#9a73ef"
            value={password}
            onChangeText={(passText) => setPassword(passText)}
          />
          <TextInput
            placeholder="Name"
            value={userName}
            onChangeText={(passText) => setuserName(passText)}
          />
          <Button
            title="Login"
            onPress={() => loginFunction(email, password)}
          />
          <Button
            title="Sign Up"
            onPress={() => signUpFunction(email, password)}
          />
          <Button
            title="Get token"
            onPress={() => console.log('FireToke is:', getToken())}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
