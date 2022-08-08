module.exports = {
    webpack5: true,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.(js|ts)x?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};