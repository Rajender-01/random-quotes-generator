import "./scss/reset.scss";
import "./scss/quote.scss";

const Button = document.querySelector("#quoteBtn");
const Quote = document.querySelector(".quotes__quote");
const Author = document.querySelector(".quotes__author");
const TwitterBtn = document.querySelector(".quotes__twitterbtn");
const FacebookBtn = document.querySelector(".facebookbtn");

const API_URL = "https://api.quotable.io/random";

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

const tweet = () => {
  window.open(
    `https://twitter.com/intent/tweet?text=${Quote?.textContent}`,
    "Tweet Window",
    "width=800 height=600"
  );
};

const facebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&quote=${encodeURIComponent(Quote?.textContent || "")}`,
    "Share on Facebook",
    "width=800,height=600"
  );
};

Button?.addEventListener("click", async () => {
  Button.textContent = "Loading...";
  await GetRandomQuotes(API_URL);
  Button.textContent = "Get Quote";
});

TwitterBtn?.addEventListener("click", tweet);
FacebookBtn?.addEventListener("click", facebook);
