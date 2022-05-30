import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import {firebase} from '@react-native-firebase/analytics';
import handleGetData from './src/utils/handleGetData';
import {HealthkitDataContext} from './context/HealthkitDataContext';
import Geocoder from 'react-native-geocoding';
import {setLocation} from './src/utils/LocationServices';
import {signOut} from './src/utils/FirebaseUtils';
import {SendToFirebase, SendInjuryWitness} from './src/utils/FirebaseUtils';
import {getToken} from './src/utils/FirebaseUtils';

export default function Dashboard({user, setSignedIn}) {
  const {getHealthKitData, healthKitData} = useContext(HealthkitDataContext);
  const [databaseData, getDatabaseData] = useState();
  const [userData, getUserData] = useState();

  // const handlePressGetAuthStatus = () => {
  //   AppleHealthKit.getAuthStatus(permissions, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //     setAuthStatus(result);
  //   });
  // };

  Geocoder.init('AIzaSyDFNR_p1wDhI542Y1raBW1xSJt9MOop7zk');

  const getDatabase = async () => {
    var dataCollection = await firestore()
      .collection('Playground')
      .doc('Test')
      .get();
  };

  useEffect(() => {
    console.log('Data state: ' + JSON.stringify(healthKitData));
  }, [healthKitData]);

  // useEffect(() => {
  //   getDatabase();
  //   },[])

  useEffect(() => {
    console.log(databaseData);
  }, [databaseData]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Dashboard</Text>
              <Button
                title="Generate Injury Alert"
                onPress={() => {
                  Alert.alert('Injury Reported', 'Are you a witness?', [
                    {
                      text: 'No',
                      onPress: () => console.log('No Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        console.log('Yes Pressed');
                        SendInjuryWitness();
                      },
                    },
                  ]);
                }}
              />
              <Button
                title="Retrieve health data and send to firebase"
                onPress={() => {
                  SendToFirebase(getHealthKitData, healthKitData);
                }}
              />

              {/* <Text onPress={sendToFirebase}>
                Send data to database
              </Text> */}

              <View
                style={{
                  width: '100%',
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                }}>
                {databaseData
                  ? Object.entries(databaseData).map(([key, value]) => {
                      return (
                        <View
                          style={{
                            width: '45%',
                            backgroundColor: '#4D83B2',
                            padding: 10,
                            margin: 5,
                            borderRadius: 10,
                          }}>
                          <View style={{}}>
                            <Text style={{}}>{key}</Text>
                          </View>
                          <View style={{}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>
                              {value}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  : null}
              </View>
              <Button title="Get location" onPress={() => setLocation()} />
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
});
