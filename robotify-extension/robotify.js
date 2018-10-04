var currentTab;

function getHostName(url) {
  var match = url.match(/:\/\/?([^/:]+)/i);
  if (match != null && match.length > 1 && typeof match[1] === 'string' && match[1].length > 0) {
    return match[1];
  }
  else {
      return null;
  }
}

function isSupportedProtocol(urlString) {
  var supportedProtocols = ["https:", "http:"];
  var url = document.createElement('a');
  url.href = urlString;
  return supportedProtocols.indexOf(url.protocol) != -1;
}

browser.browserAction.onClicked.addListener(() => {
  if (isSupportedProtocol(currentTab.url)) {
    var rob_url = "http://" + getHostName(currentTab.url) + "/robots.txt";
    browser.tabs.create({
      url: rob_url
    });
  }
});

function updateActiveTab(tabs) {

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);

  console.log("updateActiveTab() -- " + currentTab.url)

}


browser.tabs.onUpdated.addListener(updateActiveTab);
browser.tabs.onActivated.addListener(updateActiveTab);
browser.windows.onFocusChanged.addListener(updateActiveTab);

updateActiveTab();