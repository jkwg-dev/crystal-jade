import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SiteImage } from "@/components/ui/SiteImage";
import type { MenuGridStrings } from "@/lib/i18n";
import type { Dish } from "@/types";

/**
 * Menu dish card (mockup `.dish`): large-format photo slot, jade category
 * label, EN name over the 中文 name in the system zh stack, and one line.
 * Labels arrive resolved from the server parent via `DishGrid`.
 */
export function DishCard({
  dish,
  strings,
}: {
  dish: Dish;
  strings: MenuGridStrings;
}) {
  return (
    <>
      <PhotoFrame
        tint={dish.frame.tint}
        label={
          dish.image
            ? undefined
            : { kicker: strings.photoKicker, name: dish.name }
        }
        className="mb-5 aspect-[16/10]"
      >
        {dish.image && (
          <SiteImage
            image={dish.image}
            alt=""
            fill
            sizes="(max-width: 760px) 88vw, 45vw"
            lqip={dish.image.lqip}
            className="z-[1] object-cover"
          />
        )}
      </PhotoFrame>
      <p className="text-jade-text mb-2.5 text-[8.5px] leading-none font-medium tracking-[0.3em] uppercase">
        {strings.categories[dish.category]}
      </p>
      <h3 className="font-serif text-[23px] leading-[1.25] font-medium">
        {dish.name}
      </h3>
      <p
        lang="zh"
        className="font-zh text-champagne-bright/85 mt-[5px] mb-2 text-[13px] leading-[1.4] tracking-[0.12em]"
      >
        {dish.zhName}
      </p>
      <p className="text-mist max-w-[420px] text-[12.5px] leading-[1.8]">
        {dish.line}
      </p>
    </>
  );
}
