import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Copy, Menu, X, Play, Clapperboard, Scissors, AudioLines, Youtube } from 'lucide-react'
import { videos } from './videos'

const channelUrl = 'https://www.youtube.com/@MicDrop_Dailyy'
const backgroundVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'
const email = 'hello@mainframe.co' // Replace with your preferred professional email.

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let index = 0
    const delay = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          window.clearInterval(timer)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => window.clearTimeout(delay)
  }, [text, speed, startDelay])
  return { displayed, done }
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [actionsVisible, setActionsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const { displayed, done } = useTypewriter('I turn ideas into short-form stories people actually want to watch.')

  useEffect(() => {
    const id = window.setTimeout(() => setActionsVisible(true), 400)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return
      if (prevX.current === null) {
        prevX.current = event.clientX
        return
      }
      const delta = event.clientX - prevX.current
      prevX.current = event.clientX
      targetTime.current = Math.max(0, Math.min(video.duration, targetTime.current + (delta / Math.max(1, window.innerWidth)) * 0.8 * video.duration))
      if (!seeking.current && video.readyState >= 1) {
        seeking.current = true
        video.currentTime = targetTime.current
      }
    }
    const resetPointer = () => { prevX.current = null }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('blur', resetPointer)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('blur', resetPointer)
    }
  }, [])

  const handleSeeked = () => {
    const video = videoRef.current
    if (!video) return
    if (Math.abs(video.currentTime - targetTime.current) > 0.04) {
      video.currentTime = targetTime.current
    } else {
      seeking.current = false
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  const closeMenu = () => setMenuOpen(false)
  const navItems = [{ label: 'Work', href: '#work' }, { label: 'Services', href: '#services' }, { label: 'About', href: '#about' }]

  return (
    <main>
      <video
        ref={videoRef}
        className="hero-video"
        src={backgroundVideo}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => { if (videoRef.current) targetTime.current = videoRef.current.currentTime }}
        onSeeked={handleSeeked}
        aria-hidden="true"
      />
      <div className="hero-shade" />

      <header className="navbar">
        <a href="#home" className="brand" aria-label="Ilyes, home">
          <span>ILYES<span className="brand-dot">®</span></span><span className="brand-star">✳︎</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item, i) => <span className="nav-piece" key={item.label}><a href={item.href}>{item.label}</a>{i < navItems.length - 1 && <span>,</span>}</span>)}
        </nav>
        <a className="nav-contact" href="#contact">Let’s talk <ArrowUpRight size={17} /></a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={27} /> : <Menu size={27} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-links">
          {navItems.map(item => <a key={item.label} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <a href="#contact" onClick={closeMenu}>Let’s talk ↗</a>
          <a href={channelUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>YouTube channel ↗</a>
        </div>
      </div>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="intro-blur">Hey, I’m Mohamed Ilyes Jaouani.<br />Video editor & short-form storyteller.</p>
          <h1 className="hero-copy">{displayed}{!done && <span className="typing-cursor" />}</h1>
          <div className={`hero-actions ${actionsVisible ? 'actions-visible' : ''}`}>
            <a className="pill pill-light" href="#work">Explore my work <ArrowDownRight size={16} /></a>
            <a className="pill pill-light" href="#services">What I do</a>
            <a className="pill pill-light" href={channelUrl} target="_blank" rel="noreferrer">Watch on YouTube <Youtube size={15} /></a>
            <a className="pill pill-outline" href="#contact">Have a project in mind?</a>
          </div>
          <div className="hero-bottomline"><span>INDEPENDENT VIDEO EDITOR</span><span>BASED IN TUNISIA · AVAILABLE WORLDWIDE</span></div>
        </div>
        <a className="scroll-cue" href="#work" aria-label="Scroll to selected work"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={17} /></a>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">01 / SELECTED WORK</p><h2>Short videos.<br /><span>Big impact.</span></h2></div>
          <p className="section-note">A selection of edits, stories and moments built to make people stop scrolling.</p>
        </div>
        {videos.length > 0 ? (
          <div className="video-grid">
            {videos.map((video, index) => (
              <a className="video-card" href={`https://www.youtube.com/shorts/${video.id}`} target="_blank" rel="noreferrer" key={video.id}>
                <div className="video-thumb-wrap">
                  <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={`Thumbnail for ${video.title}`} loading="lazy" />
                  <span className="play-button"><Play fill="currentColor" size={17} /></span>
                  <span className="video-number">0{index + 1}</span>
                </div>
                <div className="video-card-meta"><div><h3>{video.title}</h3><p>{video.category}</p></div><ArrowUpRight size={21} /></div>
              </a>
            ))}
          </div>
        ) : (
          <div className="empty-work">
            <div className="empty-icon"><Clapperboard size={26} /></div>
            <div className="empty-copy"><h3>Your next favorite Short goes here.</h3><p>Add your real video IDs in <code>src/videos.ts</code>. Each entry automatically becomes its own thumbnail card with a direct link to that exact Short. No fake videos, no made-up links.</p></div>
            <a className="text-link" href={channelUrl} target="_blank" rel="noreferrer">Explore the channel <ArrowUpRight size={17} /></a>
          </div>
        )}
        <div className="channel-banner"><div><span className="eyebrow">MORE FROM THE CHANNEL</span><h3>The full story lives on YouTube.</h3></div><a href={channelUrl} target="_blank" rel="noreferrer" className="round-link" aria-label="Visit YouTube channel"><ArrowUpRight size={24} /></a></div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="section-heading"><div><p className="eyebrow">02 / WHAT I DO</p><h2>Made to hold<br /><span>your attention.</span></h2></div><p className="section-note">Every cut has a purpose. Every second earns its place.</p></div>
        <div className="services-list">
          <article className="service-row"><span className="service-index">01</span><div className="service-icon"><Scissors /></div><div className="service-copy"><h3>Short-form editing</h3><p>Fast-paced, platform-ready edits for Shorts, Reels and TikTok.</p></div><ArrowUpRight className="service-arrow" /></article>
          <article className="service-row"><span className="service-index">02</span><div className="service-icon"><AudioLines /></div><div className="service-copy"><h3>Sound & rhythm</h3><p>Intentional sound design, clean timing and transitions that feel right.</p></div><ArrowUpRight className="service-arrow" /></article>
          <article className="service-row"><span className="service-index">03</span><div className="service-icon"><Clapperboard /></div><div className="service-copy"><h3>Storytelling & pacing</h3><p>Hooks, structure and visual flow designed to keep the story moving.</p></div><ArrowUpRight className="service-arrow" /></article>
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <p className="eyebrow">03 / A LITTLE ABOUT ME</p>
        <div className="about-layout"><h2>I don’t just cut clips.<br /><span>I shape the feeling.</span></h2><div className="about-copy"><p>I’m Mohamed Ilyes Jaouani, a video editor focused on short-form content, visual storytelling and the details that make a video stick.</p><p>This portfolio is a home for my work, my experiments and the craft behind every cut.</p><a href={channelUrl} target="_blank" rel="noreferrer" className="text-link">Follow the journey <ArrowUpRight size={17} /></a></div></div>
        <div className="about-stamp">CUT WITH<br />INTENTION<span>✳︎</span></div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <p className="eyebrow">04 / HAVE SOMETHING IN MIND?</p><h2>Let’s make<br /><span>it memorable.</span></h2>
        <div className="contact-bottom"><p>Have a video, an idea, or a project that needs a sharper story? Let’s talk.</p><div className="contact-actions"><a href={`mailto:${email}`} className="contact-email">{email} <ArrowUpRight size={18} /></a><button className="copy-button" onClick={copyEmail}><Copy size={15} /> {copied ? 'Copied!' : 'Copy email'}</button><a className="text-link" href={channelUrl} target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={17} /></a></div></div>
        <footer className="footer"><a href="#home" className="brand footer-brand"><span>ILYES<span className="brand-dot">®</span></span><span className="brand-star">✳︎</span></a><span>INDEPENDENT CREATIVE · TUNISIA</span><a href="#home">BACK TO TOP ↑</a><span>© {new Date().getFullYear()} MOHAMED ILYES JAOUANI</span></footer>
      </section>
    </main>
  )
}

export default App