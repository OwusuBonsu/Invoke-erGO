import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/messaging';
import {Text, TextInput, Button, SafeAreaView, View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SendInjuryWitness} from './src/utils/FirebaseUtils';

export default function Login({user, setUser, setSignedIn}) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [fcmToken, setFcmToken] = useState('');
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function signUpFunction(email, password) {
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

  function loginFunction(email, password) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(user);
        setSignedIn(true);
      })
      .catch((err) => console.log(err));
  }

  firebase
    .messaging()
    .subscribeToTopic('injuryLog')
    .then(() => console.log('Subscribed to injuryLog'));

  firebase
    .messaging()
    .subscribeToTopic('AlgorithmData')
    .then(() => console.log('Subscribed to AlgorithmData!'));

  if (initializing) {
    return null;
  }

  return (
    <>
      <SafeAreaView>
        <View>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={(emailText) => setEmail(emailText)}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={(passText) => setPassword(passText)}
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
