import { SessionProvider } from "next-auth/react";
import "./globals.css";
import localFont from "next/font/local";
import { Providers } from "./providers";

// Inter font family
const inter = localFont({
  variable: "--font-inter",
  src: [
    {
      path: "../../public/assets/fonts/Inter/Inter-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Inter/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Inter/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Inter/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

// Poppins font family
const poppins = localFont({
  variable: "--font-poppins",
  src: [
    {
      path: "../../public/assets/fonts/Poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

// Space Grotesk font family
const spaceGrotesk = localFont({
  variable: "--font-space-grotesk",
  src: [
    {
      path: "../../public/assets/fonts/SpaceGrotesk/SpaceGrotesk-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/SpaceGrotesk/SpaceGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/SpaceGrotesk/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/SpaceGrotesk/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/SpaceGrotesk/SpaceGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata = {
  title: "Remexis - Empowering Healthcare Professionals",
  description:
    "Discover natural remedy insights with Remexis, the dedicated platform for healthcare professionals using AI-powered insights.",
  openGraph: {
    title: "Remexis - Empowering Healthcare Professionals",
    description:
      "Discover natural remedy insights with Remexis, the dedicated platform for healthcare professionals using AI-powered insights.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable}`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
