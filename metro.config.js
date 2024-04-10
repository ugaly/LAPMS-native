// const { getDefaultConfig } = require('@expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push('cjs');
// module.exports = defaultConfig;

/* eslint-disable */
const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const {
    resolver: { sourceExts: defaultSourceExts, assetExts: defaultAssetExts },
  } = defaultConfig;

  const svgTransformerConfig = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: defaultAssetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...defaultSourceExts, 'svg'],
    },
  };

  // Merge the configurations
  return { ...defaultConfig, ...svgTransformerConfig };
})();
