import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_PRODUCTS = [
  {
    id: "default-1",
    name: "Pure Chanderi Unstitched Dress Piece with Zari Border",
    category: "Dress Piece",
    price: 3499,
    fabric: "Chanderi Cotton Silk (Unstitched)",
    color: "Earthy Gold",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Handwoven unstitched suit set including 2.5m kurta fabric, 2.5m bottom, and a zari-woven Dupatta for custom stitching.",
    inStock: true,
  },
  {
    id: "default-2",
    name: "Royal Banarasi Silk Traditional Dress",
    category: "Traditional Dresses",
    price: 12999,
    fabric: "Pure Banarasi Silk",
    color: "Deep Crimson",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    description: "Stunning ready-to-wear traditional Banarasi silk dress featuring intricate gold brocade weaving and regal flare.",
    inStock: true,
  },
  {
    id: "default-3",
    name: "Ajrakh Block Printed Cotton Dress Material",
    category: "Dress Piece",
    price: 2899,
    fabric: "Organic Cotton (Unstitched)",
    color: "Madder Red & Indigo",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    description: "Authentic Ajrakh handblock printed unstitched dress piece using natural vegetable dyes on breathable organic cotton.",
    inStock: true,
  },
  {
    id: "default-4",
    name: "Earthy Handloom Cotton Anarkali Suit",
    category: "Traditional Dresses",
    price: 6499,
    fabric: "Handspun Malkha Cotton",
    color: "Soft Sand",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    description: "Graceful ready-to-wear traditional Anarkali dress crafted from soft Malkha cotton with delicate kantha embroidery.",
    inStock: true,
  },
  {
    id: "default-5",
    name: "Maheshwari Silk Unstitched Suit Set",
    category: "Dress Piece",
    price: 4200,
    fabric: "Maheshwari Cotton Silk",
    color: "Teal & Gold",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Lightweight unstitched Maheshwari fabric set with reversible border and matching dupatta for bespoke tailoring.",
    inStock: true,
  },
  {
    id: "default-6",
    name: "Festive Organza Embroidered Ethnic Gown",
    category: "Traditional Dresses",
    price: 15999,
    fabric: "Silk Organza",
    color: "Sage Green",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    description: "Whisper-light sage green traditional ethnic gown adorned with tonal floral threadwork and exquisite appliqué.",
    inStock: true,
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
