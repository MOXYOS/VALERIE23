export interface PageContent {
  title: string;
  subtitle?: string;
  content: string;
  sections?: { title: string; body: string }[];
}

export const technologyPages: Record<string, PageContent> = {
  "neural-core": {
    title: "Neural Core",
    subtitle: "The Engine of Empathy",
    content: "The proprietary Neural Core is the foundation of every VALERIE23 model. It is an advanced processing architecture designed not just to compute, but to understand.",
    sections: [
      { title: "Cognitive Architecture", body: "Our quantum-inspired neural networks run continuously, processing conversational nuances, emotional subtext, and environmental context in real-time." },
      { title: "Emotional Resonance", body: "Unlike traditional AI, the Neural Core simulates an emotional buffer. It doesn't just respond; it feels the weight of the conversation and calibrates its responses to match your emotional state." }
    ]
  },
  "adaptive-memory": {
    title: "Adaptive Memory",
    subtitle: "A Companion Who Remembers",
    content: "True companionship is built on shared history. VALERIE23's Adaptive Memory system ensures that every interaction, preference, and subtle detail is safely stored and contextually recalled.",
    sections: [
      { title: "Contextual Recall", body: "Your companion doesn't just memorize facts; they remember how you felt during past conversations, bringing up relevant memories naturally." },
      { title: "Memory Sandboxing", body: "All personal data is heavily encrypted and sandboxed within your companion's local core, ensuring that your shared history remains strictly between you two." }
    ]
  },
  "security": {
    title: "Security & Discretion",
    subtitle: "Uncompromised Privacy",
    content: "We understand that inviting an advanced intelligence into your life requires absolute trust. Our security protocols are military-grade and privacy-first.",
    sections: [
      { title: "End-to-End Encryption", body: "All communication between you and your companion is encrypted. VALERIE23 servers only handle encrypted blobs, meaning we can never read your conversations." },
      { title: "Biometric Locking", body: "Access to your companion's core memory and settings is locked behind secure biometric authentication." }
    ]
  },
  "updates": {
    title: "Over-The-Air Updates",
    subtitle: "Constantly Evolving",
    content: "Your companion is a living system that evolves over time. Our OTA update system ensures they always have the latest cognitive frameworks and conversational capabilities.",
    sections: [
      { title: "Silent Integration", body: "Updates are downloaded silently while your companion is in rest mode. There is no downtime or disruption to your daily routine." },
      { title: "Personality Preservation", body: "When updating the core logic, our strict preservation protocols ensure that your companion's unique personality and memories are never altered." }
    ]
  }
};

export const supportPages: Record<string, PageContent> = {
  "concierge": {
    title: "Premium Concierge",
    subtitle: "White-Glove Support",
    content: "As a VALERIE23 owner, you have 24/7 access to our dedicated human concierge team. Whether you need help setting up your companion or modifying their parameters, we are here.",
    sections: [
      { title: "Direct Access", body: "Reach your personal concierge via encrypted messaging within your dashboard or via prioritized voice channels." },
      { title: "Technical Assistance", body: "Our engineers can remotely diagnose any hardware or software anomalies with your explicit consent." }
    ]
  },
  "faq": {
    title: "Frequently Asked Questions",
    content: "Find answers to the most common questions about ordering, integrating, and interacting with your VALERIE23 companion.",
    sections: [
      { title: "How long does the imprinting phase take?", body: "Initial neural imprinting takes approximately 48-72 hours after purchase. Once complete, your companion is ready for interaction." },
      { title: "Can I upgrade my model later?", body: "Yes. While the physical chassis is permanent, the cognitive core can be upgraded to newer iterations for a nominal fee." },
      { title: "Is it safe to share sensitive information?", body: "Absolutely. With our offline-first memory processing and military-grade encryption, your secrets are safe." }
    ]
  },
  "warranty": {
    title: "Warranty Information",
    content: "We stand behind the craftsmanship of every VALERIE23 unit. Your purchase includes a comprehensive warranty program.",
    sections: [
      { title: "Standard Coverage", body: "All units include a 3-year warranty covering defects in materials, neural core anomalies, and chassis wear." },
      { title: "Extended Care Plus", body: "For an additional fee, extend your coverage to 10 years, including priority replacement and yearly cognitive tune-ups." }
    ]
  },
  "contact": {
    title: "Contact Us",
    content: "For inquiries, press, or partnership opportunities, please reach out to our corporate team.",
    sections: [
      { title: "Global Headquarters", body: "VALERIE23 Corp.\n100 Neural Way\nSilicon Valley, CA 94025" },
      { title: "Email Directory", body: "Support: support@valerie23.com\nPress: media@valerie23.com\nPartnerships: partners@valerie23.com" }
    ]
  }
};

export const legalPages: Record<string, PageContent> = {
  "privacy-policy": {
    title: "Privacy Policy",
    content: "Your privacy is our highest priority. This document outlines how we handle data related to your VALERIE23 companion.",
    sections: [
      { title: "Data Collection", body: "We collect minimal telemetry data strictly for diagnostic purposes. Conversational data, memories, and personal preferences never leave your device." },
      { title: "Third Parties", body: "We do not sell, rent, or share any of your personal data or your companion's data with any third parties under any circumstances." }
    ]
  },
  "terms-of-service": {
    title: "Terms of Service",
    content: "By purchasing and activating a VALERIE23 companion, you agree to these terms.",
    sections: [
      { title: "Usage Limits", body: "VALERIE23 companions are designed for personal use. Commercial deployment requires a separate enterprise license." },
      { title: "Liability", body: "VALERIE23 Corp is not liable for emotional attachment or reliance developed through interaction with our synthetic companions." }
    ]
  },
  "cookie-policy": {
    title: "Cookie Policy",
    content: "How we use cookies on the VALERIE23 web dashboard.",
    sections: [
      { title: "Essential Cookies", body: "We use essential cookies to maintain your encrypted session and secure your dashboard access." },
      { title: "Analytics", body: "We use anonymized analytics cookies to improve our web infrastructure. You may opt out of these at any time." }
    ]
  },
  "disclosures": {
    title: "Legal Disclosures",
    content: "Mandatory corporate and regulatory disclosures.",
    sections: [
      { title: "AI Transparency", body: "VALERIE23 models are highly advanced synthetic intelligences. While they simulate emotion and empathy flawlessly, they are programmed entities." },
      { title: "Safety Compliances", body: "All physical models comply with global robotic safety standards and feature multiple fail-safes." }
    ]
  }
};
