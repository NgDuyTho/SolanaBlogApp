import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program, Idl, Wallet as AnchorWallet } from '@project-serum/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import idl from './idl.json';

// Type assertion utility function
const isAnchorWallet = (wallet: WalletContextState): wallet is AnchorWallet => {
    return 'signTransaction' in wallet && 'signAllTransactions' in wallet && 'publicKey' in wallet;
};


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

export { getProvider, getProgram, isAnchorWallet };
