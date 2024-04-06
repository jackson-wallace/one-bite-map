import Map from "@/components/map";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-around">
      <div className="flex flex-row w-5/6 items-center justify-between my-4 md:my-6">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
          The One Bite Map
        </h1>
        <ModeToggle />
      </div>
      <Map />
    </main>
  );
}
