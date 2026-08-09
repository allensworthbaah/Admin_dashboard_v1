document.addEventListener("DOMContentLoaded", () => {
  const listElement = document.getElementById("starred-list");
  const statusElement = document.getElementById("status");

  if (!listElement) return;

  fetch("events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load events.json");
      }
      return response.json();
    })
    .then((events) => {
      if (!events.length) {
        statusElement.textContent = "No starred repositories found.";
        return;
      }

      listElement.innerHTML = events
        .map(
          (event) => `
          <li class="starred-item">
            <h2>${event.repo}</h2>
            <p>${event.description}</p>
            <time>Starred on ${new Date(event.starred_at).toLocaleDateString()}</time>
          </li>`
        )
        .join("");
    })
    .catch((error) => {
      statusElement.textContent = "Unable to load starred repositories.";
      console.error(error);
    });
});