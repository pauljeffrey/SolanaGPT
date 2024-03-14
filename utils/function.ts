
const getAccountInfoFunction = {
    name: "getAccountInfo",
    description: "Fetches and returns all information associated with the account of provided Public key",
    parameters: {
      // title: "Person",
      // description: "Identifying information about a person.",
      type: "object",
      properties: {
        publicKey: { title: "PublicKey", description: "Public key of account to query as base-58 encoded string", type: "string" },
        dataSlice: { title: "dataSlice", description: "Request a slice of the account's data", type: "object",
      properties: {
          length: {title: "length", description: "number of bytes to return", type:"<usize>"},
          offset: {title: "offset", description: "byte offset from which to start reading", type:"<usize>"}
      } },
        commitment: { title: "commitment", description: "The person's age", type: "string" },
        encoding: { title: "Encoding", description: "TEncoding format for account data", type: "string" },
        MinContextSlot: { title: "MinContextSlot", description: "Minimum slot that request can be evaluated at.", type: "integer" },
      },
      required: ["publicKey"],
    },
  };
  
  const getBalanceFunction = {
    name: "getBalance",
    description: "returns the lamport balance of the account of provided public key",
    parameters: {
      type: "object",
      properties: {
        publicKey: { title: "PublicKey", description: "Public key of account to query as base-58 encoded string", type: "string" },
        config: { title: "config", description: "configuration object containing the commitment and minimum context slot field", type: "object",
      properties: {
          commitment: { title: "commitment", description: "The person's age", type: "string" },
          MinContextSlot: { title: "MinContextSlot", description: "Minimum slot that request can be evaluated at.", type: "integer" },
        } },
        },
      required: ["publicKey"],
    },
  };
  
  
  // const getTokenAccountBalanceFunction = {
  //     name: "getTokenAccountBalance",
  //     description: "Returns the token balance of an SPL (Solana Program Library) Token account",
  //     parameters: {
  //       title: "Location",
  //       description: "The location to get the weather for.",
  //       type: "object",
  //       properties: {
  //         state: {
  //           title: "State",
  //           description: "The location's state",
  //           type: "string",
  //         },
  //         city: {
  //           title: "City",
  //           description: "The location's city",
  //           type: "string",
  //         },
  //         zip_code: {
  //           title: "Zip Code",
  //           description: "The locations's zip code",
  //           type: "number",
  //         },
  //       },
  //       required: ["state", "city"],
  //     },
  //   };
  
    const getTransactionFunction = {
      name: "getTransaction",
      description: "fetchs and returns transaction details for a confirmed transaction",
      parameters: {
        type: "object",
        properties: {
          signature: {
            title: "signature",
            description: "transaction signature as base-58 encoded string.",
            type: "string",
          },
          config: {
            title: "config",
            description: "configuration object containg the commitment and max supported transaction version",
            type: "object",
            properties:{
              commitment: { title: "commitment", description: "The person's age", type: "string" },
              maxSupportedTransactionVersion: {title: "Transaction version", description: "maximum version to return in responses."}    
            }
          },
          
        },
        required: ["signature"],
      },
    };
  
  
    const getTokenSupplyFunction = {
      name: "getTokenSupply",
      description: "returns the total supply of a solana program library token type",
      parameters: {
        type: "object",
        properties: {
          publicKey: {
            title: "public key",
            description: "public key of the token mint to query, as base-58 encoded string.",
            type: "string",
          },
          config: {
            title: "config",
            description: "configuration object containg the commitment.",
            type: "object",
            properties:{
              commitment: { title: "commitment", description: "The person's age", type: "string" },
            }
          },
          
        },
        required: ["publicKey"],
      },
    };
  
    const getSignaturesForAddressFunction = {
      name: "getSignaturesForAddress",
      description: "Returns signatures for confirmed transactions that include the given address in their accountKeys list. Returns signatures backwards in time from the provided signature or most recent confirmed block",
      parameters: {
        type: "object",
        properties: {
          publicKey: {
            title: "public key",
            description: "Account address as base-58 encoded string.",
            type: "string",
          },
          config: {
            title: "config",
            description: "Configuration object containg the commitment and minimum context slot.",
            type: "object",
            properties:{
              commitment: { title: "commitment", description: "The person's age", type: "string" },
              MinContextSlot: { title: "MinContextSlot", description: "Minimum slot that request can be evaluated at.", type: "integer" },
            }
          },
          
        },
        required: ["signature"],
      },
    };
  
  