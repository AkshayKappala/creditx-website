import { Hero } from "../components/Hero";
import { Architecture } from "../components/Architecture";
import { TransactionFlow } from "../components/TransactionFlow";
import { Features } from "../components/Features";
import { TechStack } from "../components/TechStack";

export function Home() {
  return (
    <>
      <Hero />
      <Architecture />
      <TransactionFlow />
      <Features />
      <TechStack />
    </>
  );
}
