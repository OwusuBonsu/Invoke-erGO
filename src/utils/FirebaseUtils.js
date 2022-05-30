import {useContext} from 'react';
import auth from '@react-native-firebase/auth';
import handleGetData from './handleGetData';
import {HealthkitDataContext} from '../../context/HealthkitDataContext';
import {setLocation} from './LocationServices';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/messaging';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';

export function SendToFirebase(getHealthKitData, healthKitData) {
  getHealthKitData([]);
  handleGetData(getHealthKitData);
  setLocation(getHealthKitData);
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

export function SendInjuryWitness(email) {
  var injuryReport = {
    device_Id: DeviceInfo.getUniqueId(),
    phoneNumber: DeviceInfo.getPhoneNumber(),
    Time: new Date().toISOString(),
  };
  firestore().collection('injuryLogTest').add(injuryReport);
}
