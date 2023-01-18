import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import {
  AnchorWallet,
  loadSwitchboardProgram,
  OracleQueueAccount,
  PermissionAccount,
  ProgramStateAccount,
  VrfAccount,
} from "@switchboard-xyz/switchboard-v2";

export async function loadSwitchboard(
  provider: anchor.AnchorProvider
): Promise<anchor.Program> {
  const switchboardProgram = await loadSwitchboardProgram(
    "devnet",
    provider.connection,
    ((provider as anchor.AnchorProvider).wallet as AnchorWallet).payer
  );

  return switchboardProgram as any;
}

export async function loadVrfContext(
  program: anchor.Program,
  vrfPubkey: PublicKey
): Promise<{
  accounts: {
    vrfAccount: VrfAccount;
    programStateAccount: ProgramStateAccount;
    queueAccount: OracleQueueAccount;
    permissionAccount: PermissionAccount;
  };
  bumps: {
    stateBump: number;
    permissionBump: number;
  };
  publicKeys: {
    vrf: PublicKey;
    vrfEscrow: PublicKey;
    switchboardProgram: PublicKey;
    oracleQueue: PublicKey;
    switchboardProgramState: PublicKey;
    queueAuthority: PublicKey;
    dataBuffer: PublicKey;
    permission: PublicKey;
  };
}> {
  const vrfAccount = new VrfAccount({
    program: program as any,
    publicKey: vrfPubkey,
  });
  const vrf = await vrfAccount.loadData();

  const [programStateAccount, stateBump] = ProgramStateAccount.fromSeed(
    program as any
  );

  const queueAccount = new OracleQueueAccount({
    program: program as any,
    publicKey: vrf.oracleQueue,
  });
  const queue = await queueAccount.loadData();

  const [permissionAccount, permissionBump] = PermissionAccount.fromSeed(
    program as any,
    queue.authority,
    queueAccount.publicKey,
    vrfPubkey
  );

  return {
    accounts: {
      vrfAccount,
      programStateAccount,
      queueAccount,
      permissionAccount,
    },
    bumps: { stateBump, permissionBump },
    publicKeys: {
      vrf: vrfAccount.publicKey,
      vrfEscrow: vrf.escrow,
      switchboardProgram: program.programId,
      oracleQueue: queueAccount.publicKey,
      switchboardProgramState: programStateAccount.publicKey,
      queueAuthority: queue.authority,
      dataBuffer: queue.dataBuffer,
      permission: permissionAccount.publicKey,
    },
  };
}
