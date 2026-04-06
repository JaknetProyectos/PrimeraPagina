"use client";

import Image from "next/image";

interface QuoteDetailCardProps {
  title: string;
  image: string;
  description: string;
  quoteNumber: string;
  price: number;
  onAddToCart?: () => void;
}

export default function QuoteDetailCard({
  title,
  image,
  description,
  quoteNumber,
  price,
  onAddToCart,
}: QuoteDetailCardProps) {
  return (
    <section className="space-y-16">

      {/* TOP */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* COLUMNA 1 */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <h2 className="text-2xl md:text-4xl font-light text-center md:text-left">
            {title}
          </h2>

          <Image
            src={image}
            alt={title}
            width={250}
            height={250}
            className="object-contain drop-shadow-xl"
          />
        </div>

        {/* COLUMNA 2 */}
        <div className="space-y-6 bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">

          <p className="text-white/80 leading-relaxed">
            {description}
          </p>

          <p className="text-sm text-white/60">
            El monto de la cotización ya incluye IVA
          </p>

          {/* DATOS */}
          <div className="space-y-4">

            <div>
              <p className="text-sm text-white/60">No. de cotización</p>
              <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2">
                {quoteNumber}
              </div>
            </div>

            <div>
              <p className="text-sm text-white/60">Cotización</p>
              <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 font-medium">
                ${price.toLocaleString("es-MX")} MXN
              </div>
            </div>

          </div>

          {/* BOTÓN */}
          <button
            onClick={onAddToCart}
            className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Añadir al carrito
          </button>

        </div>

      </div>

      {/* DESCRIPCIÓN */}
      <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-xl font-medium">Descripción</h3>

        <p className="text-white/80 leading-relaxed">
          Vive el fútbol como un verdadero local, disfrutando de transporte,
          tacos, bebidas y souvenirs. Sumérgete en la emoción del juego de
          principio a fin, sin complicaciones.

          <br /><br />

          Durante el Mundial, también podrás disfrutar transmisiones en vivo en
          pantallas gigantes, rodeado de aficionados, con la misma energía que
          se vive en el estadio. Una experiencia que combina deporte,
          gastronomía y ambiente festivo.
        </p>
      </div>

    </section>
  );
}