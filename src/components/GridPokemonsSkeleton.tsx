import { Skeleton } from "@/components/ui/skeleton";
import { generateRandomArray } from "@/lib/utils";

export const GridPokemonsSkeleton: React.FC = () => {
  const randomArray = generateRandomArray(24);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
      {randomArray.map((_, key) => (
        <Skeleton key={key} className="rounded-lg shadow-sm h-[370px]" />
      ))}
    </div>
  );
};
