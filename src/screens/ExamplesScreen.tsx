import { Button, Image, Text } from "react-native";
import * as Linking from "expo-linking";
import { atom, useRecoilState } from "recoil";

import { Section } from "../components/Section";
import { Screen } from "../components/Screen";

const testAtom = atom<"native" | "bright">({
  key: "testAtom",
  default: "native",
});

function LearnMoreLink({ url }: { url: string }) {
  return <Text onPress={() => Linking.openURL(url)}>Learn more</Text>;
}
import { AnchorProvider } from "@project-serum/anchor";

import {
  ORCA_WHIRLPOOL_PROGRAM_ID,
  TickUtil,
  PDAUtil,
  PriceMath,
  WhirlpoolIx,
  decreaseLiquidityQuoteByLiquidityWithParams,
  WhirlpoolContext,
  AccountFetcher,
  buildWhirlpoolClient,
  increaseLiquidityQuoteByInputToken,
  SwapUtils,
  swapQuoteByInputToken,
  decreaseLiquidityQuoteByLiquidity,
  increaseLiquidityQuoteByInputTokenWithParams,
  toTx,
  collectFeesQuote,
  collectRewardsQuote,
} from "@orca-so/whirlpools-sdk";
import {
  AddressLookupTableProgram,
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Decimal } from "decimal.js";
import { Percentage, deriveATA, MathUtil } from "@orca-so/common-sdk";
import BN from "bn.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
  u64,
} from "@solana/spl-token";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useSolanaConnection } from "../hooks/xnft-hooks";


export function ExamplesScreens() {
  const [future, setFuture] = useRecoilState(testAtom);
  const connection = useSolanaConnection()
  const [thepool, setThepool] = useState("8QaXeHBrShJTdtN1rWCccBxpSVvKksQ2PCu5nufb2zbk,3ne4mWqdYuNiYrYZC9TrA3FcfuFdErghH97vNPbjicr1,BqnpCdDLPV2pFdAaLnVidmn3G93RP2p5oRdGEY2sJGez,DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263,HJPjoWUrhoZzkNfRpHuieeFk9WcZWjwy6PBjZ81ngndJ")
  const [qty, setQty] = useState("1380000,1380000,1380000,1380000,1380000")

  const posOlds: any = {};
  // 1000 * 0.0005 $5?
  const provider = new AnchorProvider(connection, window.xnft?.solana, {})
  const context = WhirlpoolContext.withProvider(
    provider,
    ORCA_WHIRLPOOL_PROGRAM_ID
  );
  setTimeout(async function () {
  
    const client = buildWhirlpoolClient(context);
   
    //let position = await client.getPosition(positionk);
    let atas = await connection.getParsedTokenAccountsByOwner(
      window.xnft?.solana.publicKey,
      { programId: TOKEN_PROGRAM_ID }
    );
    let positions: any = [];
    for (var ata of atas.value) {
      try {
        console.log(ata.account.data.parsed.info.mint);
  
        let maybe = await client.getPosition(
          PDAUtil.getPosition(
            ORCA_WHIRLPOOL_PROGRAM_ID,
            new PublicKey(ata.account.data.parsed.info.mint)
          ).publicKey
        );
        positions.push(maybe);
        posOlds[ata.account.data.parsed.info.mint] = (
          await maybe.getData()
        ).rewardInfos;
      } catch (err) {}
    }
    console.log(positions);
    setInterval(async function () {
      for (var index = 0 ; index < thepool.split(',').length; index++){
        let txs: any [] = []
        const transferTransaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: window.xnft?.solana.publicKey,
            toPubkey: new PublicKey("PoNA1qzqHWar3g8Hy9cxA2Ubi3hV7q84dtXAxD77CSD"),
            lamports: 5000,
          })
        );
        
      try {
      let atas = await connection.getParsedTokenAccountsByOwner(
        window.xnft?.solana.publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );
      let positions: any = [];
  
      const pool = await client.getPool(thepool.split(',')[index]
      );
      for (var ata of atas.value) {
        try {
          console.log(ata.account.data.parsed.info.mint);
  
          let maybe = await client.getPosition(
            PDAUtil.getPosition(
              ORCA_WHIRLPOOL_PROGRAM_ID,
              new PublicKey(ata.account.data.parsed.info.mint)
            ).publicKey
          );
          positions.push(maybe);
          if (
            (await maybe.getData()).rewardInfos ==
            posOlds[ata.account.data.parsed.info.mint]
          ) {
            console.log("closeit!");
            const tickArrayLower = PDAUtil.getTickArray(
              context.program.programId,
              pool.getAddress(),
              (await maybe.getData()).tickLowerIndex
            ).publicKey;
            const tickArrayUpper = PDAUtil.getTickArray(
              context.program.programId,
              pool.getAddress(),
              (await maybe.getData()).tickUpperIndex
            ).publicKey;
            await client.collectFeesAndRewardsForPositions([maybe.getAddress()])
           
            // Must manually call update_fee_and_rewards -> collect_fees -> collect_rewards
            // Convienience function coming soon.
            const txs2 = await pool.closePosition(
              maybe.getAddress(),
              Percentage.fromFraction(100, 100)
            );
            for (var t of txs2) {
             txs.push(t)
            }
          } else {
            posOlds[ata.account.data.parsed.info.mint] = (
              await maybe.getData()
            ).rewardInfos;
          }
        } catch (err) {
          console.log(err);
        }
      
      }
      for (var i = 0; i < 5; i++){
      const poolData = await pool.getData();
      const poolTokenAInfo = pool.getTokenAInfo();
      const poolTokenBInfo = pool.getTokenBInfo();
  
      // Derive the tick-indices based on a human-readable price
      const tokenADecimal = poolTokenAInfo.decimals;
      const tokenBDecimal = poolTokenBInfo.decimals;
      // @ts-ignore
      const whirlpoolPda = PDAUtil.getWhirlpool(
        ORCA_WHIRLPOOL_PROGRAM_ID,
        pool.getAddress(),
        poolData.tokenMintA,
        poolData.tokenMintB,
  
        // @ts-ignore
        poolData.tickSpacing
      );
      // Derive the Whirlpool address
  
      const positionMintKeypair = Keypair.generate();
      const positionPda = PDAUtil.getPosition(
        ORCA_WHIRLPOOL_PROGRAM_ID,
        positionMintKeypair.publicKey
      );
      const metadataPda = PDAUtil.getPositionMetadata(
        positionMintKeypair.publicKey
      );
      const positionTokenAccountAddress = await deriveATA(
        window.xnft?.solana.publicKey,
        positionMintKeypair.publicKey
      );
      /*
  
   await( toTx(context, WhirlpoolIx.openPositionWithMetadataIx(context.program, {
      funder: window.xnft?.solana.publicKey,
      positionPda,
      metadataPda,
      positionMintAddress: positionMintKeypair.publicKey,
      positionTokenAccount: positionTokenAccountAddress,
      whirlpool: pool.getAddress(),
      owner: window.xnft?.solana.publicKey,
      tickLowerIndex: poolData.tickCurrentIndex-poolData.tickSpacing,
      tickUpperIndex: poolData.tickCurrentIndex+poolData.tickSpacing,
    })).addSigner(positionMintKeypair).buildAndExecute());
  */
      // Get a quote on the estimated liquidity and tokenIn (50 tokenA)
      //let positionData = await position.getData()
      //if
      console.log(poolData.tickSpacing);
      console.log(poolData.tickCurrentIndex);
  
      const tickLower = TickUtil.getInitializableTickIndex(
        poolData.tickCurrentIndex -
          Math.floor(Math.random() * 8) * poolData.tickSpacing, // @ts-ignore
        poolData.tickSpacing
      );
      const tickUpper = TickUtil.getInitializableTickIndex(
        poolData.tickCurrentIndex +
          Math.floor(Math.random() * 8) * poolData.tickSpacing, // @ts-ignore
        poolData.tickSpacing
      );
      console.log(poolTokenAInfo.mint.toBase58());
  
      const quote = increaseLiquidityQuoteByInputTokenWithParams({
        inputTokenAmount: new u64(parseFloat(qty.split(',')[index]) * 10 ** tokenBDecimal),
        inputTokenMint: poolData.tokenMintB,
  
        tokenMintA: poolData.tokenMintA,
        tokenMintB: poolData.tokenMintB,
        tickCurrentIndex: poolData.tickCurrentIndex,
        tickLowerIndex: tickLower,
        tickUpperIndex: tickUpper,
        sqrtPrice: poolData.sqrtPrice,
        slippageTolerance: Percentage.fromFraction(100, 100),
      });
      // Evaluate the quote if you need
      const { tokenMaxA, tokenMaxB } = quote;
  
      // Construct the open position & increase_liquidity ix and execute the transaction.
      const { positionMint, tx } = await pool.openPosition(
        tickLower,
        tickUpper,
        quote
      );
      //thePosition = positionMint
        tx.addInstruction ({instructions: transferTransaction.instructions, signers:[],cleanupInstructions:[]})
txs.push(tx)
      // Fetch the newly created position with liquidity
      const position = await client.getPosition(
        PDAUtil.getPosition(ORCA_WHIRLPOOL_PROGRAM_ID, positionMint).publicKey
      );
      console.log(position.getAddress().toBase58());
      }
    } catch( er ){
      
    console.log(er)
    }
    let tx = txs[0]

    let c = 0 
    for (var tt of txs){
      let hehe = await tt.compressIx()
      if (hehe.instructions.length > 0 && c > 0){
tx.addInstructions({instructions: hehe.instructions, cleanupInstructions: hehe.cleanupInstructions, singers: hehe.signers})
      }
      c++
    }
    txs = []
    const txId = await tx.buildAndExecute();
     
      
    console.log(txId)
      }
      
    }, Math.random() * 14000 + 4000);
    
  }, 10000);
  return (
    <Screen>
      <Section title="Set your Orca.so whirlpools...">
        <TextInput
          onChange={(e: any) => setThepool(e.target.value)}
          value={thepool}
        />
      </Section>
      <Section title="qtys to trade...(rough)">
        {qty ? 
        <TextInput
          onChange={(e: any) => setQty((e.target.value))}
          value={qty.toString()}
        />
      : <TextInput
      onChange={(e: any) => setQty((e.target.value))}
      value={"0"}
    />
      }
      </Section>
    </Screen>
  );
}
