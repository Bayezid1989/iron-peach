import { NewGameForm } from "@/components/lobby/new-game-form";

export default function NewGamePage() {
  return (
    <div className="space-y-20">
      <header>
        <h1 className="text-2xl font-bold">Start new game</h1>
        <p>Start new game with your favorite setting!</p>
      </header>

      <div className="flex justify-center">
        <NewGameForm />
      </div>
    </div>
  );
}
