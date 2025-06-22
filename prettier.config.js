module.exports = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  semi: false,
  proseWrap: 'always',

  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className']
}
