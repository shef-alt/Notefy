import { createContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

const PlaceholderImage = require("@/assets/images/guest-user.webp");

type ContextType = {
  value: ImageSourcePropType;
  setValue: (v: ImageSourcePropType) => void;
};

export const Context = createContext<ContextType | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<ImageSourcePropType>(PlaceholderImage);

  return (
    <Context.Provider value={{ value, setValue }}>
      {children}
    </Context.Provider>
  );
};

