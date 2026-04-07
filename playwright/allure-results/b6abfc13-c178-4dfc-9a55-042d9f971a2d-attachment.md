# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\article.spec.js >> Kiểm tra chức năng Articles >> ArticleUI-TC11: Update bài viết thất bại vì trùng tên title của bài khác
- Location: automation\tests\ui\article.spec.js:150:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'title')
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
    - group [ref=e27]:
      - group [ref=e28]:
        - textbox "Article Title" [ref=e29]: New Article1775545189153
      - group [ref=e30]:
        - textbox "What's this article about?" [ref=e31]: Description of the new article
      - group [ref=e32]:
        - textbox "Write your article (in markdown)" [ref=e33]: Body of the new article
      - group [ref=e34]:
        - textbox "Enter tags" [ref=e35]: new,article
      - button "Update Article" [active] [ref=e36] [cursor=pointer]
  - contentinfo [ref=e37]:
    - generic [ref=e38]:
      - link "conduit" [ref=e39] [cursor=pointer]:
        - /url: "#/"
      - generic [ref=e40]:
        - text: An interactive learning project from
        - link "Thinkster" [ref=e41] [cursor=pointer]:
          - /url: https://thinkster.io
        - text: . Code & design licensed under MIT.
      - list [ref=e42]:
        - listitem [ref=e43]:
          - link " Source code" [ref=e44] [cursor=pointer]:
            - /url: https://github.com/TonyMckes/conduit-realworld-example-app
            - generic [ref=e45]: 
            - text: Source code
```

# Test source

```ts
  80  |         await articlePage.deleteArticle();
  81  |         await expect(page).toHaveURL('#/');
  82  |         const res = await page.request.get(`api/articles/${slug}`);
  83  |         expect(res.status()).toBe(404);
  84  |         await expect(page).toHaveURL('#/');
  85  |     });
  86  | 
  87  |     test('ArticleUI-TC07: Update bài viết Artcles thành công', async ({ page }) => {
  88  |         const data = ArticlesData();
  89  |         await articlePage.gotoCreateNewArticle();
  90  |         await expect(page).toHaveURL('#/editor');
  91  | 
  92  |         await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
  93  |         await articlePage.publish();
  94  |         await expect(page).toHaveURL(/#\/article\//);
  95  | 
  96  |         const url = page.url();
  97  |         const slug = url.split('#/article/')[1];
  98  |         await articlePage.gotoEdit();
  99  |         await expect(page).toHaveURL(`#/editor/${slug}`);
  100 | 
  101 |         const dataUpdate = ArticlesDataUpdate();
  102 |         await articlePage.fillUpdateArticle(dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
  103 |         await articlePage.publishUpdate();
  104 | 
  105 |         await expect(page).toHaveURL(/#\/article\//);
  106 |         const newUrl = page.url();
  107 |         const newSlug = newUrl.split('#/article/')[1];
  108 |         await expect(page).toHaveURL(`#/article/${newSlug}`);
  109 | 
  110 |         const res = await page.request.get(`api/articles/${newSlug}`);
  111 |         const body = await res.json();
  112 |         expect(body.article.title).toBe(dataUpdate.article.title);
  113 |         expect(body.article.description).toBe(dataUpdate.article.description);
  114 |         expect(body.article.body).toBe(dataUpdate.article.body);
  115 |         await expect(page).toHaveURL(`#/article/${newSlug}`);
  116 |     });
  117 | 
  118 |     for (let dataUpdate of InvalidArticlesDataUpdateUI()) {
  119 |         test(`${dataUpdate.case}`, async ({ page }) => {
  120 | 
  121 |             const dataCreate = ArticlesData();
  122 |             await articlePage.gotoCreateNewArticle();
  123 |             await expect(page).toHaveURL('#/editor');
  124 | 
  125 |             await articlePage.fillCreateNewArticle(dataCreate.article.title, dataCreate.article.description, dataCreate.article.body, dataCreate.article.tagList);
  126 |             await articlePage.publish();
  127 |             await expect(page).toHaveURL(/#\/article\//);
  128 | 
  129 |             const url = page.url();
  130 |             const slug = url.split('#/article/')[1];
  131 |             await articlePage.gotoEdit();
  132 |             await expect(page).toHaveURL(`#/editor/${slug}`);
  133 | 
  134 |             await articlePage.fillUpdateArticle(dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
  135 |             await articlePage.publishUpdate();
  136 | 
  137 |             for (let field of dataUpdate.article.field) {
  138 |                 const form = page.locator('form');
  139 |                 const input = form.locator(`[name="${field.name}"]`);
  140 |                 const validity = await input.evaluate((el, expected) => el.validity[expected], field.expected);
  141 |                 expect(validity).toBe(true);
  142 |             }
  143 | 
  144 |             await expect(page).toHaveURL(`#/editor/${slug}`);
  145 |             await expect(articlePage.updateArticlesButton).toBeVisible();
  146 | 
  147 |         });
  148 |     }
  149 | 
  150 |     test('ArticleUI-TC11: Update bài viết thất bại vì trùng tên title của bài khác', async ({ page }) => {
  151 |         const ArticleA = ArticlesData();
  152 |         await articlePage.gotoCreateNewArticle();
  153 |         await expect(page).toHaveURL('#/editor');
  154 |         await articlePage.fillCreateNewArticle(ArticleA.article.title, ArticleA.article.description, ArticleA.article.body, ArticleA.article.tagList);
  155 |         await articlePage.publish();
  156 |         await expect(page).toHaveURL(/#\/article\//);
  157 |         const urlA = page.url();
  158 |         const slugA = urlA.split('#/article/')[1];
  159 |         await expect(page).toHaveURL(`#/article/${slugA}`);
  160 | 
  161 |         const ArticleB = ArticlesData();
  162 |         await articlePage.gotoCreateNewArticle();
  163 |         await expect(page).toHaveURL('#/editor');
  164 |         await articlePage.fillCreateNewArticle(ArticleB.article.title, ArticleB.article.description, ArticleB.article.body, ArticleB.article.tagList);
  165 |         await articlePage.publish();
  166 |         await expect(page).toHaveURL(/#\/article\//);
  167 |         const urlB = page.url();
  168 |         const slugB = urlB.split('#/article/')[1];
  169 |         await expect(page).toHaveURL(`#/article/${slugB}`);
  170 | 
  171 |         await articlePage.gotoEdit();
  172 |         await expect(page).toHaveURL(`#/editor/${slugB}`);
  173 |         await articlePage.fillUpdateArticle(ArticleA.article.title, ArticleB.article.description, ArticleB.article.body, ArticleB.article.tagList);
  174 |         await articlePage.publishUpdate();
  175 |         await expect(page).toHaveURL(`#/editor/${slugB}`);
  176 |         await expect(articlePage.updateArticlesButton).toBeVisible();
  177 | 
  178 |         const res = await page.request.get(`api/articles/${slugB}`);
  179 |         const body = await res.json();
> 180 |         expect(body.article.title).toBe(ArticleB.article.title);
      |                             ^ TypeError: Cannot read properties of undefined (reading 'title')
  181 |         expect(body.article.description).toBe(ArticleB.article.description);
  182 |         expect(body.article.body).toBe(ArticleB.article.body);
  183 | 
  184 |     });
  185 | 
  186 |     test('ArticleUI-TC12: Thêm bình luận vào bài viết Articles thành công', async ({ page }) => {
  187 |         const data = ArticlesData();
  188 |         await articlePage.gotoCreateNewArticle();
  189 |         await expect(page).toHaveURL('#/editor');
  190 | 
  191 |         await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
  192 |         await articlePage.publish();
  193 | 
  194 |         await articlePage.fillComment('Test Comment');
  195 |         await articlePage.postComment();
  196 |         await expect(articlePage.commentSuccess).toHaveText('Test Comment');
  197 | 
  198 |     });
  199 | });
```