import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import DeviceInfo from 'react-native-device-info';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export const setLocation = (getinjuryData) => {
  Geolocation.getCurrentPosition((info) => getLocation(info, getinjuryData));
};

export function getLocation(locObject, getinjuryData) {
  console.log(locObject);
  Geocoder.from(locObject.coords.latitude, locObject.coords.longitude).then(
    (res) => {
      getinjuryData((injuryData) => ({
        ...injuryData,
        Address: res.results[0].formatted_address,
        Longitude: res.results[0].geometry.location.lng,
        Latitude: res.results[0].geometry.location.lat,
        county: res.results[6].address_components[0].long_name,
        state: res.results[7].address_components[0].long_name,
        country: res.results[8].address_components[0].long_name,
        injuryID: Math.floor(Math.random() * 1000) + 1,
        device_Id: DeviceInfo.getUniqueId(),
        //phoneNumber: DeviceInfo.getPhoneNumber(),
        Time: new Date().toISOString(),
      }));
    },
  );
  return (
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}
