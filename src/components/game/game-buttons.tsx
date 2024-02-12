import { Dice3, LogOut, MoreHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import { rollDice } from "@/utils";
import { updatePlayerState } from "@/lib/firebase/realtimeDb";
import useGameState from "@/hooks/use-game-state";

export default function GameButtons() {
  const { push } = useRouter();
  const params = useParams();
  const gameId = params.gameId as string;
  const { turnPlayerId } = useGameState();

  const buttons = [
    {
      Icon: Dice3,
      label: "Dice",
      onClick: async () => {
        const result = rollDice();

        updatePlayerState(gameId, turnPlayerId!, {
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
    </>
  );
}
