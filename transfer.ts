import dotenv from 'dotenv';
dotenv.config({path: './.env'});

import {Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, Keypair} from '@solana/web3.js';
import {getKeypairFromEnvironment} from '@solana-developers/helpers';
import bs58 from 'bs58';

// receivers public key to transfer the sol to
const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
	console.log(`Please provide a public key to send to`);
	process.exit(1);
}

const secret_key_array = JSON.parse(process.env['SECRET_KEY']!);
const byte_array_secret_key = Uint8Array.from(secret_key_array);
const senderKeypair = Keypair.fromSecretKey(byte_array_secret_key);
console.log(senderKeypair.publicKey);

// const senderKeypair = getKeypairFromEnvironment('SECRET_KEY');
// console.log(senderKeypair);

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

console.log(`✅ Loaded our own keypair, the destination public key, and connected to Solana`);

// create a new Transaction object
const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;

// SystemProgram.transfer() returns the instruction for sending SOL from the sender to the recipient.
const sendSolInstruction = SystemProgram.transfer({
	fromPubkey: senderKeypair.publicKey,
	toPubkey,
	lamports: LAMPORTS_TO_SEND,
});

// add the instructions to the transaction
transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `);
console.log(`Transaction signature is ${signature}!`);
