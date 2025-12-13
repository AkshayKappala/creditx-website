import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Architecture } from "./components/Architecture";
import { TransactionFlow } from "./components/TransactionFlow";
import { Features } from "./components/Features";
import { TechStack } from "./components/TechStack";
import { CTA } from "./components/CTA";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Architecture />
      <TransactionFlow />
      <Features />
      <TechStack />
      <CTA />
      
      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              © 2025 CreditX Platform. All rights reserved.
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms</a>
              <a href="#security" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
