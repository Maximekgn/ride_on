import { useMarkOpened } from "@/store/general";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Step = {
  image: any;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    image: require("@/assets/images/onboarding-1.png"),
    title: "Suivi de bus rapide et fiable",
    description:
      "Utilisez notre fonctionnalité de suivi en temps réel pour voir exactement où se trouve votre bus et quand il arrivera à votre arrêt.",
  },
  {
    image: require("@/assets/images/onboarding-2.png"),
    title: "Bienvenue sur RideOn !",
    description:
      "Obtenir les mises à jour quotidiennes de vos trajets en bus n’est plus qu’une question de quelques clics !",
  },
  {
    image: require("@/assets/images/onboarding-3.png"),
    title: "Paiements sans effort",
    description:
      "Nos options de paiement numérique intégrées rendront votre trajet en bus plus facile. Plus besoin de courir pour trouver de la monnaie.",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;
  const markOpened = useMarkOpened();

  const handleNext = () => {
    if (!isLast) setStep((s) => s + 1);
    else handleDone();
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSkip = () => {
    handleDone()
  };

  const handleDone = () => {
    markOpened();
  };

  const current = STEPS[step];

  return (
    <View className="flex-1 bg-white  pt-16 pb-8 justify-between">
      <View className="flex-row items-center justify-between px-6 mb-6" >
        {/* Back ou placeholder */}
        {isFirst ? (
          <View className="w-8" /> 
        ) : (
          <Pressable
            onPress={handleBack}
            accessibilityRole="button"
            hitSlop={8}
            className="w-8"
          >
            <Ionicons name="chevron-back" size={28} color="#000" />
          </Pressable>
        )}

        {/* Skip toujours à droite */}
        <Pressable onPress={handleSkip} accessibilityRole="button" hitSlop={8}>
          <Text className="font-medium">Skip</Text>
        </Pressable>
      </View>

      <View className="flex-1 px-6">
        {/* Image */}
        <View className="flex w-full h-64 mb-8 items-center justify-center self-center">
          <Image
            source={current.image}
            contentFit="cover"
            transition={300}
            className="rounded-xl"
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        {/* Texte */}
        <Text className="text-2xl font-bold text-primary text-center">
          {current.title}
        </Text>
        <Text className="text-base text-gray-500 text-justify mt-3">
          {current.description}
        </Text>

        <View className="flex-row items-center justify-center gap-2 mt-28">
          {STEPS.map((_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full ${
                i === step ? "w-8 bg-primary" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </View>
      </View>

      <View className="w-full flex items-end">
        <Pressable
          onPress={handleNext}
          className="bg-primary p-4 mx-6 rounded-full items-center"
          accessibilityRole="button"
        >
          <Text className="text-white font-semibold">
            {isLast ? (
              "Commencer"
            ) : (
              <Ionicons name="chevron-forward" size={28} color="" />
            )}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
