import dayjs from "dayjs";
import { Main } from "./src";
import YaMap from "react-native-yamap";
import "dayjs/locale/ru";
import { GestureHandlerRootView } from "react-native-gesture-handler";

dayjs.locale("ru");
YaMap.init(process.env.EXPO_PUBLIC_YAMAPS_API_KEY);
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Main />
    </GestureHandlerRootView>
  );
}
