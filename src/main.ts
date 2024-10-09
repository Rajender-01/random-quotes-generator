import "./scss/reset.scss";
import "./scss/quote.scss";

const Button = document.querySelector("#quoteBtn");
const Quote = document.querySelector(".quotes__quote");
const Author = document.querySelector(".quotes__author");

const API_URL = "https://api.quotable.io/random";

const GetRandomQuotes = async (URL: string) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (Quote && Author) {
      Quote.textContent = data.content;
      Author.textContent = `-- ${data.author}`;
    }
  } catch (error) {
    console.error("Failed to fetch quote:", error); 
  }
};

Button?.addEventListener("click", () => GetRandomQuotes(API_URL));
