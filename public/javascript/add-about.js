// async function commentFormHandler(event) {
//     event.preventDefault();

//     const comment_text = document
//       .querySelector('textarea[name="comment-body"]')
//       .value.trim();

//     const post_id = window.location.toString().split("/")[
//       window.location.toString().split("/").length - 1
//     ];

//     if (comment_text) {
//       const response = await fetch("/api/comments", {
//         method: "POST",
//         body: JSON.stringify({
//           post_id,
//           comment_text,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         document.location.reload();
//       } else {
//         alert(response.statusText);
//       }
//     }
//   }

//   document
//     .querySelector(".comment-form")
//     .addEventListener("submit", commentFormHandler);

async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector(
    'input[name="post-content"]'
  ).value;

  const response = await fetch(`/api/posts`, {
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
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
