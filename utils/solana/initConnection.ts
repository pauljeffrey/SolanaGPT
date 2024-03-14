import { Cluster, Connection, clusterApiUrl } from '@solana/web3.js'

 const CLUSTER: Cluster = process.env.SOLANA_CLUSTER_NAME as Cluster || "devnet";

 const initConnection = () : Connection => {
     return new Connection(`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`)//(CLUSTER), "confirmed")
 }

 export default initConnection;