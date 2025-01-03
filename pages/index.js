import { Roboto } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"], // Optional: spezifische Schriftschnitte angeben
});

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Habit Tracker!</h1>
      <button>TEST</button>
    </div>
  );
}
