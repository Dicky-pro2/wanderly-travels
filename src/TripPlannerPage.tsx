import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowLeftRight,
  CalendarDays,
  Check,
  ChevronDown,
  Compass,
  MapPin,
  Plane,
  Search,
  TicketCheck,
  Users,
} from 'lucide-react'
import wanderlyLogo from './assets/wanderly-logo.png'

const tabs = [
  { label: 'Flights', icon: Plane },
  { label: 'Hotels', icon: MapPin },
  { label: 'Tours', icon: Compass },
  { label: 'Packages', icon: TicketCheck },
]

function TripPlannerPage() {
  const [activeTab, setActiveTab] = useState('Flights')
  const [tripType, setTripType] = useState('Round trip')
  const [searchMessage, setSearchMessage] = useState('')

  useEffect(() => {
    document.title = 'Plan your trip | Wanderly'
  }, [])

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchMessage(`Your ${activeTab.toLowerCase()} search is ready. Let’s find your next getaway.`)
  }

  return (
    <div className="page-shell planner-shell">
      <header className="site-header planner-header">
        <a className="wordmark" href="/" aria-label="Wanderly home">
          <img src={wanderlyLogo} alt="Wanderly logo" className="brand-logo" />
        </a>
        <a className="planner-back-link" href="/">
          <ArrowLeft size={16} /> Back to Wanderly
        </a>
      </header>

      <main className="planner-main">
        <section className="planner-intro" aria-labelledby="planner-title">
          <span className="section-kicker">YOUR NEXT CHAPTER</span>
          <h1 id="planner-title">Where to <em>next?</em></h1>
          <p>A good trip starts with a little daydreaming. Tell us what you have in mind and we’ll help you get there.</p>
        </section>

        <section className="planner-search search-panel" aria-label="Search your next trip">
          <div className="search-tabs" role="tablist" aria-label="Choose what to book">
            {tabs.map(({ label, icon: Icon }) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === label}
                className={activeTab === label ? 'search-tab active' : 'search-tab'}
                key={label}
                onClick={() => {
                  setActiveTab(label)
                  setSearchMessage('')
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <form className="trip-form" onSubmit={handleSearch}>
            <div className="trip-type">
              <button
                type="button"
                className="trip-type-button"
                onClick={() => setTripType(tripType === 'Round trip' ? 'One way' : 'Round trip')}
              >
                {tripType}
                <ChevronDown size={14} />
              </button>
            </div>
            <div className="fields-row">
              <label className="trip-field">
                <span>{activeTab === 'Hotels' ? 'DESTINATION' : 'FROM'}</span>
                <span className="field-input">
                  <MapPin size={16} />
                  <input
                    aria-label={activeTab === 'Hotels' ? 'Destination' : 'From'}
                    placeholder={activeTab === 'Hotels' ? 'Where are you staying?' : 'City or airport'}
                    required
                  />
                </span>
              </label>
              <button className="swap-button" type="button" aria-label="Swap departure and destination">
                <ArrowLeftRight size={16} />
              </button>
              <label className="trip-field">
                <span>{activeTab === 'Hotels' ? 'ROOMS & GUESTS' : 'TO'}</span>
                <span className="field-input">
                  <MapPin size={16} />
                  <input
                    aria-label={activeTab === 'Hotels' ? 'Rooms and guests' : 'To'}
                    placeholder={activeTab === 'Hotels' ? '2 travelers, 1 room' : 'Where to?'}
                    required
                  />
                </span>
              </label>
              <label className="trip-field date-field">
                <span>{activeTab === 'Hotels' ? 'CHECK IN' : 'DEPART'}</span>
                <span className="field-input">
                  <CalendarDays size={16} />
                  <input aria-label="Departure date" type="date" required />
                </span>
              </label>
              {tripType === 'Round trip' && (
                <label className="trip-field date-field">
                  <span>{activeTab === 'Hotels' ? 'CHECK OUT' : 'RETURN'}</span>
                  <span className="field-input">
                    <CalendarDays size={16} />
                    <input aria-label="Return date" type="date" required />
                  </span>
                </label>
              )}
              <label className="trip-field guests-field">
                <span>TRAVELERS</span>
                <span className="field-input">
                  <Users size={16} />
                  <select aria-label="Travelers">
                    <option>2 travelers</option>
                    <option>1 traveler</option>
                    <option>3 travelers</option>
                    <option>4 travelers</option>
                  </select>
                </span>
              </label>
              <button className="button search-button" type="submit">
                <Search size={17} /> Search
              </button>
            </div>
            <AnimatePresence mode="wait">
              {searchMessage && (
                <motion.p
                  className="search-feedback"
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  {searchMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </section>

        <div className="search-footnote planner-footnote">
          <span><Check size={14} /> No booking fees</span>
          <span><Check size={14} /> Best price promise</span>
          <span><Check size={14} /> 24/7 human support</span>
        </div>

        <aside className="planner-note">
          <span className="planner-note-icon"><Compass size={20} /></span>
          <div>
            <strong>Not sure where to start?</strong>
            <p>Pick a feeling, a season, or a faraway place. We’ll help with the rest.</p>
          </div>
          <a className="text-link" href="/#destinations">Find inspiration</a>
        </aside>
      </main>
    </div>
  )
}

export default TripPlannerPage
