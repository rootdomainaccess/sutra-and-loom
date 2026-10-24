import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_PRODUCTS = [
  {
    id: "default-1",
    name: "Varanasi Gold Tissue Kanjeevaram Saree",
    category: "Sarees",
    price: 18999,
    fabric: "Pure Kanjeevaram Silk",
    color: "Earthy Gold",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Handwoven in Varanasi with antique gold zari tissue weave and traditional temple border motifs.",
    inStock: true,
  },
  {
    id: "default-2",
    name: "Chanderi Handblock Indigo Dress",
    category: "Ethnic Dresses",
    price: 6499,
    fabric: "Chanderi Cotton Silk",
    color: "Indigo Blue",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    description: "Block-printed by master artisans in Rajasthan using natural indigo dyes on lightweight Chanderi.",
    inStock: true,
  },
  {
    id: "default-3",
    name: "Raw Silk Festive Lehenga Set",
    category: "Lehengas",
    price: 32499,
    fabric: "Raw Mulberry Silk",
    color: "Rust Orange",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    description: "An exquisite rust raw silk lehenga paired with an organza dupatta featuring subtle hand zardozi embroidery.",
    inStock: true,
  },
  {
    id: "default-4",
    name: "Malkha Cotton Handloom Kurti",
    category: "Kurtis",
    price: 3299,
    fabric: "Organic Malkha Cotton",
    color: "Soft Sand",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    description: "Breathable handspun Malkha cotton kurti with delicate kantha stitch detailing along the neckline.",
    inStock: true,
  },
  {
    id: "default-5",
    name: "Aged Madhepur Tussar Saree",
    category: "Sarees",
    price: 14500,
    fabric: "Wild Tussar Silk",
    color: "Natural Beige",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    description: "Textured wild Tussar silk saree celebrating the organic, unbleached grain of natural silk fibers.",
    inStock: true,
  },
  {
    id: "default-6",
    name: "Ajrakh Block Printed Anarkali",
    category: "Ethnic Dresses",
    price: 8999,
    fabric: "Modal Satin Cotton",
    color: "Crimson & Madder",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    description: "Traditional Ajrakh geometric block print in rich madder red and deep indigo on flowing modal cotton.",
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
