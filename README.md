# Solana BlockChain Agent- Powered by ChatGPT
This repo contains an AI agent that can be used to perform basic enquiries on the Solana BlockChain Platform.

The tech stack used is Next.js, TypeScript, Tailwind CSS, Supabase / Pinecone, and OpenAI. LangChain is a framework that makes it easier to build scalable AI/LLM apps and chatbots. 
## Development

1. Make sure you have installed node and yarn

[Node installation](https://nodejs.org/en/download)
[yarn installation](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

yarn installation in your terminal after installing node

`npm install -g yarn`

**If you run into permission errors run `sudo npm install -g yarn` instead, then enter your computer password.**

Check that both are installed.

```sh
node -v
yarn -v
```

Node must be at least version 18.x.x

2. Install packages

```sh
yarn install
```

You should see a `node_modules` folder afterwards.

3. Set up your `.env` file and insert credentials for your chosen vector store. Copy `.env.example` into `.env`. Your `.env` file should look like either of the one, depending upon what you want to use as your vector store:

```
OPENAI_API_KEY=
```

## Deployment (going live)

**Please note that eslint and typescript errors are ignored in the `next.config.js` file by default. If you would like to throw errors during production build remove these configs**

There are a couple of high-level options for deploying your app:

a.
Deploying to a VM or container
Persistent filesystem means you can save and load files from disk
Always-running process means you can cache some things in memory
You can support long-running requests, such as WebSockets

b.
Deploying to a serverless environment
No persistent filesystem means you can load files from disk, but not save them for later
Cold start means you can't cache things in memory and expect them to be cached between requests
Function timeouts mean you can't support long-running requests, such as WebSockets
Some other considerations include:

Options:

- [Vercel](https://vercel.com/docs/concepts/deployments/overview)
- [Fly.io](https://fly.io/)
- [Render](https://render.com/docs/deploy-to-render)

