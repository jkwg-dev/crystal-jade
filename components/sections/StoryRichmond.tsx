import { Reveal } from "@/components/motion/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SiteImage } from "@/components/ui/SiteImage";
import { getStrings, type Locale } from "@/lib/i18n";
import type { RestaurantStory } from "@/types";
import { DiningHead } from "./DiningHead";

/**
 * Why Richmond, Why Now (story mockup section 3): the homecoming narrative
 * beside the Richmond photo slot, image first.
 */
export function StoryRichmond({
  locale,
  story,
}: {
  locale: Locale;
  story: RestaurantStory;
}) {
  const strings = getStrings(locale).story;
  return (
    <section className="dine-sec">
      <div className="dine-split img-first">
        <Reveal as="div">
          <PhotoFrame
            tint="champagne"
            showMark={!story.richmond.image}
            label={
              story.richmond.image
                ? undefined
                : {
                    kicker: strings.richmondFrame.kicker,
                    name: strings.richmondFrame.name,
                  }
            }
            tag={story.richmond.image ? undefined : strings.richmondFrame.tag}
            className="aspect-[4/5] max-h-[560px] max-[900px]:aspect-square max-[900px]:max-h-[440px]"
          >
            {story.richmond.image && (
              <SiteImage
                image={story.richmond.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                lqip={story.richmond.image.lqip}
                className="z-[1] object-cover"
              />
            )}
          </PhotoFrame>
        </Reveal>
        <div>
          <DiningHead
            eyebrow={strings.richmondEyebrow}
            title={strings.richmondTitle}
          />
          <Reveal
            as="p"
            delay={180}
            className="text-ivory/90 mt-[26px] max-w-[520px] font-serif text-[19px] leading-[1.7]"
          >
            {story.richmond.lead}
          </Reveal>
          {story.richmond.body.map((paragraph, index) => (
            <Reveal
              key={index}
              as="p"
              delay={260 + index * 60}
              className="text-mist mt-5 max-w-[520px] text-[14px]"
            >
              {paragraph}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
