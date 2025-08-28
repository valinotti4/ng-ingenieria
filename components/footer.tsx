import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo-ng.png"
                alt="NG Ingeniería en Seguridad"
                width={40}
                height={40}
                className="object-contain"
              />
              <h5 className="text-lg font-bold">NG Ingeniería en Seguridad</h5>
            </div>
            <p className="text-slate-400">
              Protegiendo lo que más importa con tecnología de vanguardia y
              servicio profesional.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Servicios</h5>
            <ul className="space-y-2 text-slate-400">
              <li>Video Vigilancia</li>
              <li>Sistemas de Alarma</li>
              <li>Monitoreo 24/7</li>
              <li>Mantenimiento</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Links Útiles</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dolar"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Cotización Dólar
                </Link>
              </li>
              <li>
                <Link
                  href="https://ng.com.ar/meteo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors flex items-center"
                >
                  DigiMeteo
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Alianza Estratégica</h5>
            <div className="flex items-center space-x-3">
              <Image
                src="/logo-gp.png"
                alt="GP Alarmas"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="text-slate-400">GP Alarmas</span>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>
            &copy; 2024 NG Ingeniería en Seguridad. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
