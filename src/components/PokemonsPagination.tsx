"use client";

import { type PokemonsResponseType } from "@/providers/pokemons/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Props {
  previous: PokemonsResponseType["previous"];
  next: PokemonsResponseType["next"];
}

export const PokemonsPagination: React.FC<Props> = ({ next, previous }) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const hasPrevious = !!previous;
  const hasNext = !!next;

  const prevHref = hasPrevious ? `/?page=${page - 1}` : "#";
  const nextHref = hasNext ? `/?page=${page + 1}` : "#";

  return (
    <div className="mx-auto flex w-full justify-center">
      <div className="flex flex-row items-center gap-1">
        <Button asChild variant="ghost">
          <Link href={prevHref}>
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </Link>
        </Button>

        <Button asChild variant="ghost">
          <Link href={nextHref}>
            <span>Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
