module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // AGREGADO: Necesario para evitar crash en Android si usas animaciones
    plugins: ["react-native-reanimated/plugin"],
  };
};