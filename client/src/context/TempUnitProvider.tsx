import {
  getTempUnitLocalStorage,
  setTempUnitLocalStorage,
} from "@/utils/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

interface unitContextValue {
  unit: string;
  setUnit: (unit: string) => void;
}

const TempUnitContext = createContext<unitContextValue | null>(null);

export default function TempUnitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tempUnit, setTempUnit] = useState(getTempUnitLocalStorage());

  useEffect(() => {
    setTempUnitLocalStorage(tempUnit);
  }, [tempUnit]);

  return (
    <TempUnitContext.Provider value={{ unit: tempUnit, setUnit: setTempUnit }}>
      {children}
    </TempUnitContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTempUnitContext() {
  const context = useContext(TempUnitContext);

  if (context === null) {
    throw new Error("TempUnitContext was used outside of Provider");
  }

  return context;
}
