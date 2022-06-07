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

<<<<<<< HEAD
export function onResult(QuerySnapshot) {
  QuerySnapshot.forEach((documentSnapshot) => {
    console.log('injuryLog ', documentSnapshot.id, documentSnapshot.data());
    // Create a new field path
    const fieldPath = new firebase.firestore.FieldPath('injuryID');
    var injuryID = documentSnapshot.get(fieldPath);

    console.log('injuryID ', injuryID);
=======
>>>>>>> e5be25c690256cf9209603cc1ca725b7c68ad510

export function SendHealthData(
  getHealthKitData,
  healthKitData,
  sethealthArray,
  healthArray,
) {
  getHealthKitData([]);
  sethealthArray([]);
  handleGetData(getHealthKitData, sethealthArray);

  console.log('health:', healthKitData);
  console.log('hrv:', healthArray);

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
  firestore().collection('injuryLogTest').add(injuryData);
}
