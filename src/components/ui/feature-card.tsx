'use client'

import { motion } from 'framer-motion'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-xl bg-white/10 p-4 sm:p-6 backdrop-blur-lg transition-all duration-300 hover:bg-white/20"
    >
      <div className="mb-3 sm:mb-4 inline-block rounded-lg bg-blue-600/10 p-2 sm:p-3 text-blue-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  )
}
