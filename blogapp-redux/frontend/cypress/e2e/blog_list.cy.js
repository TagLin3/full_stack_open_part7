describe("blog list application", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "testUser",
      username: "testUsername",
      password: "testPass",
    });
    cy.visit("http://localhost:5173");
  });
  it("login form displayed by default", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });
  it("can login with correct credentials", function () {
    cy.get("#username").type("testUsername");
    cy.get("#password").type("testPass");
    cy.get("#loginButton").click();
    cy.contains("blogs");
  });
  it("can't login with incorrect credentials", function () {
    cy.get("#username").type("testUsername");
    cy.get("#password").type("testPasss");
    cy.get("#loginButton").click();
    cy.contains("wrong username or password");
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "testUsername",
        password: "testPass",
      });
    });
    it("a blog can be created", function () {
      cy.get("#viewBlogFormButton").click();
      cy.get("#title").type("testBlog");
      cy.get("#author").type("testAuthor");
      cy.get("#url").type("testUrl");
      cy.get("#blogCreateButton").click();
      cy.contains("testBlog testAuthor");
    });
    describe("and there are some blogs added", function () {
      beforeEach(function () {
        cy.createBlog({ title: "testBlog1", author: "testAuthor1", url: "testUrl1" });
        cy.createBlog({ title: "testBlog2", author: "testAuthor2", url: "testUrl2" });
        cy.createBlog({ title: "testBlog3", author: "testAuthor3", url: "testUrl3" });
      });
      it("user can like a certain blog", function () {
        cy.contains("testBlog2").contains("view").click();
        cy.contains("testUrl2").contains("like").click();
        cy.contains("testUrl2").contains("likes: 1");
      });
      it("user can delete a certain blog", function () {
        cy.contains("testBlog2").contains("view").click();
        cy.contains("testUrl2").contains("remove").click();
        cy.contains("testBlog2").should("not.exist");
      });
      it("the blogs are ordered by likes", function () {
        cy.contains("testBlog2").contains("view").click();
        cy.contains("testUrl2").contains("like").as("likeButton2");
        cy.get("@likeButton2").click();
        cy.contains("testBlog3").contains("view").click();
        cy.contains("testUrl3").contains("like").as("likeButton3");
        cy.get("@likeButton3").click();
        cy.get("@likeButton3").click();
        cy.get(".blog").eq(0).should("contain", "testBlog3");
        cy.get(".blog").eq(1).should("contain", "testBlog2");
        cy.get(".blog").eq(2).should("contain", "testBlog1");
      });
      describe("and a different user is then logged in", function () {
        beforeEach(function () {
          cy.request("POST", "http://localhost:3001/api/users", {
            name: "testUser2",
            username: "testUsername2",
            password: "testPass2",
          });
          cy.login({
            username: "testUsername2",
            password: "testPass2",
          });
        });
        it("user can't see the delete button of a blog created by another user", function () {
          cy.contains("testBlog2").contains("view").click();
          cy.contains("testUrl2").contains("remove").should("not.exist");
        });
      });
    });
  });
});
