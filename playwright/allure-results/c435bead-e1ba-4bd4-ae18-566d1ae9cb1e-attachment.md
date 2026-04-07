# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\article.spec.js >> Kiểm tra chức năng Articles >> ArticleUI-TC15: Thêm bài Article vào yêu thích
- Location: automation\tests\ui\article.spec.js:216:5

# Error details

```
Error: toContainText can be only used with Locator object
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
    - generic [ref=e24]:
      - generic [ref=e25]:
        - list [ref=e27]:
          - listitem [ref=e28]:
            - button "Your Feed" [ref=e29] [cursor=pointer]
          - listitem [ref=e30]:
            - button "Global Feed" [ref=e31]
        - generic [ref=e32]:
          - generic [ref=e33]:
            - link "Tester" [ref=e34] [cursor=pointer]:
              - /url: "#/profile/Tester"
              - img "Tester" [ref=e35]
            - generic [ref=e36]:
              - link "Tester" [ref=e37] [cursor=pointer]:
                - /url: "#/profile/Tester"
              - generic [ref=e38]: April 7, 2026
            - button " ( 1 )" [ref=e39] [cursor=pointer]:
              - generic [ref=e40]: 
              - generic [ref=e41]: ( 1 )
          - link "New Article1775551510548 Description of the new article Read more... new article" [ref=e42] [cursor=pointer]:
            - /url: "#/article/new-article1775551510548"
            - heading "New Article1775551510548" [level=1] [ref=e43]
            - paragraph [ref=e44]: Description of the new article
            - text: Read more...
            - list [ref=e45]:
              - listitem [ref=e46]: new
              - listitem [ref=e47]: article
        - generic [ref=e48]:
          - generic [ref=e49]:
            - link "Tester" [ref=e50] [cursor=pointer]:
              - /url: "#/profile/Tester"
              - img "Tester" [ref=e51]
            - generic [ref=e52]:
              - link "Tester" [ref=e53] [cursor=pointer]:
                - /url: "#/profile/Tester"
              - generic [ref=e54]: April 7, 2026
            - button " ( 1 )" [ref=e55] [cursor=pointer]:
              - generic [ref=e56]: 
              - generic [ref=e57]: ( 1 )
          - link "New Article1775551424404 Description of the new article Read more... new article" [ref=e58] [cursor=pointer]:
            - /url: "#/article/new-article1775551424404"
            - heading "New Article1775551424404" [level=1] [ref=e59]
            - paragraph [ref=e60]: Description of the new article
            - text: Read more...
            - list [ref=e61]:
              - listitem [ref=e62]: new
              - listitem [ref=e63]: article
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Tester" [ref=e66] [cursor=pointer]:
              - /url: "#/profile/Tester"
              - img "Tester" [ref=e67]
            - generic [ref=e68]:
              - link "Tester" [ref=e69] [cursor=pointer]:
                - /url: "#/profile/Tester"
              - generic [ref=e70]: April 7, 2026
            - button " ( 1 )" [ref=e71] [cursor=pointer]:
              - generic [ref=e72]: 
              - generic [ref=e73]: ( 1 )
          - link "New Article1775551392222 Description of the new article Read more... new article" [ref=e74] [cursor=pointer]:
            - /url: "#/article/new-article1775551392222"
            - heading "New Article1775551392222" [level=1] [ref=e75]
            - paragraph [ref=e76]: Description of the new article
            - text: Read more...
            - list [ref=e77]:
              - listitem [ref=e78]: new
              - listitem [ref=e79]: article
        - navigation "Pagination" [ref=e80]:
          - listitem [ref=e81]:
            - button "Previous page" [disabled]:
              - generic: 
          - listitem [ref=e82]:
            - button "Page 1 is your current page" [ref=e83]: "1"
          - listitem [ref=e84]:
            - button "Page 2" [ref=e85]: "2"
          - listitem [ref=e86]:
            - button "Page 3" [ref=e87]: "3"
          - listitem [ref=e88]:
            - button "Jump forward" [ref=e89]: ...
          - listitem [ref=e90]:
            - button "Page 35" [ref=e91]: "35"
          - listitem [ref=e92]:
            - button "Page 36" [ref=e93]: "36"
          - listitem [ref=e94]:
            - button "Page 37" [ref=e95]: "37"
          - listitem [ref=e96]:
            - button "Next page" [ref=e97]:
              - generic [ref=e98]: 
      - complementary [ref=e99]:
        - generic [ref=e100]:
          - heading "Popular Tags" [level=6] [ref=e101]
          - generic [ref=e102]:
            - button "new" [ref=e103] [cursor=pointer]
            - button "article" [ref=e104] [cursor=pointer]
  - contentinfo [ref=e105]:
    - generic [ref=e106]:
      - link "conduit" [ref=e107] [cursor=pointer]:
        - /url: "#/"
      - generic [ref=e108]:
        - text: An interactive learning project from
        - link "Thinkster" [ref=e109] [cursor=pointer]:
          - /url: https://thinkster.io
        - text: . Code & design licensed under MIT.
      - list [ref=e110]:
        - listitem [ref=e111]:
          - link " Source code" [ref=e112] [cursor=pointer]:
            - /url: https://github.com/TonyMckes/conduit-realworld-example-app
            - generic [ref=e113]: 
            - text: Source code
```

# Test source

```ts
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
  222 |         await expect(page).toHaveURL(/#\/article\//);
  223 | 
  224 |         await articlePage.goto();
  225 |         await articlePage.globalFeed();
  226 |         await page.waitForLoadState('load');
  227 |         await expect(articlePage.previewLink).toBeVisible();
  228 |         await articlePage.addFavorite(data.article.title);
> 229 |         await expect(articlePage.favoritecount).toContainText(1);
      |                                                 ^ Error: toContainText can be only used with Locator object
  230 |     });
  231 | });
```