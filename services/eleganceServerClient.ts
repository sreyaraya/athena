import { createEleganceServerClient } from "@singlestore/elegance-sdk/server";
import {
    EmbeddingInput,
    CreateEmbeddingResult,
    CreateChatCompletionParams,
    CreateChatCompletionResult
  } from "@singlestore/elegance-sdk/types";
  
export const eleganceServerClient = createEleganceServerClient("mysql", {
  connection: {
    host: process.env.SERVER_URL,
    user: 'admin',
    password: '5clJh7dsITRiDi6scX30j9E80EZqrhsN',
    database: 'UserDB'
  },
  ai: {
    openai: {
      apiKey: process.env.OPEN_AI_KEY
    }
  }
});