import { PokemonsCartGrid } from "@/components/PokemonsCartGrid";
import { TotalCart } from "@/components/TotalCart";

export default function CartPage() {
  return (
    <div className="container max-w-screen-2xl py-8">
      <div className="max-w-2xl mx-auto">
        <PokemonsCartGrid />

        <TotalCart />
      </div>
    </div>
  );
}
