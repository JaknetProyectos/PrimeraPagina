import Link from "next/link";
import visa from "@/public/visa.png"
import mastercard from "@/public/mastercard.png"
import Image from "next/image";


export default function Footer() {
  return (
    <footer className="bg-[#212121] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium text-lg">Viva Trip</span>
            </div>
            <p className="text-gray-400 text-sm">
              Experiencias únicas que combinan aventura, historia y cultura en México.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4">Aceptamos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Image src={visa} alt="visa" width={60} />
              </li>
              <li>
                <Image src={mastercard} className="mt-3" alt="visa" width={60} />
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/#contactanos" className="hover:text-white transition-colors">contacto@vivatrip.com</Link></li>
              <li><Link href="/#contactanos" className="hover:text-white transition-colors">+ 52 1 55 1234 1234</Link></li>
              <li><Link href="/#contactanos" className="hover:text-white transition-colors">Av. México</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/legal/terminos" className="hover:text-white transition-colors">Términos y condiciones</Link></li>
              <li><Link href="/legal/reembolsos" className="hover:text-white transition-colors">Política de reembolso y cancelarción</Link></li>
              <li><Link href="/legal/privacidad" className="hover:text-white transition-colors">Aviso de privacidad</Link></li>
              <li><Link href="/legal/consumidor" className="hover:text-white transition-colors">Ley Federal de Protección al Consumidor</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Viva Trip. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Hecho con cariño en México</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
