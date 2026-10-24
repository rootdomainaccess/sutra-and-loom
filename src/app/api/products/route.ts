import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

function getLocalProducts() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return [];
}

function saveLocalProducts(products: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
  } catch (e) {}
}

const CMS_API_URL = "https://factory-asset-engine.vercel.app/api/products";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(CMS_API_URL, { next: { revalidate: 0 } });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        // Save to local for fallback
        const local = getLocalProducts();
        const merged = [
          ...data.products,
          ...local.filter((l: any) => !data.products.some((p: any) => p.id === l.id)),
        ];
        return NextResponse.json({ success: true, count: merged.length, products: merged });
      }
    }
  } catch (e) {
    // ignore
  }

  // fallback local only
  const local = getLocalProducts();
  return NextResponse.json({ success: true, count: local.length, products: local });
}
