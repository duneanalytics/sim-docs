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