import { useState, type FormEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import wanderlyLogo from './assets/wanderly-logo.png'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Compass,
  Headphones,
  Heart,
  LockKeyhole,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import TripPlannerPage from './TripPlannerPage'
import './App.css'

type Benefit = {
  icon: typeof Compass
  number: string
  title: string
  text: string
}

const destinations = [
  { name: 'Phuket, Thailand', country: 'Thailand', price: '$890', tag: 'BESTSELLER', image: 'photo-1530789253388-582c481c54b0', rating: '4.9', days: '7 days' },
  { name: 'Paris, France', country: 'France', price: '$1,240', tag: 'POPULAR', image: 'photo-1502602898657-3e91760cbb34', rating: '4.8', days: '5 days' },
  { name: 'Ubud, Bali', country: 'Indonesia', price: '$760', tag: 'TRENDING', image: 'photo-1537996194471-e657df975ab4', rating: '5.0', days: '8 days' },
  { name: 'Dubai, UAE', country: 'United Arab Emirates', price: '$980', tag: 'NEW', image: 'photo-1512453979798-5ea266f8880c', rating: '4.7', days: '4 days' },
]

const benefits: Benefit[] = [
  { icon: Compass, number: '01', title: 'Wide range of choices', text: 'From slow weekends to once-in-a-lifetime journeys, find a trip that feels like yours.' },
  { icon: ShieldCheck, number: '02', title: 'Trusted by travelers', text: 'Real people, real stories, and thoughtful support from the first click to the trip home.' },
  { icon: CalendarDays, number: '03', title: 'Flexible & easy booking', text: 'Plans change. Enjoy flexible options and a refreshingly simple booking experience.' },
  { icon: Sparkles, number: '04', title: 'Little-known, lovely deals', text: 'Handpicked stays and experiences worth getting out of bed, and on a plane, for.' },
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, 150])

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Wanderly home">
          <img src={wanderlyLogo} alt="Wanderly logo" className="brand-logo" />
        </a>

        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a>
          <a href="#tours" onClick={() => setMenuOpen(false)}>Tours</a>
          <a href="/plan" onClick={() => setMenuOpen(false)}>Flights</a>
          <a href="/plan" onClick={() => setMenuOpen(false)}>Hotels</a>
          <a href="#newsletter" onClick={() => setMenuOpen(false)}>Journal</a>
        </nav>

        <div className="header-actions">
          <a className="phone-link" href="tel:+18005550182">+1 (800) 555-0182</a>
          <button className="profile-button" aria-label="Your account" type="button"><Users size={18} /></button>
          <a className="header-cta" href="/plan">Plan a trip <ArrowUpRight size={15} /></a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <motion.div className="hero-image" style={{ y: heroY }} />
          <div className="hero-scrim" />
          <div className="hero-inner">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
              <motion.div className="eyebrow hero-eyebrow" variants={reveal}><span className="eyebrow-dot" /> A little further, a little freer</motion.div>
              <motion.h1 variants={reveal}>Discover amazing<br />places <em>with us.</em></motion.h1>
              <motion.p variants={reveal}>The best stories start somewhere new. Find your kind of somewhere.</motion.p>
              <motion.a className="button button-lime" href="/plan" variants={reveal}>Plan your trip <ArrowRight size={17} /></motion.a>
            </motion.div>

            <motion.div className="hero-note" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.65 }}>
              <span className="note-star"><Star size={16} fill="currentColor" /></span>
              <span><strong>Somewhere special</strong><small>Oia, Santorini · Greece</small></span>
              <ArrowUpRight size={16} />
            </motion.div>
            <a href="/plan" className="scroll-cue"><span>PLAN YOUR NEXT TRIP</span><ArrowDown size={14} /></a>
          </div>
          <div className="hero-count"><span>01</span><i /> 04</div>
        </section>

        <section className="promise-strip" aria-label="The Wanderly promise">
          {[
            { icon: WalletCards, title: 'Best price, always', text: "Good trips shouldn't cost the earth." },
            { icon: Headphones, title: 'Humans, here for you', text: 'Actual help, whenever you need it.' },
            { icon: LockKeyhole, title: 'Safe & sound booking', text: 'Your details stay yours. Always.' },
            { icon: Sparkles, title: 'Experiences with soul', text: 'Picked by people who have been.' },
          ].map(({ icon: Icon, title, text }, index) => (
            <motion.div className="promise-item" key={title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ delay: index * 0.1 }}>
              <span className="promise-icon"><Icon /></span>
              <div><strong>{title}</strong><small>{text}</small></div>
            </motion.div>
          ))}
        </section>

        <section className="destinations section-pad" id="destinations">
          <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <div><span className="section-kicker">THE WORLD, WELL WANDERED</span><h2>Places you'll <em>feel</em> forever.</h2><p>Faraway favorites and just-around-the-corner magic.</p></div>
            <a className="text-link" href="/plan">All destinations <ArrowRight size={16} /></a>
          </motion.div>

          <div className="destination-grid">
            {destinations.map((place, index) => (
              <motion.article className="destination-card" key={place.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.11, duration: 0.6 }} whileHover={{ y: -7 }}>
                <a href="/plan" className="destination-image-wrap" aria-label={`Explore ${place.name}`}>
                  <img src={`https://images.unsplash.com/${place.image}?auto=format&fit=crop&w=900&q=85`} alt={`${place.name} travel destination`} loading="lazy" />
                  <span className="destination-tag">{place.tag}</span>
                  <button type="button" aria-label={`Save ${place.name}`} className="save-button" onClick={(event) => { event.preventDefault(); event.currentTarget.classList.toggle('saved') }}><Heart size={17} /></button>
                  <span className="photo-count">{place.days} <i /> <Star size={12} fill="currentColor" /> {place.rating}</span>
                </a>
                <div className="destination-info"><div><span className="destination-country">{place.country}</span><h3>{place.name}</h3></div><div className="destination-price"><small>from</small><strong>{place.price}</strong></div></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="why-section" id="tours">
          <div className="why-image"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=85" alt="A peaceful alpine lake surrounded by mountains" loading="lazy" /><div className="image-stamp"><span>WANDER<br />A LITTLE</span><Compass size={23} /></div></div>
          <div className="why-content"><span className="section-kicker">THE WANDERLY WAY</span><h2>Travel more.<br /><em>Worry less.</em></h2><p className="why-intro">We believe the best trips aren't just seen. They're felt. So we take care of the details, and leave the good stuff to you.</p>
            <div className="benefit-list">{benefits.map((benefit, index) => { const Icon = benefit.icon; return <motion.div className="benefit-row" key={benefit.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.1, duration: 0.5 }}><span className="benefit-icon"><Icon size={18} /></span><div><h3>{benefit.title}</h3><p>{benefit.text}</p></div><span className="benefit-number">{benefit.number}</span></motion.div> })}</div>
          </div>
        </section>

        <section className="newsletter section-pad" id="newsletter">
          <motion.div className="newsletter-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <div className="newsletter-copy"><span className="section-kicker">THE JOURNAL</span><h2>Travel notes,<br />good ideas, and tiny sparks of adventure.</h2><p>Join our list for thoughtful inspiration, hidden gems, and occasional trapdoor deals.</p></div>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <label className="newsletter-field"><span>Email address</span><input type="email" placeholder="hello@wanderly.com" aria-label="Email address" required /></label>
              <button className="button button-lime" type="submit">{subscribed ? 'Subscribed' : 'Subscribe'}</button>
            </form>
            {subscribed && <p className="newsletter-success">You’re on the list — expect occasional inspiration in your inbox.</p>}
          </motion.div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="/" aria-label="Wanderly home">
          <img src={wanderlyLogo} alt="Wanderly logo" className="brand-logo" />
        </a>
        <div className="footer-links"><a href="#destinations">Destinations</a><a href="#tours">Experiences</a><a href="/plan">Flights</a><a href="#newsletter">Journal</a></div>
        <div className="social-links" aria-label="Social media"><a href="https://instagram.com" aria-label="Instagram"><Compass size={17} /></a><a href="https://facebook.com" aria-label="Facebook"><MapPin size={17} /></a><a href="https://youtube.com" aria-label="YouTube"><Star size={17} /></a></div>
      </footer>
    </div>
  )
}

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '')
  return pathname === '/plan' ? <TripPlannerPage /> : <HomePage />
}

export default App
