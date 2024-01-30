import { Dice3, LogOut, MoreHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Dice from "./dice";
import { useState } from "react";
import { rollDice } from "@/utils";
import { updatePlayerState } from "@/lib/firebase/realtimeDb";

export default function GameButtons({
  gameId,
  playerId,
}: {
  gameId: string;
  playerId: string;
}) {
  const { push } = useRouter();
  const [dice, setDice] = useState({ initial: 0, result: 0 });

  const buttons = [
    {
      Icon: Dice3,
      label: "Dice",
      onClick: () => {
        const { initial, result } = rollDice();
        setDice({ initial, result });

        updatePlayerState(gameId, playerId, {
          action: "roll",
          diceResult: result,
        });
      },
    },
    {
      Icon: Sparkles,
      label: "Item",
      onClick: () => {},
    },
  ];

  return (
    <>
      <div className="absolute bottom-5 inset-x-1/2 flex items-center justify-center space-x-2">
        <div className="hidden lg:flex space-x-2">
          {buttons.map(({ Icon, label, onClick }) => (
            <Button key={label} size="lg" onClick={onClick}>
              <Icon className="mr-2" />
              {label}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2 lg:hidden flex-shrink-0">
          {buttons.map(({ Icon, label, onClick }) => (
            <Button key={label} onClick={onClick}>
              <span>
                <Icon className="mr-2" />
              </span>
              {label}
            </Button>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="p-2">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => push("/lobby/resume")}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Exit</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {dice.initial > 0 && <Dice dice={dice} />}
    </>
  );
}
