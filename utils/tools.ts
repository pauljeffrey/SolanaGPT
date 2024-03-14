import { z } from "zod";
import { DynamicTool, DynamicStructuredTool } from "@langchain/core/tools";
import * as solana from "@/utils/solana/rpc_functions";
import { X } from "lucide-react";

const tools = [
    new DynamicStructuredTool({
      name: "get-balance",
      description: "generate the lamport balance of the account of provided public key",
      schema: z.object({
        address: z.string().describe("Public key of account to query as base-58 encoded string"),
      }),
      func: async ({ address }) => {
         const output = await solana.getBalance(address)
         return output.toString()
      } // Outputs still must be strings
    }),

    new DynamicStructuredTool({
        name: "find-wallet-nfts",
        description: "Lists the NFTs owned by the given wallet address along with their metadata",
        schema: z.object({
            address: z.string().describe(""),
          }),
          func: async ({ address }) => {
            const output = await solana.getNFTs(address)
            return output.toString()
        } // Outputs still must be strings
    }),
    new DynamicStructuredTool({
        name: "inspect-wallet-activity",
        description: "provides details about on-chain wallet activity and recent transactions",
        schema: z.object({
          address: z.string().describe(""),
        }),
        func: async ({ address }) => {
            const output = address //await getBalance(address)
            return output.toString()
        } // Outputs still must be strings
    }),

    new DynamicStructuredTool({
        name: "find-nft",
        description: "allows you to search NFT collections based on name or sort them by floor price",
        schema: z.object({
          address: z.string().describe(""),
        }),
        func: async ({ address }) => {
          const output = address //await getBalance(address)
          return output.toString()
        } // Outputs still must be strings
    }),
    new DynamicStructuredTool({
        name: "interpret-solana-transactions",
        description: "return details about a specified transaction",
        schema: z.object({
          address: z.string().describe(""),
        }),
        func: async ({ address }) => {
            const output = await solana.getTransaction(address)
            return output.toString()
        } // Outputs still must be strings
    }),
    new DynamicStructuredTool({
        name: "calculate-wallet-value",
        description: "returns the estimated value of all tokens and nfts in an address in USD ",
        schema: z.object({
          address: z.string().describe(""),
        }),
        func: async ({ address }) => {
            const output = address //await getBalance(address)
            return output.toString()
        } // Outputs still must be strings
    }),
    new DynamicStructuredTool({
        name: "interpret-solana-account",
        description: "Provides information about the Solana account, including the account owner, SOL balance, and any human-readable data stored in the account",
        schema: z.object({
          address: z.string().describe("Public key of account to query as base-58 encoded string"),
        }),
        func: async ({ address }) => {
            const output = await solana.getAccountInfo(address)
            return output.toString()
        } // Outputs still must be strings
    }) ,
    new DynamicStructuredTool({
      name: "get-nft-by-owner",
      description: "Provides information about the list of NFT collections held by an account",
      schema: z.object({
        address: z.string().describe("Public key of account to query as base-58 encoded string"),
      }),
      func: async ({ address }) => {
          const output = await solana.getNFTs(address)
          return output.toString()
      } // Outputs still must be strings
  }) ,
  new DynamicStructuredTool({
    name: "get-token-accounts-by-owner",
    description: "Returns all Solana Program Library (SPL) Token accounts by token owner of the address.",
    schema: z.object({
      address: z.string().describe("Public key of account to query as base-58 encoded string"),
    }),
    func: async ({ address }) => {
        const output = await solana.getTokenAccountsByOwner(address)
        return output.toString()
    } // Outputs still must be strings
}) ,
new DynamicStructuredTool({
  name: "get-signatures-for-address",
  description: `Returns signatures for confirmed transactions that include the given address in their accountKeys list. 
  Returns signatures backwards in time from the provided signature or most recent confirmed block`,
  schema: z.object({
    address: z.string().describe("Public key of account to query as base-58 encoded string"),
    before: z.string().describe("start searching backwards from this transaction signature. If not provided the search starts from the top of the highest max confirmed block."),
    until: z.string().describe("search until this transaction signature, if found before limit reached"),
    limit: z.number().describe("maximum transaction signatures to return (between 1 and 1,000).")
  }),
  func: async ({ address, before, until, limit }) => {
      const output = await solana.getSignaturesForAddress(address, limit, before , until)
      return output.toString()
  } // Outputs still must be strings
}) ,
new DynamicStructuredTool({
  name: "get-transaction-information",
  description: `Fetch transaction details for a single or batch of confirmed transactions`,
  schema: z.object({
    signatures: z.string().describe("signature of a confirmed transaction.") || z.array(z.string()).describe("batch of signatures of a confirmed transaction."),
    
  }),
  func: async ({ signatures }) => {
      const output = await solana.getTransactionsInfo(signatures)
      return output.toString()
  } // Outputs still must be strings
}) 

  ];


export default tools;
