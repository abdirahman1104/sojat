'use client'

import { motion } from 'framer-motion'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  delay?: number
}

export function TestimonialCard({ quote, author, role, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl bg-white/5 p-2 backdrop-blur-lg transition-all duration-300 hover:bg-white/10"
    >
      <div className="absolute -left-6 -top-6 h-12 w-12 text-blue-600/20">
        <svg
          className="h-full w-full"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
      </div>
      <div className="relative rounded-xl bg-white/5 p-6">
        <blockquote>
          <p className="relative text-lg font-light leading-relaxed text-gray-300">
            {quote}
          </p>
        </blockquote>
        <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <p className="font-semibold text-blue-400">{author}</p>
            <p className="mt-1 text-sm text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
