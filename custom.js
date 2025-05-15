(function loadIBMPlexSans() {
  console.log("Loading IBM Plex Sans");

  const head = document.head;

  [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
  ].forEach((attrs) => {
    const link = Object.assign(document.createElement("link"), attrs);
    head.appendChild(link);
  });

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap";
  head.appendChild(fontLink);

  const style = document.createElement("style");
  style.textContent = `
      :root {
        --font-sans: "IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont,
                     "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
  
      body, #content-area, #sidebar, #navbar {
        font-family: var(--font-sans);
      }
  
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-sans);
        font-weight: 600;
      }
    `;
  head.appendChild(style);
})();

// Select all .method-nav-pill elements inside <a> tags
document.querySelectorAll("a .method-nav-pill").forEach((pill) => {
  const a = pill.closest("a");
  if (a) {
    // Remove the pill from its current position and append it as the last child of <a>
    pill.remove();
    a.appendChild(pill);
  }
});

(function replaceIcons() {
  // For Activity
  document.querySelector("li[id='/evm/activity'] > a > svg").style =
    "background: none !important;";
  document.querySelector("li[id='/evm/activity'] > a > svg").innerHTML =
    '<path d="M1.30664 7.98724H5.14921L6.54179 10.7467L9.43015 5.2536L10.797 7.98724H14.6911" stroke="currentColor" stroke-linecap="square"></path>';

  // For Token Balances (EVM)
  document.querySelector("li[id='/evm/balances'] > a > svg").style =
    "background: none !important;";
  document.querySelector("li[id='/evm/balances'] > a > svg").innerHTML =
    '<path d="M9.20945 8.01657C10.4877 8.01657 11.5239 6.98037 11.5239 5.70216C11.5239 4.42395 10.4877 3.38776 9.20945 3.38776L5.27612 3.38779V8.0166L9.20945 8.01657Z" stroke="currentColor"></path><path d="M7.1786 3.3877H3.73145" stroke="currentColor" stroke-linecap="square"></path><path d="M7.1786 12.6455H3.73145" stroke="currentColor" stroke-linecap="square"></path><path d="M9.94914 12.6457C11.2274 12.6457 12.2635 11.6095 12.2635 10.3313C12.2635 9.05304 11.2274 8.01685 9.94914 8.01685H5.27612V12.6457H9.94914Z" stroke="currentColor"></path><path d="M6.05688 1.77863V3.3396" stroke="currentColor" stroke-linecap="square"></path><path d="M9.16309 1.77863V3.3396" stroke="currentColor" stroke-linecap="square"></path><path d="M6.05688 12.6456V14.2222" stroke="currentColor" stroke-linecap="square"></path><path d="M9.16309 12.6455V14.2221" stroke="currentColor" stroke-linecap="square"></path>';

    document.querySelector("li[id='/svm/balances'] > a > svg").style =
    "background: none !important;";
  document.querySelector("li[id='/svm/balances'] > a > svg").innerHTML =
    '<path d="M9.20945 8.01657C10.4877 8.01657 11.5239 6.98037 11.5239 5.70216C11.5239 4.42395 10.4877 3.38776 9.20945 3.38776L5.27612 3.38779V8.0166L9.20945 8.01657Z" stroke="currentColor"></path><path d="M7.1786 3.3877H3.73145" stroke="currentColor" stroke-linecap="square"></path><path d="M7.1786 12.6455H3.73145" stroke="currentColor" stroke-linecap="square"></path><path d="M9.94914 12.6457C11.2274 12.6457 12.2635 11.6095 12.2635 10.3313C12.2635 9.05304 11.2274 8.01685 9.94914 8.01685H5.27612V12.6457H9.94914Z" stroke="currentColor"></path><path d="M6.05688 1.77863V3.3396" stroke="currentColor" stroke-linecap="square"></path><path d="M9.16309 1.77863V3.3396" stroke="currentColor" stroke-linecap="square"></path><path d="M6.05688 12.6456V14.2222" stroke="currentColor" stroke-linecap="square"></path><path d="M9.16309 12.6455V14.2221" stroke="currentColor" stroke-linecap="square"></path>';

  // For Token Data
  document.querySelector("li[id='/evm/tokens'] > a > svg").style =
    "background: none !important;";
  document.querySelector("li[id='/evm/tokens'] > a > svg").innerHTML =
    '<circle cx="10.2307" cy="10.749" r="2.04108" stroke="currentColor"></circle><path d="M13.6334 13.9085L11.7822 12.0574" stroke="currentColor" stroke-linecap="square"></path><path d="M7.09657 2.72034L9.43914 6.53684H4.754L7.09657 2.72034Z" stroke="currentColor"></path><rect x="2.1355" y="8.70831" width="4.08216" height="4.08216" stroke="currentColor"></rect>';

  // For Supported Chains (Matches your example)
  document.querySelector("li[id='/evm/balances-chains'] > a > svg").style =
    "background: none !important;";
  document.querySelector("li[id='/evm/balances-chains'] > a > svg").innerHTML =
    '<rect x="2.4375" y="9.22546" width="3.7079" height="4.5634" stroke="currentColor"></rect><rect x="9.85278" y="2.76648" width="3.7079" height="11.0225" stroke="currentColor"></rect><rect x="6.14551" y="7.35376" width="3.7079" height="6.43558" stroke="currentColor"></rect>';

  // For Transaction History (EVM)
  document.querySelector("li[id='/evm/transactions'] > a > svg").style =
    "background: none !important;";
  document.querySelector("li[id='/evm/transactions'] > a > svg").innerHTML =
    '<path d="M10.7178 13.9106L13.8047 10.8237L10.7178 7.73684" stroke="currentColor" stroke-linecap="square"></path><path d="M13.8047 10.8237L1.45718 10.8237" stroke="currentColor"></path><path d="M5.28001 2.08932L2.19312 5.17621L5.28001 8.2631" stroke="currentColor" stroke-linecap="square"></path><path d="M2.19312 5.17621L14.5406 5.17621" stroke="currentColor"></path>';

    // For Transaction History (SVM)
  document.querySelector("li[id='/svm/transactions'] > a > svg").style =
  "background: none !important;";
document.querySelector("li[id='/svm/transactions'] > a > svg").innerHTML =
  '<path d="M10.7178 13.9106L13.8047 10.8237L10.7178 7.73684" stroke="currentColor" stroke-linecap="square"></path><path d="M13.8047 10.8237L1.45718 10.8237" stroke="currentColor"></path><path d="M5.28001 2.08932L2.19312 5.17621L5.28001 8.2631" stroke="currentColor" stroke-linecap="square"></path><path d="M2.19312 5.17621L14.5406 5.17621" stroke="currentColor"></path>';

})();
