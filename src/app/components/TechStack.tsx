import { motion } from "motion/react";
import { SpringBootIcon, SpringCloudIcon, KafkaIcon, OracleIcon, DockerIcon, FlywayIcon, ZipkinIcon, MavenIcon } from "./TechIcons";

const technologies = [
  { name: "Spring Boot", category: "Framework", icon: SpringBootIcon, color: "text-green-400" },
  { name: "Oracle 23c", category: "Database", icon: OracleIcon, color: "text-red-400" },
  { name: "Apache Kafka", category: "Event Streaming", icon: KafkaIcon, color: "text-white" },
  { name: "Flyway", category: "Migration", icon: FlywayIcon, color: "text-blue-400" },
  { name: "Spring Cloud", category: "Framework", icon: SpringCloudIcon, color: "text-green-400" },
  { name: "Zipkin", category: "Tracing", icon: ZipkinIcon, color: "text-purple-400" },
  { name: "Docker", category: "Container", icon: DockerIcon, color: "text-cyan-400" },
  { name: "Maven", category: "Build Tool", icon: MavenIcon, color: "text-orange-400" },
];

export function TechStack() {
  return (
    <section id="tech" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Modern Tech Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built with Spring Boot, Kafka, and Oracle, plus migrations and tracing to support real development and operations
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              
              <div className="relative text-center">
                <div className={`w-12 h-12 mx-auto mb-4 ${tech.color}`}>
                  <tech.icon />
                </div>
                <div className="text-xl text-white mb-2">{tech.name}</div>
                <div className="text-sm text-gray-500">{tech.category}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}