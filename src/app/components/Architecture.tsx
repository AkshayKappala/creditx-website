import { motion } from "motion/react";
import {
  LuCoins,
  LuDatabase,
  LuGitBranch,
  LuGithub,
  LuServer,
  LuShield,
  LuZap,
} from "react-icons/lu";

const services = [
  {
    id: 1,
    name: "creditMainServ",
    port: "8080",
    icon: LuServer,
    description: "API entry point and transaction lifecycle coordinator",
    color: "from-cyan-400 to-blue-500",
    position: { x: 0, y: 0 },
    github: "https://github.com/creditx-platform/creditMainServ",
    migrationUrl: "https://github.com/creditx-platform/creditMainServ/tree/main/src/main/resources/db/migration",
  },
  {
    id: 2,
    name: "creditHoldServ",
    port: "8081",
    icon: LuShield,
    description: "Authorization holds and risk checks (fraud, blocklist, balance)",
    color: "from-purple-400 to-pink-500",
    position: { x: 1, y: 0 },
    github: "https://github.com/creditx-platform/creditHoldServ",
    migrationUrl: "https://github.com/creditx-platform/creditHoldServ/tree/main/src/main/resources/db/migration",
  },
  {
    id: 3,
    name: "creditPostingServ",
    port: "8082",
    icon: LuGitBranch,
    description: "Ledger posting and settlement",
    color: "from-pink-400 to-rose-500",
    position: { x: 0.5, y: 1 },
    github: "https://github.com/creditx-platform/creditPostingServ",
    migrationUrl: "https://github.com/creditx-platform/creditPostingServ/tree/main/src/main/resources/db/migration",
  },
  {
    id: 4,
    name: "creditPromoServ",
    port: "8083",
    icon: LuCoins,
    description: "Promotions and cashback",
    color: "from-violet-400 to-purple-500",
    position: { x: 1.5, y: 1 },
    github: "https://github.com/creditx-platform/creditPromoServ",
    migrationUrl: "https://github.com/creditx-platform/creditPromoServ/tree/main/src/main/resources/db/migration",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(96, 165, 250, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(96, 165, 250, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            CreditX Architecture
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The platform is powered by four key microservices that communicate via Kafka events to support scalable and reliable transaction processing.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="relative">
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Draw connecting lines between services */}
            {services.map((service, i) =>
              services.slice(i + 1).map((target, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${(service.position.x / 2.5) * 100 + 20}%`}
                  y1={`${(service.position.y / 1.5) * 100 + 20}%`}
                  x2={`${(target.position.x / 2.5) * 100 + 20}%`}
                  y2={`${(target.position.y / 1.5) * 100 + 20}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              ))
            )}
          </svg>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
            {services.slice(0, 2).map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {services.slice(2).map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index + 2} />
            ))}
          </div>
        </div>
        
        {/* Event Bus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500">
                <LuZap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl text-white mb-1">Apache Kafka Event Bus</h3>
                <p className="text-gray-400">Kafka connects the services with domain events, and an outbox keeps event publishing reliable</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-sm text-gray-400 mb-1">Topics</div>
                <div className="text-2xl text-cyan-400">3 Active</div>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-sm text-gray-400 mb-1">Pattern</div>
                <div className="text-lg text-purple-400">Outbox</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.15 } }}
      className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors duration-300"
    >
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`} />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-purple-300 font-mono hover:bg-white/20"
              onClick={() => window.open(service.migrationUrl, '_blank')}
            >
              <LuDatabase className="w-3 h-3" />
              Schema
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-cyan-200 font-mono hover:bg-white/20"
              onClick={() => window.open(service.github, '_blank')}
            >
              <LuGithub className="w-3 h-3" />
              Source
            </motion.button>
          </div>
        </div>
        
        <h3 className="text-2xl text-white mb-2">{service.name}</h3>
        <p className="text-gray-400">{service.description}</p>
        
      </div>
    </motion.div>
  );
}