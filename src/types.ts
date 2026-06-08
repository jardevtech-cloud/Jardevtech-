export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface MetricData {
  label: string;
  value: string;
  sub: string;
}

export interface PillarData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  status?: "new" | "old";
}
