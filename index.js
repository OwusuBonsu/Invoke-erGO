import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/messaging';
import {SendInjuryWitness} from './src/utils/FirebaseUtils';
import {Alert} from 'react-native';
firestore()
  .collection('injuryLogTest')
  .orderBy('Time', 'desc')
  .limit(1)
  .onSnapshot(onResult); // listener for new injuries

function onResult(querySnapshot) {
  querySnapshot.forEach((documentSnapshot) => {
    console.log(
      'injuryLog doc info:',
      documentSnapshot.id,
      documentSnapshot.data(),
    );
    // Create a new field path
    const fieldPath_injuryID = new firebase.firestore.FieldPath('injuryID');
    const fieldPath_Latitude = new firebase.firestore.FieldPath('Latitude');
    const fieldPath_Longitude = new firebase.firestore.FieldPath('Longitude');
    var injuryID = documentSnapshot.get(fieldPath_injuryID);
    var injuryLat = documentSnapshot.get(fieldPath_Latitude); //use for mapview
    var injuryLong = documentSnapshot.get(fieldPath_Longitude);
    console.log('injuryID is:', injuryID);

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

firebase
  .messaging()
  .subscribeToTopic('injuryLog')
  .then(() => console.log('Subscribed to injuryLog'));

firebase
  .messaging()
  .subscribeToTopic('AlgorithmData')
  .then(() => console.log('Subscribed to AlgorithmData!'));

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true

  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */

  requestPermissions: true,
});
AppRegistry.registerComponent(appName, () => App);
