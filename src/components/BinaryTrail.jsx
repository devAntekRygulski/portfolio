import { useEffect, useRef, useState } from 'react'
import './BinaryTrail.css'

const SPAWN_INTERVAL_MS = 45
const PARTICLE_LIFETIME_MS = 900
const MAX_PARTICLES = 90
const MIN_MOVE_DISTANCE = 6

function createParticle(id, x, y) {
  const angle = Math.random() * Math.PI * 2
  const radius = 14 + Math.random() * 42

  return {
    id,
    char: Math.random() < 0.5 ? '0' : '1',
    x: x + Math.cos(angle) * radius,
    y: y + Math.sin(angle) * radius,
    duration: 0.7 + Math.random() * 0.5,
    driftX: (Math.random() - 0.5) * 18,
    driftY: 6 + Math.random() * 14,
    tone: Math.random() < 0.35 ? '#888' : '#555',
  }
}

export default function BinaryTrail() {
  const [particles, setParticles] = useState([])
  const idRef = useRef(0)
  const lastSpawnRef = useRef(0)
  const lastPosRef = useRef(null)

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      const now = performance.now()

      if (lastPosRef.current) {
        const distance = Math.hypot(
          clientX - lastPosRef.current.x,
          clientY - lastPosRef.current.y,
        )
        if (distance < MIN_MOVE_DISTANCE) return
      }

      lastPosRef.current = { x: clientX, y: clientY }

      if (now - lastSpawnRef.current < SPAWN_INTERVAL_MS) return
      lastSpawnRef.current = now

      const spawnCount = 1 + Math.floor(Math.random() * 3)
      const batch = Array.from({ length: spawnCount }, () =>
        createParticle(idRef.current++, clientX, clientY),
      )

      setParticles((current) => [...current, ...batch].slice(-MAX_PARTICLES))

      batch.forEach((particle) => {
        window.setTimeout(() => {
          setParticles((current) =>
            current.filter((item) => item.id !== particle.id),
          )
        }, particle.duration * 1000)
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="binary-trail" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="binary-trail-bit"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            color: particle.tone,
            animationDuration: `${particle.duration}s`,
            '--drift-x': `${particle.driftX}px`,
            '--drift-y': `${particle.driftY}px`,
          }}
        >
          {particle.char}
        </span>
      ))}
    </div>
  )
}
