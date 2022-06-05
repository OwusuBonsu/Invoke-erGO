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
  TextInput,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HealthkitDataContext} from './context/HealthkitDataContext';

import Geocoder from 'react-native-geocoding';
import {setLocation} from './src/utils/LocationServices';
import {
  signOut,
  SendInjuryLog,
  SendInjuryWitness,
  SendHealthData,
} from './src/utils/FirebaseUtils';

export default function Dashboard({user, setSignedIn}) {
  const {healthKitData, getHealthKitData} = useContext(HealthkitDataContext);
  const [databaseData, getDatabaseData] = useState('');
  const [injuryData, getinjuryData] = useState({}); //injuryLog Data
  const [anecdote, setAnecdote] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [observers, setObservers] = useState('');
  const [language, setLanguage] = useState('');
  const [userName, setuserName] = useState('');
  const [english_question, setEnglish_question] = useState('');

  // const handlePressGetAuthStatus = () => {
  //   AppleHealthKit.getAuthStatus(permissions, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //     setAuthStatus(result);
  //   });
  // };

  Geocoder.init('AIzaSyDFNR_p1wDhI542Y1raBW1xSJt9MOop7zk');

  // useEffect(() => {
  //   //console.log('Data state: ' + JSON.stringify(healthKitData));
  // }, [healthKitData]);

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
              {/* <Button
                title="Generate Injury Witness Notification"
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
                        SendInjuryWitness(userName);
                      },
                    },
                  ]);
                }}
              /> */}
              <Button
                title="Retrieve health data and send to firebase"
                onPress={() => {
                  SendHealthData(getHealthKitData, healthKitData);
                }}
              />
              <Button
                title="Report Injury"
                onPress={() => {
                  SendInjuryLog(getinjuryData, injuryData);
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Do you speak English?"
                placeholderTextColor="#9a73ef"
                value={english_question}
                onChangeText={(text) => {
                  setEnglish_question(text);
                  {
                    getinjuryData(() => ({
                      ...injuryData,
                      English: english_question,
                    }));
                  }
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Name"
                placeholderTextColor="#9a73ef"
                value={userName}
                onChangeText={(userName) => {
                  setuserName(userName);
                  {
                    getinjuryData(() => ({
                      ...injuryData,
                      Name: userName,
                    }));
                  }
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="What Language you speak?"
                placeholderTextColor="#9a73ef"
                value={language}
                onChangeText={(languageText) => {
                  setLanguage(languageText);
                  {
                    getinjuryData(() => ({
                      ...injuryData,
                      Language: language,
                    }));
                  }
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Anecdote"
                placeholderTextColor="#9a73ef"
                value={anecdote}
                onChangeText={(ancedcoteText) => {
                  setAnecdote(ancedcoteText);
                  {
                    getinjuryData(() => ({
                      ...injuryData,
                      Anecdote: anecdote,
                    }));
                  }
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Body Part Injured?"
                placeholderTextColor="#9a73ef"
                value={bodyPart}
                onChangeText={(bodyText) => {
                  setBodyPart(bodyText);
                  {
                    getinjuryData(() => ({
                      ...injuryData,
                      BodyPart: bodyPart,
                    }));
                  }
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Please List Witnessess"
                placeholderTextColor="#9a73ef"
                value={observers}
                onChangeText={(observeText) => {
                  setObservers(observeText);
                  {
                    getinjuryData(() => ({
                      ...injuryData,
                      Observers: observers,
                    }));
                  }
                }}
              />
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
  textInput: {
    color: 'green',
    fontSize: 20,
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
