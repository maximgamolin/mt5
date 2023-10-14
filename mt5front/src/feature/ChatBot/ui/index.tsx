import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { API } from "../../../API";
import { BankingOperation, Branch } from "../../../API/types";
import { COLORS } from "../../../shared/constants";
import { Button } from "../../../shared/ui/Button";
import { getCurrentTime, getCurrentWeekDay } from "../../map/api";
import {
  AVAILABLE_OPERATIONS,
  MESSAGES,
  POSSIBLE_USER_REQUESTS,
} from "../contstants";
import { ChatBotMsg } from "./ChatBotMsg";
import { SuitableBranch } from "./SuitableBranch";

const api = new API();

enum ChatStages {
  Init,
  First,
  Second,
  Third,
  Fourth,
}

export const ChatBot = () => {
  const [stage, setStage] = useState<ChatStages>(ChatStages.Init);
  const [suitableBranches, setSuitableBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<Animated.ScrollView>(null);

  const getSuitableBranches = async (operation: BankingOperation) => {
    setStage(ChatStages.Second);
    setLoading(true);
    try {
      const branches = await api.getBranches({
        operation,
        limit: 5,
        current_day: getCurrentWeekDay(),
        current_time: getCurrentTime(),
      });
      setSuitableBranches(branches);
      setStage(ChatStages.Third);
    } catch (e) {
      console.error("Error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (suitableBranches.length) {
      setTimeout(() => {
        listRef.current.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [suitableBranches.length]);

  return (
    <Animated.ScrollView
      ref={listRef}
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
                onPress={() => setStage(ChatStages.First)}
              />
            );
          })}
        </View>
        {stage >= ChatStages.First && (
          <>
            <ChatBotMsg msg={MESSAGES[1]} />
            <Animated.View
              entering={FadeInLeft}
              style={styles.requestsContainer}
            >
              {AVAILABLE_OPERATIONS.map((o, i) => {
                return (
                  <Button
                    key={i}
                    title={o.name}
                    style={styles.requestBtn}
                    onPress={() => getSuitableBranches(o.slug)}
                  />
                );
              })}
            </Animated.View>
          </>
        )}

        {stage >= ChatStages.Second && <ChatBotMsg msg={MESSAGES[2]} />}
        {stage >= ChatStages.Third && (
          <>
            <ChatBotMsg msg={MESSAGES[3]} />
            {suitableBranches.map((b) => (
              <SuitableBranch branch={b} />
            ))}
          </>
        )}
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
    // flex: 1,
    minHeight: "100%",
    paddingBottom: 80,
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
