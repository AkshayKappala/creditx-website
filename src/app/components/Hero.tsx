import { motion } from "motion/react";
import { LuBookOpen, LuGithub, LuSparkles } from "react-icons/lu";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
      
      {/* Floating orbs with neon glow */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8"
        >
          <LuSparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-300">End-to-end credit transaction processing</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <span className="block text-6xl md:text-8xl bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            CreditX
          </span>
          <span className="block text-6xl md:text-8xl mt-2 bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
            Platform
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          A distributed, event-driven SaaS solution that manages the transaction lifecycle from initiation through authorization, posting, and promotions.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 rounded-full px-8 shadow-lg shadow-cyan-500/50"
            onClick={() => window.open('https://github.com/creditx-platform/creditx', '_blank')}
          >
            <LuGithub className="mr-2 w-5 h-5" />
            View Repository
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-full px-8 backdrop-blur-md"
            onClick={() => window.open('https://github.com/creditx-platform/creditx#readme', '_blank')}
          >
            <LuBookOpen className="mr-2 w-5 h-5" />
            Read Documentation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}