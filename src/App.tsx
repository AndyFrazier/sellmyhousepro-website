import { useState } from 'react';
import { joinWaitlist } from './lib/supabase';
import {
  Menu, X, ArrowRight, CheckCircle,
  ClipboardList, Wrench, Globe, Megaphone, FileText, UserSearch,
  MessageSquare, Scale, FolderLock, Languages, Package, Truck,
  BookOpen, ListChecks, Receipt, Bot,
  Handshake, SquareUser as UserSquare2, Send,
} from 'lucide-react';

const features = [
  { icon: ClipboardList, title: 'Sale Planner',             desc: 'Master checklist and milestones for your entire sale' },
  { icon: Wrench,        title: 'Job Manager',              desc: 'Every repair and task, assigned, costed and tracked' },
  { icon: Globe,         title: 'Property Website Builder', desc: 'A professional listing site in minutes — no coding needed' },
  { icon: Megaphone,     title: 'Marketing Hub',            desc: 'Social media campaigns and copy, ready to post' },
  { icon: FileText,      title: 'Pre-Sale Legal Docs',      desc: 'Know exactly what documents you need, by country' },
  { icon: UserSearch,    title: 'Agent Finder',             desc: 'Find and contact local agents with one search' },
  { icon: MessageSquare, title: 'Enquiry Tracker',          desc: 'Log every buyer contact and never lose a lead' },
  { icon: Scale,         title: 'Post-Sale Legal Docs',     desc: 'Stay compliant through to completion' },
  { icon: FolderLock,    title: 'Document Vault',           desc: 'Every document in one secure, organised place' },
  { icon: Languages,     title: 'AI Document Translation',  desc: 'French or Spanish documents translated instantly' },
  { icon: Package,       title: 'Sale Inventory',           desc: 'Log everything included in the sale price' },
  { icon: Truck,         title: 'Removal Inventory',        desc: 'What you are keeping, with sizes and weights for removal firms' },
  { icon: BookOpen,      title: 'Buyer Handover Pack',      desc: 'How-to guides for your new owners — pool, heating, appliances' },
  { icon: ListChecks,    title: 'Final Checklist',          desc: 'Nothing left behind, nothing forgotten' },
  { icon: Receipt,       title: 'Agent Commission Guide',   desc: 'Understand your contract before you sign anything' },
  { icon: Bot,           title: 'AI Assistant',             desc: 'Your intelligent companion for the whole journey — powered by Claude' },
];

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
];

function smoothScroll(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail]   = useState('');
  const [heroState, setHeroState] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setHeroState('loading');
    const result = await joinWaitlist(email.trim());
    if (result.alreadyExists) setHeroState('duplicate');
    else if (result.error)    setHeroState('error');
    else                      setHeroState('success');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    smoothScroll(href);
  };

  return (
    <div className="min-h-screen font-sans">

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/SMHP_logo.png" alt="SellMyHousePro" className="h-14 w-auto object-contain" />
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={e => handleNavClick(e, href)}
                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — scrolls to hero form */}
          <a
            href="#hero"
            onClick={e => handleNavClick(e, '#hero')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-[#2E6DA4] text-white text-sm font-semibold rounded-lg hover:bg-[#245989] transition-colors shadow-sm"
          >
            Join Waitlist
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={e => handleNavClick(e, href)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#hero"
                onClick={e => handleNavClick(e, '#hero')}
                className="block text-center px-5 py-3 bg-[#2E6DA4] text-white text-sm font-semibold rounded-lg hover:bg-[#245989] transition-colors"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#1c466e] via-[#2E6DA4] to-[#5590c8] pt-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: Copy */}
          <div className="text-white">
            <img
              src="/SMHP_logo.png"
              alt="SellMyHousePro"
              className="mx-auto md:mx-0 mb-8 w-auto object-contain"
              style={{ height: '220px', mixBlendMode: 'multiply', background: 'transparent' }}
            />
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white/90 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Now accepting waitlist signups
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white">
              Selling your home{' '}
              <span className="text-blue-200">made simple</span>{' '}
              — wherever you are.
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-lg">
              SellMyHousePro gives you a proven project management framework for every stage of your sale — whether you're using an agent or going it alone. Built by someone who sold their house in France and learned everything the hard way.
            </p>

            {heroState === 'success' ? (
              <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-200 max-w-md">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">You're on the list! We'll be in touch soon.</span>
              </div>
            ) : heroState === 'duplicate' ? (
              <div className="flex items-center gap-3 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-200 max-w-md">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">You're already on the list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm shadow-sm"
                />
                <button
                  type="submit"
                  disabled={heroState === 'loading'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#2E6DA4] font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap disabled:opacity-60"
                >
                  {heroState === 'loading' ? 'Joining...' : <><span>Join Waitlist</span><ArrowRight className="w-4 h-4" /></>}
                </button>
                {heroState === 'error' && (
                  <p className="text-red-300 text-xs mt-1">Something went wrong. Please try again.</p>
                )}
              </form>
            )}

            <p className="mt-4 text-blue-200/70 text-xs">Free to join. No card required. Launching soon.</p>
            <p className="mt-2 text-blue-200/60 text-xs">Designed for French, Spanish, UK and international property sales</p>

            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: '16',   label: 'Feature modules' },
                { value: '2',    label: 'Simple plans'    },
                { value: '€225', label: 'Max total cost'  },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-blue-200/80 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-sm">My Sale — 12 Rue des Lilas</span>
                <span className="bg-green-400/20 text-green-300 text-xs font-medium px-3 py-1 rounded-full">Active</span>
              </div>
              <div>
                <div className="flex justify-between text-xs text-blue-200 mb-2">
                  <span>Overall progress</span><span>64%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '64%' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Documents', value: '12 / 18',    bg: 'bg-blue-400/20 text-blue-100'  },
                  { label: 'Open Tasks', value: '4 due soon', bg: 'bg-amber-400/20 text-amber-200' },
                  { label: 'Viewings',  value: '7 scheduled', bg: 'bg-green-400/20 text-green-200' },
                  { label: 'Best Offer', value: '€385,000',   bg: 'bg-white/10 text-blue-100'     },
                ].map(item => (
                  <div key={item.label} className={`${item.bg} rounded-xl p-3`}>
                    <div className="text-[11px] opacity-70 mb-1">{item.label}</div>
                    <div className="font-semibold text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2.5">
                <div className="text-xs text-blue-200 font-medium">Recent activity</div>
                {[
                  { text: 'Notaire confirmed appointment', time: '2h ago'    },
                  { text: 'Offer received — €385,000',    time: 'Yesterday'  },
                  { text: 'EPC certificate uploaded',      time: '2 days ago' },
                ].map(item => (
                  <div key={item.text} className="flex items-center justify-between text-xs">
                    <span className="text-blue-100">{item.text}</span>
                    <span className="text-blue-300/70 ml-4 whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────── */}
      <section id="pricing" className="bg-[#1a2f4a] py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Pay only while you're selling.</h2>
            <p className="text-blue-200 text-lg">Hit your cap and keep using everything — free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

            {/* Starter */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col h-full">
              <div className="mb-6">
                <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-2">Starter</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">Free</span>
                </div>
                <p className="text-blue-200/60 text-sm mt-1">Forever</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {['Sale Planner & checklist', 'Job Manager with costings'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-blue-100">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                Get started free
              </button>
            </div>

            {/* Essentials — blue top accent */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
              <div className="h-1 bg-[#2E6DA4]" />
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Essentials</p>
                    <span className="bg-blue-500/20 text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-blue-400/20 whitespace-nowrap">Best for agent-assisted sellers</span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">€15</span>
                    <span className="text-blue-300 text-sm mb-1.5">/month</span>
                  </div>
                  <p className="text-blue-200/60 text-sm mt-1">Maximum cost: €135 — then free</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {[
                    'Everything in Starter',
                    'Legal Docs (pre & post sale)',
                    'Document Vault & AI Translation',
                    'Inventories & Buyer Handover Pack',
                    'Agent Commission Guide',
                    'AI Assistant (30 requests/month)',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-blue-100">
                      <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl bg-white text-[#1a2f4a] font-semibold text-sm hover:bg-blue-50 transition-colors">
                  Start free trial
                </button>
              </div>
            </div>

            {/* Complete — elevated, blue top accent */}
            <div className="relative bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl scale-[1.04] border-2 border-amber-400/30">
              <div className="h-1 bg-[#2E6DA4]" />
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="text-[#1a2f4a] text-sm font-semibold uppercase tracking-wider">Complete</p>
                    <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">Best for private sellers</span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-[#1a2f4a]">€25</span>
                    <span className="text-gray-500 text-sm mb-1.5">/month</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Maximum cost: €225 — then free</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {[
                    'Everything in Essentials',
                    'Enquiry Tracker',
                    'Property Website Builder',
                    'Social Media Marketing Hub',
                    'Unlimited AI Assistant',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#2E6DA4] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl bg-[#2E6DA4] text-white font-semibold text-sm hover:bg-[#245989] transition-colors shadow-sm">
                  Start free trial
                </button>
              </div>
            </div>

          </div>

          <p className="text-center text-blue-300/60 text-sm mt-10">
            No credit card required to start. Cancel any time. Your data is yours.
          </p>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section id="features">
        <div className="bg-white py-16 text-center px-4 sm:px-6">
          <p className="text-[#2E6DA4] font-semibold text-sm uppercase tracking-wider mb-3">16 feature modules</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything you need — nothing you don't.
          </h2>
        </div>

        {[0, 1, 2, 3].map(rowIdx => {
          const row = features.slice(rowIdx * 4, rowIdx * 4 + 4);
          const bg  = rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
          return (
            <div key={rowIdx} className={`${bg} py-6 px-4 sm:px-6`}>
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {row.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#2E6DA4]/30 transition-all duration-200 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#2E6DA4]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Who is it for? ─────────────────────────────────────────── */}
      <section id="about" className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#2E6DA4] font-semibold text-sm uppercase tracking-wider mb-3">Who is it for?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Two ways to sell. One platform.</h2>
          </div>

          {/* items-stretch ensures equal height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Agent card */}
            <div className="border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5 flex-shrink-0">
                <Handshake className="w-6 h-6 text-[#2E6DA4]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Selling through an agent</h3>
              <span className="inline-block bg-blue-50 text-[#2E6DA4] text-xs font-semibold px-3 py-1 rounded-full border border-blue-100 mb-4 self-start">
                Essentials plan recommended
              </span>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">
                A good agent earns their fee — viewings, negotiation, diagnostics, notaire introductions and hand-holding through the transaction. But their service stops there. SellMyHousePro handles everything either side of it: preparation, documents, translations, inventories and handover. The part no agent covers.
              </p>
            </div>

            {/* Private seller card */}
            <div className="border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5 flex-shrink-0">
                <UserSquare2 className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Selling privately</h3>
              <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200 mb-4 self-start">
                Complete plan recommended
              </span>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">
                Going it alone saves commission but adds complexity. SellMyHousePro gives you every tool a private seller needs — your own property website, buyer enquiry tracking, social media marketing, and the full legal and document framework — managed in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── See it in action ───────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#2E6DA4] font-semibold text-sm uppercase tracking-wider mb-3">See it in action</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See it in action.</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">
            This is a real property listing built with SellMyHousePro — a farmhouse in South West France, sold using our platform.
          </p>
          <div className="mx-auto max-w-[900px]">
            <img
              src="/example-property.jpg"
              alt="Example property listing — farmhouse in Lot-et-Garonne"
              className="w-full rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100"
            />
            <p className="mt-5 text-gray-400 text-sm italic">
              Beautiful farmhouse, Lot-et-Garonne — listed, marketed and sold using SellMyHousePro.
            </p>
          </div>
        </div>
      </section>

      {/* ── Founder story ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#2E6DA4] font-semibold text-sm uppercase tracking-wider mb-4">Our story</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Built by someone who did it the hard way
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-10">
            When we decided to sell our home in France, we discovered there was no single tool to manage the process. Just paperwork, confusing legal requirements, language barriers and no clear idea of where to start. So we built our own tools — and piece by piece, managed the sale ourselves. SellMyHousePro is those tools, combined, polished and powered by AI. We built the platform we wish we had.
          </p>
          <div className="inline-flex flex-col items-center gap-1">
            <div className="w-12 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm font-medium italic mt-3">The SellMyHousePro Team</span>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer id="contact" className="bg-[#1a2f4a] px-4 sm:px-6 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/SMHP_logo.png" alt="SellMyHousePro" className="h-12 w-auto object-contain" />
              </div>
              <p className="text-blue-200/70 text-sm leading-relaxed">Selling your home made simple.</p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <p className="text-white font-semibold text-sm mb-1">Quick links</p>
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={e => handleNavClick(e, href)}
                  className="text-blue-200/70 text-sm hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Waitlist */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Join the waitlist</p>
              <FooterWaitlist />
            </div>
          </div>

          <p className="text-center text-blue-300/40 text-xs mt-8">
            © 2026 SellMyHousePro. Designed for French, Spanish, UK and international property sales.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FooterWaitlist() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState('loading');
    const result = await joinWaitlist(email.trim());
    if (result.alreadyExists) setState('duplicate');
    else if (result.error)    setState('error');
    else                      setState('success');
  };

  if (state === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-300 text-sm">
        <CheckCircle className="w-4 h-4 flex-shrink-0" />
        You're on the list! We'll be in touch soon.
      </div>
    );
  }

  if (state === 'duplicate') {
    return (
      <div className="flex items-center gap-2 text-blue-300 text-sm">
        <CheckCircle className="w-4 h-4 flex-shrink-0" />
        You're already on the list!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 min-w-0 px-3 py-2.5 bg-white/10 border border-white/20 text-white placeholder-blue-300/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="flex-shrink-0 p-2.5 bg-[#2E6DA4] rounded-lg text-white hover:bg-[#245989] transition-colors disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      {state === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
