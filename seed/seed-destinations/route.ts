import { destinations } from "@/app/data/destinations";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
    try {
        const { data: existing, error: selectError } = await supabase
            .from("destinations_vivatrip")
            .select("*");

        if (selectError) {
            console.error("SELECT ERROR:", selectError);
            return Response.json({ error: selectError.message }, { status: 500 });
        }

        if (!existing || existing.length === 0) {
            const { error: insertError } = await supabase
                .from("destinations_vivatrip")
                .insert(destinations);

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