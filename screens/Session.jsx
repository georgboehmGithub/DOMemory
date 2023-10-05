import { Text, View, Button } from "react-native";
import React, { useState } from "react";
import Card from "../components/Card";
const Session = ({ route }) => {
  const { cards, id } = route.params;
  // TODO: IMPLEMENT SHUFFLING
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
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
    </View>
  );
};

export default Session;
