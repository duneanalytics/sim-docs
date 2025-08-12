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

(function hideDefaultGrayLabels() {
  // We include default values in OpenAPI endpoints. Hide the "default:" label on the API page; it should only appear in the playground.
  const classSelector = '.text-gray-400.dark\\:text-gray-500';

  function elementHasExactDefaultText(element) {
    return typeof element.textContent === 'string' && element.textContent.trim() === 'default:';
  }

  function hideMatchingElementsInTree(rootNode) {
    if (!rootNode) return;

    const elementsToCheck = [];

    if (rootNode.nodeType === 1 && rootNode.matches && rootNode.matches(classSelector)) {
      elementsToCheck.push(rootNode);
    }

    if (rootNode.querySelectorAll) {
      elementsToCheck.push(...rootNode.querySelectorAll(classSelector));
    }

    elementsToCheck.forEach((element) => {
      if (elementHasExactDefaultText(element)) {
        const parent = element.parentElement;
        if (parent) {
          parent.style.display = 'none';
        }
      }
    });
  }

  function runInitialHide() {
    hideMatchingElementsInTree(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInitialHide);
  } else {
    runInitialHide();
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode && addedNode.nodeType === 1) {
          hideMatchingElementsInTree(addedNode);
        }
      });
    });
  });

  function startObserving() {
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserving);
  } else {
    startObserving();
  }
})();