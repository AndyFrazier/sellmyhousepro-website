import { useState, useRef } from 'react';
import { joinWaitlist } from './lib/supabase';
import {
  Menu, X, ArrowRight, CheckCircle,
  ClipboardList, Wrench, Globe, Megaphone, FileText, UserSearch,
  MessageSquare, Scale, FolderLock, Languages, Package, Truck,
  BookOpen, ListChecks, Receipt, Bot,
  Handshake, SquareUser as UserSquare2, Send,
} from 'lucide-react';

// ── Google Fonts ─────────────────────────────────────────────────────────────
if (typeof document !== 'undefined' && !document.getElementById('smhp-gfonts')) {
  const l = document.createElement('link');
  l.id = 'smhp-gfonts';
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap';
  document.head.appendChild(l);
}

// ── Colour palette ───────────────────────────────────────────────────────────
const th = {
  cream:      '#F7F2EA',
  stone:      '#EDE8DF',
  terracotta: '#C4614A',
  tcLight:    '#E8896E',
  olive:      '#3D5229',
  oliveMid:   '#5A7A3E',
  charcoal:   '#2A2018',
  gold:       '#C49A3A',
  muted:      '#7A6E60',
  deepOlive:  '#243518',
};

// ── Feature data ─────────────────────────────────────────────────────────────
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

const featureTooltips: Record<string, string> = {
  'Sale Planner': 'A full checklist in English and your local language, so you can work alongside local tradespeople, notaires and agents without anything getting lost in translation.',
  'Job Manager': 'Assign every job to a worker or tradesman, track materials with a built-in shopping list, log timesheets and store quotations — all in one place.',
  'Property Website Builder': 'A simple template where you add your description, features, price and unique selling points, then upload your photos — and get a professional looking property page ready to share in minutes.',
  'Marketing Hub': 'Generate outstanding social media content for Facebook, Instagram, X and more — tailored to your property and designed to drive traffic directly to your listing.',
  'Pre-Sale Legal Docs': 'Get an up-to-date checklist of exactly what you need to provide before your property goes live — specific to the country you are selling in, so nothing gets missed.',
  'Agent Finder': 'Find local sale agents wherever your property is located, with recommendations, reviews and references — so you can choose the right agent with confidence.',
  'Enquiry Tracker': 'Log every sales enquiry from first contact to final offer — record conversations, comments, visit notes and concerns, so you always know who is serious and who is not.',
  'Post-Sale Legal Docs': 'Get a full up-to-date list of everything you need from sale agreed right through to final completion — guiding you step by step to a clean handover.',
  'Document Vault': 'Store a copy of every document securely in the cloud, accessible from any device, anywhere in the world, at any time.',
  'AI Document Translation': 'Complete document translation in one pass — no copy-pasting into Google Translate. Load your French or Spanish documents and our AI handles the rest, accurately and instantly.',
  'Sale Inventory': 'Built-in camera mode lets you photograph each item, add a description and value, then export everything to a spreadsheet for buyer agreement or a professional PDF for the notaire.',
  'Removal Inventory': 'While building your sale inventory, keep a parallel log of everything you are keeping — with photos, weights, values and dimensions. Invaluable whether you are hiring a removal firm or doing it yourself.',
  'Buyer Handover Pack': 'Build your handover pack as you go — scan instruction manuals, collect warranties and utility info, and give your buyer everything they need from day one.',
  'Final Checklist': 'Make sure every box is ticked and every document is in place before the final handover — so completion day goes smoothly and nothing is left behind.',
  'Agent Commission Guide': 'Know your rights before anyone comes knocking for a share of the sale. Understand exactly which agents are entitled to commission and which are not — and how to protect yourself.',
  'AI Assistant': 'Ask our AI about any clause or issue in any document or survey report. Get a clear, plain-English explanation with no legal jargon.',
};

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
];

function smoothScroll(href: string) {
  const el = document.getElementById(href.replace('#', ''));
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
        <div className="rounded-sm px-4 py-3 shadow-xl text-xs leading-relaxed"
          style={{ background: th.charcoal, color: th.cream }}>
          {text}
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
          border-l-[7px] border-r-[7px] border-t-[7px]
          border-l-transparent border-r-transparent"
          style={{ borderTopColor: th.charcoal }} />
      </div>
    </div>
  );
}

// ── Eyebrow helper ───────────────────────────────────────────────────────────
function Eyebrow({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="h-px w-12" style={{ background: light ? th.gold : th.terracotta }} />
      <p className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: light ? th.gold : th.terracotta }}>
        {label}
      </p>
      <div className="h-px w-12" style={{ background: light ? th.gold : th.terracotta }} />
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail]       = useState('');
  const [heroState, setHeroState] = useState<'idle'|'loading'|'success'|'duplicate'|'error'>('idle');

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
    // If going to hero, focus the email input so users know what to do
    if (href === '#hero') {
      setTimeout(() => emailInputRef.current?.focus(), 600);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Lato', sans-serif", background: th.cream, color: th.charcoal }}>

      {/* ════════════════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 shadow-sm"
        style={{ background: th.cream, borderBottom: `1px solid ${th.stone}` }}>
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <img src="/SMHP_logo.png" alt="SellMyHousePro" className="h-16 w-auto object-contain" />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} onClick={e => handleNavClick(e, href)}
                className="text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
                style={{ color: th.charcoal }}>
                {label}
              </a>
            ))}
          </div>

          <a href="#hero" onClick={e => handleNavClick(e, '#hero')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
            style={{ background: th.terracotta, color: th.cream }}>
            Join Waitlist
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" style={{ color: th.charcoal }}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden px-6 py-4 space-y-3"
            style={{ background: th.cream, borderTop: `1px solid ${th.stone}` }}>
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} onClick={e => handleNavClick(e, href)}
                className="block text-sm uppercase tracking-widest py-2" style={{ color: th.charcoal }}>
                {label}
              </a>
            ))}
            <a href="#hero" onClick={e => handleNavClick(e, '#hero')}
              className="block text-center py-3 text-sm font-semibold mt-2"
              style={{ background: th.terracotta, color: th.cream }}>
              Join Waitlist
            </a>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════════════════════
          HERO — Split: warm copy left / full-bleed farmhouse right
      ════════════════════════════════════════════════════════════ */}
      <section id="hero" className="min-h-screen flex pt-20" style={{ background: th.cream }}>

        {/* Left — copy */}
        <div className="flex items-center w-full lg:w-[52%] px-8 lg:px-16 xl:px-24 py-20">
          <div className="max-w-xl w-full">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10" style={{ background: th.terracotta }} />
              <span className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold"
                style={{ color: th.terracotta }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                Now accepting waitlist signups
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-[4.25rem] font-normal leading-[1.06] mb-5"
              style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>
              Selling your home,<br />
              <em style={{ color: th.terracotta }}>made simple.</em>
            </h1>

            <p className="text-base italic mb-3" style={{ color: th.muted }}>
              Selling your home is a big deal. Plan it like one.
            </p>

            <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: th.muted }}>
              SellMyHousePro gives you a proven project-management framework for every stage of your sale — whether you're using an agent or going it alone. Built by someone who sold their house in France and learned everything the hard way.
            </p>

            {/* Waitlist form / states */}
            {heroState === 'success' ? (
              <div className="flex items-center gap-3 p-4"
                style={{ background: '#EAF2E8', border: '1px solid #8FBD7A' }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: th.olive }} />
                <span className="font-semibold text-sm" style={{ color: th.olive }}>
                  You're on the list! We'll be in touch soon.
                </span>
              </div>
            ) : heroState === 'duplicate' ? (
              <div className="flex items-center gap-3 p-4" style={{ background: th.stone }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: th.olive }} />
                <span className="font-semibold text-sm" style={{ color: th.olive }}>
                  You're already on the list!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  ref={emailInputRef}
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 text-sm focus:outline-none"
                  style={{ background: 'white', border: `1px solid ${th.stone}`, color: th.charcoal }}
                />
                <button type="submit" disabled={heroState === 'loading'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold whitespace-nowrap transition-opacity hover:opacity-85 disabled:opacity-60"
                  style={{ background: th.terracotta, color: th.cream }}>
                  {heroState === 'loading'
                    ? 'Joining…'
                    : <><span>Join Waitlist</span><ArrowRight className="w-4 h-4" /></>}
                </button>
                {heroState === 'error' && (
                  <p className="text-xs mt-1" style={{ color: th.terracotta }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}

            <p className="mt-4 text-xs" style={{ color: th.muted }}>Free to join. No card required. Launching soon.</p>
            <p className="mt-1 text-xs" style={{ color: th.muted }}>Designed for French, Spanish, UK and international property sales</p>

            {/* Stats */}
            <div className="flex items-center gap-10 mt-14 pt-8"
              style={{ borderTop: `1px solid ${th.stone}` }}>
              {[
                { value: '16',   label: 'Feature modules' },
                { value: '2',    label: 'Simple plans' },
                { value: '€225', label: 'Max total cost' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: th.muted }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — full-bleed stone farmhouse photo */}
        <div className="hidden lg:block lg:w-[48%] relative overflow-hidden">
          {/* ⚠️  IMAGE NOTE: rename house2.jpg → house2.jpg in /public */}
          <img
            src="/house2.jpg"
            alt="Stone farmhouse, South West France — sold using SellMyHousePro"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Gradient bleed into left panel */}
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${th.cream} 0%, transparent 8%)` }} />
          {/* Caption pill */}
          <div className="absolute bottom-10 left-6 right-6">
            <div className="inline-block px-5 py-3"
              style={{ background: 'rgba(42,32,24,0.72)', backdropFilter: 'blur(6px)' }}>
              <p className="text-[10px] uppercase tracking-widest mb-0.5"
                style={{ color: 'rgba(247,242,234,0.6)' }}>
                SOLD USING SELLMYHOUSEPRO
              </p>
              <p className="text-sm font-medium"
                style={{ fontFamily: "'Playfair Display', serif", color: th.cream }}>
                Stone Farmhouse · South West France
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURES — intro banner
      ════════════════════════════════════════════════════════════ */}
      <section style={{ background: th.stone }} className="py-20 px-6 text-center">
        <Eyebrow label="16 feature modules" />
        <h2 className="text-4xl md:text-5xl font-normal"
          style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>
          Everything you need.<br /><em>Nothing you don't.</em>
        </h2>
        <p className="mt-5 text-base max-w-xl mx-auto" style={{ color: th.muted }}>
          Hover over any module card to learn exactly what it does and how it saves you time.
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURES — cascading 4-column waterfall (desktop)
                     2-column grid (mobile)
      ════════════════════════════════════════════════════════════ */}
      <section id="features" style={{ background: th.cream }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Desktop cascade */}
          <div className="hidden lg:flex gap-5 items-start">
            {[0, 1, 2, 3].map(col => {
              // Each column is staggered downward to create the waterfall
              const topOffsets = [0, 52, 24, 76];
              const colFeatures = features.filter((_, i) => i % 4 === col);
              return (
                <div key={col} className="flex flex-col gap-5 flex-1"
                  style={{ marginTop: topOffsets[col] }}>
                  {colFeatures.map(({ icon: Icon, title, desc }) => {
                    const tooltipText = featureTooltips[title];
                    const card = (
                      <FeatureCard key={title} Icon={Icon} title={title} desc={desc} />
                    );
                    return tooltipText
                      ? <Tooltip key={title} text={tooltipText}>{card}</Tooltip>
                      : <div key={title}>{card}</div>;
                  })}
                </div>
              );
            })}
          </div>

          {/* Mobile 2-col grid */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <FeatureCard key={title} Icon={Icon} title={title} desc={desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-6" style={{ background: th.deepOlive }}>
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <Eyebrow label="Pricing" light />
            <h2 className="text-4xl md:text-5xl font-normal mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: th.cream }}>
              Pay only while you're selling.
            </h2>
            <p className="text-base" style={{ color: 'rgba(247,242,234,0.55)' }}>
              Hit your cap and keep using everything — free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

            {/* Starter */}
            <div className="p-8 flex flex-col h-full"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: th.gold }}>Starter</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: th.cream }}>Free</span>
              </div>
              <p className="text-xs mb-8" style={{ color: 'rgba(247,242,234,0.35)' }}>Forever</p>
              <ul className="space-y-3 flex-1 mb-8">
                {['Sale Planner & checklist', 'Job Manager with costings'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm"
                    style={{ color: 'rgba(247,242,234,0.65)' }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: th.oliveMid }} />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: th.cream, background: 'transparent' }}>
                Get started free
              </button>
            </div>

            {/* Essentials */}
            <div className="flex flex-col h-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${th.terracotta}`, borderTop: `3px solid ${th.terracotta}` }}>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: th.terracotta }}>Essentials</p>
                <span className="text-xs mb-3" style={{ color: 'rgba(247,242,234,0.45)' }}>
                  Best for agent-assisted sellers
                </span>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: th.cream }}>€15</span>
                  <span className="text-sm mb-1.5" style={{ color: 'rgba(247,242,234,0.45)' }}>/month</span>
                </div>
                <p className="text-xs mb-8" style={{ color: 'rgba(247,242,234,0.35)' }}>
                  Maximum cost: €135 — then free
                </p>
                <ul className="space-y-3 flex-1 mb-8">
                  {[
                    'Everything in Starter',
                    'Legal Docs (pre & post sale)',
                    'Document Vault & AI Translation',
                    'Inventories & Buyer Handover Pack',
                    'Agent Commission Guide',
                    'AI Assistant (30 requests/month)',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm"
                      style={{ color: 'rgba(247,242,234,0.65)' }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: th.terracotta }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                  style={{ background: th.terracotta, color: th.cream }}>
                  Start free trial
                </button>
              </div>
            </div>

            {/* Complete — elevated, gold border */}
            <div className="relative flex flex-col overflow-hidden"
              style={{
                background: th.cream,
                border: `2px solid ${th.gold}`,
                borderTop: `4px solid ${th.gold}`,
                transform: 'scale(1.04)',
                boxShadow: `0 20px 60px rgba(42,32,24,0.35)`,
              }}>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: th.gold }}>Complete</p>
                <span className="inline-block text-xs font-bold px-2.5 py-0.5 mb-3 self-start"
                  style={{ background: th.gold, color: 'white' }}>
                  Best for private sellers
                </span>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>€25</span>
                  <span className="text-sm mb-1.5" style={{ color: th.muted }}>/month</span>
                </div>
                <p className="text-xs mb-8" style={{ color: th.muted }}>Maximum cost: €225 — then free</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {[
                    'Everything in Essentials',
                    'Enquiry Tracker',
                    'Property Website Builder',
                    'Social Media Marketing Hub',
                    'Unlimited AI Assistant',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: th.charcoal }}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: th.olive }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                  style={{ background: th.olive, color: th.cream }}>
                  Start free trial
                </button>
              </div>
            </div>

          </div>

          <p className="text-center text-xs mt-12" style={{ color: 'rgba(247,242,234,0.3)' }}>
            No credit card required to start. Cancel any time. Your data is yours.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          WHO IS IT FOR
      ════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6" style={{ background: th.stone }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow label="Who is it for?" />
            <h2 className="text-4xl md:text-5xl font-normal"
              style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>
              Two ways to sell.<br /><em>One platform.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agent card */}
            <div className="p-10 flex flex-col"
              style={{ background: 'white', border: `1px solid rgba(196,97,74,0.18)` }}>
              <div className="w-12 h-12 flex items-center justify-center mb-6"
                style={{ background: '#F5EDE8' }}>
                <Handshake className="w-6 h-6" style={{ color: th.terracotta }} />
              </div>
              <h3 className="text-2xl font-normal mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>
                Selling through an agent
              </h3>
              <span className="inline-block text-xs font-semibold px-3 py-1 mb-6 self-start"
                style={{ background: '#F5EDE8', color: th.terracotta, border: `1px solid rgba(196,97,74,0.2)` }}>
                Essentials plan recommended
              </span>
              <p className="text-sm leading-relaxed" style={{ color: th.muted }}>
                A good agent earns their fee — viewings, negotiation, diagnostics, notaire introductions and hand-holding through the transaction. But their service stops there. SellMyHousePro handles everything either side of it: preparation, documents, translations, inventories and handover. The part no agent covers.
              </p>
            </div>

            {/* Private seller card */}
            <div className="p-10 flex flex-col"
              style={{ background: 'white', border: `1px solid rgba(61,82,41,0.18)` }}>
              <div className="w-12 h-12 flex items-center justify-center mb-6"
                style={{ background: '#EAF0E5' }}>
                <UserSquare2 className="w-6 h-6" style={{ color: th.olive }} />
              </div>
              <h3 className="text-2xl font-normal mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>
                Selling privately
              </h3>
              <span className="inline-block text-xs font-semibold px-3 py-1 mb-6 self-start"
                style={{ background: '#EAF0E5', color: th.olive, border: `1px solid rgba(61,82,41,0.2)` }}>
                Complete plan recommended
              </span>
              <p className="text-sm leading-relaxed" style={{ color: th.muted }}>
                Going it alone saves commission but adds complexity. SellMyHousePro gives you every tool a private seller needs — your own property website, buyer enquiry tracking, social media marketing, and the full legal and document framework — managed in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SEE IT IN ACTION — two images: the house + listing output
      ════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: th.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow label="See it in action" />
            <h2 className="text-4xl md:text-5xl font-normal"
              style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>
              A real property.<br /><em>A real listing. A real sale.</em>
            </h2>
            <p className="mt-5 text-base max-w-xl mx-auto" style={{ color: th.muted }}>
              This farmhouse in South West France was listed, marketed and sold using SellMyHousePro.
              The listing site was live in under an hour.
            </p>
          </div>

          {/* Side-by-side: property photo + listing screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="flex flex-col">
              <img
                src="/house-shutters.jpg"
                alt="French farmhouse with green shutters"
                className="w-full h-full object-cover"
                style={{ maxHeight: 420, border: `1px solid ${th.stone}` }}
              />
              <p className="mt-3 text-xs italic text-center" style={{ color: th.muted }}>
                The property — Lot-et-Garonne, South West France
              </p>
            </div>
            <div className="flex flex-col">
              <img
                src="/example-property.jpg"
                alt="Property listing built with SellMyHousePro"
                className="w-full h-full object-cover object-top"
                style={{ maxHeight: 420, border: `1px solid ${th.stone}`, boxShadow: `0 8px 40px rgba(42,32,24,0.1)` }}
              />
              <p className="mt-3 text-xs italic text-center" style={{ color: th.muted }}>
                The listing — built with our Property Website Builder
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8">
            {[
              'Professional listing site in under an hour',
              'Social media content generated automatically',
              'All buyer enquiries tracked in one place',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: th.terracotta }} />
                <span className="text-sm" style={{ color: th.muted }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FOUNDER STORY — text + couple photo
      ════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 overflow-hidden" style={{ background: th.stone }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Photo — first on mobile, second on desktop */}
            <div className="relative order-2 lg:order-1 flex justify-center">
              <div className="relative inline-block">
                <img
                  src="/couple.jpg"
                  alt="Couple in a sun-dappled olive garden in France"
                  className="w-full object-cover object-top"
                  style={{ maxWidth: 460, maxHeight: 600 }}
                />
                {/* Decorative offset border */}
                <div className="absolute -bottom-5 -right-5 w-24 h-24 hidden lg:block"
                  style={{ border: `2px solid ${th.terracotta}`, zIndex: -1 }} />
                <div className="absolute -top-5 -left-5 w-16 h-16 hidden lg:block"
                  style={{ border: `2px solid ${th.gold}`, zIndex: -1 }} />
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12" style={{ background: th.terracotta }} />
                <p className="text-xs uppercase tracking-widest font-semibold"
                  style={{ color: th.terracotta }}>Our story</p>
              </div>
              <h2 className="text-4xl lg:text-5xl font-normal mb-8"
                style={{ fontFamily: "'Playfair Display', serif", color: th.charcoal }}>
                Built by someone<br /><em>who did it the hard way.</em>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: th.muted }}>
                When we decided to sell our home in France, we discovered there was no single tool to manage the process. Just paperwork, confusing legal requirements, language barriers and no clear idea of where to start.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: th.muted }}>
                So we built our own tools — and piece by piece, managed the sale ourselves. SellMyHousePro is those tools, combined, polished and powered by AI. We built the platform we wish we had.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px w-10" style={{ background: th.terracotta }} />
                <span className="text-sm italic" style={{ color: th.muted }}>
                  The SellMyHousePro Team
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════ */}
      <footer id="contact" className="px-6 pt-16 pb-10" style={{ background: th.charcoal }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 pb-12"
            style={{ borderBottom: '1px solid rgba(247,242,234,0.1)' }}>

            {/* Brand */}
            <div>
              <img src="/SMHP_logo.png" alt="SellMyHousePro" className="h-12 w-auto object-contain mb-4" />
              <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(247,242,234,0.45)' }}>
                Selling your home is a big deal. Plan it like one.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest font-semibold mb-2"
                style={{ color: th.terracotta }}>Quick links</p>
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} onClick={e => handleNavClick(e, href)}
                  className="text-sm transition-opacity hover:opacity-100"
                  style={{ color: 'rgba(247,242,234,0.5)' }}>
                  {label}
                </a>
              ))}
            </div>

            {/* Waitlist */}
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: th.terracotta }}>Join the waitlist</p>
              <FooterWaitlist />
            </div>
          </div>

          <p className="text-center text-xs mt-8" style={{ color: 'rgba(247,242,234,0.2)' }}>
            © 2026 SellMyHousePro. Designed for French, Spanish, UK and international property sales.
          </p>
        </div>
      </footer>
    </div>
  );
}

// ── Feature Card (extracted so it can be used in both desktop cascade + mobile grid)
function FeatureCard({ Icon, title, desc }: {
  Icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="flex flex-col gap-4 p-6 cursor-default transition-all duration-200"
      style={{
        background: 'white',
        border: `1px solid #EDE8DF`,
        borderRadius: '2px',
        boxShadow: '0 1px 4px rgba(42,32,24,0.05)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = '#C4614A';
        el.style.boxShadow = '0 6px 20px rgba(196,97,74,0.12)';
        el.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = '#EDE8DF';
        el.style.boxShadow = '0 1px 4px rgba(42,32,24,0.05)';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
        style={{ background: '#F5EDE8', borderRadius: '2px' }}>
        <Icon className="w-4 h-4" style={{ color: '#C4614A' }} />
      </div>
      <div>
        <p className="font-semibold text-sm mb-1" style={{ color: '#2A2018' }}>{title}</p>
        <p className="text-xs leading-relaxed" style={{ color: '#7A6E60' }}>{desc}</p>
      </div>
    </div>
  );
}

// ── Footer waitlist sub-component ────────────────────────────────────────────
function FooterWaitlist() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle'|'loading'|'success'|'duplicate'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState('loading');
    const result = await joinWaitlist(email.trim());
    if (result.alreadyExists) setState('duplicate');
    else if (result.error)    setState('error');
    else                      setState('success');
  };

  if (state === 'success') return (
    <div className="flex items-center gap-2 text-sm" style={{ color: '#8FBD7A' }}>
      <CheckCircle className="w-4 h-4 flex-shrink-0" />
      You're on the list! We'll be in touch soon.
    </div>
  );

  if (state === 'duplicate') return (
    <div className="flex items-center gap-2 text-sm" style={{ color: '#8FBD7A' }}>
      <CheckCircle className="w-4 h-4 flex-shrink-0" />
      You're already on the list!
    </div>
  );

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email" required value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 min-w-0 px-3 py-2.5 text-sm focus:outline-none"
          style={{
            background: 'rgba(247,242,234,0.07)',
            border: '1px solid rgba(247,242,234,0.15)',
            color: '#F7F2EA',
          }}
        />
        <button type="submit" disabled={state === 'loading'}
          className="flex-shrink-0 p-2.5 transition-opacity hover:opacity-75 disabled:opacity-40"
          style={{ background: '#C4614A' }}>
          <Send className="w-4 h-4" style={{ color: '#F7F2EA' }} />
        </button>
      </form>
      {state === 'error' && (
        <p className="text-xs" style={{ color: '#C4614A' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}