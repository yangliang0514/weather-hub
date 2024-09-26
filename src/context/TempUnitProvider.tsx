import {
  getTempUnitLocalStorage,
  setTempUnitLocalStorage,
} from "@/utils/localStorage";
import { createContext, useContext, useState } from "react";

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

  function setUnit(unit: string) {
    setTempUnit(unit);
    setTempUnitLocalStorage(unit);
  }

  return (
    <TempUnitContext.Provider value={{ unit: tempUnit, setUnit }}>
      {children}
    </TempUnitContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTempUnitContext() {
  const context = useContext(TempUnitContext)!;

  if (context === undefined) {
    throw new Error("TempUnitContext was used outside of Provider");
  }

  return context;
}
