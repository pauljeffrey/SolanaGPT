import { LAMPORTS_PER_SOL, PublicKey,  AccountInfo as TokenAccountInfo, Transaction, TransactionSignature , Connection} from "@solana/web3.js";  //Connection,
import initConnection from "./initConnection"
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
// import { Client } from "@solflare-wallet/utl-sdk";
// const utl = new Client();

const { Token } = require('@solana/spl-token');
// import { TokenRegistry , TokenInfo} from '@solana/spl-token-registry';

// import { init } from "next/dist/compiled/webpack/webpack";

type TokenInformation = {
    mint: string;
    amount: string;
  };
  //dv2eQHeP4RFrJZ6UeiZWoc3XTtmtZCUKxxCApCDcRNV
// Test with this public address: dv2eQHeP4RFrJZ6UeiZWoc3XTtmtZCUKxxCApCDcRNV

interface ParsedAccountInfo {
    context: {
        apiVersion: string;
        slot: number;
    };
    value: {
        data: {
            parsed: {
                info: {
                    decimals: number;
                    freezeAuthority: any;
                    isInitialized: boolean;
                    mintAuthority: string;
                    supply: string;
                };
                type: string;
            };
            program: string;
            space: number;
        };
        executable: boolean;
        lamports: number;
        owner: string;
        rentEpoch: number;
        space: number;
    };
}


// async function getTokenInfo(tokenAddress: string) {
//     try {
//         // Initialize the TokenRegistry
//         const registry = new TokenRegistry();

//         // Resolve the token by its mint address
//         const token = await registry.resolveTokenByMintAddress(tokenAddress);

//         // Check if the token exists
//         if (token) {
//             // Extract the symbol and name
//             const symbol = token.symbol;
//             const name = token.name;

//             console.log(`Token Symbol: ${symbol}`);
//             console.log(`Token Name: ${name}`);
//         } else {
//             console.log('Token not found');
//         }
//     } catch (error) {
//         console.error('Error fetching token info:', error);
//     }
// }



// works
export const getBalance = async (address: string) => {
    const connection = initConnection();
    // s1dry9PaLQEdt1mC4fSYi1Rm9DRgjpBPphcG2FKXGEn    E2Ku7bYp8YTFpd7oMerQDeYpuKBFjpP7WyPW34Vg6khS  7rhxnLV8C77o6d8oz26AgK8x8m5ePsdeRawjqvojbjnQ  34t5CmGFfVkdpxQgKbAJKje1NLXa1AdWUerSjnomPgxH
    try { 
    const balance = await connection.getBalance(new PublicKey(address));
    // console.log("Account Balance: ", balance )/// LAMPORTS_PER_SOL)
    return balance / LAMPORTS_PER_SOL;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getAccountInfo = async (address: string) => {
    //TODO: handle human-readable data stored in the account (if the owner program has an Anchor IDL).
    const connection = initConnection();
    try {
        const result = await connection.getAccountInfo(new PublicKey(address));
        const accountInfo = result? `Account Info: ${JSON.stringify(result)}` : "Account not found"
        console.log("Account Info: ", accountInfo)
        return accountInfo
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// works
export const getTransaction = async (address: string, options: object = {}, numOfMessages: number = 10) => {
    //TODO: handle any human-readable information about program instructions (if the programs have Anchor IDLs).
    const connection = initConnection();
   
    try {
        const transactionList = await connection.getConfirmedSignaturesForAddress2(
            new PublicKey(address),
            options
        );
        
        const transactions = transactionList.slice(0, numOfMessages).map(transaction => ({
            Date: transaction.blockTime? new Date(transaction.blockTime * 1000): null,
            Signature: transaction.signature,
            Status: transaction.confirmationStatus
        }));
        console.log("Transaction called: ", JSON.stringify(transactions))
        return JSON.stringify(transactions);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function isNFT(parsedAccountInfo: ParsedAccountInfo): boolean {
    const { info } = parsedAccountInfo.value.data.parsed;

    // Check if the account represents a token mint
    if (parsedAccountInfo.value.data.parsed.type === 'mint') {
        // Check if the number of decimals is suitable for an NFT (usually 0 or 9)
        if (info.decimals === 0 || info.decimals === 9) {
            // Check if the mint is initialized
            if (info.isInitialized) {
                // Check if the mint has a mint authority (indicating it's a unique token)
                if (info.mintAuthority) {
                    // Check if the supply indicates that it's an NFT (usually 1)
                    if (info.supply === '1') {
                        return true; // This is likely an NFT
                    }
                }
            }
        }
    }

    return false; // Not an NFT
}

// works
export const getNFTs = async (address: string) => {
    const connection = initConnection();
    try {
        const ownerPublicKey = new PublicKey(address);
        const response = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, { programId: TOKEN_PROGRAM_ID });
        const nftTokens: string[] = [];

        for (const account of response.value) {
            const mint = account.account.data.parsed.info.mint;
            const mintAddress = new PublicKey(mint);
            const mintInfo = JSON.parse(JSON.stringify(await connection.getParsedAccountInfo(mintAddress)));
            // await getTokenInfo(mint)
            
            if  (mintInfo?.value?.data) {
             // Check if it's an NFT based on specific characteristics
             if (isNFT(mintInfo)) {
                nftTokens.push(mint);
             }
        }
        }
        console.log("Number of NFT tokens: ", nftTokens.length)
        // console.log("nftTokens: " ,JSON.stringify(nftTokens))
        return JSON.stringify(nftTokens);

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


//works
export const getTokenAccountsByOwner = async(address: string) => {
    const connection = initConnection()
    const ownerPublicKey = new PublicKey(address);
    try {
    const response = await connection.getParsedTokenAccountsByOwner(
    ownerPublicKey,
    { programId: TOKEN_PROGRAM_ID },
    "confirmed",
  );
  const tokenInfos: TokenInformation[] = [];
  for (const accountInfo of response.value) {
    const info = accountInfo.account.data.parsed.info;
    if (info.tokenAmount.uiAmount !== 0) {
      tokenInfos.push({
        mint: info.mint.toString(),
        amount: info.tokenAmount.uiAmountString,
      });
    }
  }
  console.log("Number of tokens: ", tokenInfos.length)
//   console.log("Token accounts: ", JSON.stringify(tokenInfos))
  return JSON.stringify(tokenInfos);
}
catch (error) {
    console.error('Error:', error);
    throw error;
}
}

// works
export const getSignaturesForAddress  = async( address: string, limit: number = 50 , beforeSignature: string|null, untilSignature: string|null) =>{
    const connection = initConnection()
    const accountAddress = new PublicKey(address)
    try{
        const beforeSig = beforeSignature ?? "";
        const untilSig = untilSignature ?? "";
        const signatures = await connection.getSignaturesForAddress(accountAddress, {
    limit: limit ,
    before: beforeSig.length > 0 ? beforeSig : undefined,
    until: untilSig.length > 0 ? untilSig : undefined,
  });

  return JSON.stringify(({
    hasMore: signatures.length === 11,
    nextPage: signatures.length === 11 ? { beforeSignature: signatures[10].signature } : null,
    signatures: signatures.map(sig => {
      return {
        slot: sig.slot,
        signature: sig.signature,
        err: sig.err ?? undefined,
        memo: sig.memo ?? undefined,
        confirmationStatus: sig.confirmationStatus,
        blockTime: new Date((sig.blockTime as number) * 1000).toDateString(),
      };
    }),
  }));
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const getTokenInfo =  async(tokenAddress: string) =>{
    try {
        // Connect to the Solana cluster
        const connection = new Connection('https://api.mainnet-beta.solana.com');

        // Initialize the token by its mint address
        const mintPublicKey = new PublicKey(tokenAddress);
        const token = new Token(connection, mintPublicKey, null);

        // Fetch token information
        const tokenInfo = await token.getMintInfo();

        // Check if the token exists
        if (tokenInfo) {
            // Extract the symbol and name
            const symbol = tokenInfo.symbol.toString();
            const name = tokenInfo.name.toString();

            console.log(`Token Symbol: ${symbol}`);
            console.log(`Token Name: ${name}`);
        } else {
            console.log('Token not found');
        }
    } catch (error) {
        console.error('Error fetching token info:', error);
    }
}


export const getTransactionsInfo = async(signature: string[]| string )=> {
    const connection = initConnection()

    if (typeof signature === 'string') {
        signature = [signature];
    }
    
    try {
    const response = await connection.getParsedTransactions(
    signature,
  );

//   const tokenInfos: TokenInformation[] = [];
//   for (const accountInfo of response.value) {
//     const info = accountInfo.account.data.parsed.info;
//     if (info.tokenAmount.uiAmount !== 0) {
//       tokenInfos.push({
//         mint: info.mint.toString(),
//         amount: info.tokenAmount.uiAmountString,
//       });
//     }
//   }
  console.log("transaction details: ", JSON.stringify(response))
//   console.log("Token accounts: ", JSON.stringify(tokenInfos))
  return JSON.stringify(response);
}
catch (error) {
    console.error('Error:', error);
    throw error;
}
}












// Parsed_account_info:  {"context":{"apiVersion":"1.17.21","slot":278789335},"value":{"data":{"parsed":{"info":{"decimals":9,"freezeAuthority":null,"isInitialized":true,"mintAuthority":"CpvynBPz8AkwC6H5yyNaw2TZor9vTmnNrtvRGk52QJTM","supply":"116114574375717790"},"type":"mint"},"program":"spl-token","space":82},"executable":false,"lamports":1461600,"owner":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA","rentEpoch":18446744073709552000,"space":82}}
// MintInfo:  {
//   info: {
//     decimals: 9,
//     freezeAuthority: null,
//     isInitialized: true,
//     mintAuthority: 'CpvynBPz8AkwC6H5yyNaw2TZor9vTmnNrtvRGk52QJTM',
//     supply: '116114574375717790'
//   },
//   type: 'mint'
// }





// export default {getBalance, getAccountInfo, getTransaction};


