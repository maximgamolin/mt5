import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../shared/constants";
import { Button } from "../../../shared/ui/Button";
import { AVAILABLE_OPERATIONS, MESSAGES } from "../contstants";
import { ChatBotMsg } from "./ChatBotMsg";

export const ChatBot = () => {
  return (
    // <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <View>
      <Text style={styles.title}>
        Ответьте на несколько вопросов, и мы подберем отделение, где проблему
        смогут решить быстрее всего:
      </Text>
      <View style={styles.chat}>
        <ChatBotMsg msg={MESSAGES[0]} />
        <View style={styles.requestsContainer}>
          {AVAILABLE_OPERATIONS.map((o, i) => {
            return <Button key={i} title={o.name} />;
          })}
        </View>
      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.white,
    paddingBottom: 32,
    width: "100%",
    paddingHorizontal: 26,
    paddingTop: 32,
  },
  content: {
    gap: 20,
  },
  title: {
    fontSize: 18,
  },
  chat: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  requestsContainer: {},
});
