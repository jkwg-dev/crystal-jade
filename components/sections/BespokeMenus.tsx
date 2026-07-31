import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { FactRows } from "@/components/ui/FactRows";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SiteImage } from "@/components/ui/SiteImage";
import type { RestaurantBanquet } from "@/types";
import { DiningHead } from "./DiningHead";

/**
 * Bespoke Menus (banquet mockup `.banq-box`): the jade panel with the
 * composed-course photo slot, the Per Person / Per Table rows (pricing on
 * enquiry), and the Enquire Now CTA.
 */
export function BespokeMenus({ banquet }: { banquet: RestaurantBanquet }) {
  const rows = banquet.menus.map((menu) => ({
    label: menu.label,
    value: menu.line,
    detail: menu.detail,
  }));

  return (
    <section className="dine-sec">
      <div className="jade-panel dine-box">
        <Reveal as="div">
          <PhotoFrame
            tint="jade"
            showMark={!banquet.courseImage}
            label={
              banquet.courseImage
                ? undefined
                : { kicker: "Image placeholder", name: "Composed Course" }
            }
            tag={
              banquet.courseImage ? undefined : "Replace with final photography"
            }
            className="aspect-[4/3]"
          >
            {banquet.courseImage && (
              <SiteImage
                image={banquet.courseImage}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                lqip={banquet.courseImage.lqip}
                className="z-[1] object-cover"
              />
            )}
          </PhotoFrame>
        </Reveal>
        <div>
          <DiningHead
            eyebrow="Bespoke Menus"
            title={"Two ways to\n*compose*."}
          />
          <Reveal as="div" delay={160}>
            <FactRows
              accent="jade"
              facts={rows}
              className="mt-[34px] mb-[38px]"
            />
          </Reveal>
          <Reveal as="div" delay={280}>
            <Button href={banquet.enquiryTarget}>Enquire Now</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
