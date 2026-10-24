import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_PRODUCTS = [
  {
    id: "default-1",
    name: "Pure Chanderi Unstitched Dress Piece with Zari Border",
    category: "Dress Pieces",
    price: 3499,
    fabric: "Unstitched",
    color: "Earthy Gold",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Handwoven unstitched suit set including 2.5m kurta fabric, 2.5m bottom, and a zari-woven Dupatta for custom stitching.",
    quantity: 10,
    inStock: true,
  },
  {
    id: "default-2",
    name: "Royal Banarasi Silk Traditional Dress",
    category: "Dress",
    price: 12999,
    fabric: "Free Size",
    color: "Deep Crimson",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    description: "Stunning ready-to-wear traditional Banarasi silk dress featuring intricate gold brocade weaving and regal flare.",
    quantity: 0, // Out of stock example
    inStock: false,
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let filtered = DEFAULT_PRODUCTS;
    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      products: filtered,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: true,
      count: DEFAULT_PRODUCTS.length,
      products: DEFAULT_PRODUCTS,
    });
  }
}
