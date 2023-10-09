import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Help = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <AntDesign name="tool" size={40} color="black" />
      <Text className="text-md font-black">
        This page is currently under construction.
      </Text>
    </View>
  );
};

export default Help;
