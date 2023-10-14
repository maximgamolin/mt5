import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../shared/constants";
import { ChatBotAvatar } from "./ChatBotAvatar";

export interface ChatBotMsgProps {
  msg: string;
}

export const ChatBotMsg = ({ msg }: ChatBotMsgProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <ChatBotAvatar />
      </View>
      <Text style={styles.title}>VTB-Bot:</Text>

      <Text style={styles.msg}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundLightBlue,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
    maxWidth: "80%",
    gap: 8,
  },
  avatar: {
    position: "absolute",
    top: 0,
    left: -30,
    zIndex: 10,
  },
  title: {
    color: "#437DFA",
  },
  msg: {
    color: COLORS.mainBlue,
  },
});
