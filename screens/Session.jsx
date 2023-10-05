import { Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { fetchCardSetById, updatePersonalBest } from "../database";

const Session = ({ route }) => {
  const { cards, id } = route.params;
  const navigation = useNavigation();
  // TODO: IMPLEMENT SHUFFLING
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [previousPersonalBest, setPreviousPersonalBest] = useState(0);

  const handleSessionComplete = () => {
    // Calculate success rate
    const totalAnswers = correctAnswers + wrongAnswers;
    const successRate =
      Math.round(
        (totalAnswers === 0 ? 0 : correctAnswers / totalAnswers) * 100
      ) / 100;

    // Compare with previous personal best
    if (successRate > previousPersonalBest) {
      // Update the new personal best in the database
      updatePersonalBest(id, successRate, () => {
        // Update the previousPersonalBest state
        setPreviousPersonalBest(successRate);
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
    <View>
      <Text>
        Wrong: {wrongAnswers} | Correct: {correctAnswers}
      </Text>
      {currentCardIndex < shuffledCards.length && (
        <>
          <Card
            cardContent={
              !cardIsFlipped
                ? shuffledCards[currentCardIndex].question
                : shuffledCards[currentCardIndex].answer
            }
          />
          {!cardIsFlipped && (
            <Button
              title="Flip"
              onPress={() => setCardIsFlipped(true)}
            ></Button>
          )}
          {cardIsFlipped && (
            <>
              <Button
                title="CORRECT"
                onPress={() => {
                  setCardIsFlipped(false);
                  setCorrectAnswers(correctAnswers + 1);
                  setCurrentCardIndex(currentCardIndex + 1);
                }}
              />
              <Button
                title="FALSE"
                onPress={() => {
                  setCardIsFlipped(false);
                  setWrongAnswers(wrongAnswers + 1);
                  setCurrentCardIndex(currentCardIndex + 1);
                }}
              />
            </>
          )}
        </>
      )}
      {currentCardIndex === shuffledCards.length && (
        <Button title="Finish Session" onPress={handleSessionComplete} />
      )}
    </View>
  );
};

export default Session;
