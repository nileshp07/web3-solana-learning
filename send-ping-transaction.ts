import dotenv from 'dotenv';
dotenv.config({path: './.env'});

import * as web3 from '@solana/web3.js';
import {airdropIfRequired} from '@solana-developers/helpers';

// getting the keypair of the sender(us who is writing this code) from the .env based on his secret key
const secret_key_array = JSON.parse(process.env['SECRET_KEY']!);
const byte_array_secret_key = Uint8Array.from(secret_key_array);
const senderKeypair = web3.Keypair.fromSecretKey(byte_array_secret_key);

const payer = senderKeypair;

// connecting to the devnet of solana
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

// airdropping ourselves (sender) some sol if required
const newBalance = await airdropIfRequired(
	connection,
	payer.publicKey,
	1 * web3.LAMPORTS_PER_SOL,
	0.5 * web3.LAMPORTS_PER_SOL
);

const PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const programDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

// creating an instruction to add to the transaction
const instruction = new web3.TransactionInstruction({
	keys: [
		{
			pubkey: programDataId,
			isSigner: false,
			isWritable: true,
		},
	],
	programId,
});

transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);

console.log(`✅ Transaction completed! Signature is ${signature}`);
console.log(
	`You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
);
