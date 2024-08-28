import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.error();
  }
}
