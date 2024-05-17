import { Button } from "./ui/button";
import { useStore } from "@/hooks/useStore";
import { ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useProfileStore } from "@/stores/profile.store";
import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";

export const HeaderRightContent: React.FC = () => {
  const profileStore = useStore(useProfileStore, (state) => state);
  const cartStore = useStore(useCartStore, (state) => state);

  if (!profileStore || !cartStore) return null;

  const { signIn, signOut, status: authStatus, user } = profileStore;
  const { count } = cartStore;

  const cartCount = count();

  if (authStatus === "loading") {
    return null;
  }

  if (authStatus === "unauthenticated") {
    return <Button onClick={signIn}>Ingresar</Button>;
  }

  return (
    <div className="flex gap-4 items-center">
      <Button variant="outline" size="icon" asChild className="relative">
        <Link href="/cart">
          <ShoppingCart className="h-4 w-4" />

          {cartCount > 0 ? (
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white">
              {cartCount}
            </div>
          ) : null}
        </Link>
      </Button>

      <p>
        {user?.balance.amount} {user?.balance.currency}
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shair17.png" alt="@shadcn" />
              <AvatarFallback>SH</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuItem>
            <Button variant="destructive" className="py-2" onClick={signOut}>
              Cerrar sesión
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
