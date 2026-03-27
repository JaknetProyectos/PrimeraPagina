import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function AdventurePlannerSection() {
    return (
        <>
            <Header />
            <section
                className="relative mt-10 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')", // cerro/montaña
                }}
            >
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

                {/* CONTENIDO */}
                <div className="relative z-10 text-white container mx-auto px-6 py-20 space-y-20">

                    {/* HERO */}
                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        {/* IZQUIERDA - IMAGEN */}
                        <div className="flex justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                                alt="Aventura"
                                className="object-contain rounded-xl drop-shadow-2xl"
                                width={400}
                            />
                        </div>

                        {/* DERECHA - TEXTO */}
                        <div className="space-y-5 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-light">
                                Arma tu aventura
                            </h2>

                            <h3 className="text-xl md:text-2xl text-white/80">
                                Cuenta con expertos
                            </h3>

                            <p className="text-white/80 leading-relaxed max-w-xl">
                                Te ayudamos a diseñar recorridos únicos que combinan aventura,
                                historia, naturaleza y gastronomía para crear experiencias
                                inolvidables hechas a tu medida.
                            </p>
                        </div>

                    </div>

                    {/* INFO + FORM */}
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* COLUMNA 1 */}
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-6">
                            <h4 className="text-xl font-medium">
                                Planea tu experiencia
                            </h4>

                            <p className="text-white/80 text-sm leading-relaxed">
                                ¿Necesitas más información o quieres planear una aventura en grupo?
                                Si tienes dudas sobre nuestros servicios o deseas organizar una
                                experiencia especial, contáctanos. Nuestro equipo te ayudará a crear
                                una aventura totalmente personalizada, adaptada a tus intereses,
                                ya sea una excursión cultural, exploración en cenotes o una
                                combinación única de actividades en Tulum y sus alrededores.
                            </p>
                        </div>

                        {/* COLUMNA 2 - FORM */}
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-6">
                            <h4 className="text-xl font-medium">Contacto</h4>

                            <form className="space-y-4">

                                {/* INPUTS */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-2 focus:ring-white/40"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-2 focus:ring-white/40"
                                    />
                                </div>

                                <input
                                    type="tel"
                                    placeholder="Teléfono"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-2 focus:ring-white/40"
                                />

                                {/* PERSONAS */}
                                <div className="space-y-2 text-sm text-white/80">
                                    <p>¿Cuántas personas?</p>

                                    <div className="flex flex-col gap-2">
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="grupo" />
                                            Grupo +4
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="grupo" />
                                            Pareja
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="grupo" />
                                            Individual
                                        </label>
                                    </div>
                                </div>

                                {/* UBICACIÓN */}
                                <input
                                    type="text"
                                    placeholder="¿Dónde buscas tu aventura?"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-2 focus:ring-white/40"
                                />

                                {/* TEXTAREA */}
                                <textarea
                                    placeholder="Detalla lo que estás buscando..."
                                    rows={4}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-2 focus:ring-white/40"
                                />

                                {/* BOTÓN */}
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition"
                                >
                                    Enviar
                                </button>

                            </form>
                        </div>

                    </div>

                    {/* CTA FINAL */}
                    <div className="text-center space-y-4">
                        <p className="text-white/80">
                            ¿Ya cuentas con una cotización?
                        </p>

                        <Link href={"/armatuaventura-detail"}>
                            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                                Paga tu aventura
                            </button>
                        </Link>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
}