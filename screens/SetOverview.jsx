import React from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";

const SetOverview = ({ route }) => {
  const { title, group, numCards, personalBest } = route.params;

  const cards1 = [
    { id: 1, question: "1+1 = ?", answer: "2" },
    { id: 2, question: "What is the capital of France?", answer: "Paris" },
    { id: 3, question: "How many continents are there?", answer: "7" },
    {
      id: 4,
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    {
      id: 5,
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: "William Shakespeare",
    },
    { id: 6, question: "What is the chemical symbol for gold?", answer: "Au" },
    {
      id: 7,
      question: "What is the largest mammal in the world?",
      answer: "Blue Whale",
    },
    {
      id: 8,
      question: "Which gas do plants absorb from the atmosphere?",
      answer: "Carbon dioxide",
    },
    { id: 9, question: "What is the square root of 144?", answer: "12" },
    {
      id: 10,
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
    },
    {
      id: 11,
      question: "What is the freezing point of water in Celsius?",
      answer: "0°C",
    },
    {
      id: 12,
      question: "Which planet is known as the 'Red Planet'?",
      answer: "Mars",
    },
    {
      id: 13,
      question: "What is the national flower of Japan?",
      answer: "Cherry blossom",
    },
    {
      id: 14,
      question: "How many bones are there in the adult human body?",
      answer: "206",
    },
    {
      id: 15,
      question: "Who wrote 'The Great Gatsby'?",
      answer: "F. Scott Fitzgerald",
    },
  ];

  const cards = cards1.concat(cards1);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.cardContainer}
      // onPress={() => navigation.navigate("SetOverview", item)}
    >
      <Text>
        {item.id + " | "}
        {item.question + " | "}
        {item.answer + " | "}
      </Text>
    </Pressable>
  );

  const styles = StyleSheet.create({
    cardContainer: {
      // margin: 8,
      // padding: 16,
      width: "100%",
      borderWidth: 1, // Add border width
      borderColor: "grey", // Add border color
    },
  });

  return (
    <View>
      <FlatList
        data={cards}
        numColumns={1}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
  // return (
  //   <View className="">
  //     <Text className="text-lg font-black">Set Overview: {title}</Text>
  //   </View>
  // );
};

export default SetOverview;
