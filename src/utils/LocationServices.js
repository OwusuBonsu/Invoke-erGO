import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

export const setLocation = (getHealthKitData) => {
  Geolocation.getCurrentPosition((info) => getLocation(info, getHealthKitData));
};

export function getLocation(locObject, getHealthKitData) {
  console.log(locObject);
  Geocoder.from(locObject.coords.latitude, locObject.coords.longitude).then(
    (res) =>
      getHealthKitData((healthKitData) => ({
        ...healthKitData,
        Address: res.results[6].formatted_address,
        Longitude: res.results[0].geometry.location.lng,
        Latitude: res.results[0].geometry.location.lat,
      })),
  );
}
