import "@/styles/dice.css";
import { useEffect, useState } from "react";

// Based on https://lenadesign.org/2020/06/18/roll-the-dice/

export type DiceNums = { initial: number; result: number };

export default function Dice({ dice }: { dice: DiceNums }) {
  const [displayResult, setDisplayResult] = useState(0);

  useEffect(() => {
    setDisplayResult(dice.result);
  }, [setDisplayResult, dice.result]);

  return (
    <div className="absolute bottom-32 inset-x-1/2 flex justify-center">
      <div className={`dice show-${displayResult || dice.initial}`}>
        <div className="side one">
          <div className="dot one-1"></div>
        </div>
        <div className="side two">
          <div className="dot two-1"></div>
          <div className="dot two-2"></div>
        </div>
        <div className="side three">
          <div className="dot three-1"></div>
          <div className="dot three-2"></div>
          <div className="dot three-3"></div>
        </div>
        <div className="side four">
          <div className="dot four-1"></div>
          <div className="dot four-2"></div>
          <div className="dot four-3"></div>
          <div className="dot four-4"></div>
        </div>
        <div className="side five">
          <div className="dot five-1"></div>
          <div className="dot five-2"></div>
          <div className="dot five-3"></div>
          <div className="dot five-4"></div>
          <div className="dot five-5"></div>
        </div>
        <div className="side six">
          <div className="dot six-1"></div>
          <div className="dot six-2"></div>
          <div className="dot six-3"></div>
          <div className="dot six-4"></div>
          <div className="dot six-5"></div>
          <div className="dot six-6"></div>
        </div>
      </div>
    </div>
  );
}
