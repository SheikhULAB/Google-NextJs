"use client"
import React, { useEffect, useState } from 'react';

function getCurrentCountry() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchCountryName(latitude, longitude) {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  const data = await response.json();
  return data.countryName;
}

function CountryLookup() {
  const [country, setCountry] = useState('');

  useEffect(() => {
    async function fetchUserCountry() {
      try {
        const position = await getCurrentCountry();
        const { latitude, longitude } = position.coords;
        const userCountry = await fetchCountryName(latitude, longitude);
        setCountry(userCountry);
      } catch (error) {
        console.error('Error getting user location:', error);
        setCountry('Unknown');
      }
    }

    fetchUserCountry();
  }, []);

  return <div>Your current country is: {country}</div>;
}

export default CountryLookup;
