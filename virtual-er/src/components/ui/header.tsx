import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import Link from 'next/link'
        export default function Header(){
                return (
                    <Menubar>
                 <MenubarMenu>
                    <MenubarTrigger>Username</MenubarTrigger>
                    <MenubarContent>
                    <MenubarItem>
                        View Profile
                    </MenubarItem>
                    <MenubarSeparator />
                    <Link href="/login">
                        <MenubarItem>
                            Logout
                        </MenubarItem>
                    </Link>
                    
                    </MenubarContent>
                </MenubarMenu>
                </Menubar>
                  );   
            }
            