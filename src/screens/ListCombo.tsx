import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bookingApi from "apis/booking.api";
import { formatCurrency } from "utils/utils";
import Toast from "react-native-toast-message";
import { Booking } from "types/booking.type";
import comboApi from "apis/combo.api";
import { Combo as ComboInterface, ComboType } from "../types/combo.type";
import Combo from "components/Combo";

const ListComboScreen: React.FC = () => {
  const { dataBookTicket, now } = useRoute().params as any;
  const navigation = useNavigation<any>();
  const [combo, setCombo] = useState<ComboInterface[]>([]);
  const [totalCombo, setTotalCombo] = useState(0);

  const [combos, setCombos] = useState<ComboInterface[]>([]);
  const [drinks, setDrinks] = useState<ComboInterface[]>([]);
  const [popcorns, setPopcorns] = useState<ComboInterface[]>([]);

  const { data: dataCombos } = useQuery({
    queryKey: ["combo"],
    queryFn: () => comboApi.getCombos(),
  });

  const createBookingMutation = useMutation({
    mutationFn: (body: Booking) => bookingApi.createBooking(body),
    onSuccess: (data) => {
      if (data.data.status === 200) {
        const bookingId = data.data.data._id;
        navigation.navigate("Payment", { bookingId });
      } else {
        Toast.show({
          type: "error",
          text1: data.data.message,
        });
      }
    },
  });

  const handleContinue = () => {
    const body = {
      ...dataBookTicket,
      combos: combo.map((c) => {
        return {
          combo_id: c._id,
          combo_type: c.type,
          quantity: c.quantity,
        };
      }),
    };
    createBookingMutation.mutate(body);
  };

  useEffect(() => {
    const newTotalPrice = combo.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalCombo(newTotalPrice);
  }, [combo]);

  useEffect(() => {
    setCombo([]);
    setTotalCombo(0);

    if (dataCombos && dataCombos.data && dataCombos.data.data) {
      const { data } = dataCombos.data;
      setCombos(data.filter((combo) => combo.type === ComboType.COMBO));
      setDrinks(data.filter((combo) => combo.type === ComboType.DRINK));
      setPopcorns(data.filter((combo) => combo.type === ComboType.POPCORN));
    } else {
      setCombos([]);
      setDrinks([]);
      setPopcorns([]);
    }
  }, [dataCombos, now]);

  return (
    <View className="flex-1 bg-white">
      <View className="w-full py-3">
        <SafeAreaView className="z-20 w-full flex flex-row justify-start items-center px-4">
          <TouchableOpacity
            className="mr-2"
            onPress={() => {
              setCombo([]);
              setCombos([]);
              setDrinks([]);
              setPopcorns([]);
              setTotalCombo(0);
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">
            {dataBookTicket.theater_name}
          </Text>
        </SafeAreaView>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="w-full flex-1 px-4 py-3"
      >
        <View className="m-1">
          <View>
            <Combo type="Combo" items={combos} setCombo={setCombo} />
          </View>
          <View>
            <Combo type="Drink" items={drinks} setCombo={setCombo} />
          </View>
          <View>
            <Combo type="Popcorn" items={popcorns} setCombo={setCombo} />
          </View>
        </View>
      </ScrollView>
      <View className="fixed bottom-0 mx-4 my-4 border-t-2 border-[#E8E8E8]">
        <View className="flex-row justify-between items-center py-[14px]">
          <Text className="text-base font-normal">Total</Text>
          <Text className="text-right text-xl font-semibold">
            {formatCurrency(totalCombo)}VND
          </Text>
        </View>
        <TouchableOpacity
          className="px-[16px] py-[12px] bg-[#AE1F17] rounded-lg"
          onPress={handleContinue}
        >
          <Text className="text-center text-[16px] font-semibold text-white">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListComboScreen;
