import { Reveal } from "@/components/motion/Reveal";
import { FactRows } from "@/components/ui/FactRows";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SiteImage } from "@/components/ui/SiteImage";
import { getStrings, type Locale } from "@/lib/i18n";
import type { RestaurantBanquet } from "@/types";
import { DiningHead } from "./DiningHead";

/**
 * Banquet Services (banquet mockup section 2): the service narrative with
 * fact rows and the occasions list beside the banquet-table photo slot.
 */
export function BanquetFacts({
  locale,
  banquet,
}: {
  locale: Locale;
  banquet: RestaurantBanquet;
}) {
  const strings = getStrings(locale).banquet;
  const rows = [
    ...banquet.facts,
    { label: strings.occasionsLabel, value: banquet.occasions.join(" · ") },
  ];

  return (
    <section className="dine-sec">
      <div className="dine-split">
        <div>
          <DiningHead
            eyebrow={strings.servicesEyebrow}
            title={strings.servicesTitle}
          />
          <Reveal
            as="p"
            delay={180}
            className="text-ivory/90 mt-[26px] max-w-[520px] font-serif text-[19px] leading-[1.7]"
          >
            {banquet.copy}
          </Reveal>
          <Reveal as="div" delay={240}>
            <FactRows
              accent="jade"
              facts={rows}
              className="mt-[34px] mb-[38px]"
            />
          </Reveal>
        </div>
        <Reveal as="div" delay={200}>
          <PhotoFrame
            tint="champagne"
            showMark={!banquet.tableImage}
            label={
              banquet.tableImage
                ? undefined
                : {
                    kicker: strings.tableFrame.kicker,
                    name: strings.tableFrame.name,
                  }
            }
            tag={banquet.tableImage ? undefined : strings.tableFrame.tag}
            className="aspect-[4/5] max-h-[560px] max-[900px]:aspect-square max-[900px]:max-h-[440px]"
          >
            {banquet.tableImage && (
              <SiteImage
                image={banquet.tableImage}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                lqip={banquet.tableImage.lqip}
                className="z-[1] object-cover"
              />
            )}
          </PhotoFrame>
        </Reveal>
      </div>
    </section>
  );
}
