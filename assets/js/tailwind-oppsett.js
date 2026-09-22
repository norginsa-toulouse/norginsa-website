/* Felles Tailwind-oppsett. Lå tidligere inline i hver enkelt side.
 *
 * Paletten: murstein-rosa, altså Toulouse-rødt med metning i, ikke den dempede
 * terrakottaen som drar mot bronse. Gråskalaen er nesten nøytral med bare et
 * snev varme - det er beige gråtoner som får en side til å se gammel ut, ikke
 * rødfargen. Vi overstyrer Tailwind sine red, rose og gray, slik at alle
 * eksisterende klasser (text-red-600, bg-gray-100 osv.) følger med uten at
 * markupen må endres.
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Murstein-rosa. 600 er handlingsfargen.
        red: {
          50: "#fff1f3", 100: "#ffe1e5", 200: "#fec8d0", 300: "#fb9dab",
          400: "#f66b81", 500: "#ec3f5b", 600: "#d92046", 700: "#b7153a",
          800: "#991536", 900: "#831633", 950: "#490817",
        },
        // Lysere og litt rosere, brukes i gradientene.
        rose: {
          50: "#fff1f4", 100: "#ffe3e9", 200: "#fecdd8", 300: "#fba5ba",
          400: "#f77396", 500: "#f04a78", 600: "#dd2a63", 700: "#ba1c51",
          800: "#9b1b49", 900: "#851b44", 950: "#4a0921",
        },
        // Nesten nøytral. Den lyse enden har et snev av rosa i seg, samme
        // idé som tinten i mørk modus. Tonen går mot rosa og ikke mot beige:
        // beige gråtoner er det som får en side til å se gammel ut.
        gray: {
          50: "#fcf9f9", 100: "#f7f2f2", 200: "#ece5e5", 300: "#dbd3d2",
          400: "#a8a29f", 500: "#78726f", 600: "#585250", 700: "#423d3b",
          800: "#292724", 900: "#1a1917", 950: "#0f0e0d",
        },
      },
    },
  },
};
