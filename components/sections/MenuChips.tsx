import { Chip } from "@/components/ui/Chip";
import type { MenuGridStrings } from "@/lib/i18n";
import type { DishCategory } from "@/types";

export type DishFilter = "all" | DishCategory;

const CATEGORY_ORDER: DishCategory[] = [
  "dimsum",
  "roast",
  "seafood",
  "mains",
  "desserts",
];

/**
 * Menu category chips (mockup `.chips`): the jade Chip variant. State lives
 * in `DishGrid`; labels arrive resolved from the server parent.
 */
export function MenuChips({
  active,
  onChange,
  strings,
}: {
  active: DishFilter;
  onChange: (filter: DishFilter) => void;
  strings: MenuGridStrings;
}) {
  const filters: { value: DishFilter; label: string }[] = [
    { value: "all", label: strings.allDishes },
    ...CATEGORY_ORDER.map((category) => ({
      value: category,
      label: strings.categories[category],
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2.5">
      {filters.map((filter) => (
        <Chip
          key={filter.value}
          accent="jade"
          active={active === filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </Chip>
      ))}
    </div>
  );
}
