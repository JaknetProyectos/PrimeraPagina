export default function ConocenosSection() {
  return (
    <section id="conocenos" className="bg-[#1f1e58] py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-1/2">
            <div
              className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
              style={{ backgroundColor: "#7d9fab" }}
            >
              <img
                src="https://ext.same-assets.com/619569696/1231009136.jpeg"
                alt="Calle colorida de México"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 text-white">
            <p className="text-[#e8e0c6] font-abel text-xl mb-2 italic">Conócenos</p>
            <h2 className="font-anton text-5xl lg:text-6xl text-[#e8e0c6] mb-6">
              Adventure Trip
            </h2>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              En <span className="font-semibold text-[#e8e0c6]">Adventure Trip</span> creemos que viajar es mucho más que moverse de un lugar a otro: es vivir experiencias que despiertan los sentidos, conectan con la cultura y dejan recuerdos inolvidables.
            </p>

            <div className="flex items-start gap-3">
              <img
                src="https://ext.same-assets.com/619569696/2545856868.svg"
                alt="Globe"
                className="w-6 h-6 mt-1"
              />
              <div>
                <span className="font-semibold text-[#e8e0c6]">Nuestra esencia</span>
                <p className="text-white/80 mt-1">
                  Diseñamos recorridos únicos que combinan aventura, historia, naturaleza y gastronomía.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
