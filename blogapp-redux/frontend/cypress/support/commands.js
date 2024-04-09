Cypress.Commands.add("login", (user) => {
  cy.request("POST", "http://localhost:3001/api/login", user)
    .then((response) => {
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(response.body));
      cy.visit("http://localhost:5173");
    });
});

Cypress.Commands.add("createBlog", (blog) => {
  cy.request({
    url: "http://localhost:3001/api/blogs",
    method: "POST",
    body: blog,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedBlogListUser")).token}`,
    },
  });
  cy.visit("http://localhost:5173");
});
