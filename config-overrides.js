const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@src': path.resolve(__dirname, 'src'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@scss': path.resolve(__dirname, 'src/assets/scss'),
    '@images': path.resolve(__dirname, 'src/assets/images'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@routes': path.resolve(__dirname, 'src/routes'),
    '@shared': path.resolve(__dirname, 'src/shared'),
    '@components': path.resolve(__dirname, 'src/shared/components'),
    '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
    '@constants': path.resolve(__dirname, 'src/shared/constants'),
    '@contexts': path.resolve(__dirname, 'src/shared/contexts'),
    '@stores': path.resolve(__dirname, 'src/shared/stores'),
    '@layouts': path.resolve(__dirname, 'src/shared/layouts'),
    '@pipes': path.resolve(__dirname, 'src/shared/pipes'),
    '@services': path.resolve(__dirname, 'src/shared/services'),
  })
)
