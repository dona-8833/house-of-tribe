import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold mb-4">
              House Of  <span className="text-primary">Tribe</span>
            </h3>
            <p className="text-white/80 mb-6 text-base leading-relaxed">
              Authentic Nigerian Aso Oke fashion that celebrates heritage while embracing modern style. Each piece tells a story of tradition, craftsmanship, and cultural pride.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-full hover:bg-primary/10 text-white hover:text-primary transition-colors duration-200"
                  aria-label={`Follow us on ${label}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-white">Shop</h4>
            <ul className="space-y-3">
              {[
                { name: 'Agbada Collection', to: '/agbada' },
                { name: 'Fila Caps', to: '/fila' },
                { name: 'Bubu Gowns', to: '/bubu' },
                { name: 'Cargo Pants', to: '/cargo' },
                { name: 'Premium Fabrics', to: '/#' },
                { name: 'Custom Orders', to: '/#' },
              ].map(link => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-primary text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'Size Guide', to: '/#' },
                { name: 'Shipping Info', to: '/#' },
                { name: 'Returns & Exchanges', to: '/#' },
                { name: 'Care Instructions', to: '/#' },
                { name: 'Track Your Order', to: '/#' },
                { name: 'Contact Us', to: '/#' },
              ].map(link => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-primary text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-white">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-white/80 text-base">
                  2-4 Southcoates Lane<br />
                  HU9 3AB<br />
                  United Kingdom
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+447407676575"
                  className="text-white/80 hover:text-primary text-base transition-colors duration-200"
                  aria-label="Call us at +44 7407 676575"
                >
                  +44 7407 676575
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:Thehouseoftribes83@gmaail.com"
                  className="text-white/80 hover:text-primary text-base transition-colors duration-200"
                  aria-label="Email us at Thehouseoftribes83@gmaail.com"
                >
                  Thehouseoftribes83@gmaail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 py-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} House of Tribe. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              {[
                { name: 'Privacy Policy', to: '/privacy' },
                { name: 'Terms of Service', to: '/terms' },
                { name: 'Shipping Policy', to: '/shipping-policy' },
              ].map(link => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-white/60 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;