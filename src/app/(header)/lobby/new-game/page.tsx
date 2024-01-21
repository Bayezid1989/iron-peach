import NewGameForm from "@/components/lobby/new-game-form";

export default function NewGame() {
  return (
    <main className="space-y-20">
      <h1 className="text-3xl font-bold">Start new game</h1>
      <div className="flex justify-center">
        <NewGameForm />
      </div>
    </main>
  );
}
