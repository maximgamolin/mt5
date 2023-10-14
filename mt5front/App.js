import { StyleSheet } from "react-native";
import { Main } from "./src";
import YaMap from "react-native-yamap";
import { API_KEY } from "./src/API";

YaMap.init(API_KEY);
export default function App() {
  return <Main />;
}
