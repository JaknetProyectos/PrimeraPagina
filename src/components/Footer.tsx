import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#212121] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--md-primary)] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-medium text-lg">Adventure Trip</span>
            </div>
            <p className="text-gray-400 text-sm">
              Experiencias únicas que combinan aventura, historia y cultura en México.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Destinos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/destinos/queretaro" className="hover:text-white transition-colors">Querétaro</Link></li>
              <li><Link href="/destinos/xochimilco" className="hover:text-white transition-colors">Xochimilco</Link></li>
              <li><Link href="/destinos/oaxaca" className="hover:text-white transition-colors">Oaxaca</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
              <li><a href="#contactanos" className="hover:text-white transition-colors">Contacto</a></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Administración</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de cancelación</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2024 Adventure Trip. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Hecho con cariño en México</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
