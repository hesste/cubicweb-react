- use iso npm package (to ease isomorphic)
- use alt npm package (for flux implementation)
- use Radium npm package (for inline css:
  with mediaQuery and pseudo selector :hover, :focus and :active)

need something like Relay but use RQL instead of GraphQL.

to build the bundle:

  watchify -x react  app/browser.js --debug -o public/bundle.js -v

Exclude react and react-router because it is aleardy bundle in bundle-react.js with:

  browserify -r react  -o public/bundle-react.js




