// Importing SCSS files for styling
import "./scss/reset.scss";
import "./scss/quote.scss";

// Selecting elements from the DOM
const Button = document.querySelector("#quoteBtn");
const Quote = document.querySelector(".quotes__quote");
const Author = document.querySelector(".quotes__author");
const TwitterBtn = document.querySelector(".quotes__twitterbtn");
const FacebookBtn = document.querySelector(".facebookbtn");

// API URL for fetching quotes
const API_URL = "https://api.quotable.io/random";

// Function to fetch random quotes
const GetRandomQuotes = async (URL: string) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (Quote && Author) {
      Quote.textContent = data.content ? data.content : "LOADING...";
      Author.textContent = `-- ${data.author ? data.author : "..."}`;
    }
  } catch (error) {
    console.error("Failed to fetch quote:", error);
  }
};

// Function to share quote on Twitter
const tweet = () => {
  window.open(
    `https://twitter.com/intent/tweet?text=${Quote?.textContent}`,
    "Tweet Window",
    "width=800 height=600"
  );
};

// Function to share quote on Facebook
const facebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&quote=${encodeURIComponent(Quote?.textContent || "")}`,
    "Share on Facebook",
    "width=800,height=600"
  );
};

// Event listener for the quote button
Button?.addEventListener("click", async () => {
  Button.textContent = "Loading...";
  await GetRandomQuotes(API_URL);
  Button.textContent = "Get Quote";
});

// Event listeners for Twitter and Facebook buttons
TwitterBtn?.addEventListener("click", tweet);
FacebookBtn?.addEventListener("click", facebook);
