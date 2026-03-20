import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    try {
        const { data: existing, error: selectError } = await supabase
            .from("experiences")
            .select("*");

        if (selectError) {
            console.error(selectError);
            return Response.json({ error: selectError.message }, { status: 500 });
        }

        if (!existing || existing.length === 0) {
            const { error: insertError } = await supabase
                .from("experiences")
                .insert([
                    // Querétaro
                    {
                        id: "exp-1",
                        destination_slug: "queretaro",
                        destination_name: "Querétaro",
                        title: "Tour por el Centro Histórico",
                        description: "Recorre las calles coloniales, visita templos barrocos y descubre la historia de la independencia mexicana.",
                        duration: "4 horas",
                        price: 850,
                        price_formatted: "$850 MXN",
                        image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400",
                        category: "Cultura",
                        rating: 4.8,
                        review_count: 124,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                    {
                        id: "exp-2",
                        destination_slug: "queretaro",
                        destination_name: "Querétaro",
                        title: "Ruta del Vino",
                        description: "Visita los mejores viñedos de la región, degusta vinos premium y disfruta de la gastronomía local.",
                        duration: "6 horas",
                        price: 1500,
                        price_formatted: "$1,500 MXN",
                        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
                        category: "Gastronomía",
                        rating: 4.9,
                        review_count: 89,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                    {
                        id: "exp-3",
                        destination_slug: "queretaro",
                        destination_name: "Querétaro",
                        title: "Peña de Bernal",
                        description: "Aventúrate al tercer monolito más grande del mundo, con opciones de senderismo y rappel.",
                        duration: "8 horas",
                        price: 1200,
                        price_formatted: "$1,200 MXN",
                        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                        category: "Aventura",
                        rating: 4.7,
                        review_count: 156,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                    // Xochimilco
                    {
                        id: "exp-4",
                        destination_slug: "xochimilco",
                        destination_name: "Xochimilco",
                        title: "Paseo en Trajinera",
                        description: "Navega por los canales en una trajinera decorada mientras disfrutas de música de mariachi.",
                        duration: "3 horas",
                        price: 600,
                        price_formatted: "$600 MXN",
                        image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400",
                        category: "Cultural",
                        rating: 4.6,
                        review_count: 234,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                    {
                        id: "exp-5",
                        destination_slug: "xochimilco",
                        destination_name: "Xochimilco",
                        title: "Tour Gastronómico",
                        description: "Prueba los mejores antojitos mexicanos: tlacoyos, quesadillas, elotes y más.",
                        duration: "4 horas",
                        price: 750,
                        price_formatted: "$750 MXN",
                        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
                        category: "Gastronomía",
                        rating: 4.8,
                        review_count: 178,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                    {
                        id: "exp-6",
                        destination_slug: "xochimilco",
                        destination_name: "Xochimilco",
                        title: "Visita a las Chinampas",
                        description: "Conoce el sistema agrícola prehispánico y visita productores locales de flores.",
                        duration: "5 horas",
                        price: 900,
                        price_formatted: "$900 MXN",
                        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
                        category: "Naturaleza",
                        rating: 4.5,
                        review_count: 67,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                    // Oaxaca
                    {
                        id: "exp-7",
                        destination_slug: "oaxaca",
                        destination_name: "Oaxaca",
                        title: "Zona Arqueológica Monte Albán",
                        description: "Explora la antigua capital zapoteca con vistas panorámicas del valle de Oaxaca.",
                        duration: "4 horas",
                        price: 950,
                        price_formatted: "$950 MXN",
                        image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400",
                        category: "Historia",
                        rating: 4.9,
                        review_count: 312,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                    {
                        id: "exp-8",
                        destination_slug: "oaxaca",
                        destination_name: "Oaxaca",
                        title: "Ruta del Mezcal",
                        description: "Visita palenques tradicionales y aprende el proceso artesanal de elaboración del mezcal.",
                        duration: "6 horas",
                        price: 1300,
                        price_formatted: "$1,300 MXN",
                        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400",
                        category: "Gastronomía",
                        rating: 4.8,
                        review_count: 198,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                    {
                        id: "exp-9",
                        destination_slug: "oaxaca",
                        destination_name: "Oaxaca",
                        title: "Hierve el Agua",
                        description: "Descubre las cascadas petrificadas y las pozas naturales con vistas espectaculares.",
                        duration: "8 horas",
                        price: 1100,
                        price_formatted: "$1,100 MXN",
                        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
                        category: "Naturaleza",
                        rating: 4.7,
                        review_count: 145,
                        images: [
                            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
                            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
                            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
                        ]
                    },
                ]);

            if (insertError) {
                console.error(insertError);
                return Response.json(
                    { error: insertError.message },
                    { status: 500 }
                );
            }
        }

        return Response.json({ ok: true });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Unexpected error" }, { status: 500 });
    }
}