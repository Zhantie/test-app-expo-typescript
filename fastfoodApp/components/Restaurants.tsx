import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {restaurants.map((restaurant, index) => (
        <Link href={"/"} key={index} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image style={styles.image} source={restaurant.img} />
              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>{restaurant.name}</Text>
                <Text style={{color: Colors.green}}>{restaurant.rating} {restaurant.ratings}</Text>
                <Text style={{color: Colors.medium}}>{restaurant.distance}</Text>
                
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
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
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    flex: 5,
    width: null,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
    borderRadius: 4,
  },
});

export default Restaurants;
