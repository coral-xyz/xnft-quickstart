import React from "react";
import { Text, View } from "react-native";

import { Screen } from "../components/Screen";

export function HomeScreen() {
  return (
    <Screen>
      <View>
        <Text>{'Hello world, this was made with <3 by Hxro :)'}</Text>
      </View>
    </Screen>
  );
}
