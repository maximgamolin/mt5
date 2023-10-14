import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import YaMap, {Marker} from 'react-native-yamap';
import {API} from '../../API';
import {Office} from '../../API/types';

export function Map() {
  const [offices, setOffices] = useState<Office[]>([]);

  useEffect(() => {
    const api = new API();

    api.getOffices().then(o => setOffices(o));
  }, []);

  return (
    <YaMap
      showUserPosition
      logoPadding={{
        horizontal: 10,
        vertical: 100,
      }}
      style={{flex: 1}}>
      {offices.map(o => {
        return (
          <Marker key={o.address} point={{lat: o.latitude, lon: o.longitude}} />
        );
      })}
    </YaMap>
  );
}

const styles = StyleSheet.create({});
