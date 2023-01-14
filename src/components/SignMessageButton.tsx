import { Button, Text } from "react-native";

import { useReducer } from "react";

enum Status {
  IDLE,
  SIGNING,
  SIGNED,
  ERROR,
}

type State = {
  status: Status;
  buttonLabel: string;
  signature?: string;
};

type Action =
  | { type: Status.SIGNING }
  | { type: Status.SIGNED; signature: string }
  | { type: Status.ERROR };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case Status.SIGNING:
      return {
        status: Status.SIGNING,
        buttonLabel: "signing...",
      };
    case Status.SIGNED:
      return {
        status: Status.SIGNED,
        buttonLabel: "Sign another Message",
        signature: action.signature,
      };
    case Status.ERROR:
      return {
        status: Status.ERROR,
        buttonLabel: "Error Signing - Try again?",
      };
    default:
      return state;
  }
}

export function SignMessageButton() {
  const [state, dispatch] = useReducer(reducer, {
    status: Status.IDLE,
    buttonLabel: "Sign a Message",
  });

  return (
    <>
      <Button
        title={state.buttonLabel}
        color={state.status === Status.ERROR ? "red" : undefined}
        onPress={() => {
          dispatch({ type: Status.SIGNING });

          window.xnft.solana
            .signMessage(
              Buffer.from(`The time is: ${new Date().toLocaleTimeString()}`)
            )
            .then((signature: Uint8Array) => {
              dispatch({
                type: Status.SIGNED,
                signature: Buffer.from(signature).toString("base64"),
              });
            })
            .catch(() => {
              dispatch({ type: Status.ERROR });
            });
        }}
        disabled={state.status === Status.SIGNING}
      />
      {state.status === Status.SIGNED && <Text>{state.signature}</Text>}
    </>
  );
}
