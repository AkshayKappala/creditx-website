import { motion } from "motion/react";
import {
  LuChartBar,
  LuDatabase,
  LuLock,
  LuRefreshCw,
  LuWorkflow,
  LuZap,
} from "react-icons/lu";

const features = [
  {
    icon: LuWorkflow,
    title: "Workflow Coordination",
    description: "A clear transaction workflow across services, driven by events and state changes",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: LuDatabase,
    title: "Reliable Events",
    description: "Outbox-based event publishing so state changes and events stay in sync",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: LuZap,
    title: "Kafka Messaging",
    description: "Kafka topics for transaction, hold, and promotion events between services",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    icon: LuLock,
    title: "Risk Checks",
    description: "Hold authorization with fraud checks, blocklist rules, and balance verification",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    icon: LuChartBar,
    title: "End-to-End Tracing",
    description: "Trace one transaction across services to understand performance and failures",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: LuRefreshCw,
    title: "Promotions and Cashback",
    description: "Promotion evaluation and automatic cashback transaction creation",
    gradient: "from-emerald-400 to-teal-500",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for real-world teams: clear ownership, reliable events, safe retries, and visibility across the flow
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="group relative p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`} />
              
              <div className="relative">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}