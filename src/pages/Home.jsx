import React from "react";
import Layout from "../components/layout/Layout";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import HeroCard from "../components/product/HeroCard";

function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Layout>
        {/* Hero Section */}
        <main className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center md:items-start space-y-6 max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Timeless House Of<br /> Tribe
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Discover authentic Nigerian craftsmanship with our curated collection of traditional Agbada, elegant Fila caps, flowing Bubu gowns, and premium fabrics that blend heritage with contemporary style.
            </p>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center md:justify-start text-primary font-semibold">
              <div className="flex flex-col items-center">
                <span className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" aria-hidden="true" />
                  4.9
                </span>
                Customer Rating
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg">500+</span>
                Happy Customers
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg">100%</span>
                Authentic Fabric
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start pt-6">
              <Link
                to="/search"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                aria-label="Shop the collection"
              >
                Shop Collection
              </Link>
              <button
                className="bg-gradient-to-r from-primary2 to-primary hover:from-primary2/90 hover:to-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                aria-label="Place a custom order"
              >
                Custom Orders
              </button>
            </div>
          </div>
          <div className="relative w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden flex items-start justify-start shadow-xl">
            <img
              src="/hero1.png"
              alt="Traditional Nigerian fashion"
              className="w-full h-150 object-cover flex items-start justify-start transition-transform  duration-500 ease-in-out hover:scale-105"
            />
          </div>
        </main>

        {/* Collection Section */}
        <section className="py-12 px-4 md:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explore Our Collection</h2>
          <div className="bg-primary w-16 h-1 mx-auto"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From traditional ceremonial wear to modern interpretations, discover the rich heritage of Nigerian Aso Oke fashion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <div className="lg:col-span-2">
              <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden group">
                <img
                  className="w-full h-full object-cover filter brightness-75 transition-transform duration-700 group-hover:scale-105"
                  src="/agbada.jpg"
                  alt="Traditional Agbada"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">Traditional Agbada</h3>
                  <p className="text-white/90 mb-4 text-base md:text-lg">Elegant flowing robes for special occasions</p>
                  <Link
                    to="/agbada"
                    className="bg-[#e6c360] hover:bg-[#d4b150] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                    aria-label="Shop Traditional Agbada"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative h-60 rounded-2xl overflow-hidden group">
                <img
                  className="w-full h-full object-cover filter brightness-75 transition-transform duration-700 group-hover:scale-105"
                  src="/caps.jpg"
                  alt="Fila Caps"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">Fila Caps</h3>
                  <p className="text-white/90 mb-4 text-base">Authentic hand-woven traditional caps</p>
                  <Link
                    to="/fila"
                    className="bg-[#e6c360] hover:bg-[#d4b150] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                    aria-label="Shop Fila Caps"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="relative h-60 rounded-2xl overflow-hidden group">
                <img
                  className="w-full h-full object-cover filter brightness-75 transition-transform duration-700 group-hover:scale-105"
                  src="/bubu.jpg"
                  alt="Bubu Gowns"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">Bubu Gowns</h3>
                  <p className="text-white/90 mb-4 text-base">Graceful women's traditional wear</p>
                  <Link
                    to="/bubu"
                    className="bg-[#e6c360] hover:bg-[#d4b150] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                    aria-label="Shop Bubu Gowns"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="relative h-60 rounded-2xl overflow-hidden group">
              <img
                className="w-full h-full object-cover filter brightness-75 transition-transform duration-700 group-hover:scale-105"
                src="/cargo.jpg"
                alt="Modern Cargo"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">Modern Cargo</h3>
                <p className="text-white/90 mb-4 text-base">Contemporary streetwear with traditional fabric</p>
                <Link
                  to="/cargo"
                  className="bg-[#e6c360] hover:bg-[#d4b150] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  aria-label="Explore Modern Cargo"
                >
                  Explore
                </Link>
              </div>
            </div>
            <div className="relative h-60 rounded-2xl overflow-hidden group">
              <img
                className="w-full h-full object-cover filter brightness-75 transition-transform duration-700 group-hover:scale-105"
                src="/asooke.webp"
                alt="Premium Fabrics"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">Premium Fabrics</h3>
                <p className="text-white/90 mb-4 text-base">Authentic Aso Oke textiles by the yard</p>
                <button
                  className="bg-[#e6c360] hover:bg-[#d4b150] text-black px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  aria-label="Explore Premium Fabrics"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Collections Section */}
        <section className="bg-yellow-50 py-12 px-4 md:px-6 lg:px-8">
          <Layout>
            <div className="flex flex-col items-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trending Collections</h2>
              <div className="bg-primary w-16 h-1 mx-auto"></div>
              <p className="text-lg text-gray-600 max-w-2xl text-center">
                Handpicked pieces that blend traditional Nigerian craftsmanship with contemporary style.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
              <HeroCard
                title="Royal Agbada - Deep Brown"
                image="/HEROAGBADA.PNG"
                category="Agbada"
                price="120"
              />
              <HeroCard
                category="Bubu Gown"
                title="Elegant Bubu Gown - Cream"
                image="/HEROBUBU.PNG"
                price="120"
              />
              <HeroCard
                category="Fila"
                title="Traditional Fila Cap Set"
                image="/trendfila.jpg"
                price="120"
              />
              <HeroCard
                category="Cargo"
                title="Cargo Pants - Aso Oke"
                image="/cargo.jpg"
                price="120"
              />
            </div>
            <div className="flex justify-center mt-10">
              <Link
                to="/search"
                className="bg-gradient-to-r from-primary2 to-primary hover:from-primary2/90 hover:to-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 capitalize"
                aria-label="View all products"
              >
                View All Products
              </Link>
            </div>
          </Layout>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#f1eee7] py-12 px-4 md:px-6 lg:px-8">
          <Layout>
            <div className="flex flex-col items-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
              <div className="bg-primary w-16 h-1 mx-auto"></div>
              <p className="text-lg text-gray-600 max-w-2xl text-center">
                Hear from our global community who trust us to deliver authentic Nigerian fashion.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {[
                {
                  name: "Amina",
                  location: "Lagos, Nigeria",
                  comment: "The quality of the Agbada I purchased exceeded my expectations. The craftsmanship is exceptional and the fabric feels authentic. Perfect for my wedding ceremony!",
                  product: "Agbada Collection",
                  initial: "A",
                },
                {
                  name: "Michael Johnson",
                  location: "Atlanta, USA",
                  comment: "As someone living abroad, finding authentic Nigerian fashion was challenging until I found AsoOke Couture. The shipping was fast and the Fila caps are exactly what I was looking for.",
                  product: "Traditional Fila Collection",
                  initial: "M",
                },
                {
                  name: "Folake Adeniran",
                  location: "London, UK",
                  comment: "My Bubu gown arrived beautifully packaged and fits perfectly. The attention to detail in the embroidery is remarkable. I feel connected to my heritage wearing it.",
                  product: "Elegant Bubu Gown",
                  initial: "F",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M7.17 6A5.5 5.5 0 0 0 2 11.5v6A2.5 2.5 0 0 0 4.5 20h3a2.5 2.5 0 0 0 2.5-2.5v-6A2.5 2.5 0 0 0 7.17 6zm10 0A5.5 5.5 0 0 0 12 11.5v6a2.5 2.5 0 0 0 2.5 2.5h3A2.5 2.5 0 0 0 20 17.5v-6a2.5 2.5 0 0 0-2.83-2.5z" />
                  </svg>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-primary text-primary"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 0 0 .95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.455a1 1 0 0 0-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.384-2.455a1 1 0 0 0-1.176 0l-3.384 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 0 0-.364-1.118L2.047 9.401c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 0 0 .95-.69l1.286-3.974z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{testimonial.comment}</p>
                  <div className="text-sm text-primary font-medium mb-4 bg-primary/10 rounded-lg px-3 py-2 inline-block">
                    {testimonial.product}
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary2 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{testimonial.initial}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">4.9★</div>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">50+</div>
                  <p className="text-sm text-gray-500">Countries Served</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <p className="text-sm text-gray-500">Authentic Fabrics</p>
                </div>
              </div>
            </div>
          </Layout>
        </section>
      </Layout>
    </div>
  );
}

export default Home;