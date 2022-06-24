async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="about-title"]').value;
  const about_content = document.querySelector(
    'input[name="about-content"]'
  ).value;

  const response = await fetch(`/api/about`, {
    method: "POST",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-about-form")
  .addEventListener("submit", newFormHandler);
