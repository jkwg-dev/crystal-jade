import { cormorant, inter } from "@/lib/fonts";
import { LOCALE_TAG, type Locale } from "@/lib/i18n";
import "@/app/globals.css";

/**
 * The single html/body shell behind every root layout: fonts, global
 * styles, the locale's `lang` tag, and the pre-paint reduced-motion flag.
 * Authored once so the en tree, the /zh tree, and the Studio branch cannot
 * drift; the root layout files are one-line delegations into this and
 * `SiteShell`.
 */
export function RootDocument({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  return (
    <html
      lang={LOCALE_TAG[locale]}
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        {/* Set the reduced-motion flag before paint so `html.rm` rules apply
            without a flash of animation. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
