import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

interface HeaderProps {
  title: string;
  ERName?: string;
}

const interval = setInterval(() => {
  console.log("Online");
}, 5000);

export default function Header({ title, ERName }: HeaderProps) {
  // Clear interval when component unmounts (alternative cleanup approach)
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => clearInterval(interval));
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-xl font-bold">VirtualER {ERName}</h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">
          {title !== "" ? `Signed in as ${title}` : ""}
        </span>
        <Link href="/login">
          <Button variant="outline">{title === "" ? "Login" : "Logout"}</Button>
        </Link>
      </div>
    </div>
  );
}