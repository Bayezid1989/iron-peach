import "@/styles/dice.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import { rollRandomDice } from "@/utils";

type Dice = { initial: number; final: number };

export default function Dice({
  dice,
  setDice,
}: {
  dice: Dice;
  setDice: Dispatch<SetStateAction<Dice>>;
}) {
  function getRandom(excludedNumber = 0) {
    let randomNumber = 0;
    do {
      randomNumber = rollRandomDice();
    } while (randomNumber === excludedNumber);
    return randomNumber;
  }

  useEffect(() => {
    const result = getRandom(dice.initial);
    setDice((prev) => ({ ...prev, final: result }));
  }, [setDice, dice.initial]);

  return (
    <div className="absolute bottom-24 inset-x-1/2 flex justify-center">
      <div className={`dice show-${dice.final || dice.initial}`}>
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
