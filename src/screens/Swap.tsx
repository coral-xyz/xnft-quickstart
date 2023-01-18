
import React from "react";
import SwapDisplay from '../components/Swapidoodle';
import "../components/bufferFill";
import { Providers } from "../components/Providers";

const Home = () => {
  return (
    <Providers>
       <SwapDisplay name={"BONKers"} image={"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6dhTynDkYsVM7cbF7TKfC9DWB636TcEM935fq7JzL2ES/logo.png"} description={"Loco hombre..."} />
       </Providers>
  );
};

export default Home;
