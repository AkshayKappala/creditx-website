import { motion } from "motion/react";
import { LuGithub, LuMenu, LuZap } from "react-icons/lu";
import { Button } from "./ui/button";

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500">
              <LuZap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-white">CreditX</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#architecture" className="text-gray-300 hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#flow" className="text-gray-300 hover:text-white transition-colors">
              Flow
            </a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#tech" className="text-gray-300 hover:text-white transition-colors">
              Tech Stack
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 rounded-full"
              onClick={() => window.open('https://github.com/creditx-platform/creditx', '_blank')}
            >
              <LuGithub className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10 rounded-full"
            >
              <LuMenu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}