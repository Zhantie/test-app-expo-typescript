import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { useNavigation } from "expo-router";
import categories from "../../assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

/* The `interface Category` is defining the structure of an object that represents a category. It has
three properties: `name`, `count`, and `checked`. */
interface Category {
  name: string;
  count: number;
  checked: boolean;
}


/* The `ItemBox` component is a functional component that renders a group of `TouchableOpacity`
components with icons and text. It is used as the `ListHeaderComponent` in the `FlatList` component
in the `Filter` component. */
const ItemBox = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Hygiene rating</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Dietery</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
  </>
);

/* The `Filter` component is a functional component in TypeScript React. It is responsible for
rendering a filter screen with a list of categories and options for filtering. */
const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  /* The `useAnimatedStyle` hook is used in React Native Reanimated library to create animated styles.
  In this code snippet, `animatedStyles` and `animatedText` are two animated styles that are created
  using the `useAnimatedStyle` hook. */
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  /**
  The handleClearAll function updates the checked property of all items in the items array to false
  and sets the updated array as the new value of the items state.
   */
  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updatedItems);
  };

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        isChecked={items[index].checked}
        fillColor={Colors.primary}
        disableBuiltInState
        unfillColor="#FFF"
        innerIconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
        }}
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        onPress={() => {
          const isChecked = !items[index].checked;

          const updatedItems = items.map((item, i) => {
            if (i === index) {
              return { ...item, checked: isChecked };
            }
            return item;
          });
          setItems(updatedItems);
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
      />
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[styles.outlineButton, animatedStyles]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text style={[animatedText, styles.outlineButtonText]}>Clear all</Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.fullbutton} onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/* The `const styles` object is a collection of CSS styles defined using the `StyleSheet.create` method
from the `react-native` library. Each key-value pair in the object represents a specific style rule
for a component in the `Filter` component. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightgrey,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: -15,
    },
  },
  fullbutton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    height: 56,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 13,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    borderRadius: 8,
    height: 56,
    justifyContent: "center",
    alignItems: "center", 
  },
  outlineButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  

});

export default Filter;
