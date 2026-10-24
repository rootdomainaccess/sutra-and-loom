import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CMS_API_URL = "https://factory-asset-engine.vercel.app/api/products";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let products = [];

  try {
    const res = await fetch(CMS_API_URL, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        products = data.products;
      }
    }
  } catch (e) {}

  if (category && category !== "All") {
    products = products.filter((p: any) => {
      const pCat = (p.category || "").toLowerCase();
      const targetCat = category.toLowerCase();
      return pCat.includes(targetCat) || targetCat.includes(pCat);
    });
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter((p: any) => 
      (p.name || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q) ||
      (p.fabric || "").toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, count: products.length, products });
}
