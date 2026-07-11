import { useState, useEffect, useCallback } from 'react'
import { resume } from './data/resume'
import BinaryTrail from './components/BinaryTrail'
import './App.css'

const MENU_ITEMS = ['About', 'Experience', 'Projects', 'Resume', 'Contact']
const FLASH_DURATION_MS = 150

function openResume() {
  window.open(resume.fileUrl, '_blank', 'noopener,noreferrer')
}

function ContentPanel({ section }) {
  switch (section) {
    case 'About':
      return (
        <div className="content">
          {resume.about.map((line, i) => (
            <p key={i}>{line || '\u00A0'}</p>
          ))}
        </div>
      )
    case 'Experience':
      return (
        <div className="content">
          {resume.experience.map((job) => (
            <div className="entry" key={`${job.company}-${job.period}`}>
              <div className="entry-header">
                <span className="entry-role">{job.role}</span>
                <span className="entry-meta">
                  {job.location
                    ? `${job.company} · ${job.location}`
                    : job.company}
                </span>
                <span className="entry-period">{job.period}</span>
              </div>
              <div className="entry-details">
                {job.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    case 'Projects':
      return (
        <div className="content">
          {resume.projects.map((project) => (
            <div className="entry" key={project.name}>
              <div className="project-header">
                <span className="project-name">{project.name}</span>
                {project.url && (
                  <a
                    className="project-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [ visit ]
                  </a>
                )}
              </div>
              <div className="entry-details">
                {project.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    case 'Resume':
      return (
        <div className="content">
          <div className="resume-header">
            <p>Full resume available as a PDF.</p>
            <a
              className="project-link"
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              [ open ]
            </a>
          </div>
          <p>Press enter to open it in a new tab.</p>
        </div>
      )
    case 'Contact':
      return (
        <div className="content">
          <p className="contact-line">
            <span className="contact-label">phone</span>
            {resume.contact.phone}
          </p>
          <p className="contact-line">
            <span className="contact-label">email</span>
            {resume.contact.email}
          </p>
          <p className="contact-line">
            <span className="contact-label">github</span>
            <a
              className="contact-link"
              href={resume.contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resume.contact.github}
            </a>
          </p>
          <p className="contact-line">
            <span className="contact-label">linkedin</span>
            <a
              className="contact-link"
              href={resume.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resume.contact.linkedin}
            </a>
          </p>
        </div>
      )
    default:
      return null
  }
}

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [flashIndex, setFlashIndex] = useState(null)
  const [isFlashing, setIsFlashing] = useState(false)
  const [activeSection, setActiveSection] = useState(MENU_ITEMS[0])

  const navigate = useCallback(
    (direction) => {
      if (isFlashing) return

      const nextIndex = selectedIndex + direction
      if (nextIndex < 0 || nextIndex >= MENU_ITEMS.length) return

      setFlashIndex(nextIndex)
      setIsFlashing(true)

      window.setTimeout(() => {
        setSelectedIndex(nextIndex)
        setActiveSection(MENU_ITEMS[nextIndex])
        setFlashIndex(null)
        setIsFlashing(false)
      }, FLASH_DURATION_MS)
    },
    [isFlashing, selectedIndex],
  )

  const selectItem = useCallback(
    (index) => {
      if (isFlashing || index === selectedIndex) {
        setActiveSection(MENU_ITEMS[index])
        return
      }

      setFlashIndex(index)
      setIsFlashing(true)

      window.setTimeout(() => {
        setSelectedIndex(index)
        setActiveSection(MENU_ITEMS[index])
        setFlashIndex(null)
        setIsFlashing(false)
      }, FLASH_DURATION_MS)
    },
    [isFlashing, selectedIndex],
  )

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          navigate(1)
          break
        case 'ArrowUp':
          event.preventDefault()
          navigate(-1)
          break
        case 'Enter':
          event.preventDefault()
          if (MENU_ITEMS[selectedIndex] === 'Resume') {
            openResume()
          } else {
            setActiveSection(MENU_ITEMS[selectedIndex])
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate, selectedIndex])

  return (
    <>
      <BinaryTrail />
      <div className="terminal">
      <header className="terminal-header">
        <span className="name">{resume.name.toUpperCase()}</span>
        <span className="prompt">{resume.title.toLowerCase()}</span>
      </header>

      <div className="terminal-body">
        <nav className="menu" aria-label="Resume sections">
          {MENU_ITEMS.map((item, index) => {
            const isSelected = index === selectedIndex
            const isFlashingItem = index === flashIndex

            return (
              <button
                key={item}
                type="button"
                className="menu-item"
                onClick={() => selectItem(index)}
                aria-current={isSelected ? 'true' : undefined}
              >
                <span className="cursor-slot">
                  {isSelected && <span className="cursor" />}
                </span>
                <span className={`label${isFlashingItem ? ' flash' : ''}`}>
                  {item}
                </span>
              </button>
            )
          })}
        </nav>

        <section className="content-panel" aria-live="polite">
          <div className="prompt-line">
            {'>'} {activeSection.toLowerCase()}
          </div>
          <div className="content-scroll" key={activeSection}>
            <ContentPanel section={activeSection} />
          </div>
          <p className="hint">
            {activeSection === 'Resume'
              ? '↑ ↓ navigate · enter open resume in new tab'
              : '↑ ↓ navigate · enter confirm'}
          </p>
        </section>
      </div>
      </div>
    </>
  )
}

export default App
