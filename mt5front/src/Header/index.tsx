import { Text, StyleSheet, View, Button, Image } from "react-native";

export interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {
  return (
    <View style={styles.header}>
      <Button title="Назад" />
      <Text style={styles.title}>{props.title}</Text>
      <Image style={styles.icon} source={require('./header_icon.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    height: 67,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
