"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { Menu, X, Settings, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const navItems = [
    { href: "/", label: t('nav.about') },
    { href: "/armatuaventura", label: t('nav.build_adventure') },
    { href: "/experiencias", label: t('nav.experiences') },
    { href: "/pasion", label: t('nav.football_passion') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={50}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-600 hover:text-[#03A9F4] hover:bg-gray-50 rounded transition-colors font-medium text-sm uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF9800] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-800 hover:bg-gray-50 rounded font-medium uppercase text-sm tracking-wider"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}