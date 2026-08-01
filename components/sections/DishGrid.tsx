"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { MenuGridStrings } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Dish } from "@/types";
import { DishCard } from "./DishCard";
import { MenuChips, type DishFilter } from "./MenuChips";

/**
 * Client-filtered dish grid (mockup `.dishes`). Every card stays mounted and
 * toggles `hidden` (matching the mockup filter) so reveals never re-fire;
 * two columns, one below 760px. Strings arrive resolved from the server
 * parent (props-over-import).
 */
export function DishGrid({
  dishes,
  strings,
}: {
  dishes: Dish[];
  strings: MenuGridStrings;
}) {
  const [filter, setFilter] = useState<DishFilter>("all");
  const ordered = [...dishes].sort((a, b) => a.order - b.order);

  return (
    <>
      <Reveal as="div" className="mb-12">
        <MenuChips active={filter} onChange={setFilter} strings={strings} />
      </Reveal>

      <div className="grid grid-cols-2 gap-x-8 gap-y-11 max-[760px]:grid-cols-1">
        {ordered.map((dish, index) => (
          <Reveal
            as="article"
            key={dish.id}
            delay={(index % 2) * 80}
            className={cn(
              filter !== "all" && dish.category !== filter && "hidden",
            )}
          >
            <DishCard dish={dish} strings={strings} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
