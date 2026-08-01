import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FactRows } from "@/components/ui/FactRows";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SiteImage } from "@/components/ui/SiteImage";
import { getStrings, localePath, type Locale } from "@/lib/i18n";
import type { Restaurant } from "@/types";
import { DiningHead } from "./DiningHead";

/**
 * Private Dining preview on the landing page (mockup `.prooms`): a jade panel
 * with the room photo slot, fact rows, and the Banquet & Private Dining CTA.
 * Stacks below 900px.
 */
export function PrivatePreview({
  locale,
  privateDining,
}: {
  locale: Locale;
  privateDining: Restaurant["privateDining"];
}) {
  const strings = getStrings(locale).home;
  return (
    <section className="dine-sec">
      <div className="jade-panel dine-box">
        <Reveal as="div">
          <PhotoFrame
            tint="emerald"
            showMark={!privateDining.image}
            label={
              privateDining.image
                ? undefined
                : {
                    kicker: strings.privateFrame.kicker,
                    name: strings.privateFrame.name,
                  }
            }
            tag={privateDining.image ? undefined : strings.privateFrame.tag}
            className="aspect-[4/3]"
          >
            {privateDining.image && (
              <SiteImage
                image={privateDining.image}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                lqip={privateDining.image.lqip}
                className="z-[1] object-cover"
              />
            )}
          </PhotoFrame>
        </Reveal>

        <div>
          <DiningHead
            eyebrow={strings.privateEyebrow}
            title={strings.privateTitle}
          />
          <Reveal
            as="p"
            delay={180}
            className="text-mist mt-6 max-w-[520px] text-[14px]"
          >
            {privateDining.copy}
          </Reveal>
          <Reveal as="div" delay={240}>
            <FactRows
              accent="jade"
              facts={privateDining.facts}
              className="mt-[34px] mb-[38px]"
            />
          </Reveal>
          <Reveal as="div" delay={420}>
            <Button href={localePath(locale, "/banquet")} variant="ghost">
              {strings.banquetCta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
