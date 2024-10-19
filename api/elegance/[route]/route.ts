import { NextResponse } from "next/server";
import { Routes } from "@singlestore/elegance-sdk/server";
import { eleganceServerClient } from "@/services/eleganceServerClient";

export async function POST(request: Request, { params }: { params: { route: Routes } }) {
  try {
    const body = await request.json();
    const result = await eleganceServerClient.handleRoute(params.route, body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(error, { status: error.status });
  }
}