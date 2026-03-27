import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function FootballExperienceLayout() {
    return (
        <>
            <Header />
            <section
                className="relative mt-10 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://grupopineda.eu/wp-content/uploads/2022/03/shutterstock_1912601503.jpg')", // estadio
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
                                src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a" // balón
                                alt="Balón"
                                className="bject-contain rounded-xl drop-shadow-2xl"
                                width={450}
                            />
                        </div>

                        {/* DERECHA - TEXTO */}
                        <div className="space-y-5 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-light">
                                Experiencia total
                            </h2>

                            <h3 className="text-xl md:text-2xl text-white/80">
                                Pasión futbolera
                            </h3>

                            <p className="text-white/80 leading-relaxed max-w-xl">
                                Vive el fútbol como nunca antes. Desde la emoción del estadio hasta
                                la energía de la afición, esta experiencia está diseñada para que
                                te sumerjas completamente en la cultura futbolera. Disfruta cada
                                momento, cada gol y cada celebración como si fueras local.
                            </p>
                        </div>

                    </div>

                    {/* INFO + FORM */}
                    <div className="grid md:grid-cols-2 gap-12">

                        {/* COLUMNA 1 */}
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-6">
                            <h4 className="text-xl font-medium">Información</h4>

                            <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                                <p><strong>Actividad dirigida a:</strong> Adultos</p>

                                <p><strong>Nivel de actividad:</strong><br />
                                    Actividad de intensidad alta.
                                </p>

                                <div>
                                    <p className="font-medium text-white mb-2">Qué llevar:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Ropa y calzado cómodos.</li>
                                        <li>Gorra o sombrero y protector solar.</li>
                                        <li>Camiseta del equipo favorito (opcional).</li>
                                        <li>Cámara o celular.</li>
                                        <li>Dinero extra para souvenirs o bebidas.</li>
                                    </ul>
                                </div>

                                <p>
                                    <strong>Punto de encuentro:</strong><br />
                                    Tulum Centro o el especificado en la confirmación oficial.
                                </p>
                            </div>
                        </div>

                        {/* COLUMNA 2 */}
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-6">
                            <h4 className="text-xl font-medium">Contacto</h4>

                            <form className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white"
                                />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white"
                                />

                                <input
                                    type="tel"
                                    placeholder="Teléfono"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white"
                                />

                                <textarea
                                    placeholder="Detalla lo que estás buscando..."
                                    rows={4}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-white"
                                />

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

                        <Link href={"/pasion-futbolera-experiencia-total"}>
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