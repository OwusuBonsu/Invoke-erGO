import React, {useEffect, useState, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import handleGetData from './handleGetData';
import {HealthkitDataContext} from '../../context/HealthkitDataContext';
import {setLocation} from './LocationServices';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/messaging';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';

export function onResult(QuerySnapshot) {
  QuerySnapshot.forEach((documentSnapshot) => {
    console.log('injuryLog ', documentSnapshot.id, documentSnapshot.data());
    // Create a new field path
    const fieldPath_injuryID = new firebase.firestore.FieldPath('injuryID');
    const fieldPath_Latitude = new firebase.firestore.FieldPath('Latitude');
    const fieldPath_Longitude = new firebase.firestore.FieldPath('Longitude');
    var injuryID = documentSnapshot.get(fieldPath_injuryID);
    var injuryLat = documentSnapshot.get(fieldPath_Latitude); //use for mapview
    var injuryLong = documentSnapshot.get(fieldPath_Longitude);
    console.log('injuryID ', injuryID);

    console.log('Got Users collection result.');
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
          SendInjuryWitness(injuryID);
        },
      },
    ]);

    function onError(error) {
      console.error(error);
    }
  });
}

firestore()
  .collection('injuryLogTest')
  .orderBy('Time', 'desc')
  .limit(1)
  .onSnapshot(onResult); // listener for new injuries

export function SendHealthData(getHealthKitData, healthKitData) {
  getHealthKitData([]);
  handleGetData(getHealthKitData);
  //console.log(getHealthKitData);
  firestore().collection('AlgorithmDataTest').add(healthKitData);
}

export function signOut() {
  auth()
    .signOut()
    .then(() => setSignedIn(false));
}

async function bootstrap() {
  await inAppMessaging().setMessagesDisplaySuppressed(false);
}

async function onSetup(user) {
  await setupUser(user);
  // Allow user to receive messages now setup is complete
  inAppMessaging().setMessagesDisplaySuppressed(false);
}

export const getToken = async () => {
  const authStatus = await firebase.messaging().requestPermission();
  if (authStatus === 1) {
    var fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log('Firebase Push Token is:', fcmToken);
      //return fcmToken;
    }
  }
};

export function SendInjuryWitness(injuryID) {
  var injuryReport = {
    injuryID: injuryID,
    device_Id: DeviceInfo.getUniqueId(),
    //phoneNumber: DeviceInfo.getPhoneNumber(),
    Time: new Date().toISOString(),
  };
  console.log('InjuryID:', injuryID);
  firestore()
    .collection('witnessLogTest')
    .doc(injuryReport.Time)
    .set(injuryReport);
}

export function SendInjuryLog(getinjuryData, injuryData) {
  getinjuryData([]);
  setLocation(getinjuryData);
  console.log('injuryID send', injuryData.injuryID);
  var injuryID = injuryData.injuryID;
  var realID = injuryID.toString();
  firestore().collection('injuryLogTest').doc(realID).set(injuryData);
}
