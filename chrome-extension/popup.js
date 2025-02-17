document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "GET_ARTICLE"}, function(articleData) {
        if (articleData) {
          checkFactsForArticle(articleData);
        }
      });
    });
  });
  
  async function checkFactsForArticle(articleData) {
    const API_KEY = 'YOUR_GOOGLE_FACT_CHECK_API_KEY';
    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?key={Api_Key}&query=${encodeURIComponent(articleData.title)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayResults(data.claims);
    } catch (error) {
      displayError(error);
    }
  }
  
  function displayResults(claims) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (!claims || claims.length === 0) {
      resultsDiv.innerHTML = `
        <div class="result unknown">
          No fact checks found for this article.
        </div>
      `;
      return;
    }
  
    claims.forEach(claim => {
      const resultDiv = document.createElement('div');
      resultDiv.className = `result ${getResultClass(claim.claimReview[0].textualRating)}`;
      resultDiv.innerHTML = `
        <strong>Claim:</strong> ${claim.text}<br>
        <strong>Rating:</strong> ${claim.claimReview[0].textualRating}<br>
        <strong>By:</strong> ${claim.claimReview[0].publisher.name}
      `;
      resultsDiv.appendChild(resultDiv);
    });
  }
  
  function getResultClass(rating) {
    rating = rating.toLowerCase();
    if (rating.includes('true') || rating.includes('correct')) return 'true';
    if (rating.includes('false') || rating.includes('fake')) return 'false';
    return 'unknown';
  }
  
  function displayError(error) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <div class="result false">
        Error checking facts: ${error.message}
      </div>
    `;
  }
