import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { categories } from "@/assets/data/home";

const Catagories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {categories.map((category, index) => (
        <View style={styles.categoryCard} key={index}>
          <Image source={category.img} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    marginEnd: 16,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    borderRadius: 4,
  },
  categoryText: {
    padding: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Catagories;
