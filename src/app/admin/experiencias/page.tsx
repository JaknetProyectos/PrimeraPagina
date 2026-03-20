"use client";

import { useState } from "react";
import { useAdminExperiences } from "@/hooks/useAdminExperiences";
import { useAdminDestinations } from "@/hooks/useAdminDestinations";
import { Plus, Trash2, Pencil, X } from "lucide-react";

export default function Page() {
    const { data, loading, create, update, remove } =
        useAdminExperiences();

    const { data: destinations } = useAdminDestinations();

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [confirmId, setConfirmId] = useState<string | null>(null);

    const [form, setForm] = useState<any>({
        title: "",
        destination_slug: "",
        destination_name: "",
        description: "",
        duration: "",
        price: "",
        image: "",
        images: [],
        category: "",
    });

    // 🧠 VALIDACIÓN
    const isValid =
        form.title &&
        form.destination_slug &&
        form.description &&
        form.price;

    const resetForm = () => {
        setForm({
            title: "",
            destination_slug: "",
            destination_name: "",
            description: "",
            duration: "",
            price: "",
            image: "",
            images: [],
            category: "",
        });
    };

    const handleSubmit = async () => {
        const price = Number(form.price);

        const payload = {
            id: editing?.id || crypto.randomUUID(),
            ...form,
            price,
            price_formatted: `$${price} MXN`,
            rating: 4.5,
            review_count: 0,
            images: form.images,
        };

        if (editing) {
            await update(editing.id, payload);
        } else {
            await create(payload);
        }

        setOpen(false);
        setEditing(null);
        resetForm();
    };

    if (loading) return <div className="p-10">Cargando...</div>;

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Experiencias</h2>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-[#ae4e68] text-white px-4 py-2 rounded flex gap-2"
                >
                    <Plus /> Nueva
                </button>
            </div>

            {/* LISTA */}
            <div className="bg-white rounded-xl shadow divide-y">
                {data.map((exp) => (
                    <div key={exp.id} className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{exp.title}</p>
                            <p className="text-sm text-gray-500">
                                {exp.destination_name}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setEditing(exp);
                                    setForm(exp);
                                    setOpen(true);
                                }}
                            >
                                <Pencil />
                            </button>

                            <button onClick={() => setConfirmId(exp.id)}>
                                <Trash2 className="text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL FORM */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">

                        <div className="flex justify-between">
                            <h3>{editing ? "Editar" : "Nueva"} experiencia</h3>
                            <button onClick={() => setOpen(false)}><X /></button>
                        </div>

                        <input
                            placeholder="Título"
                            className="w-full border p-2 rounded"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />

                        {/* DESTINO SELECT */}
                        <select
                            className="w-full border p-2 rounded"
                            value={form.destination_slug}
                            onChange={(e) => {
                                const selected = destinations.find(
                                    (d) => d.slug === e.target.value
                                );

                                selected && setForm({
                                    ...form,
                                    destination_slug: selected.slug,
                                    destination_name: selected.name,
                                });
                            }}
                        >
                            <option value="">Selecciona destino</option>
                            {destinations.map((d) => (
                                <option key={d.slug} value={d.slug}>
                                    {d.name}
                                </option>
                            ))}
                        </select>

                        <textarea
                            placeholder="Descripción"
                            className="w-full border p-2 rounded"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />

                        <input
                            placeholder="Duración"
                            className="w-full border p-2 rounded"
                            value={form.duration}
                            onChange={(e) =>
                                setForm({ ...form, duration: e.target.value })
                            }
                        />

                        <input
                            placeholder="Precio"
                            type="number"
                            className="w-full border p-2 rounded"
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                        />

                        <input
                            placeholder="Imagen URL"
                            className="w-full border p-2 rounded"
                            value={form.image}
                            onChange={(e) =>
                                setForm({ ...form, image: e.target.value })
                            }
                        />

                        <input
                            placeholder="Images (coma separadas)"
                            value={form.images?.join(",") || ""}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    images: e.target.value.split(",").map((i) => i.trim()),
                                })
                            }
                        />

                        <input
                            placeholder="Categoría"
                            className="w-full border p-2 rounded"
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        />

                        <button
                            disabled={!isValid}
                            onClick={handleSubmit}
                            className="w-full bg-[#ae4e68] text-white py-2 rounded disabled:opacity-50"
                        >
                            {editing ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </div>
            )}

            {/* CONFIRM DELETE */}
            {confirmId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl space-y-4">
                        <p>¿Eliminar experiencia?</p>

                        <div className="flex gap-3">
                            <button
                                onClick={async () => {
                                    await remove(confirmId);
                                    setConfirmId(null);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Eliminar
                            </button>

                            <button onClick={() => setConfirmId(null)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}