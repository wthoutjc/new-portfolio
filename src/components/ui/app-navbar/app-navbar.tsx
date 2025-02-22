import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "../toggle-theme/toggle-theme";

const items: { title: string; href: string; description: string }[] = [
  {
    title: "Education",
    href: "/education",
    description: "Academic formation",
  },
  {
    title: "Skills",
    href: "/skills",
    description: "Skills and technologies",
  },
];

const AppNavbar = () => {
  return (
    <div className="flex max-w-full p-5 justify-center drop-shadow-sm h-[60px] relative">
      <div className="flex max-w-7xl w-full justify-between items-center">
        <ul>
          <li className="dark:flex w-24 opacity-80 hover:opacity-100 ease-out duration-300 hidden">
            <Link href="/">
              <Image
                className="object-cover"
                src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/nrmlj5wmeop1rcqp5hdp"
                alt="ionjc"
                width={100}
                height={100}
              />
            </Link>
          </li>
          <li className="flex w-24 opacity-80 hover:opacity-100 ease-out duration-300 dark:hidden">
            <Link href="/">
              <Image
                className="object-cover"
                src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/wonlwuluroldfu03zcml"
                alt="ionjc"
                width={100}
                height={100}
              />
            </Link>
          </li>
        </ul>
        <NavigationMenu className="justify-end">
          <NavigationMenuList className="space-x-8 mr-4">
            {items.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
    </div>
  );
};

export { AppNavbar };
