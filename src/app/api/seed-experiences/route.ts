import { createClient } from "@supabase/supabase-js";
import { Destination } from "@/interfaces/Destination";
import { Experience } from "@/interfaces/Experiences";
import { experiences } from "@/app/data/experiencias";
import { NextResponse } from "next/server";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const { data: existing, error: selectError } = await supabase
            .from("experiences_vivatrip")
            .select("*");

        if (selectError) {
            console.error(selectError);
            return Response.json({ error: selectError.message }, { status: 500 });
        }

        if (!existing || existing.length === 0) {
            const { error: insertError } = await supabase
                .from("experiences_vivatrip")
                .insert(experiences);

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