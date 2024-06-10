import { Keypair } from "@solana/web3.js";

// Genero la nuova keypair
const keypair = Keypair.generate();

// Ora Console.logghiamo l'indirizzo del wallet e la chiave privata in modo da poterli salvare in un file .json
console.log(`Hai generato il tuo nuovo wallet: ${keypair.publicKey.toBase58()} \n\n Per salvare il tuo wallet, copia e incolla il seguente JSON in un file: [${keypair.secretKey}]`)

