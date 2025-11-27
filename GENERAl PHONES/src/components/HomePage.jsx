// src/components/HomePage.jsx
// Single-file React component for the "General Phones" e-commerce home page.
// - Uses Tailwind CSS utility classes for styling.
// - Contains mock data and simple components (Header, Hero, Search, Grid, Footer).
// - Default export is the HomePage component (ready to import into App.jsx).

import React, { useState } from 'react';

// ---------- Mock data (replace with real API later) ----------
const PHONES = [
  {
    id: 1,
    name: 'Pulse X1',
    brand: 'NovaTech',
    price: 249,
    rating: 4.5,
    img: '/images/phone-1.jpg',
    tag: 'Best seller',
  },
  {
    id: 2,
    name: 'Arc Pro',
    brand: 'ZenMobile',
    price: 399,
    rating: 4.7,
    img: '/images/phone-2.jpg',
    tag: 'New',
  },
  {
    id: 3,
    name: 'MiniGo',
    brand: 'Pocket',
    price: 129,
    rating: 4.0,
    img: '/images/phone-3.jpg',
    tag: 'Budget',
  },
  {
    id: 4,
    name: 'Titan V',
    brand: 'MegaTel',
    price: 799,
    rating: 4.8,
    img: '/images/phone-4.jpg',
    tag: 'Premium',
  },
];

// ---------- Small presentational components (inside one file for simplicity) ----------
function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-indigo-600">GeneralPhones</div>
            <nav className="hidden md:flex gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-indigo-600">Home</a>
              <a href="#" className="hover:text-indigo-600">Shop</a>
              <a href="#" className="hover:text-indigo-600">About</a>
              <a href="#" className="hover:text-indigo-600">Contact</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm">Sign in</button>
            <button className="p-2 rounded-md hover:bg-gray-100">Cart (0)</button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ onSearch }) {
  const [q, setQ] = useState('');

  function submit(e) {
    e.preventDefault();
    onSearch(q.trim());
  }

  return (
    <section className="bg-gradient-to-r from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">Find the perfect phone — fast</h1>
            <p className="mt-4 text-gray-600 max-w-xl">Compare top brands, read quick specs, and buy with confidence. Affordable phones to premium flagships — all in one place.</p>

            <form onSubmit={submit} className="mt-6 flex gap-2 max-w-md">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search phones, brands, tags..."
                className="flex-1 rounded-md border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-label="Search phones"
              />
              <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white">Search</button>
            </form>

            <div className="mt-6 flex gap-3 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">🔥 <strong>Free shipping</strong> on orders over $200</span>
              <span>•</span>
              <span>🔒 Secure checkout</span>
            </div>
          </div>

          <div className="order-first md:order-last">
            <div className="rounded-2xl bg-white shadow p-4">
              <img src="/images/hero-phones.jpg" alt="Phones collection" className="w-full h-56 object-cover rounded-lg" />
              <p className="mt-3 text-sm text-gray-500">Top picks this week — hand-selected for value & performance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Filters({ brands, onFilterChange }) {
  const [selected, setSelected] = useState('All');

  function change(b) {
    setSelected(b);
    onFilterChange(b === 'All' ? null : b);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => change('All')} className={`px-3 py-1 rounded-md border ${selected === 'All' ? 'bg-indigo-600 text-white' : 'bg-white'}`}>All</button>
      {brands.map((b) => (
        <button key={b} onClick={() => change(b)} className={`px-3 py-1 rounded-md border ${selected === b ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
          {b}
        </button>
      ))}
    </div>
  );
}

function PhoneCard({ phone }) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img src={phone.img} alt={`${phone.name} image`} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-lg font-semibold">{phone.name}</h3>
            <p className="text-sm text-gray-500">{phone.brand}</p>
          </div>
          <div className="text-right">
            <div className="text-indigo-600 font-bold">${phone.price}</div>
            <div className="text-xs text-gray-500">{phone.rating} ★</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-md">{phone.tag}</span>
          <button className="px-3 py-1 text-sm rounded-md border hover:bg-indigo-50">View</button>
        </div>
      </div>
    </article>
  );
}

// ---------- Main page component ----------
export default function HomePage() {
  const [query, setQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState(null);

  // derive brand list from data
  const brands = Array.from(new Set(PHONES.map((p) => p.brand)));

  // filtered phones
  const filtered = PHONES.filter((p) => {
    const matchesQuery = query === '' || `${p.name} ${p.brand} ${p.tag}`.toLowerCase().includes(query.toLowerCase());
    const matchesBrand = !brandFilter || p.brand === brandFilter;
    return matchesQuery && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      <main>
        <Hero onSearch={(q) => setQuery(q)} />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Featured phones</h2>
              <p className="text-sm text-gray-500">Popular picks from our collection.</p>
            </div>

            <div className="flex items-center gap-4">
              <Filters brands={brands} onFilterChange={(b) => setBrandFilter(b)} />

              <div className="hidden md:block">
                <label className="text-sm text-gray-500">Sort</label>
                <select className="ml-2 rounded-md border px-2 py-1">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <PhoneCard key={p.id} phone={p} />
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-20">No phones match your search.</div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <div className="font-semibold text-gray-900">GeneralPhones</div>
              <div className="mt-2">© {new Date().getFullYear()} GeneralPhones. All rights reserved.</div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="hover:text-indigo-600">Privacy</a>
              <a href="#" className="hover:text-indigo-600">Terms</a>
              <a href="#" className="hover:text-indigo-600">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
