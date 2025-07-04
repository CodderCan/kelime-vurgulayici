const ext = typeof browser !== "undefined" ? browser : chrome;

function kelimeleriVurgula(kelimeler) {
  kelimeler.sort((a, b) => b.kelime.length - a.kelime.length);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach(node => {
    let parent = node.parentNode;

    if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(parent.tagName)) return;
    if (parent.closest('[data-vurgulu="1"]')) return;

    let text = node.nodeValue;
    let degisti = false;

    kelimeler.forEach(({ kelime, renk }) => {
      const regex = new RegExp(`(${kelime})`, 'gi');
      if (regex.test(text)) {
        text = text.replace(regex, `<span data-vurgulu="1" style="background-color: ${renk}; color: white; padding: 2px;">$1</span>`);
        degisti = true;
      }
    });

    if (degisti) {
      const span = document.createElement("span");
      span.innerHTML = text;
      parent.replaceChild(span, node);
    }
  });
}

function izleVeUygula(kelimeler) {
  let timeout = null;
  const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => kelimeleriVurgula(kelimeler), 300);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

ext.storage.local.get({ kelimeler: [] }, (result) => {
  kelimeleriVurgula(result.kelimeler);
  izleVeUygula(result.kelimeler);
});
