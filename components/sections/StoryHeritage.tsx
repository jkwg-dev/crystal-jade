import { Reveal } from "@/components/motion/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SiteImage } from "@/components/ui/SiteImage";
import { getStrings, type Locale } from "@/lib/i18n";
import type { RestaurantStory } from "@/types";
import { DiningHead } from "./DiningHead";

/**
 * Heritage and global footprint (story mockup section 2): narrative beside
 * the map placeholder, closed by the footprint list with the highlighted
 * "Now, Richmond" stop. Footprint pending brand-guide confirmation.
 */
export function StoryHeritage({
  locale,
  story,
}: {
  locale: Locale;
  story: RestaurantStory;
}) {
  const strings = getStrings(locale).story;
  return (
    <section className="dine-sec">
      <div className="dine-split">
        <div>
          <DiningHead
            eyebrow={strings.heritageEyebrow}
            title={strings.heritageTitle}
          />
          <Reveal
            as="p"
            delay={180}
            className="text-ivory/90 mt-[26px] max-w-[520px] font-serif text-[19px] leading-[1.7]"
          >
            {story.heritage.lead}
          </Reveal>
          {story.heritage.body.map((paragraph, index) => (
            <Reveal
              key={index}
              as="p"
              delay={260 + index * 60}
              className="text-mist mt-5 max-w-[520px] text-[14px]"
            >
              {paragraph}
            </Reveal>
          ))}
          <Reveal
            as="p"
            delay={320}
            className="text-mist/80 mt-[30px] text-[10px] leading-[2.4] font-medium tracking-[0.24em] uppercase"
          >
            {story.footprint.join(" · ")} ·{" "}
            <b className="text-jade-text font-medium">{story.footprintNow}</b>
          </Reveal>
        </div>
        <Reveal as="div" delay={200}>
          <PhotoFrame
            tint="jade"
            showMark={!story.heritage.image}
            label={
              story.heritage.image
                ? undefined
                : {
                    kicker: strings.heritageFrame.kicker,
                    name: strings.heritageFrame.name,
                  }
            }
            tag={story.heritage.image ? undefined : strings.heritageFrame.tag}
            className="aspect-[16/11]"
          >
            {story.heritage.image && (
              <SiteImage
                image={story.heritage.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                lqip={story.heritage.image.lqip}
                className="z-[1] object-cover"
              />
            )}
          </PhotoFrame>
        </Reveal>
      </div>
    </section>
  );
}
