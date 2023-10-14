import { Image, StyleSheet } from "react-native";

export function MapPlaceholder() {
  return <Image style={styles.map} source={require('./map.png')} />;
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
})
