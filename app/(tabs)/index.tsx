import { Text, View } from "react-native";



export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center py-20 px-4">
      <Text className="text-3xl font-bold text-primary text-center mb-4">
        Welcome to RideOn!
      </Text>
      <Text className="text-base text-secondary text-center">
        Your ultimate ride-sharing companion. Let&apos;s get you started on your journey with us!
      </Text>
    </View>
  );
}

