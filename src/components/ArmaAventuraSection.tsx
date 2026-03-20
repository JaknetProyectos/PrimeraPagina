export default function ArmaAventuraSection() {
  return (
    <section id="arma-aventura" className="relative min-h-screen bg-[#1f1e58]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://ext.same-assets.com/619569696/3584943617.webp')",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Big Title */}
        <h2 className="font-anton text-[#e8e0c6] text-6xl md:text-8xl lg:text-[10rem] leading-none text-center mb-16">
          ARMA TU
          <br />
          AVENTURA
        </h2>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-12">
          {/* Image */}
          <div className="lg:w-1/3">
            <div
              className="relative w-full h-[300px] lg:h-[350px] rounded-lg overflow-hidden shadow-xl"
              style={{ backgroundColor: "#4a4a4a" }}
            >
              <img
                src="https://ext.same-assets.com/619569696/3686289824.png"
                alt="Grupo de viajeros"
                className="absolute inset-0 w-full h-full object-cover grayscale"
                loading="eager"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-2/3 text-white">
            <p className="text-[#e8e0c6] uppercase tracking-wider mb-2">
              QUIERES ARMAR UN PLAN A LA MEDIDA
            </p>
            <h3 className="font-anton text-[#e8e0c6] text-4xl lg:text-5xl mb-6">
              Te ayudamos
            </h3>
            <p className="text-white/80 mb-4">
              <span className="font-semibold text-white">¿Necesitas más información o quieres planear una aventura en grupo?</span>
            </p>
            <p className="text-white/70 mb-8">
              Si tienes dudas sobre nuestros servicios, deseas más detalles acerca de este tour o estás planeando una experiencia especial para un grupo de personas, <span className="font-semibold text-white underline cursor-pointer">contáctanos.</span>
            </p>

            <a
              href="#contactanos"
              className="inline-block border-2 border-white/50 text-white px-12 py-4 rounded hover:bg-white hover:text-[#1f1e58] transition-all duration-300 font-medium"
            >
              Arma tu aventura
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
