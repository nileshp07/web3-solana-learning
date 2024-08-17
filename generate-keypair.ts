import dotenv from 'dotenv';
dotenv.config({path: './.env'});
import {Keypair} from '@solana/web3.js';

// const keypair = Keypair.generate();

// console.log(`The public key is: `, keypair.publicKey.toBase58());
// console.log(`The secret key is: `, keypair.secretKey);

//=====================================================================================

// This code from solana course doesn't works

// import {getKeypairFromEnvironment} from '@solana-developers/helpers';

// console.log(process.env.SECRET_KEY);
// const keypair = getKeypairFromEnvironment('SECRET_KEY');

// console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);

//=========================================================================================

// Alternative code :

// console.log(process.env['SECRET_KEY']);
const secret_key_array = JSON.parse(process.env['SECRET_KEY']!);
console.log(secret_key_array);
const byte_array_secret_key = Uint8Array.from(secret_key_array);
const keypair = Keypair.fromSecretKey(byte_array_secret_key);
console.log(keypair);
console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
