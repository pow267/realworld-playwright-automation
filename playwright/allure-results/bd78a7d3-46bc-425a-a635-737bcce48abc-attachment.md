# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\article.spec.js >> Kiểm tra chức năng Articles >> ArticleUI-TC15: Thêm bài Article vào yêu thích
- Location: automation\tests\ui\article.spec.js:216:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.btn btn-sm btn-outline-primary pull-xs-right')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - navigation [ref=e4]:
      - generic [ref=e5]:
        - link "conduit" [ref=e6] [cursor=pointer]:
          - /url: "#/"
        - list [ref=e7]:
          - listitem [ref=e8]:
            - link " Source code" [ref=e9] [cursor=pointer]:
              - /url: https://github.com/TonyMckes/conduit-realworld-example-app
              - generic [ref=e10]: 
              - text: Source code
        - list [ref=e11]:
          - listitem [ref=e12]:
            - link " Home" [ref=e13] [cursor=pointer]:
              - /url: "#/"
              - generic [ref=e14]: 
              - text: Home
          - listitem [ref=e15]:
            - link " New Article" [ref=e16] [cursor=pointer]:
              - /url: "#/editor"
              - generic [ref=e17]: 
              - text: New Article
          - listitem [ref=e18]:
            - generic [ref=e19] [cursor=pointer]:
              - img "Tester" [ref=e20]
              - text: Tester
            - text:   
  - main [ref=e21]:
    - generic [ref=e22]:
      - generic [ref=e24]:
        - heading "New Article1775550152828" [level=1] [ref=e25]
        - generic [ref=e26]:
          - link "Tester" [ref=e27] [cursor=pointer]:
            - /url: "#/profile/Tester"
            - img "Tester" [ref=e28]
          - generic [ref=e29]:
            - link "Tester" [ref=e30] [cursor=pointer]:
              - /url: "#/profile/Tester"
            - generic [ref=e31]: April 7, 2026
          - button " Delete Article" [ref=e32] [cursor=pointer]:
            - generic [ref=e33]: 
            - text: Delete Article
          - button " Edit Article" [ref=e34] [cursor=pointer]:
            - link " Edit Article" [ref=e35]:
              - /url: "#/editor/new-article1775550152828"
              - generic [ref=e36]: 
              - text: Edit Article
      - generic [ref=e37]:
        - generic [ref=e39]:
          - paragraph [ref=e40]: Body of the new article
          - list [ref=e41]:
            - listitem [ref=e42]: new
            - listitem [ref=e43]: article
        - separator [ref=e44]
        - generic [ref=e46]:
          - link "Tester" [ref=e47] [cursor=pointer]:
            - /url: "#/profile/Tester"
            - img "Tester" [ref=e48]
          - generic [ref=e49]:
            - link "Tester" [ref=e50] [cursor=pointer]:
              - /url: "#/profile/Tester"
            - generic [ref=e51]: April 7, 2026
          - button " Delete Article" [ref=e52] [cursor=pointer]:
            - generic [ref=e53]: 
            - text: Delete Article
          - button " Edit Article" [ref=e54] [cursor=pointer]:
            - link " Edit Article" [ref=e55]:
              - /url: "#/editor/new-article1775550152828"
              - generic [ref=e56]: 
              - text: Edit Article
        - generic [ref=e58]:
          - generic [ref=e59]:
            - textbox "Write a comment..." [ref=e61]
            - generic [ref=e62]:
              - img "Tester" [ref=e63]
              - button "Post Comment" [ref=e64] [cursor=pointer]
          - generic [ref=e65]: There are no comments yet...
  - contentinfo [ref=e66]:
    - generic [ref=e67]:
      - link "conduit" [ref=e68] [cursor=pointer]:
        - /url: "#/"
      - generic [ref=e69]:
        - text: An interactive learning project from
        - link "Thinkster" [ref=e70] [cursor=pointer]:
          - /url: https://thinkster.io
        - text: . Code & design licensed under MIT.
      - list [ref=e71]:
        - listitem [ref=e72]:
          - link " Source code" [ref=e73] [cursor=pointer]:
            - /url: https://github.com/TonyMckes/conduit-realworld-example-app
            - generic [ref=e74]: 
            - text: Source code
```

# Test source

```ts
  1  | import { title } from "node:process";
  2  | 
  3  | export class ArticlesPage {
  4  |     constructor(page) {
  5  |         this.page = page;
  6  | 
  7  |         this.newArticleLink = this.page.getByRole('link', { name: 'New Article' });
  8  |         this.titleInput = this.page.getByRole('textbox', { name: 'Article Title' });
  9  |         this.descriptionInput = this.page.getByRole('textbox', { name: 'What\'s this article about?' });
  10 |         this.bodyInput = this.page.getByRole('textbox', { name: 'Write your article' });
  11 |         this.tagInput = this.page.getByRole('textbox', { name: 'Enter tags' });
  12 |         this.publishArticleButton = this.page.getByRole('button', { name: 'Publish Article' });
  13 |         this.updateArticlesButton = this.page.getByRole('button', { name: 'Update Article' });
  14 |         this.errorMessage = this.page.getByText('Title already exists..');
  15 |         this.editLink = this.page.getByRole('link', { name: 'Edit Article' }).first();
  16 |         this.deleteButton = this.page.getByRole('button', { name: 'Delete Article' }).first();
  17 |         this.commentsInput = this.page.getByRole('textbox', { name: 'Write a comment...' });
  18 |         this.postCommentButton = this.page.getByRole('button', { name: 'Post Comment' });
  19 |         this.removeCommentButton = this.page.locator('.card-footer').locator('.ion-trash-a');
  20 |         this.commentCard = this.page.locator('.card').locator('.card-text');
  21 |         this.yourFeedButton = this.page.locator('.nav nav-pills outline-active').locator('.nav-link');
  22 |         this.globalFeedButton = this.page.getByRole('button', { name: 'Global Feed' });
  23 |         this.favoriteButton = this.page.locator('.btn btn-sm btn-outline-primary pull-xs-right');
  24 |         this.unFavoriteButton = this.page.locator('.btn btn-sm btn-outline-primary pull-xs-right active');
  25 |     }
  26 | 
  27 |     async goto() {
  28 |         await this.page.goto('/#/');
  29 |     }
  30 | 
  31 |     async yourFeed() {
  32 |         await this.yourFeedButton.click();
  33 |     }
  34 | 
  35 |     async globalFeed() {
  36 |         await this.globalFeedButton.click({ force: true });
  37 |     }
  38 | 
  39 |     async addFavorite() {
> 40 |         await this.favoriteButton.click();
     |                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  41 |     }
  42 | 
  43 |     async unFavorite() {
  44 |         await this.unFavoriteButton.click();
  45 |     }
  46 | 
  47 |     async removeComment() {
  48 |         this.page.once('dialog', dialog => dialog.accept());
  49 |         await this.removeCommentButton.click();
  50 |     }
  51 | 
  52 |     async fillComment(comment) {
  53 |         await this.commentsInput.fill(comment);
  54 |     }
  55 | 
  56 |     async postComment() {
  57 |         await this.postCommentButton.click();
  58 |     }
  59 | 
  60 |     async deleteArticle() {
  61 |         this.page.once('dialog', dialog => dialog.accept());
  62 |         await this.deleteButton.click();
  63 |     }
  64 | 
  65 |     async gotoCreateNewArticle() {
  66 |         this.newArticleLink.click();
  67 |     }
  68 | 
  69 |     async gotoEdit() {
  70 |         this.editLink.click();
  71 |     }
  72 | 
  73 |     async fillCreateNewArticle(title, description, body, tagList) {
  74 |         await this.titleInput.fill(title);
  75 |         await this.descriptionInput.fill(description);
  76 |         await this.bodyInput.fill(body);
  77 |         const tags = Array.isArray(tagList) ? tagList : [tagList];
  78 |         await this.tagInput.fill(tags.join(','));
  79 |     }
  80 | 
  81 |     async fillUpdateArticle(title, description, body, tagList) {
  82 |         await this.titleInput.fill(title);
  83 |         await this.descriptionInput.fill(description);
  84 |         await this.bodyInput.fill(body);
  85 |         const tags = Array.isArray(tagList) ? tagList : [tagList];
  86 |         await this.tagInput.fill(tags.join(','));
  87 |     }
  88 |     async newArticle() {
  89 |         return this.page.getByRole('heading', { name: 'title' });
  90 |     }
  91 | 
  92 |     async publish() {
  93 |         await this.publishArticleButton.click();
  94 |     }
  95 | 
  96 |     async publishUpdate() {
  97 |         await this.updateArticlesButton.click();
  98 |     }
  99 | }
```