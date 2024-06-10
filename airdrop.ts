import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

// Importo la chiave privata del wallet che ho salvato dopo aver eseguito il comando "yarn keygen"
import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// creo una nuova connessione con il cluster di devnet di Solana
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async() => {
    const balance = await connection.getBalance(keypair.publicKey);
    const pubblicKey = keypair.publicKey;
    console.log("BALANCE => " + balance);
    console.log("PUBLIC KEY => " + pubblicKey);
})();


/*
    requestAirdrop:

    requestAirdrop(
        to: PublicKey, 
        lamports: number
    ): Promise<TransactionSignature>;

    - to: Indirizzo del wallet a cui inviare i fondi
    - lamports: Quantità di SOL richiesta (1 SOL = 1_000_000_000 LAMPORTS)

*/

(async () => {
    try {
        
        // richiedo un airdrop di 1 SOL al nostro wallet utilizzando il metodo requestAirdrop
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      // Indirizzo del wallet a cui inviare i fondi
            3 * LAMPORTS_PER_SOL    // Quantità di SOL richiesta (1 SOL = 1_000_000_000 LAMPORTS)
        );

        // Attndo la conferma della transazione e poi loggo il link alla transazione sull'explorer di Solana per vedere se è tutto ok
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();
