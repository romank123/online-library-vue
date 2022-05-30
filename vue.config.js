module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/online-library-vue/' // prod
        : '/', // dev
}