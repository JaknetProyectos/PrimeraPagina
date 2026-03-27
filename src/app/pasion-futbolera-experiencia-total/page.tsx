import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function CotizacionDetallePage() {
    return (
        <div className="min-h-screen">

            <Header />

            <main className="container mt-10 mx-auto px-6 py-16 space-y-16">

                {/* TOP */}
                <section className="grid md:grid-cols-2 gap-10 items-center">

                    {/* COLUMNA 1 */}
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <h1 className="text-2xl md:text-4xl font-light text-center md:text-left">
                            Experiencia personalizada
                        </h1>

                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/0/07/%D0%A4%D0%9A_%22%D0%9A%D0%BE%D0%BB%D0%BE%D1%81%22_%28%D0%97%D0%B0%D1%87%D0%B5%D0%BF%D0%B8%D0%BB%D0%BE%D0%B2%D0%BA%D0%B0%2C_%D0%A5%D0%B0%D1%80%D1%8C%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%29_-_%D0%A4%D0%9A_%22%D0%91%D0%B0%D0%BB%D0%BA%D0%B0%D0%BD%D1%8B%22_%28%D0%97%D0%B0%D1%80%D1%8F%2C_%D0%9E%D0%B4%D0%B5%D1%81%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%29_%2818790931100%29.jpg"
                            alt="Balón"
                            width={450}
                            height={450}
                            className="object-contain rounded-xl drop-shadow-xl"
                        />
                    </div>

                    {/* COLUMNA 2 */}
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border space-y-6">

                        <p className=" leading-relaxed">
                            Vive el fútbol como un verdadero local, disfrutando de transporte,
                            tacos, bebidas y souvenirs. Estamos aquí para apoyarte y diseñar
                            la experiencia perfecta para ti y tu grupo de amigos.
                        </p>

                        <p className="text-sm ">
                            El monto de la cotización ya incluye IVA
                        </p>

                        {/* DATOS */}
                        <div className="space-y-4 bg-white/10">

                            <div>
                                <p className="text-sm  mb-1">
                                    No. de cotización
                                </p>
                                <input className="bg-white/10 border  w-full rounded-lg px-4 py-2">

                                </input>
                            </div>

                            <div>
                                <p className="text-sm  mb-1">
                                    Cotización
                                </p>
                                <input className="bg-white/10 w-full border rounded-lg px-4 py-2 font-medium">

                                </input>
                            </div>

                        </div>

                        {/* BOTÓN */}
                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-mediumtransition">
                            Añadir al carrito
                        </button>

                    </div>

                </section>

                {/* DESCRIPCIÓN */}
                <section className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border  space-y-4">

                    <h2 className="text-xl font-medium">
                        Descripción
                    </h2>

                    <p className="leading-relaxed">
                        Vive el fútbol como un verdadero local, disfrutando de transporte,
                        tacos, bebidas y souvenir. Sumérgete en la emoción del juego de
                        principio a fin, sin complicaciones, en un ambiente seguro y auténtico.
                    </p>

                    <p className="leading-relaxed">
                        Además, durante el Mundial, ofrecemos experiencias especiales de
                        transmisión en vivo, donde podrás disfrutar de los partidos en
                        pantallas gigantes y con la compañía de otros aficionados,
                        manteniendo la misma energía y pasión que se vive en el estadio.
                        Una experiencia única que combina deporte, gastronomía y ambiente
                        festivo.
                    </p>

                </section>

            </main>

            <Footer />

        </div>
    );
}