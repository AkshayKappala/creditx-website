import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Clock, TrendingUp } from "lucide-react";

const flowSteps = [
  {
    step: 1,
    service: "creditMainServ",
    action: "Transaction Created",
    description: "Client initiates transaction request",
    color: "from-cyan-400 to-blue-500",
    status: "PENDING",
  },
  {
    step: 2,
    service: "creditHoldServ",
    action: "Hold Authorization",
    description: "Fraud check, blocklist, balance verification",
    color: "from-purple-400 to-pink-500",
    status: "AUTHORIZED",
  },
  {
    step: 3,
    service: "creditPostingServ",
    action: "Transaction Posting",
    description: "Settlement and ledger update",
    color: "from-pink-400 to-rose-500",
    status: "POSTED",
  },
  {
    step: 4,
    service: "creditPromoServ",
    action: "Cashback Applied",
    description: "Promotion evaluation and rewards",
    color: "from-violet-400 to-purple-500",
    status: "COMPLETED",
  },
];

const kafkaTopics = [
  { name: "transactions", events: ["authorized", "posted", "failed"] },
  { name: "holds", events: ["created", "voided", "expired"] },
  { name: "promotions", events: ["applied", "calculated"] },
];

export function TransactionFlow() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [segments, setSegments] = useState<{ top: number; height: number }[]>([]);
  const [stepVisible, setStepVisible] = useState<boolean[]>([]);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!steps.length) return;

    const measure = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const nextSegments: { top: number; height: number }[] = [];

      for (let i = 0; i < steps.length - 1; i++) {
        const current = steps[i].getBoundingClientRect();
        const next = steps[i + 1].getBoundingClientRect();
        const top = current.top + current.height / 2 - timelineRect.top;
        const height = next.top + next.height / 2 - (current.top + current.height / 2);
        nextSegments.push({ top, height });
      }

      setSegments(nextSegments);
    };

    measure();
    const handleResize = () => requestAnimationFrame(measure);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setStepVisible((prev) => {
          const next = prev.length ? [...prev] : Array(steps.length).fill(false);
          entries.forEach((entry) => {
            const index = steps.findIndex((el) => el === entry.target);
            if (index !== -1) next[index] = entry.isIntersecting && entry.intersectionRatio >= 0.6;
          });
          return next;
        });
      },
      { threshold: [0.4, 0.6, 0.8, 1] }
    );

    steps.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="flow" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Transaction Flow
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From authorization to cashback, every step orchestrated through events
          </p>
        </motion.div>
        
        {/* Flow Steps */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative" ref={timelineRef}>
            {/* Per-segment lines that appear once both adjacent steps are visible */}
            {segments.map((segment, idx) => {
              const visible = stepVisible[idx] && stepVisible[idx + 1];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: visible ? 1 : 0, scaleY: visible ? 1 : 0 }}
                  transition={{ duration: 0.35, delay: visible ? idx * 0.08 : 0 }}
                  style={{ top: segment.top, height: segment.height, transformOrigin: "top" }}
                  className="absolute left-8 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 hidden md:block"
                />
              );
            })}
            
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative flex items-center gap-8 mb-12 last:mb-0"
              >
                {/* Step number with glow */}
                <div
                  className="relative flex-shrink-0"
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-2xl text-white">{step.step}</span>
                  </motion.div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-50`} />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-2xl text-white mb-1">{step.action}</h3>
                        <p className="text-sm text-cyan-400 font-mono">{step.service}</p>
                      </div>
                      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                        <span className="text-sm text-cyan-300">{step.status}</span>
                      </div>
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                    
                    {index < flowSteps.length - 1 && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-purple-400">
                        <ArrowRight className="w-4 h-4" />
                        <span>Kafka event triggers next service</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Kafka Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl text-white mb-8 text-center">Kafka Event Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kafkaTopics.map((topic, index) => (
              <motion.div
                key={topic.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <h4 className="text-xl text-white font-mono">{topic.name}</h4>
                </div>
                <div className="space-y-2">
                  {topic.events.map((event) => (
                    <div
                      key={event}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300"
                    >
                      {event}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent backdrop-blur-md border border-cyan-500/20 text-center">
            <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <div className="text-4xl text-white mb-2">Saga</div>
            <div className="text-gray-400">Choreography Pattern</div>
          </div>
          
          <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-transparent backdrop-blur-md border border-purple-500/20 text-center">
            <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <div className="text-4xl text-white mb-2">5 min</div>
            <div className="text-gray-400">Hold Expiry Check</div>
          </div>
          
          <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 via-transparent to-transparent backdrop-blur-md border border-pink-500/20 text-center">
            <TrendingUp className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <div className="text-4xl text-white mb-2">Outbox</div>
            <div className="text-gray-400">At-Least-Once Delivery</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}