import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program, Idl } from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import idl from './idl.json';

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK!;
const programID = new PublicKey(process.env.NEXT_PUBLIC_SOLANA_PROGRAM_ID!);

const getProvider = (wallet: AnchorWallet) => {
  const connection = new Connection(network, 'processed');
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: 'processed' });
  return provider;
};

const getProgram = (wallet: AnchorWallet) => {
  const provider = getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider);
  return program;
};

export { getProvider, getProgram };
