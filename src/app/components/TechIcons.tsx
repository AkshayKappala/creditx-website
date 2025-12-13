import {
  SiApachekafka,
  SiApachemaven,
  SiDocker,
  SiFlyway,
  SiOracle,
  SiSpring,
  SiSpringboot,
} from "react-icons/si";
import { LuNetwork } from "react-icons/lu";

export const SpringBootIcon = () => <SiSpringboot className="w-full h-full" />;
export const SpringCloudIcon = () => <SiSpring className="w-full h-full" />;
export const OracleIcon = () => <SiOracle className="w-full h-full" />;
export const KafkaIcon = () => <SiApachekafka className="w-full h-full" />;
export const FlywayIcon = () => <SiFlyway className="w-full h-full" />;

// Simple Icons doesn't include Zipkin, so use a neutral tracing/network icon.
export const ZipkinIcon = () => <LuNetwork className="w-full h-full" />;

export const DockerIcon = () => <SiDocker className="w-full h-full" />;
export const MavenIcon = () => <SiApachemaven className="w-full h-full" />;
