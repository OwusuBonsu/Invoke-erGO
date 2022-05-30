import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {getToken} from './FirebaseUtils';
import uuid from 'react-native-uuid';
import DeviceInfo from 'react-native-device-info';

export const setLocation = (getHealthKitData) => {
  Geolocation.getCurrentPosition((info) => getLocation(info, getHealthKitData));
};

export function getLocation(locObject, getHealthKitData) {
  console.log(locObject);
  Geocoder.from(locObject.coords.latitude, locObject.coords.longitude).then(
    (res) => {
      getHealthKitData((healthKitData) => ({
        ...healthKitData,
        Address: res.results[0].formatted_address,
        Longitude: res.results[0].geometry.location.lng,
        Latitude: res.results[0].geometry.location.lat,
        county: res.results[6].address_components[0].short_name,
        state: res.results[7].address_components[0].long_name,
        country: res.results[8].address_components[0].long_name,
        date: new Date().toISOString(),
        injuryID: uuid.v4(),
        device_Id: DeviceInfo.getUniqueId(),
        phoneNumber: DeviceInfo.getPhoneNumber(),
        Time: new Date().toISOString(),
      }));
    },
    console.log('LocToken:', getToken()),
  );
}
