"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { createNewGame } from "@/server/actions/game";
import SubmitButton from "../submit-button";
import { PLACE_NAME_DICTIONARY } from "@/constants/dictionary/map";
import { START_PLACE_OPTIONS } from "@/constants";

const items = [
  { id: "0", label: "No Bot" },
  { id: "1", label: "1 Bot", disabled: true },
  { id: "2", label: "2 Bots", disabled: true },
  { id: "3", label: "3 Bots", disabled: true },
];

export function NewGameForm() {
  const { toast } = useToast();

  return (
    <form
      className="space-y-8"
      action={async (formData: FormData) => {
        const res = await createNewGame(formData);
        if (res.message) {
          toast({ title: res.message });
        }
      }}
    >
      <div className="grid gap-2">
        <div>
          <Label className="text-lg">Play vs</Label>
          <p className="text-sm text-slate-500">
            Choose how many bots to play with.
          </p>
        </div>
        <RadioGroup
          defaultValue="noBot"
          className="grid grid-cols-4 gap-4"
          name="bots"
        >
          {items.map((item) => (
            <div key={item.id}>
              <RadioGroupItem
                value={item.id}
                id={item.id}
                className="peer sr-only"
                disabled={item.disabled}
              />
              <Label
                htmlFor={item.id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="grid gap-2">
        <div>
          <Label htmlFor="year" className="text-lg">
            Game Year
          </Label>
          <p className="text-sm text-slate-500">
            Choose how many game years to play for. 1 year is 12 rounds.
          </p>
        </div>
        <Select name="year" defaultValue="3">
          <SelectTrigger>
            <SelectValue placeholder="Game Year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => {
              const value = 1 + i;
              return (
                <SelectItem key={i} value={`${value}`}>
                  {`${value} year${i === 0 ? "" : "s"} (${value * 12} rounds)`}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <div>
          <Label htmlFor="year" className="text-lg">
            Start Place
          </Label>
          <p className="text-sm text-slate-500">
            Choose which place to start at.
          </p>
        </div>
        <Select name="startPlace" defaultValue="random">
          <SelectTrigger>
            <SelectValue placeholder="Start Place" />
          </SelectTrigger>
          <SelectContent>
            {START_PLACE_OPTIONS.map((value, i) => {
              return (
                <SelectItem key={value} value={value}>
                  {value === "random"
                    ? "Random"
                    : PLACE_NAME_DICTIONARY[value].en}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <SubmitButton />
    </form>
  );
}
