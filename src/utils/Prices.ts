export interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  buttonColor: "primary" | "secondary";
}

export const plans: Plan[] = [
  {
    name: "Brons",
    price: "$19",
    description: "Lorem ipsum dolor sit amet",
    features: [
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
    ],
    buttonColor: "primary",
  },
  {
    name: "Silver",
    price: "$29",
    description: "Lorem ipsum dolor sit amet",
    features: [
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
    ],
    highlight: true,
    buttonColor: "secondary",
  },
  {
    name: "Gold",
    price: "$49",
    description: "Lorem ipsum dolor sit amet",
    features: [
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
    ],
    buttonColor: "primary",
  },
];