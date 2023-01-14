import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import tw from "twrnc";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";
import { TokenRow } from "../components/TokenRow";

type RootStackParamList = {
  List: {};
  Detail: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

function FullScreenLoadingIndicator() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}

function Detail({
  route,
}: NativeStackScreenProps<RootStackParamList, "Detail">) {

  return (
    <Screen>
      <View style={tw`bg-yellow-100 items-center justify-center p-4`}>
       
        <Text style={tw`font-bold text-lg`}>twitter</Text>
        <Text style={tw`font-bold text-lg`}>@staccoverflow</Text>
      </View>
    </Screen>
  );
}


export const TokenListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
      }}
    >
     
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "Token Detail" }}
      />
    </Stack.Navigator>
  );
};
