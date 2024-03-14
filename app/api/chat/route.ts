import { NextRequest, NextResponse } from "next/server";
import { Message, StreamingTextResponse } from "ai";
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
// import type { ChatPromptTemplate } from "@langchain/core/prompts";
import tools from "utils/tools";
import { ChatOpenAI } from "@langchain/openai";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
// import { pull } from "langchain/hub";
import {agentPrompt} from "utils/prompt";


export async function POST(req: NextRequest) {
    const { messages } = await req.json();
  
    // only accept post requests
    if (req.method !== 'POST') {
      return new Response(null, {
        status: 405,
        statusText: 'Method not allowed',
      });
    }
    
    try {

      const llm = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0,
      });

      const prompt = agentPrompt

      const agent = await createOpenAIFunctionsAgent({
        llm,
        tools,
        prompt,
      });

      const agentExecutor = new AgentExecutor({
        agent,
        tools,
        verbose: false
      });
  
      const chat_history = messages.map((m: Message) => {
        if (m.role === 'user') {
          return new HumanMessage(m.content);
        }
        if (m.role === 'assistant') {
          return new AIMessage(m.content);
        }
        return new SystemMessage(m.content);
      })
  
      const question = messages[messages.length - 1].content;

      const result = await agentExecutor.invoke({
        input: question,
        chat_history: chat_history,
      });

 

    return new Response(result.output); //new StreamingTextResponse(result) ; //

  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}



