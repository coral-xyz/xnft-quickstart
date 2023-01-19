
import React from "react";  
import Iframe from 'react-iframe'

import "../components/bufferFill";
import { useReady } from '../hooks/xnft-hooks';
const Home = () => {
  const ready = useReady()
  return (
    <div>
  <Iframe url="https://strata123.vercel.app//swap/4Vyh36V9dYQdqUtxWc2nEzvezLjKn5qW5rPWACo8wddF"
        width="100%"
        height="800px"
        id=""
        sandbox={["allow-forms", "allow-scripts", "allow-same-origin"]}
        className=""
        display="block"
        position="relative"/>

               </div>
  )
};

export default Home;
