import { createEleganceClient } from "@singlestore/elegance-sdk";

const baseURL = `${process.env.SERVER_URL}/api`;

export const eleganceClient = createEleganceClient("mysql", { baseURL });
