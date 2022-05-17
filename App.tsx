import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ShadowPropTypesIOS,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Login from './Login';
import Dashboard from './Dashboard';
import auth from '@react-native-firebase/auth';
import { HealthkitDataContext } from './context/HealthkitDataContext';


export default function App() {
  const [user, setUser] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const [healthKitData, getHealthKitData] = useState([])

  useEffect(() => {
    console.log("User: " + JSON.stringify(user))
  }, [user])

  useEffect(() => {
    console.log(healthKitData)
  }, [healthKitData])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {signedIn ?
          <HealthkitDataContext.Provider value={{ healthKitData, getHealthKitData }} >
            <Dashboard user={user} setSignedIn={setSignedIn} />
          </HealthkitDataContext.Provider>
          :
          <Login user={user} setUser={setUser} setSignedIn={setSignedIn} />
        }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
}
);
