import "./scss/reset.scss";
import "./scss/quote.scss";

const button = document.querySelector("#quoteBtn");
const API_URL = "https://api.quotable.io/random";

const GetRandomQuotes = async (URL: string) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data", data);
  } catch (error) {
    console.error("Failed to fetch quote:", error);
  }
};

button?.addEventListener("click", () => GetRandomQuotes(API_URL));
