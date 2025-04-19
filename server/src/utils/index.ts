import { Connection } from '@solana/web3.js';
import { configDotenv } from 'dotenv';

configDotenv();

// 优先使用环境变量中的RPC URL，如果未设置则使用默认值
const rpcUrl =
  process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

export const connection = new Connection(rpcUrl, 'confirmed');
