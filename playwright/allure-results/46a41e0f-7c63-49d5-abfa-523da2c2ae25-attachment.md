# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\article.spec.js >> Kiểm tra chức năng Articles >> ArticleUI-TC15: Thêm bài Article vào yêu thích
- Location: automation\tests\ui\article.spec.js:216:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.nav nav-pills outline-active').locator('.nav-link')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.nav nav-pills outline-active').locator('.nav-link')

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
        - heading "New Article1775549768251" [level=1] [ref=e25]
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
              - /url: "#/editor/new-article1775549768251"
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
              - /url: "#/editor/new-article1775549768251"
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
  124 |             await articlePage.fillUpdateArticle(dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
  125 |             await articlePage.publishUpdate();
  126 | 
  127 |             for (let field of dataUpdate.article.field) {
  128 |                 const form = page.locator('form');
  129 |                 const input = form.locator(`[name="${field.name}"]`);
  130 |                 const validity = await input.evaluate((el, expected) => el.validity[expected], field.expected);
  131 |                 expect(validity).toBe(true);
  132 |             }
  133 | 
  134 |             await expect(page).toHaveURL(`#/editor/${slug}`);
  135 |             await expect(articlePage.updateArticlesButton).toBeVisible();
  136 | 
  137 |         });
  138 |     }
  139 | 
  140 |     test('ArticleUI-TC11: Update bài viết thất bại vì trùng tên title của bài khác', async ({ page }) => {
  141 |         const ArticleA = ArticlesData();
  142 |         await articlePage.gotoCreateNewArticle();
  143 |         await expect(page).toHaveURL('#/editor');
  144 |         await articlePage.fillCreateNewArticle(ArticleA.article.title, ArticleA.article.description, ArticleA.article.body, ArticleA.article.tagList);
  145 |         await articlePage.publish();
  146 |         await expect(page).toHaveURL(/#\/article\//);
  147 |         const urlA = page.url();
  148 |         const slugA = urlA.split('#/article/')[1];
  149 |         await expect(page).toHaveURL(`#/article/${slugA}`);
  150 | 
  151 |         const ArticleB = ArticlesData();
  152 |         await articlePage.gotoCreateNewArticle();
  153 |         await expect(page).toHaveURL('#/editor');
  154 |         await articlePage.fillCreateNewArticle(ArticleB.article.title, ArticleB.article.description, ArticleB.article.body, ArticleB.article.tagList);
  155 |         await articlePage.publish();
  156 |         await expect(page).toHaveURL(/#\/article\//);
  157 |         const urlB = page.url();
  158 |         const slugB = urlB.split('#/article/')[1];
  159 |         await expect(page).toHaveURL(`#/article/${slugB}`);
  160 | 
  161 |         await articlePage.gotoEdit();
  162 |         await expect(page).toHaveURL(`#/editor/${slugB}`);
  163 |         await articlePage.fillUpdateArticle(ArticleA.article.title, ArticleB.article.description, ArticleB.article.body, ArticleB.article.tagList);
  164 |         await articlePage.publishUpdate();
  165 |         await expect(page).toHaveURL(`#/editor/${slugB}`);
  166 |         await expect(articlePage.updateArticlesButton).toBeVisible();
  167 | 
  168 |         const res = await page.request.get(`api/articles/${slugB}`);
  169 |         const body = await res.json();
  170 |         expect(body.article.title).toBe(ArticleB.article.title);
  171 |         expect(body.article.description).toBe(ArticleB.article.description);
  172 |         expect(body.article.body).toBe(ArticleB.article.body);
  173 | 
  174 |     });
  175 | 
  176 |     test('ArticleUI-TC12: Thêm bình luận vào bài viết Articles thành công', async ({ page }) => {
  177 |         const data = ArticlesData();
  178 |         await articlePage.gotoCreateNewArticle();
  179 |         await expect(page).toHaveURL('#/editor');
  180 |         await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
  181 |         await articlePage.publish();
  182 | 
  183 |         await articlePage.fillComment('Test Comment');
  184 |         await articlePage.postComment();
  185 |         await expect(articlePage.commentSuccess).toHaveText('Test Comment');
  186 | 
  187 |     });
  188 | 
  189 |     test('ArticleUI-TC13: Xóa bình luận khỏi bài viết Articles thành công', async ({ page }) => {
  190 |         const data = ArticlesData();
  191 |         await articlePage.gotoCreateNewArticle();
  192 |         await expect(page).toHaveURL('#/editor');
  193 |         await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
  194 |         await articlePage.publish();
  195 | 
  196 |         await articlePage.fillComment('Test Comment');
  197 |         await articlePage.postComment();
  198 |         await expect(articlePage.commentCard).toHaveText('Test Comment');
  199 | 
  200 |         await articlePage.removeComment();
  201 |         await expect(articlePage.commentCard).toBeHidden();
  202 |     });
  203 | 
  204 |     test('ArticleUI-TC14: Thêm bình luận thất bại khi bỏ trống bình luận', async ({ page }) => {
  205 |         const data = ArticlesData();
  206 |         await articlePage.gotoCreateNewArticle();
  207 |         await expect(page).toHaveURL('#/editor');
  208 |         await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
  209 |         await articlePage.publish();
  210 | 
  211 |         await articlePage.fillComment('');
  212 |         await articlePage.postComment();
  213 |         await expect(articlePage.commentCard).toBeHidden();
  214 |     });
  215 | 
  216 |     test('ArticleUI-TC15: Thêm bài Article vào yêu thích', async ({ page }) => {
  217 |         const data = ArticlesData();
  218 |         await articlePage.gotoCreateNewArticle();
  219 |         await expect(page).toHaveURL('#/editor');
  220 |         await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
  221 |         await articlePage.publish();
  222 | 
  223 |         await articlePage.goto();
> 224 |         await expect(articlePage.yourFeedButton).toBeVisible();
      |                                                  ^ Error: expect(locator).toBeVisible() failed
  225 |         await articlePage.globalFeed();
  226 |     });
  227 | });
```