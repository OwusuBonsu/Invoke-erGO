import {useContext} from 'react';
import auth from '@react-native-firebase/auth';
import handleGetData from './handleGetData';
import {HealthkitDataContext} from '../../context/HealthkitDataContext';
import {setLocation} from './LocationServices';
import firestore from '@react-native-firebase/firestore';

export function SendToFirebase(getHealthKitData, healthKitData) {
  getHealthKitData([]);
  handleGetData(getHealthKitData);
  setLocation(getHealthKitData);
  firestore().collection('AlgorithmData').add(healthKitData);
}

export function signOut() {
  auth()
    .signOut()
    .then(() => setSignedIn(false));
}
