# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\articles-api.spec.js >> Kiểm tra Article API >> ArticleAPI-TC10: Cập nhật bài viết khi bỏ trống body
- Location: automation\tests\api\articles-api.spec.js:71:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 422
Received: 200
```

# Test source

```ts
  1   | import { test, expect } from '../../fixture/login-api.js';
  2   | import { ArticlesAPI } from '../../pages/api/articles-api.js';
  3   | import { ArticlesData, InvalidArticlesDataAPI, NegativeArticles, ArticlesDataUpdate, InvalidArticlesDataAPIUpdate, NegativeArticlesDataUpdate } from '../../data/articles.data.js';
  4   | 
  5   | test.describe('Kiểm tra Article API', () => {
  6   |     let articlesAPI;
  7   | 
  8   |     test.beforeEach(async ({ request }) => {
  9   |         articlesAPI = new ArticlesAPI(request);
  10  |     });
  11  | 
  12  |     test('ArticleAPI-TC01: Tạo Article thành công', async ({ userToken }) => {
  13  |         const data = ArticlesData();
  14  |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  15  |         expect(res.status()).toBe(201);
  16  |         const body = await res.json();
  17  |         expect(body.article.slug).toBe(body.article.slug);
  18  |         expect(body.article.title).toBe(data.article.title);
  19  |         expect(body.article.description).toBe(data.article.description);
  20  |         expect(body.article.body).toBe(data.article.body);
  21  |     });
  22  | 
  23  |     for (let data of InvalidArticlesDataAPI()) {
  24  |         test(`${data.case}`, async ({ userToken }) => {
  25  |             const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  26  |             expect(res.status()).toBe(422);
  27  |         });
  28  |     }
  29  | 
  30  |     test('ArticleAPI-TC05: Tạo Articles có title trùng lặp', async ({ userToken }) => {
  31  |         const data = NegativeArticles();
  32  |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  33  |         expect(res.status()).toBe(422);
  34  |     });
  35  | 
  36  |     test('ArticleAPI-TC06: Xóa Article thành công', async ({ userToken }) => {
  37  |         const data = ArticlesData();
  38  |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  39  |         const body = await res.json();
  40  |         expect(body.article.slug).toBe(body.article.slug);
  41  |         expect(body.article.title).toBe(data.article.title);
  42  |         expect(body.article.description).toBe(data.article.description);
  43  |         expect(body.article.body).toBe(data.article.body);
  44  | 
  45  |         const deleteRes = await articlesAPI.delete(userToken, body.article.slug);
  46  |         expect(deleteRes.status()).toBe(200);
  47  |         const bodyDelete = await deleteRes.json();
  48  |         expect(bodyDelete.message.body).toContain('Article deleted successfully');
  49  | 
  50  |     })
  51  | 
  52  |     test('ArticleAPI-TC07: Cập nhật Article thành công', async ({ userToken }) => {
  53  |         const data = ArticlesData();
  54  |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  55  |         const body = await res.json();
  56  |         expect(body.article.slug).toBe(body.article.slug);
  57  |         expect(body.article.title).toBe(data.article.title);
  58  |         expect(body.article.description).toBe(data.article.description);
  59  |         expect(body.article.body).toBe(data.article.body);
  60  | 
  61  |         const dataUpdate = ArticlesDataUpdate();
  62  |         const updateRes = await articlesAPI.update(userToken, body.article.slug, dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
  63  |         expect(updateRes.status()).toBe(200);
  64  |         const bodyUpdate = await updateRes.json();
  65  |         expect(bodyUpdate.article.title).toBe(dataUpdate.article.title);
  66  |         expect(bodyUpdate.article.description).toBe(dataUpdate.article.description);
  67  |         expect(bodyUpdate.article.body).toBe(dataUpdate.article.body);
  68  |     })
  69  | 
  70  |     for (let Invaliddata of InvalidArticlesDataAPIUpdate()) {
  71  |         test(`${Invaliddata.case}`, async ({ userToken }) => {
  72  |             const data = ArticlesData();
  73  |             const resCreate = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  74  |             const body = await resCreate.json();
  75  |             const resUpdate = await articlesAPI.update(userToken, body.article.slug, Invaliddata.article.title, Invaliddata.article.description, Invaliddata.article.body, Invaliddata.article.tagList);
> 76  |             expect(resUpdate.status()).toBe(422);
      |                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  77  |         });
  78  |     }
  79  | 
  80  |     test('ArticleAPI-TC11: Cập nhật Articles có title trùng lặp', async ({ userToken }) => {
  81  |         const data = ArticlesData();
  82  |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  83  |         const body = await res.json();
  84  |         const dataUpdate = NegativeArticlesDataUpdate();
  85  |         const resUpdate = await articlesAPI.update(userToken, body.article.slug, dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
  86  |         expect(resUpdate.status()).toBe(422);
  87  |     });
  88  | 
  89  |     test('ArticleAPI-TC13: Kiểm tra lại Article đã post có tồn tại không', async ({ userToken }) => {
  90  |         const data = ArticlesData();
  91  |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  92  |         const body = await res.json();
  93  |         expect(body.article.slug).toBe(body.article.slug);
  94  |         expect(body.article.title).toBe(data.article.title);
  95  |         expect(body.article.description).toBe(data.article.description);
  96  |         expect(body.article.body).toBe(data.article.body);
  97  | 
  98  |         const resSlug = await articlesAPI.getArticle(userToken, body.article.slug);
  99  |         expect(resSlug.status()).toBe(200);
  100 |         const bodySlug = await resSlug.json();
  101 |         expect(bodySlug.article.slug).toBe(body.article.slug);
  102 |         expect(bodySlug.article.title).toBe(data.article.title);
  103 |         expect(bodySlug.article.description).toBe(data.article.description);
  104 |         expect(bodySlug.article.body).toBe(data.article.body);
  105 |     });
  106 | 
  107 |     test('ArticleAPI-TC14: Tạo một post Article mới và comment vào đó', async ({ userToken }) => {
  108 |         const data = ArticlesData();
  109 |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  110 |         expect(res.status()).toBe(201);
  111 |         const body = await res.json();
  112 |         expect(body.article.slug).toBe(body.article.slug);
  113 |         expect(body.article.title).toBe(data.article.title);
  114 |         expect(body.article.description).toBe(data.article.description);
  115 |         expect(body.article.body).toBe(data.article.body);
  116 | 
  117 |         const article = body.article;
  118 |         const commentRes = await articlesAPI.postComment(userToken, article.slug, 'Test comment');
  119 |         expect(commentRes.status()).toBe(201);
  120 |         const bodyComment = await commentRes.json();
  121 |         expect(bodyComment.comment.body).toContain('Test comment')
  122 |     });
  123 | 
  124 |     test('ArticleAPI-TC15: Tạo một post Article mới và đưa nó vào favorites', async ({ userToken }) => {
  125 |         const data = ArticlesData();
  126 |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  127 |         expect(res.status()).toBe(201);
  128 |         const body = await res.json();
  129 |         expect(body.article.slug).toBe(body.article.slug);
  130 |         expect(body.article.title).toBe(data.article.title);
  131 |         expect(body.article.description).toBe(data.article.description);
  132 |         expect(body.article.body).toBe(data.article.body);
  133 | 
  134 |         const article = body.article;
  135 |         const favoriteRes = await articlesAPI.favorite(userToken, article.slug);
  136 |         expect(favoriteRes.status()).toBe(200);
  137 |         const bodyFavorites = await favoriteRes.json();
  138 |         expect(bodyFavorites.article.favorited).toBe(true);
  139 |         expect(bodyFavorites.article.favoritesCount).toBeGreaterThan(0);
  140 |     });
  141 | 
  142 |     test('ArticleAPI-TC16: Tạo một post Article mới và đưa nó vào favorites rồi unfavorite', async ({ userToken }) => {
  143 |         const data = ArticlesData();
  144 |         const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
  145 |         expect(res.status()).toBe(201);
  146 |         const body = await res.json();
  147 |         expect(body.article.slug).toBe(body.article.slug);
  148 |         expect(body.article.title).toBe(data.article.title);
  149 |         expect(body.article.description).toBe(data.article.description);
  150 |         expect(body.article.body).toBe(data.article.body);
  151 | 
  152 |         const article = body.article;
  153 |         const favoriteRes = await articlesAPI.favorite(userToken, article.slug);
  154 |         expect(favoriteRes.status()).toBe(200);
  155 |         const bodyFavorites = await favoriteRes.json();
  156 |         expect(bodyFavorites.article.favorited).toBe(true);
  157 |         expect(bodyFavorites.article.favoritesCount).toBeGreaterThan(0);
  158 | 
  159 |         const unFavoriteRes = await articlesAPI.unFavorite(userToken, article.slug);
  160 |         expect(unFavoriteRes.status()).toBe(200);
  161 |         const bodyUnFavorites = await unFavoriteRes.json();
  162 |         expect(bodyUnFavorites.article.favorited).toBe(false);
  163 |         expect(bodyUnFavorites.article.favoritesCount).toBe(0);
  164 |     });
  165 | });
```