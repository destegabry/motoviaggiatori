/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

exports.onClientEntry = () => {
  // Polyfills!
  require('intersection-observer');
  require('smoothscroll-polyfill').polyfill();
  // End polyfills
  window._epn = { campaign: process.env.GATSBY_EPN_CAMPAIGN_ID };
}

exports.onRouteUpdate = () => {
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('html').classList.remove('modal-open');
}