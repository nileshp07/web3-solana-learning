import {Connection, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) throw new Error('Please provide a public key to check the balance of!');

let publicKey;

// check if the supplied public key is valid or not at the time of creation of publickey instance
try {
	publicKey = new PublicKey(suppliedPublicKey);
} catch (error) {
	console.log(error.message);
	process.exit(1); // Exit the process since the key is invalid
}

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

try {
	if (PublicKey.isOnCurve(publicKey.toBytes())) {
		const balanceInLamports = await connection.getBalance(publicKey);
		const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
		console.log(`✅ Finished! The balance for the wallet address ${publicKey} is ${balanceInSol} SOL.`);
	} else {
		console.log('Invalid key: The public key is not on the curve.');
	}
} catch (error) {
	console.log('An error occurred:', error.message);
}
