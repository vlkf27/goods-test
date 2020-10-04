const path = require('path')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
 ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
 ],
  webpackFinal: (config) => {
    config.resolve = {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, '../src'),
      }
    }

    config.module.rules.push({
        test: /\.scss$/,
        use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
        ]
    })

    config.module.rules.push({
        test: /\.pug$/,
        oneOf: [
            {
                resourceQuery: /^\?vue/,
                use: ['pug-plain-loader']
            },
            {
                use: ['raw-loader', 'pug-plain-loader']
            }
        ]
    })

    return config;
  }
}
