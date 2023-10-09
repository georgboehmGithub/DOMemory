import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { fetchCardSetById, updatePersonalBest } from "../database";
import { AntDesign } from "@expo/vector-icons";
import ProgressBar from "react-native-progress/Bar";

const Session = ({ route }) => {
  const { cards, id } = route.params;
  const navigation = useNavigation();
  // TODO: IMPLEMENT SHUFFLING-
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [previousPersonalBest, setPreviousPersonalBest] = useState(0);
  const [sessionPersonalBest, setSessionPersonalBest] = useState(0);

  const handleSessionComplete = () => {
    // Compare with previous personal best
    if (sessionPersonalBest > previousPersonalBest) {
      // Update the new personal best in the database
      updatePersonalBest(id, sessionPersonalBest, () => {
        // Update the previousPersonalBest state
        setPreviousPersonalBest(sessionPersonalBest);
      });
    }
    navigation.navigate("HomeStack");
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
    <View style={styles.container}>
      {currentCardIndex < shuffledCards.length && (
        <ProgressBar
          progress={currentCardIndex / shuffledCards.length}
          width={200}
          height={20}
          color="mediumturquoise"
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
                style={styles.flipButton}
                onPress={() => setCardIsFlipped(true)}
              >
                <AntDesign name="swap" size={28} color="white" />
              </TouchableOpacity>
            )}
            {cardIsFlipped && (
              <>
                <TouchableOpacity
                  style={styles.correctButton}
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
                  style={styles.wrongButton}
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
              <Text style={styles.pogText}>POG NEW PB:</Text>
              <Text style={styles.pogPersonalBest}>{`${
                sessionPersonalBest * 100
              }%`}</Text>
            </>
          ) : (
            <>
              <Text>Session score:</Text>
              <Text style={styles.pogPersonalBest}>
                {`${sessionPersonalBest * 100}%`}
              </Text>
              <Text>All time personal best:</Text>
              <Text style={styles.pogPersonalBest}>
                {`${previousPersonalBest * 100}%`}
              </Text>
              <Text>Almost there!</Text>
            </>
          )}
          <Button title="Finish Session" onPress={handleSessionComplete} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sessionEndScreen: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },

  pogText: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: "bold", // Apply bold font weight
    color: "#ff00ff", // Apply your desired text color
    // Add any other styling you desire
  },
  pogPersonalBest: {
    fontSize: 36, // Adjust the font size as needed
    fontWeight: "bold", // Apply bold font weight
    color: "purple", // Apply your desired text color
    marginBottom: 30,
    // Add any other styling you desire
  },
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  centeredContainer: {
    alignItems: "center", // Center horizontally
    width: "80%",
    height: "90%",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center", // Center vertically
    gap: 100,
  },
  flipButton: {
    flex: 1, // Equal flex for all buttons in the row
    alignItems: "center",
    backgroundColor: "#696969", // Example background color for buttons
    padding: 10,
    borderRadius: 30,
  },
  correctButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#32cd32",
    justifyContent: "center",
    padding: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  wrongButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#dc143c",
    justifyContent: "center",
    padding: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  buttonText: {
    color: "white", // Text color for buttons
    fontWeight: "bold",
  },
});

export default Session;
