import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { COLORS } from "../../../shared/constants";
import { Button } from "../../../shared/ui/Button";
import { MESSAGES, POSSIBLE_USER_REQUESTS } from "../contstants";
import { ChatBotMsg } from "./ChatBotMsg";

export const ChatBot = () => {
  return (
    <Animated.ScrollView
      entering={FadeInDown}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        Ответьте на несколько вопросов, и мы подберем отделение, где проблему
        смогут решить быстрее всего:
      </Text>
      <View style={styles.chat}>
        <ChatBotMsg msg={MESSAGES[0]} />
        <View style={styles.requestsContainer}>
          {POSSIBLE_USER_REQUESTS.map((o, i) => {
            return (
              <Button
                disabled={o !== "Найти отделение"}
                key={i}
                title={o}
                style={styles.requestBtn}
              />
            );
          })}
        </View>
        <ChatBotMsg msg={MESSAGES[1]} />
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingBottom: 32,
    paddingHorizontal: 26,
    paddingTop: 32,
    backgroundColor: COLORS.white,
    height: "80%",
  },
  content: {
    gap: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  chat: {
    alignItems: "flex-end",
    flex: 1,
    gap: 16,
  },
  requestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-end",
  },
  requestBtn: {
    paddingHorizontal: 19,
    flex: undefined,
  },
});
