import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from 'next/link';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-xl font-bold">VirtualER</h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">{title != "" ? `Signed in as ${title}` : ""}</span> {/* With {title} we can display a specific user type for each page where the title bar is used. Ex: <Header title="Healthcare Professional"/> */}
        <Link href="/login">
          <Button variant="outline">{title == "" ? "Login" : "Logout"}</Button>
        </Link>
      </div>
    </div>
  );
}
