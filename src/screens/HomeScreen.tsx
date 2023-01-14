import { Text, FlatList } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";

export function HomeScreen() {
  const features = [
    "tailwind",
    "recoil",
    "native styling",
    "fetching code from an API",
    "using a FlatList to render data",
    "Image for both remote & local images",
    "custom fonts",
    "sign a transaction / message",
    "theme hook with light/dark support",
  ];

  return (
    <Screen>
      <Text style={tw`mb-4`}>
        Press 'Trade,' enter your whirlpool pool id - you cna find it by clicking a whirlpool on orca.so and it is in the url bar :D by default it autobalances BONK/SOL.
      </Text>

      <Text style={tw`mb-4`}>   
      
      Wat? 

      </Text>

      <Text style={tw`mb-4`}>   
      
      Whenever it notices that a position it has opened has become unprofitable, it'll close that position and then open a series of new positions. Nice!
<br /> <br /> separate values by commas...
      </Text>

    </Screen>
  );
}
