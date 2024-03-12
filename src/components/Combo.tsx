import classNames from "classnames";
import { useState } from "react";

import { TouchableOpacity, View, Text, TouchableHighlight } from "react-native";
import { formatCurrency } from "../utils/utils";
import { Combo as ComboType } from "../types/combo.type";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";

interface PropsItemCombo {
  item: ComboType;
  setCombo: React.Dispatch<React.SetStateAction<ComboType[]>>;
}

const ItemCombo = ({ item, setCombo }: PropsItemCombo) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddCombo = (item: ComboType) => {
    setQuantity((pre) => {
      if ((!item.quantity || pre < item.quantity) && pre < 10) {
        return pre + 1;
      }
      return pre;
    });
    setCombo((pre) => {
      const existsInArray = pre.some((combo) => combo._id === item._id);
      if (existsInArray) {
        return pre.map((combo) => {
          if (item._id === combo._id && combo.quantity < 10) {
            return {
              ...combo,
              quantity: combo.quantity + 1,
            };
          }
          return combo;
        });
      } else {
        return [
          ...pre,
          {
            ...item,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleRemoveCombo = (item: ComboType) => {
    setQuantity((pre) => {
      if (pre > 0) {
        return pre - 1;
      }
      return pre;
    });
    setCombo((pre) => {
      const existsInArray = pre.some(
        (combo) => combo._id === item._id && combo.quantity > 1
      );
      if (existsInArray) {
        return pre.map((combo) => {
          if (item._id === combo._id) {
            return {
              ...combo,
              quantity: combo.quantity - 1,
            };
          }
          return combo;
        });
      } else {
        return pre.filter((combo) => item._id !== combo._id);
      }
    });
  };
  return (
    <View className="flex-row w-full items-center px-4 py-2">
      <View className="flex-1">
        <Text className="text-base font-medium text-white md:max-w-[200px]">
          {item.description}
        </Text>
        <Text className="text-base text-primary">{`${formatCurrency(
          item.price
        )} VND`}</Text>
      </View>
      <View className="ml-4 flex-row space-x-4 items-center">
        <TouchableOpacity
          className="rounded-sm bg-primary text-white"
          onPress={() => {
            handleRemoveCombo(item);
          }}
        >
          <MinusIcon size="28" strokeWidth={2} color="white" />
        </TouchableOpacity>
        <Text className="font-bold text-white">{quantity}</Text>
        <TouchableOpacity
          className="rounded-sm bg-primary text-white"
          onPress={() => handleAddCombo(item)}
        >
          <PlusIcon size="28" strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface PropsCombo {
  type: string;
  items: ComboType[];
  setCombo: React.Dispatch<React.SetStateAction<ComboType[]>>;
}

const Combo = ({ type, items, setCombo }: PropsCombo) => {
  const [isOpen, setIsOpen] = useState(type === "Combo");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className="relative mb-2 inline-block w-full text-left">
      <TouchableOpacity
        onPress={toggleDropdown}
        className="flex-row w-full items-center justify-between rounded-md border border-primary bg-white px-4 py-2"
        id="menu-button"
      >
        <Text className="text-primary text-base font-medium">{type}</Text>
        {isOpen ? (
          <ChevronUpIcon size="28" strokeWidth={2} color="#AE1F17" />
        ) : (
          <ChevronDownIcon size="28" strokeWidth={2} color="#AE1F17" />
        )}
      </TouchableOpacity>
      <View
        className={classNames(
          `mt-2 w-full origin-top-right overflow-hidden rounded-md bg-[#1A1D23] shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-1000 ease-in-out`,
          {
            "max-h-0": !isOpen,
            "max-h-[700px]": isOpen,
          }
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <View className="w-full py-1" role="none">
          {items.map((item) => (
            <ItemCombo key={item._id} item={item} setCombo={setCombo} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Combo;
