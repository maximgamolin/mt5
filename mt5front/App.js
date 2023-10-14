import dayjs from "dayjs";
import { Main } from "./src";
import YaMap from "react-native-yamap";
import "dayjs/locale/ru";

dayjs.locale("ru");
YaMap.init(process.env.EXPO_PUBLIC_YAMAPS_API_KEY);
export default function App() {
  return <Main />;
}
