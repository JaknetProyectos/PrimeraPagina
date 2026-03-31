"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  MapPin,
  TentTree,
  Coins,
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import Loading from "@/components/Loading"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reservaciones", label: "Reservaciones", icon: Calendar },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
  { href: "/admin/destinos", label: "Destinos", icon: MapPin },
  { href: "/admin/experiencias", label: "Experiencias", icon: TentTree }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔐 PROTEGER RUTA
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // 🚪 LOGOUT REAL
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // 🧠 Título dinámico
  const getTitle = () => {
    if (pathname.startsWith("/admin/reservaciones")) return "Reservaciones";
    if (pathname.startsWith("/admin/configuracion")) return "Configuración";
    return "Dashboard";
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Overlay mobile
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--md-primary)] transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <Link href="/admin" className="text-white font-semibold">
              Administración
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white"
            >
              <X />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
                    ? "bg-[#ae4e68] text-white shadow"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>

            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white transition"
            >
              ← Volver al sitio
            </Link>
          </div>
        </div>
      </aside> */}

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* TOPBAR */}
        {/* <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-xl font-semibold text-gray-800">
              {getTitle()}
            </h1>
          </div> */}

          {/* Usuario */}
          {/* <div className="text-sm text-gray-500">
            Panel Admin
          </div>
        </header> */}

        {/* CONTENT */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}