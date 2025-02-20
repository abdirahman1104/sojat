'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const symbols = ['🌍', '💬', '🤖', '🚀', '✨', '💡', '🔥', '🎯', '🎨', '📱']

export function FloatingSymbols() {
  const [items, setItems] = useState<{ id: number; symbol: string; x: number; delay: number }[]>([])

  useEffect(() => {
    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * 100,
      delay: Math.random() * 5
    }))
    setItems(newItems)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl opacity-20"
          initial={{ 
            top: '100%',
            left: `${item.x}%`,
            rotate: 0,
            scale: 1
          }}
          animate={{ 
            top: '-20%',
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  )
}
