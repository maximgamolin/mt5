import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { API } from "../../../API";
import { BankingOperation, Branch, Day } from "../../../API/types";
import { COLORS } from "../../../shared/constants";
import { Button } from "../../../shared/ui/Button";
import { getCurrentPosition } from "../../map/api";
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

export interface ChatBotProps {
  openBranchData: (params: { id: Branch["id"] }) => void;
}

export const ChatBot = ({ openBranchData }: ChatBotProps) => {
  const [stage, setStage] = useState<ChatStages>(ChatStages.Init);
  const [suitableBranches, setSuitableBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<Animated.ScrollView>(null);

  const getSuitableBranches = async (operation: BankingOperation) => {
    setStage(ChatStages.Second);
    setLoading(true);
    try {
      const loc = await getCurrentPosition();
      const branches = await api.getBranches({
        operation,
        limit: 5,
        current_day: Day.Monday,
        current_time: "12:00",
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      });
      setSuitableBranches(branches);
      setStage(ChatStages.Third);
    } catch (e) {
      console.error("Error", e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSuitableBranch = async (id: Branch["id"]) => {
    openBranchData({ id });
  };

  useEffect(() => {
    if (suitableBranches.length) {
      setTimeout(() => {
        listRef.current.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [suitableBranches.length]);

  return (
    <BottomSheetScrollView
      ref={listRef}
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
              <SuitableBranch branch={b} onPress={handleOpenSuitableBranch} />
            ))}
          </>
        )}
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 26,
    backgroundColor: COLORS.white,
  },
  content: {
    gap: 20,
    paddingBottom: 32,
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
