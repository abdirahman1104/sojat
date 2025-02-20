'use client'

import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { AnimatedGradient } from '@/components/ui/animated-gradient'
import { FeatureCard } from '@/components/ui/feature-card'
import { FloatingSymbols } from '@/components/ui/floating-symbols'
import { TestimonialCard } from '@/components/ui/testimonial-card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Globe2, Zap, Shield, ChevronRight, Github, Twitter } from 'lucide-react'

export default function LandingPage() {
  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/onboarding' })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AnimatedGradient />
      
      {/* Hero Section */}
      <div className="relative">
        <FloatingSymbols />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-12 sm:py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-6 sm:mb-8 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-blue-600/10 p-3 sm:p-4"
              >
                <span className="text-2xl sm:text-4xl">🤖</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                Sojat AI
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Your Multilingual AI Assistant
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300 px-4 sm:px-0"
              >
                Experience the future of AI communication. Chat naturally in multiple languages,
                get instant responses, and break down language barriers effortlessly.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 sm:mt-10 flex items-center justify-center gap-x-4 sm:gap-x-6 px-4 sm:px-0"
              >
                <Button
                  onClick={handleSignIn}
                  className="group w-full sm:w-auto bg-blue-600 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover:bg-blue-700"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center px-4 sm:px-0"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Everything you need to communicate globally
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Powerful features that make Sojat AI your perfect communication companion
            </p>
          </motion.div>
          <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
            <FeatureCard
              icon={<Globe2 className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Multilingual Support"
              description="Chat in any language with instant translation and natural responses."
              delay={0.2}
            />
            <FeatureCard
              icon={<MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Natural Conversations"
              description="Experience human-like interactions with advanced language understanding."
              delay={0.4}
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Lightning Fast"
              description="Get instant responses powered by cutting-edge AI technology."
              delay={0.6}
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5 sm:h-6 sm:w-6" />}
              title="Secure & Private"
              description="Your conversations are protected with enterprise-grade security."
              delay={0.8}
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent"></div>
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center px-4 sm:px-0"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Loved by users worldwide
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300">
              See what our community has to say about Sojat AI
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-12 sm:mt-16 grid max-w-7xl gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <TestimonialCard
              quote="Sojat AI has revolutionized how I communicate with my international team. The translations are spot-on and natural."
              author="Sarah Chen"
              role="Product Manager"
              delay={0.2}
            />
            <TestimonialCard
              quote="As a digital nomad, this tool is invaluable. I can chat with locals anywhere in their native language!"
              author="Marcus Schmidt"
              role="Digital Entrepreneur"
              delay={0.4}
            />
            <TestimonialCard
              quote="The AI understands context perfectly and provides culturally appropriate responses. It's amazing!"
              author="Maria Garcia"
              role="Language Teacher"
              delay={0.6}
            />
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-blue-600 px-6 sm:px-8 py-12 sm:py-16 text-center shadow-xl"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Ready to break language barriers?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-blue-100">
              Join thousands of users who are already communicating globally with Sojat AI
            </p>
            <Button
              onClick={handleSignIn}
              className="mt-8 w-full sm:w-auto bg-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg text-blue-600 hover:bg-blue-50"
            >
              Start for Free
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/10 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>
          <div className="mt-6 md:order-1 md:mt-0">
            <p className="text-center text-sm sm:text-base text-gray-400">
              &copy; {new Date().getFullYear()} Sojat AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
