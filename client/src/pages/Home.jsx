import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FiSearch,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiMenu,
  FiX,
  FiArrowRight,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp
} from 'react-icons/fi';
import {
  FaBottleWater,
  FaDroplet,
  FaLeaf,
  FaRecycle,
  FaAward,
  FaIndustry,
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp
} from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE } from '../config';

/* ---------------------------------------------------------------- data ---- */

// Prefix public assets with Vite's base URL so images resolve under the
// GitHub Pages sub-path (e.g. /NavyaCustomization/labels/1.jpg).
const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

const NAV = ['Home', 'About Us', 'Products', 'Customization', 'Private Labels', 'Contact Us'];

const INSTAGRAM_URL = 'https://www.instagram.com/navya_customs?igsh=MWlmbTQzZmU1aDRvOQ%3D%3D';

const slides = [
  {
    eyebrow: 'Custom Branded Water',
    title: 'Custom Branded\nWater Bottles',
    subtitle: 'Premium purified water bottled and labelled around your brand identity — for restaurants, hotels, weddings and corporate events.',
    accent: '#0f9d58',
    from: '#08312a',
    to: '#0b5c46',
    image: '/labels/1.jpg',
    alt: 'Stone Bay Nature Resort custom labelled water bottle'
  },
  {
    eyebrow: 'Premium Glass Range',
    title: 'Elegant Glass\nBottle Collection',
    subtitle: 'Sophisticated glass bottles that elevate the guest experience at luxury hotels, fine-dining venues and premium celebrations.',
    accent: '#38bdf8',
    from: '#0b2545',
    to: '#123a6b',
    image: '/labels/2.jpg',
    alt: 'White House Inn custom labelled water bottle'
  },
  {
    eyebrow: 'Bulk & Private Label',
    title: 'Your Logo.\nYour Label. Delivered.',
    subtitle: 'End-to-end private-label bottling with fast turnaround and reliable pan-India delivery for orders of every size.',
    accent: '#34d399',
    from: '#0b2545',
    to: '#0e4d3c',
    image: '/labels/7.jpg',
    alt: 'Sanjana weds Pranjal wedding custom water bottle'
  }
];

const labelWork = [
  { img: '/labels/1.jpg', client: 'Stone Bay Nature Resort', category: 'Resort', location: 'Fatehpura Dobra' },
  { img: '/labels/2.jpg', client: 'White House Inn', category: 'Hotel', location: 'Hospitality' },
  { img: '/labels/3.jpg', client: 'Street Foods by Punjab Grill', category: 'Restaurant', location: 'DB City Mall, Bhopal' },
  { img: '/labels/4.jpg', client: 'Malwa Tyre Sales & Service', category: 'Corporate', location: 'Indore' },
  { img: '/labels/5.jpg', client: 'Avanti Bai Blood Centre', category: 'Healthcare', location: 'Bhopal' },
  { img: '/labels/6.jpg', client: "Gattani's Kesar", category: 'Retail Brand', location: 'Indore' },
  { img: '/labels/7.jpg', client: 'Sanjana weds Pranjal', category: 'Wedding', location: 'Katlana Family' }
];

const highlights = [
  { icon: <FaDroplet />, title: 'Best Quality Water', text: 'Multi-stage purified, mineral-balanced water bottled under strict hygiene standards.' },
  { icon: <FaBottleWater />, title: 'Custom Designs', text: 'Labels crafted to match your brand colours, logo and theme — down to the finest detail.' },
  { icon: <FaAward />, title: 'Premium Bottles', text: 'Food-grade PET and elegant glass bottles available across multiple sizes and finishes.' }
];

const steps = [
  { n: '01', title: 'Share Your Brief', text: 'Send us your logo, brand colours and quantity. We understand your event or business.' },
  { n: '02', title: 'Approve The Design', text: 'Our designers craft label mockups and refine them until you love the final look.' },
  { n: '03', title: 'Production & Delivery', text: 'We print, bottle and quality-check every unit, then deliver on schedule across India.' }
];

const premium = [
  { icon: <FaBottleWater />, title: 'Glass Bottles', text: 'Reusable, crystal-clear glass for a truly premium presentation.' },
  { icon: <FaIndustry />, title: 'Automated Bottling', text: 'Precision-controlled, contamination-free automated filling lines.' },
  { icon: <FaDroplet />, title: 'Mineral-Rich Water', text: 'Balanced minerals for a clean, refreshing and healthy taste.' },
  { icon: <FaRecycle />, title: 'Eco-Friendly', text: 'Recyclable materials and responsible packaging at every step.' }
];

const benefits = [
  { title: 'Multi-Stage Purification', text: 'RO + UV + ozonisation for pure, safe drinking water.' },
  { title: 'Mineral Balanced', text: 'Essential minerals restored for a crisp, natural taste.' },
  { title: 'Ozonised Freshness', text: 'Ozone treatment keeps every bottle fresh for longer.' },
  { title: 'Sealed Hygiene', text: 'Tamper-proof caps and hygienic, food-grade packaging.' }
];

const testimonials = [
  { name: 'Stone Bay Nature Resort', company: 'Fatehpura Dobra', review: 'The custom-labelled bottles gave our resort a premium touch. Guests notice the quality the moment they check in.', rating: 5 },
  { name: 'Street Foods by Punjab Grill', company: 'DB City Mall, Bhopal', review: 'Beautiful printing and consistent supply. Our branded water fits right in with the dining experience.', rating: 5 },
  { name: "Gattani's Kesar", company: 'Indore', review: 'Loved the label design and finish. On-time delivery and great pricing for our bulk orders.', rating: 5 }
];

const certs = ['FSSAI', 'ISI Mark', 'ISO 9001', 'BIS Certified'];
const clients = ['Stone Bay Resort', 'White House Inn', 'Street Foods', 'Malwa Tyre', 'Avanti Bai Blood Centre', "Gattani's Kesar", 'Punjab Grill', 'Katlana Family'];

/* -------------------------------------------------------------- visuals ---- */

function GlassBottle({ accent = '#0f9d58', className = '' }) {
  return (
    <svg viewBox="0 0 140 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`water-${accent}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`glass-${accent}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="54" y="6" width="32" height="20" rx="5" fill="#e2e8f0" />
      <rect x="54" y="20" width="32" height="8" rx="2" fill="#cbd5e1" />
      {/* bottle body outline */}
      <path
        d="M52 28 L88 28 L88 54 C88 64 108 74 108 100 L108 268 C108 282 100 288 88 288 L52 288 C40 288 32 282 32 268 L32 100 C32 74 52 64 52 54 Z"
        fill="#ffffff"
        fillOpacity="0.08"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      {/* water fill */}
      <path
        d="M35 150 L105 150 L105 266 C105 279 99 285 88 285 L52 285 C41 285 35 279 35 266 Z"
        fill={`url(#water-${accent})`}
      />
      {/* label */}
      <rect x="38" y="168" width="64" height="70" rx="6" fill="#ffffff" opacity="0.95" />
      <rect x="48" y="182" width="44" height="6" rx="3" fill={accent} />
      <rect x="48" y="196" width="34" height="4" rx="2" fill="#94a3b8" />
      <rect x="48" y="206" width="40" height="4" rx="2" fill="#cbd5e1" />
      <rect x="48" y="216" width="28" height="4" rx="2" fill="#cbd5e1" />
      {/* glass highlight */}
      <path d="M52 28 L88 28 L88 54 C88 64 108 74 108 100 L108 268 C108 282 100 288 88 288 L52 288 C40 288 32 282 32 268 L32 100 C32 74 52 64 52 54 Z" fill={`url(#glass-${accent})`} />
    </svg>
  );
}

function Stars({ value }) {
  return (
    <span className="inline-flex gap-0.5 text-amber-400">
      {Array.from({ length: value }).map((_, i) => (
        <FaStar key={i} size={14} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ page ---- */

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const [formData, setFormData] = useState({
    name: '', companyName: '', phone: '', email: '', city: '', businessType: '', bottleSize: '', quantity: '', message: ''
  });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();

    // On the static site (no backend) guide the visitor to a direct channel.
    if (!API_BASE) {
      toast.info('Thanks! Please reach us on WhatsApp +91 79998 04869 or email navyacustomization@gmail.com and we’ll respond quickly.');
      setFormData({ name: '', companyName: '', phone: '', email: '', city: '', businessType: '', bottleSize: '', quantity: '', message: '' });
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/contact`, formData);
      toast.success('Your request has been submitted successfully.');
      setFormData({ name: '', companyName: '', phone: '', email: '', city: '', businessType: '', bottleSize: '', quantity: '', message: '' });
    } catch (error) {
      toast.error('Unable to send the request right now. Please try again.');
    }
  };

  const cur = slides[slide];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* top utility bar */}
      <div className="bg-[#0b2545] text-slate-200">
        <div className="mx-auto flex max-w-[1300px] items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><FiPhone size={12} /> +91 79998 04869</span>
            <span className="hidden items-center gap-1.5 sm:flex"><FiMail size={12} /> navyacustomization@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 md:flex"><FiClock size={12} /> Mon–Sat · 10am – 7pm</span>
            <div className="flex items-center gap-2">
              {[
                { Icon: FaFacebookF, href: '#' },
                { Icon: FaInstagram, href: INSTAGRAM_URL },
                { Icon: FaLinkedinIn, href: '#' }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  {...(href !== '#' ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="text-slate-300 transition hover:text-emerald-400"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1300px] items-center gap-4 px-4 py-3 sm:px-6">
          <button className="text-slate-700 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <a href="#home" className="flex items-center gap-2.5">
            <img src={asset('/logo.png')} alt="Navya Customs logo" className="h-11 w-11 rounded-full object-cover shadow-sm" />
            <span className="leading-tight">
              <span className="block text-lg font-extrabold tracking-tight text-[#0b2545]">Navya</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-600">Customization</span>
            </span>
          </a>

          <nav className="mx-auto hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
            {NAV.map((item, i) => (
              <a key={item} href={i === 0 ? '#home' : `#${item.toLowerCase().replace(/ /g, '')}`} className={`transition hover:text-emerald-600 ${i === 0 ? 'text-emerald-600' : ''}`}>
                {item}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button className="hidden text-slate-500 transition hover:text-emerald-600 sm:block"><FiSearch size={18} /></button>
            <a href="#contactus" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
              Get a Quote <FiArrowRight size={16} />
            </a>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item, i) => (
                <a key={item} href={i === 0 ? '#home' : `#${item.toLowerCase().replace(/ /g, '')}`} onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-slate-700">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="home">
        {/* hero slider */}
        <section className="relative overflow-hidden" style={{ background: `linear-gradient(120deg, ${cur.from}, ${cur.to})` }}>
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: cur.accent }} />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full opacity-10 blur-3xl" style={{ background: cur.accent }} />

          <div className="mx-auto grid max-w-[1300px] items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <motion.div key={slide} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                <FaLeaf size={12} style={{ color: cur.accent }} /> {cur.eyebrow}
              </span>
              <h1 className="mt-5 whitespace-pre-line text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                {cur.title}
              </h1>
              <p className="mt-5 max-w-lg text-base text-slate-200/90 sm:text-lg">{cur.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#contactus" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:brightness-110" style={{ backgroundColor: cur.accent }}>
                  Get a Quote <FiArrowRight />
                </a>
                <a href="#about" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                  Read More
                </a>
              </div>
            </motion.div>

            <motion.div key={`img-${slide}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative flex justify-center">
              <div className="absolute inset-0 m-auto h-72 w-72 rounded-full" style={{ background: `radial-gradient(circle, ${cur.accent}55, transparent 70%)` }} />
              <div className="relative rounded-[1.75rem] bg-white/90 p-3 shadow-2xl ring-1 ring-white/30 backdrop-blur">
                <img src={asset(cur.image)} alt={cur.alt} className="h-[340px] w-auto rounded-2xl object-contain sm:h-[380px] lg:h-[440px]" />
              </div>
            </motion.div>
          </div>

          {/* slider controls */}
          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
            <button onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} className="rounded-full border border-white/30 p-2 text-white/80 transition hover:bg-white/10">
              <FiChevronLeft size={16} />
            </button>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? 'w-7 bg-white' : 'w-2 bg-white/40'}`} />
            ))}
            <button onClick={() => setSlide((slide + 1) % slides.length)} className="rounded-full border border-white/30 p-2 text-white/80 transition hover:bg-white/10">
              <FiChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* feature highlights */}
        <section className="mx-auto max-w-[1300px] px-4 sm:px-6">
          <div className="-mt-10 grid gap-5 md:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_40px_rgba(11,37,69,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">{h.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-[#0b2545]">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{h.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* about */}
        <section id="aboutus" className="mx-auto max-w-[1300px] px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-[#0b2545] to-[#0e4d3c] p-5 sm:p-8">
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {['/labels/3.jpg', '/labels/4.jpg', '/labels/6.jpg'].map((src) => (
                    <div key={src} className="flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-2 sm:h-56">
                      <img src={asset(src)} alt="Custom labelled water bottle sample" loading="lazy" className="h-full w-auto object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-emerald-600 px-6 py-5 text-white shadow-xl sm:-right-6">
                <p className="text-3xl font-extrabold leading-none">10+</p>
                <p className="mt-1 text-xs font-medium text-emerald-50">Years of Excellence</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">About Us</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#0b2545] sm:text-4xl">
                Premium branded water that strengthens your identity
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-500">
                Navya Customization manufactures and supplies premium customised bottled water. We design labels around each
                client's branding — helping restaurants, hotels, weddings and corporate events make a lasting impression with
                every sip.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Fully customised labels', 'Food-grade packaging', 'Bulk & private label', 'Pan-India delivery'].map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><FiCheck size={12} /></span>
                    {f}
                  </div>
                ))}
              </div>
              <a href="#contactus" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0b2545] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123a6b]">
                More About Us <FiArrowRight />
              </a>
            </div>
          </div>
        </section>

        {/* process steps */}
        <section id="customization" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">How It Works</p>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0b2545] sm:text-4xl">Three simple steps to your custom bottles</h2>
            </div>
            <div className="relative mt-14 grid gap-8 md:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.n} className="relative text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-emerald-300 bg-white text-2xl font-extrabold text-emerald-600">
                    {s.n}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#0b2545]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.text}</p>
                  {i < steps.length - 1 && (
                    <FiArrowRight className="absolute -right-2 top-8 hidden text-emerald-300 md:block" size={26} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* premium bottles */}
        <section id="products" className="relative overflow-hidden bg-[#0b2545] py-20 text-white">
          <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="mx-auto grid max-w-[1300px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-emerald-500/20 blur-2xl" />
              <div className="relative rounded-[1.75rem] bg-white/95 p-3 shadow-2xl">
                <img src={asset('/labels/2.jpg')} alt="White House Inn custom labelled water bottle" className="h-[340px] w-auto rounded-2xl object-contain sm:h-[380px]" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Premium Bottled Water</p>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Crafted for quality, designed for your brand</h2>
              <p className="mt-4 max-w-xl text-slate-300">
                From elegant glass to lightweight PET, every bottle is filled with mineral-rich purified water and finished
                with your custom label.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {premium.map((p) => (
                  <div key={p.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">{p.icon}</div>
                    <div>
                      <h3 className="font-bold">{p.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* private labels portfolio */}
        <section id="privatelabels" className="mx-auto max-w-[1300px] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">Private Labels</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0b2545] sm:text-4xl">Brands that trust us with their water</h2>
            <p className="mt-4 text-slate-500">
              Real private-label projects we've designed, bottled and delivered — from resorts and hotels to restaurants,
              weddings and corporate brands.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {labelWork.map((w, i) => (
              <motion.div
                key={w.img}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 p-3 sm:h-72">
                  <img
                    src={asset(w.img)}
                    alt={`${w.client} custom labelled water bottle`}
                    loading="lazy"
                    className="h-full w-auto object-contain transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm backdrop-blur">
                    {w.category}
                  </span>
                </div>
                <div className="border-t border-slate-100 p-4">
                  <h3 className="truncate text-sm font-bold text-[#0b2545]" title={w.client}>{w.client}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                    <FiMapPin size={11} /> {w.location}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* CTA tile */}
            <a
              href="#contactus"
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6 text-center transition hover:-translate-y-1 hover:bg-emerald-50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white"><FiArrowRight size={20} /></span>
              <p className="mt-3 text-sm font-bold text-[#0b2545]">Your brand next?</p>
              <p className="mt-1 text-xs text-slate-500">Get your own private label</p>
            </a>
          </div>
        </section>

        {/* water benefits */}
        <section className="mx-auto max-w-[1300px] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">Why Our Water</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0b2545] sm:text-4xl">Pure, healthy and refreshingly clean</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <FaDroplet size={22} />
                </div>
                <h3 className="mt-4 font-bold text-[#0b2545]">{b.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* testimonials */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">Testimonials</p>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0b2545] sm:text-4xl">Trusted by brands across India</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                  <Stars value={t.rating} />
                  <p className="mt-4 text-slate-600">“{t.review}”</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">{t.name[0]}</div>
                    <div>
                      <p className="font-bold text-[#0b2545]">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* certifications */}
        <section className="mx-auto max-w-[1300px] px-4 py-16 sm:px-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Certified &amp; Trusted</p>
            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
              {certs.map((c) => (
                <div key={c} className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><FaAward size={24} /></span>
                  <span className="text-sm font-bold text-[#0b2545]">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* clients marquee */}
        <section className="pb-8">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Our Valued Clients</p>
          <div className="marquee-track mt-6 overflow-hidden">
            <div className="animate-marquee flex w-max gap-4">
              {[...clients, ...clients].map((c, i) => (
                <span key={i} className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-500">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* contact / quote */}
        <section id="contactus" className="bg-slate-50 py-20">
          <div className="mx-auto grid max-w-[1300px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-3xl bg-gradient-to-br from-[#0b2545] to-[#0e4d3c] p-8 text-white sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">Get In Touch</p>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Request a custom quote</h2>
              <p className="mt-4 text-slate-300">Share your requirement and our team will reach out with design mockups, pricing and delivery timelines.</p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><FiPhone /></span> +91 79998 04869</div>
                <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><FiMail /></span> navyacustomization@gmail.com</div>
                <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><FiMapPin /></span> Serving businesses across India</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <input required name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
                <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
                <input required name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
                <input name="businessType" value={formData.businessType} onChange={handleChange} placeholder="Business / Event Type" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
                <input name="bottleSize" value={formData.bottleSize} onChange={handleChange} placeholder="Bottle Size Required" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
                <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Estimated Quantity" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
              </div>
              <textarea required name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Tell us about your customisation idea" className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500" />
              <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
                Get a Quote <FiArrowRight />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="bg-[#0b2545] text-slate-300">
        <div className="mx-auto grid max-w-[1300px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img src={asset('/logo.png')} alt="Navya Customs logo" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-lg font-extrabold text-white">Navya Customization</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">Premium customised bottled water for businesses, events and celebrations.</p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: FaFacebookF, href: '#' },
                { Icon: FaInstagram, href: INSTAGRAM_URL },
                { Icon: FaLinkedinIn, href: '#' },
                { Icon: FaYoutube, href: '#' },
                { Icon: FaWhatsapp, href: 'https://wa.me/917999804869' }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  {...(href !== '#' ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {['About Us', 'Products', 'Customization', 'Private Labels', 'Contact Us'].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, '')}`} className="transition hover:text-emerald-400">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Products</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {['Custom Label Bottles', 'Premium Glass Bottles', 'Wedding Favours', 'Corporate Gifting', 'Bulk Orders'].map((l) => (
                <li key={l}><a href="#products" className="transition hover:text-emerald-400">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2"><FiPhone className="mt-0.5 shrink-0 text-emerald-400" /> +91 79998 04869</li>
              <li className="flex items-start gap-2"><FiMail className="mt-0.5 shrink-0 text-emerald-400" /> navyacustomization@gmail.com</li>
              <li className="flex items-start gap-2"><FiMapPin className="mt-0.5 shrink-0 text-emerald-400" /> Serving businesses across India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
          © 2026 Navya Customization. All Rights Reserved.
        </div>
      </footer>

      {/* floating actions */}
      <a href="#home" className="fixed bottom-6 right-6 z-40 rounded-full bg-[#0b2545] p-3 text-white shadow-lg transition hover:bg-[#123a6b]"><FiChevronUp size={20} /></a>
      <a href="https://wa.me/917999804869" target="_blank" rel="noreferrer" className="fixed bottom-20 right-6 z-40 rounded-full bg-emerald-600 p-3 text-white shadow-lg transition hover:bg-emerald-700"><FaWhatsapp size={20} /></a>
    </div>
  );
}

export default Home;
