import ReactXnft, { Text, View, SOLANA_CONNECT } from "react-xnft";

//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on(SOLANA_CONNECT, () => {
  // no-op
});

export function App() {
  return (
    <View>
      <Text>Hello, World!</Text>
    </View>
  );
}
