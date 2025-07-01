(function loadIBMPlexSans() {
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
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap";
  head.appendChild(fontLink);

  const style = document.createElement("style");
  style.textContent = `
      :root {
        --font-sans: "IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont,
                     "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        --font-mono: "IBM Plex Mono", monospace;
      }
  
      body, #content-area, #sidebar, #navbar {
        font-family: var(--font-sans);
      }
  
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-sans);
        font-weight: 600;
      }
        
      code, kbd, pre, samp {
        font-family: var(--font-mono);
        font-feature-settings: normal;
        font-variation-settings: normal;
        font-size: 1em;
      }
    `;
  head.appendChild(style);
})();