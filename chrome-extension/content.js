chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "GET_ARTICLE") {
      const articleData = {
        title: document.title,
        url: window.location.href,
        content: getArticleContent()
      };
      sendResponse(articleData);
    }
  });
  
  function getArticleContent() {
    // This is a simple implementation - you might want to improve it based on specific news sites
    const article = document.querySelector('article');
    if (article) {
      return article.textContent;
    }
    // Fallback to main content area
    const main = document.querySelector('main');
    if (main) {
      return main.textContent;
    }
    return document.body.textContent;
  }