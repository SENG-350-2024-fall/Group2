import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
export default function Page() {
    return (
        <form className="space-y-3">
            <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Doctor</MenubarTrigger>
                <MenubarContent>
                <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Logout</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            </Menubar>
        </form >
    )
}