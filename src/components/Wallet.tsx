import React, {  useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "wallet-adapter-react-xnft/lib/cjs";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import './bufferFill'

export const DEFAULT_ENDPOINT =
  window.xnft?.solana.connection?.rpcEndpoint || "https://rpc.helius.xyz/?api-key=6b1ccd35-ba2d-472a-8f54-9ac2c3c40b8b";


// Default styles that can be overridden by your app

export const Wallet = ({ children }) => {
 // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
 const network = WalletAdapterNetwork.Mainnet;

 const wallets = useMemo(
     () => [
         /**
          * Wallets that implement either of these standards will be available automatically.
          *
          *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
          *     (https://github.com/solana-mobile/mobile-wallet-adapter)
          *   - Solana Wallet Standard
          *     (https://github.com/solana-labs/wallet-standard)
          *
          * If you wish to support a wallet that supports neither of those standards,
          * instantiate its legacy wallet adapter here. Common legacy adapters can be found
          * in the npm package `@solana/wallet-adapter-wallets`.
          */
     ],
     // eslint-disable-next-line react-hooks/exhaustive-deps
     [network]
 );

  return (
    <ConnectionProvider endpoint={DEFAULT_ENDPOINT}>
      <WalletProvider wallets={[window.xnft?.solana]} autoConnect >
        {children}
        </WalletProvider>
        </ConnectionProvider>
  );
};
