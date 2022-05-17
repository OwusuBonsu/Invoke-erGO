import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ShadowPropTypesIOS,
  Button
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
  HealthInputOptions,
} from 'react-native-health';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import handleGetData from './handleGetData';
import { HealthkitDataContext } from './context/HealthkitDataContext';

export default function Dashboard({ user, setSignedIn }) {
  const { getHealthKitData, healthKitData } = useContext(HealthkitDataContext);
  const [databaseData, getDatabaseData] = useState();
  const [userData, getUserData] = useState()

  // const handlePressGetAuthStatus = () => {
  //   AppleHealthKit.getAuthStatus(permissions, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //     setAuthStatus(result);
  //   });
  // };

  function signOut() {
    auth()
      .signOut()
      .then(() => setSignedIn(false))
  }


  const getDatabase = async () => {
    var dataCollection = await firestore().collection('Playground').doc('Test').get();
  }

  useEffect(() => {
    console.log("Data state: " + userData)
  }, [userData])

  // useEffect(() => {
  //   getDatabase();
  //   },[])

  useEffect(() => {
    console.log(databaseData)
  }, [databaseData])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                Dashboard
              </Text>
              <Text onPress={() => {
                getHealthKitData([]);
                handleGetData(getHealthKitData)
              }}>
                Retrieve new health data
              </Text>

              {/* <Text onPress={sendToFirebase}>
                Send data to database
              </Text> */}

              <View style={{ width: '100%', flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {databaseData ? Object.entries(databaseData).map(([key, value]) => {
                  return (<View style={{ width: '45%', backgroundColor: "#4D83B2", padding: 10, margin: 5, borderRadius: 10 }}>
                    <View style={{}}><Text style={{}}>{key}</Text></View>
                    <View style={{}}><Text style={{ fontWeight: 'bold', fontSize: 20 }}>{value}</Text></View>
                  </View>)
                }) : null}
              </View>

              <Button title="Sign Out" onPress={signOut} />
            </View>
          </View>
        </ScrollView>
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
