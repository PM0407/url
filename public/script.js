document.getElementById("shortenForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const originalUrl = document.getElementById("originalUrl").value;
  
    try {
      const response = await fetch("/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }
  
      const data = await response.json();
      const shortUrl = data.shortUrl;
  
      // Display the result
      document.getElementById("result").classList.remove("hidden");
      const shortUrlElement = document.getElementById("shortUrl");
      shortUrlElement.textContent = shortUrl;
      shortUrlElement.href = shortUrl;
  
      // Enable the copy button
      const copyButton = document.getElementById("copyButton");
      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
          alert("Shortened URL copied to clipboard!");
        });
      });
    } catch (error) {
      alert(error.message);
    }
  });
  