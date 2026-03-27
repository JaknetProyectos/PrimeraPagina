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
                            src="https://cdn.pixabay.com/photo/2016/09/07/11/37/sunset-1651426_1280.jpg"
                            alt="Sol"
                            width={450}
                            height={450}
                            className="object-contain rounded-xl drop-shadow-xl"
                        />
                    </div>

                    {/* COLUMNA 2 */}
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border space-y-6">

                        <p className=" leading-relaxed">
                            Estamos aquí para apoyarte y diseñar la experiencia perfecta para ti y tu grupo.
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
                        ¿Necesitas más información o quieres planear una aventura en grupo?
                    </p>

                    <p className="leading-relaxed">
                        Si tienes dudas sobre nuestros servicios, deseas más detalles acerca de este tour o estás planeando una experiencia especial para un grupo de personas, contáctanos. Nuestro equipo estará encantado de ofrecerte atención personalizada para ayudarte a organizar una aventura a la medida, adaptada a tus intereses y necesidades. Ya sea que busques una excursión cultural, un día de exploración en cenotes o una combinación única de actividades en Tulum y sus alrededores, estamos aquí para apoyarte y diseñar la experiencia perfecta para ti y tu grupo.
                    </p>

                </section>

            </main>

            <Footer />

        </div>
    );
}