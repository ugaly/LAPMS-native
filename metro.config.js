const { getDefaultConfig } = require('@expo/metro-config');

module.exports = async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const {
    resolver: { sourceExts, assetExts },
  } = defaultConfig;

  return {
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...defaultConfig.resolver,
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
};





// const { getDefaultConfig } = require('@expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push('cjs');
// module.exports = defaultConfig;




// const { getDefaultConfig } = require('@expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push('cjs');
// module.exports = defaultConfig;
