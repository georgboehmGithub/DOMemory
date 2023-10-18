import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { fetchCardSetById, updatePersonalBest } from "../database";
import { AntDesign } from "@expo/vector-icons";
import ProgressBar from "react-native-progress/Bar";
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";

const Session = ({ route }) => {
  const { cards, id } = route.params;
  const navigation = useNavigation();
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [previousPersonalBest, setPreviousPersonalBest] = useState(0);
  const [sessionPersonalBest, setSessionPersonalBest] = useState(0);

  const { theme } = useTheme(); // Use the useTheme hook
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;

  const handleSessionComplete = () => {
    // Compare with previous personal best
    if (sessionPersonalBest > previousPersonalBest) {
      // Update the new personal best in the database
      updatePersonalBest(id, sessionPersonalBest, () => {
        // Update the previousPersonalBest state
        setPreviousPersonalBest(sessionPersonalBest);
      });
    }
    navigation.navigate("OverviewStack");
  };

  useEffect(() => {
    // Fetch the previous personal best when the component mounts
    fetchCardSetById(id, (data) => {
      if (data.length > 0) {
        setPreviousPersonalBest(data[0].personalBest);
      }
    });
  }, [id]);

  return (
    <View style={usedTheme.SESSION.container}>
      {currentCardIndex < shuffledCards.length && (
        <ProgressBar
          progress={currentCardIndex / shuffledCards.length}
          width={200}
          height={20}
          color={usedTheme.SESSION.progressBar.color}
        />
      )}

      {currentCardIndex < shuffledCards.length && (
        <View style={styles.centeredContainer}>
          <Card
            alignTextCenter={true}
            cardContent={
              !cardIsFlipped
                ? shuffledCards[currentCardIndex].question
                : shuffledCards[currentCardIndex].answer
            }
          />
          <View style={styles.buttonContainer}>
            {!cardIsFlipped && (
              <TouchableOpacity
                style={usedTheme.SESSION.flipButton}
                onPress={() => setCardIsFlipped(true)}
              >
                <AntDesign
                  name="swap"
                  size={28}
                  color={usedTheme.SESSION.flipButtonIcon.color}
                />
              </TouchableOpacity>
            )}
            {cardIsFlipped && (
              <>
                <TouchableOpacity
                  style={usedTheme.SESSION.correctButton}
                  onPress={() => {
                    setCardIsFlipped(false);
                    setCorrectAnswers(correctAnswers + 1);
                    setCurrentCardIndex(currentCardIndex + 1);
                    if (currentCardIndex + 1 >= shuffledCards.length) {
                      const totalAnswers = correctAnswers + wrongAnswers;
                      const successRate =
                        Math.round(
                          (totalAnswers === 0
                            ? 0
                            : correctAnswers / totalAnswers) * 100
                        ) / 100;
                      setSessionPersonalBest(successRate);
                    }
                  }}
                >
                  <AntDesign name="check" size={36} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={usedTheme.SESSION.wrongButton}
                  onPress={() => {
                    setCardIsFlipped(false);
                    setWrongAnswers(wrongAnswers + 1);
                    setCurrentCardIndex(currentCardIndex + 1);
                    if (currentCardIndex + 1 >= shuffledCards.length) {
                      const totalAnswers = correctAnswers + wrongAnswers;
                      const successRate =
                        Math.round(
                          (totalAnswers === 0
                            ? 0
                            : correctAnswers / totalAnswers) * 100
                        ) / 100;
                      setSessionPersonalBest(successRate);
                    }
                  }}
                >
                  <AntDesign name="close" size={36} color="white" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
      {currentCardIndex === shuffledCards.length && (
        <View style={styles.sessionEndScreen}>
          {sessionPersonalBest > previousPersonalBest ? (
            <>
              <Text style={usedTheme.SESSION.pogText}>POG NEW PB:</Text>
              <Text style={usedTheme.SESSION.pogPersonalBest}>{`${
                sessionPersonalBest * 100
              }%`}</Text>
            </>
          ) : (
            <>
              <Text style={usedTheme.SESSION.pogText}>Session score:</Text>
              <Text style={usedTheme.SESSION.pogPersonalBest}>
                {`${sessionPersonalBest * 100}%`}
              </Text>
              <Text style={usedTheme.SESSION.text}>
                All time personal best:
              </Text>
              <Text style={usedTheme.SESSION.pogPersonalBest}>
                {`${previousPersonalBest * 100}%`}
              </Text>
              <Text style={usedTheme.SESSION.text}>Almost there!</Text>
            </>
          )}
          <Button
            color="navy"
            title="Finish Session"
            onPress={handleSessionComplete}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sessionEndScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    alignItems: "center",
    width: "80%",
    height: "90%",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 100,
  },
});

export default Session;
