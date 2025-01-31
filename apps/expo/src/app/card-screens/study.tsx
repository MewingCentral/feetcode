import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { RadixIcon } from "radix-ui-react-native-icons";

import { api } from "~/utils/api";
import Colors from "~/utils/colors";

export default function StudySet() {
  const { pId, pName } = useLocalSearchParams();
  console.log("packId in study pg: ", pId);
  const packId = pId ? +pId : -1;
  const studyTitle = pName && typeof pName === "string" ? pName : "";
  console.log("study title should be ", studyTitle);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: studyTitle,
    });
  }, []);

  const cards = api.flashcards.readCards.useQuery(packId);

  if (cards && !cards.isLoading && !cards.isError) {
    console.log(cards.data);
  }

  const [curCard, setCurCard] = useState(0);
  const [showingDef, setShowingDef] = useState(true);

  return (
    <View style={[styles.screenContainer]}>
      {cards && cards.data && !cards.isLoading && !cards.isError ? (
        cards.data.length > 0 ? (
          <>
            <Pressable
              style={[styles.cardContainer]}
              onPress={() => {
                showingDef ? setShowingDef(false) : setShowingDef(true);
              }}
            >
              <Text style={[styles.defText]}>
                {cards?.data[curCard] &&
                  (showingDef
                    ? cards.data[curCard]?.back
                    : cards.data[curCard]?.front)}
              </Text>
            </Pressable>

            <View style={[styles.cardNavContainer]}>
              <Pressable
                onPress={() => {
                  const nextCard = curCard - 1;
                  if (nextCard >= 0) {
                    setCurCard(nextCard);
                    setShowingDef(true);
                  }
                }}
              >
                <RadixIcon
                  name="arrow-left"
                  size={40}
                  color={Colors.dark_secondary_text}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  const nextCard = curCard + 1;
                  if (nextCard < cards.data.length) {
                    setCurCard(nextCard);
                    setShowingDef(true);
                  }
                }}
              >
                <RadixIcon
                  name="arrow-right"
                  size={40}
                  color={Colors.dark_secondary_text}
                />
              </Pressable>
            </View>

            {/* Progress Bar */}
            <View style={[styles.progressContainer]}>
              <Text style={[styles.progressText]}>
                {curCard + 1}/{cards.data.length}
              </Text>
              <Progress.Bar
                style={[styles.progressBar]}
                progress={(curCard + 1) / cards.data.length}
                height={10}
                width={300}
                unfilledColor={Colors.dark_secondary_text}
                color={Colors.dark_primary_text}
                borderWidth={0}
              />
            </View>
          </>
        ) : (
          <Text style={[styles.noCardsText]}>This set has no cards!</Text>
        )
      ) : (
        <Text>Error retrieving cards.</Text>
      )}
    </View>
    // Todo error text above
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.dark_sec,
    borderColor: "rgba(148, 163, 184, 0.50)",
    borderWidth: 2,
    borderRadius: 10,
    height: 300,
    width: 300,
  },
  cardNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: 300,
  },
  shuffleContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    justifyContent: "space-between",
    height: 45,
  },
  defText: {
    marginHorizontal: 25,
    textAlign: "center",
    fontSize: 20,
    color: Colors.dark_primary_text,
  },
  progressText: {
    textAlign: "center",
    fontSize: 22,
    color: Colors.dark_secondary_text,
  },
  progressBar: {
    flexDirection: "column",
    alignContent: "flex-end",
  },
  noCardsText: {
    fontSize: 30,
    color: Colors.dark_primary_text,
  },
  delYellowBorder: {
    borderWidth: 1,
    borderColor: "yellow",
  },
});
