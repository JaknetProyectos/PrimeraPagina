import { createClient } from "@supabase/supabase-js";

const DESTINOS = [
    {
        id: "1",
        slug: "queretaro",
        name: "Querétaro",
        short_description: "Ciudad colonial con viñedos de clase mundial",
        description: "Descubre la magia colonial de Querétaro, una ciudad llena de historia, arquitectura impresionante y una vibrante escena gastronómica.",
        hero_image: "https://ext.same-assets.com/619569696/800864444.webp",
        card_image: "https://ext.same-assets.com/619569696/800864444.webp",
        highlights: ["Centro Histórico", "Ruta del Vino", "Peña de Bernal"],
        bg_color: "#2E7D32",
    },
    {
        id: "4",
        slug: "Guadalajara",
        name: "guadalajara",
        short_description: "Ciudad colonial con viñedos de clase mundial",
        description: "Descubre la magia colonial de Querétaro, una ciudad llena de historia, arquitectura impresionante y una vibrante escena gastronómica.",
        hero_image: "https://ext.same-assets.com/619569696/800864444.webp",
        card_image: "https://ext.same-assets.com/619569696/800864444.webp",
        highlights: ["Centro Histórico", "Ruta del Vino", "Peña de Bernal"],
        bg_color: "#2E7DF2",
    },
    {
        id: "2",
        slug: "xochimilco",
        name: "Xochimilco",
        short_description: "Canales ancestrales y trajineras coloridas",
        description: "Navega por los ancestrales canales de Xochimilco en coloridas trajineras, mientras disfrutas de música y comida tradicional.",
        hero_image: "https://ext.same-assets.com/619569696/1614402457.jpeg",
        card_image: "https://ext.same-assets.com/619569696/1614402457.jpeg",
        highlights: ["Trajineras", "Chinampas", "Gastronomía"],
        bg_color: "#1565C0",
    },
    {
        id: "3",
        slug: "oaxaca",
        name: "Oaxaca",
        short_description: "Tierra de mezcal, mole y tradiciones milenarias",
        description: "Sumérgete en la riqueza cultural de Oaxaca, tierra de mezcal, mole y tradiciones milenarias.",
        hero_image: "https://ext.same-assets.com/619569696/3679278378.jpeg",
        card_image: "https://ext.same-assets.com/619569696/3679278378.jpeg",
        highlights: ["Monte Albán", "Hierve el Agua", "Mezcal"],
        bg_color: "#C62828",
    }
]

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    try {
        const { data: existing, error: selectError } = await supabase
            .from("destinations")
            .select("*");

        if (selectError) {
            console.error("SELECT ERROR:", selectError);
            return Response.json({ error: selectError.message }, { status: 500 });
        }

        if (!existing || existing.length === 0) {
            const { error: insertError } = await supabase
                .from("destinations")
                .insert(DESTINOS);

            if (insertError) {
                console.error("INSERT ERROR:", insertError);
                return Response.json(
                    { error: insertError.message },
                    { status: 500 }
                );
            }
        }

        return Response.json({ ok: true });
    } catch (err) {
        console.error("UNEXPECTED ERROR:", err);
        return Response.json({ error: "Unexpected error" }, { status: 500 });
    }
}