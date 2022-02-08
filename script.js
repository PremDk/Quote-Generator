const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function getNewRandomQuote() {
  toggleLoadingSpinner('show');
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (randomQuote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = randomQuote.text;
  authorText.textContent = randomQuote.author ? randomQuote.author : 'Unknown';
  toggleLoadingSpinner('hide');
}
const toggleLoadingSpinner = (state) => {
  loader.hidden = state === 'show' ? false : true;
  quoteContainer.hidden = state === 'show' ? true : false;
};

async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    toggleLoadingSpinner('show');
    const response = await fetch(apiUrl);

    apiQuotes = await response.json();
    getNewRandomQuote();
  } catch (error) {
    console.error(error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getNewRandomQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
// toggleLoadingSpinner('show');
