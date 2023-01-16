import { Text } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";

export function HomeScreen() {
  return (
    <Screen>
      <Text style={tw`mb-4`}>Hello World, from Hxro :) </Text>
    </Screen>
  );
}
