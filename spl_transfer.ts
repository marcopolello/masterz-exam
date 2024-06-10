import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
 } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
//mint token creato con spl_init.ts
const mint = new PublicKey("CjNccD8mKCVUbdxLx6eLCZ62UMeMEGq3qx44ctepMV7m");
//il token account a cui voglio trasferire i token
//Associated Token Account
const fromAta = new PublicKey("eGZSiz7Lc6vy8vXsThkewyufwcZV1gXcPMUjzbawNxE");

//nuova keypair per simulare il trasferimento
const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    //1 token da trasferire
    const amount = 10e5;

    await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair,
        amount
    );

    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());

    const balancetoAta = await connection.getBalance(toAta);
    console.log("BALANCE TO TOKEN ACCOUNT => " + balancetoAta);
})()