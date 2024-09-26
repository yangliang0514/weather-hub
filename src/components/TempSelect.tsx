import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTempUnitContext } from "@/context/TempUnitProvider";

export default function TempSelect() {
  const { unit, setUnit } = useTempUnitContext();

  return (
    <Select value={unit} onValueChange={(unit) => setUnit(unit)}>
      <SelectTrigger className="w-fit bg-transparent p-5 focus:outline-none focus:ring-1 focus:ring-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="hover:cursor-pointer" value="celsius">
          &deg;C
        </SelectItem>
        <SelectItem className="hover:cursor-pointer" value="fahrenheit">
          &deg;F
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
