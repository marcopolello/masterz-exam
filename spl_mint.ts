import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    mintTo,
    getOrCreateAssociatedTokenAccount,
 } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
//mint token creato con spl_init.ts
const mint = new PublicKey("CjNccD8mKCVUbdxLx6eLCZ62UMeMEGq3qx44ctepMV7m");

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey,
    );

    const ata = tokenAccount.address;
    console.log("Associated Token Account: ", ata.toBase58());

    //quanti token voglio mintare
    //10 alla sesta quindi 1000000
    const amount = 10e6;

    await mintTo(
        connection,
        keypair,
        mint,
        ata,
        keypair.publicKey,
        amount
    );

    console.log("Minted", amount, "to", ata.toBase58());

})()