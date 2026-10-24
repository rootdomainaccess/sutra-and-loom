import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CMS_API_URL = "https://factory-asset-engine.vercel.app/api/products";

const STOREFRONT_PRODUCTS = [
  {
    "id": "prod-1792841114280",
    "name": "Beige Multicolor Floral Vine Suit with Lace Hemline: Highlights a neutral beige",
    "category": "Dress Pieces",
    "fabric": "Unstitched Fabric Set",
    "price": 899,
    "quantity": 10,
    "image": "/uploads/prod-1792841114280.jpg",
    "description": "Handloom Dress Pieces - Size: Unstitched Fabric Set"
  },
  {
    "id": "prod-1792841074530",
    "name": "Blue and Pink Geometric Tile Print Suit with Embroidered Yoke",
    "category": "Dress",
    "fabric": "Unstitched Fabric Set",
    "price": 899,
    "quantity": 10,
    "image": "/uploads/prod-1792841074530.jpg",
    "description": "Handloom Dress - Size: Unstitched Fabric Set"
  },
  {
    "id": "prod-1792826082256",
    "name": "Beige and Fuchsia Geometric Print Suit with Tassel Detailing",
    "category": "Dress Pieces",
    "fabric": "Unstitched Fabric Set",
    "price": 899,
    "quantity": 10,
    "image": "/uploads/prod-1792826082256.jpg",
    "description": "Handloom Dress Pieces - Size: Unstitched Fabric Set"
  },
  {
    "id": "prod-1792826010016",
    "name": "Sage Green Floral Block Print Suit with Scalloped Border",
    "category": "Dress Pieces",
    "fabric": "Unstitched Fabric Set",
    "price": 899,
    "quantity": 10,
    "image": "/uploads/prod-1792826010016.jpg",
    "description": "Handloom Dress Pieces - Size: Unstitched Fabric Set"
  },
  {
    "id": "prod-1792825983072",
    "name": "Dusty Rose Floral Block Print Suit with Scalloped Border",
    "category": "Dress Pieces",
    "fabric": "Unstitched Fabric Set",
    "price": 899,
    "quantity": 10,
    "image": "/uploads/prod-1792825983072.jpg",
    "description": "Handloom Dress Pieces - Size: Unstitched Fabric Set"
  },
  {
    "id": "prod-1792825644207",
    "name": "Slate & Ivory Zari Embroidered Suit",
    "category": "Dress Pieces",
    "fabric": "Unstitched Fabric Set",
    "price": 899,
    "quantity": 10,
    "image": "/uploads/prod-1792825644207.jpg",
    "description": "Handloom Dress Pieces - Size: Unstitched Fabric Set"
  },
  {
    "id": "prod-1792825155573",
    "name": "Magenta Floral Embroidered Unstitched Suit",
    "category": "Dress Pieces",
    "fabric": "Unstitched Fabric Set",
    "price": 899,
    "quantity": 10,
    "image": "/uploads/prod-1792825155573.jpg",
    "description": "Handloom Dress Pieces - Size: Unstitched Fabric Set"
  }
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let products = STOREFRONT_PRODUCTS;

  try {
    const res = await fetch(CMS_API_URL, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
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
