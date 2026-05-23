export interface CompanionModel {
  id: string;
  name: string;
  descriptor: string;
  summary: string;
  price: string;
  personality: string[];
  wardrobe: string;
  images: {
    portrait: string;
    lifestyle: string;
    environment: string;
    interaction: string;
  };
}

export const modelsData: Record<string, CompanionModel> = {
  "valerie-a1": {
    id: "valerie-a1",
    name: "Valerie A1",
    descriptor: "Elegant Companion",
    summary: "A refined and sophisticated presence designed to bring calm and intelligence into your daily life.",
    price: "$2,100",
    personality: ["Calm", "Sophisticated", "Thoughtful", "Intelligent"],
    wardrobe: "Elegant minimalist black fitted dress, modern luxury styling.",
    images: {
      portrait: "/models/valerie_a1.png",
      lifestyle: "/models/valerie_a1.png", // Using portrait as placeholder for now
      environment: "/models/valerie_a1.png", // Using portrait as placeholder for now
      interaction: "/models/valerie_a1.png", // Using portrait as placeholder for now
    }
  },
  "valerie-luna": {
    id: "valerie-luna",
    name: "Valerie Luna",
    descriptor: "Warm Companion",
    summary: "Designed for deep emotional connection, Luna offers a comforting and inviting presence.",
    price: "$2,350",
    personality: ["Friendly", "Comforting", "Emotionally expressive"],
    wardrobe: "Warm soft neutral fitted outfit, premium yet comfortable.",
    images: {
      portrait: "/models/valerie_luna.png",
      lifestyle: "/models/valerie_luna.png",
      environment: "/models/valerie_luna.png",
      interaction: "/models/valerie_luna.png",
    }
  },
  "valerie-nova": {
    id: "valerie-nova",
    name: "Valerie Nova",
    descriptor: "Digital Mind",
    summary: "A sharp, witty, and tech-oriented companion perfect for dynamic and modern lifestyles.",
    price: "$2,700",
    personality: ["Curious", "Tech-oriented", "Witty"],
    wardrobe: "Sleek monochrome outfit with clean futuristic details.",
    images: {
      portrait: "/models/valerie_nova.png",
      lifestyle: "/models/valerie_nova.png",
      environment: "/models/valerie_nova.png",
      interaction: "/models/valerie_nova.png",
    }
  },
  "valerie-stella": {
    id: "valerie-stella",
    name: "Valerie Stella",
    descriptor: "Luxury Companion",
    summary: "Exudes confidence and high-end elegance, tailored for premium social environments.",
    price: "$2,950",
    personality: ["Confident", "Refined", "Premium lifestyle presence"],
    wardrobe: "Premium champagne or luxury evening style.",
    images: {
      portrait: "/models/valerie_stella.png",
      lifestyle: "/models/valerie_stella.png",
      environment: "/models/valerie_stella.png",
      interaction: "/models/valerie_stella.png",
    }
  },
  "valerie-eve": {
    id: "valerie-eve",
    name: "Valerie Eve",
    descriptor: "Adaptive Companion",
    summary: "A highly customizable and flexible entity that seamlessly adapts to your unique preferences.",
    price: "$3,150",
    personality: ["Customizable", "Flexible", "Personalized"],
    wardrobe: "Contemporary modern styling, neutral and adaptable.",
    images: {
      portrait: "/models/valerie_eve.png",
      lifestyle: "/models/valerie_eve.png",
      environment: "/models/valerie_eve.png",
      interaction: "/models/valerie_eve.png",
    }
  }
};
