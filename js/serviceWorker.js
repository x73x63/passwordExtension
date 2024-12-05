// chrome.browserAction.onClicked.addListener((tab) => {
//    chrome.tabs.create({'url': chrome.extension.getURL('options.html'), 'selected': true});
// });

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

let a = getCurrentTab();
a.then((res) => console.log(res));

chrome.runtime.onMessage.addListener();