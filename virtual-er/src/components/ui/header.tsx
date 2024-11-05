import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginButton from "./loginButton";

interface HeaderProps {
  title: string;
  ERName?: string;
}

const interval = setInterval(() => {
  console.log("Online");
}, 5000);

export default async function Header({ title, ERName }: HeaderProps) {
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => clearInterval(interval));
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-xl font-bold">VirtualER {ERName}</h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">
          {title !== "" ? `Signed in as ${title}` : ""}
        </span> {/* With {title} we can display a specific user type for each page where the title bar is used. Ex: <Header title="Healthcare Professional"/> */}
        <Link href="/login">
          <LoginButton />
        </Link>
      </div>
    </div>
  );
}