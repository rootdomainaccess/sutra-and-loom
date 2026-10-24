import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_PRODUCTS = [
  // WhatsApp Uploaded Dress Pieces (12 items)
  {
    id: "wp-dress-1",
    name: "Handcrafted Chanderi Unstitched Dress Piece #1",
    category: "Dress Piece",
    price: 2899,
    fabric: "Pure Chanderi Silk Cotton (Unstitched)",
    color: "Earthy Gold",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.30%20AM.jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-2",
    name: "Handcrafted Chanderi Unstitched Dress Piece #2",
    category: "Dress Piece",
    price: 3199,
    fabric: "Pure Chanderi Silk Cotton (Unstitched)",
    color: "Indigo Blue",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.31%20AM.jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-3",
    name: "Handcrafted Chanderi Unstitched Dress Piece #3",
    category: "Dress Piece",
    price: 2799,
    fabric: "Organic Handspun Malkha Cotton",
    color: "Madder Red",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.32%20AM%20(1).jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-4",
    name: "Handcrafted Chanderi Unstitched Dress Piece #4",
    category: "Dress Piece",
    price: 3499,
    fabric: "Pure Chanderi Silk Cotton (Unstitched)",
    color: "Sage Green",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.32%20AM%20(2).jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-5",
    name: "Handcrafted Chanderi Unstitched Dress Piece #5",
    category: "Dress Piece",
    price: 2999,
    fabric: "Organic Handspun Malkha Cotton",
    color: "Natural Beige",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.32%20AM.jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-6",
    name: "Handcrafted Chanderi Unstitched Dress Piece #6",
    category: "Dress Piece",
    price: 3299,
    fabric: "Pure Chanderi Silk Cotton (Unstitched)",
    color: "Rust Orange",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.33%20AM%20(1).jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-7",
    name: "Handcrafted Chanderi Unstitched Dress Piece #7",
    category: "Dress Piece",
    price: 3599,
    fabric: "Organic Handspun Malkha Cotton",
    color: "Earthy Gold",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.33%20AM%20(2).jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-8",
    name: "Handcrafted Chanderi Unstitched Dress Piece #8",
    category: "Dress Piece",
    price: 2699,
    fabric: "Pure Chanderi Silk Cotton (Unstitched)",
    color: "Indigo Blue",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.33%20AM.jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-9",
    name: "Handcrafted Chanderi Unstitched Dress Piece #9",
    category: "Dress Piece",
    price: 3399,
    fabric: "Organic Handspun Malkha Cotton",
    color: "Madder Red",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.34%20AM%20(1).jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-10",
    name: "Handcrafted Chanderi Unstitched Dress Piece #10",
    category: "Dress Piece",
    price: 3899,
    fabric: "Pure Chanderi Silk Cotton (Unstitched)",
    color: "Sage Green",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.34%20AM%20(2).jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  {
    id: "wp-dress-11",
    name: "Handcrafted Chanderi Unstitched Dress Piece #11",
    category: "Dress Piece",
    price: 2999,
    fabric: "Organic Handspun Malkha Cotton",
    color: "Natural Beige",
    image: "/uploads/WhatsApp%20Image%202026-10-24%20at%2011.20.34%20AM.jpeg",
    description: "Exquisite unstitched dress piece with intricate zari border and breathable handloom weave, curated directly from artisan clusters.",
    inStock: true,
  },
  // Traditional Dresses
  {
    id: "trad-1",
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
    id: "trad-2",
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
    id: "trad-3",
    name: "Festive Organza Embroidered Ethnic Gown",
    category: "Traditional Dresses",
    price: 15999,
    fabric: "Silk Organza",
    color: "Sage Green",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
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
