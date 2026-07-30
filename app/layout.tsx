import { cormorant, inter } from "@/lib/fonts";
import "./globals.css";

/**
 * Root shell: fonts, global styles, and the pre-paint reduced-motion flag.
 * Site chrome (header, jade wash, info strip) lives in the (site) route
 * group layout so the embedded Studio at /studio renders without it.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
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
