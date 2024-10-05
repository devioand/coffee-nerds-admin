import localFont from "next/font/local";

const bobby = localFont({
  src: [{ path: "../assets/fonts/Bobby-Jones-Font/Bobby-Jones-Soft.otf" }],
  variable: "--font-bobby",
});

const brandon = localFont({
  src: [
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_blk_it.otf",
      weight: "800",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_blk.otf",
      weight: "800",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_bld_it.otf",
      weight: "700",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_bld.otf",
      weight: "700",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_med_it.otf",
      weight: "600",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_med.otf",
      weight: "600",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_reg_it.otf",
      weight: "500",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_reg.otf",
      weight: "500",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_light_it.otf",
      weight: "400",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_light.otf",
      weight: "400",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_thin_it.otf",
      weight: "200",
    },
    {
      path: "../assets/fonts/Brandon-Grotesque-Font/Brandon_thin.otf",
      weight: "200",
    },
  ],
  variable: "--font-brandon",
});

export const fonts = {
  bobby,
  brandon,
};
