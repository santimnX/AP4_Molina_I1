/** @type {import('tailwindcss').Config} */
module.exports = {
  // CAMBIO CLAVE: Apuntar a la carpeta "src" donde vive tu código real
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],# Limpia caché y trata de pre-construir
  npx expo prebuild --platform android --clean
  theme: {
    extend: {},
  },
  plugins: [],
}