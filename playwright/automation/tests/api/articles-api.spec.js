import { test, expect } from '../../fixture/login-api.js';
import { ArticlesAPI } from '../../pages/api/articles-api.js';
import { ArticlesData, InvalidArticlesDataAPI, NegativeArticles, ArticlesDataUpdate, InvalidArticlesDataAPIUpdate, NegativeArticlesDataUpdate } from '../../data/articles.data.js';

test.describe('Kiểm tra Article API', () => {
    let articlesAPI;

    test.beforeEach(async ({ request }) => {
        articlesAPI = new ArticlesAPI(request);
    });

    test('ArticleAPI-TC01: Tạo Article thành công', async ({ userToken }) => {
        const data = ArticlesData();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.article.slug).toBe(body.article.slug);
        expect(body.article.title).toBe(data.article.title);
        expect(body.article.description).toBe(data.article.description);
        expect(body.article.body).toBe(data.article.body);
    });

    for (let data of InvalidArticlesDataAPI()) {
        test(`${data.case}`, async ({ userToken }) => {
            const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
            expect(res.status()).toBe(422);
        });
    }

    test('ArticleAPI-TC05: Tạo Articles có title trùng lặp', async ({ userToken }) => {
        const data = NegativeArticles();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        expect(res.status()).toBe(422);
    });

    test('ArticleAPI-TC06: Xóa Article thành công', async ({ userToken }) => {
        const data = ArticlesData();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        const body = await res.json();
        expect(body.article.slug).toBe(body.article.slug);
        expect(body.article.title).toBe(data.article.title);
        expect(body.article.description).toBe(data.article.description);
        expect(body.article.body).toBe(data.article.body);

        const deleteRes = await articlesAPI.delete(userToken, body.article.slug);
        expect(deleteRes.status()).toBe(200);
        const bodyDelete = await deleteRes.json();
        expect(bodyDelete.message.body).toContain('Article deleted successfully');

    })

    test('ArticleAPI-TC07: Cập nhật Article thành công', async ({ userToken }) => {
        const data = ArticlesData();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        const body = await res.json();
        expect(body.article.slug).toBe(body.article.slug);
        expect(body.article.title).toBe(data.article.title);
        expect(body.article.description).toBe(data.article.description);
        expect(body.article.body).toBe(data.article.body);

        const dataUpdate = ArticlesDataUpdate();
        const updateRes = await articlesAPI.update(userToken, body.article.slug, dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
        expect(updateRes.status()).toBe(200);
        const bodyUpdate = await updateRes.json();
        expect(bodyUpdate.article.title).toBe(dataUpdate.article.title);
        expect(bodyUpdate.article.description).toBe(dataUpdate.article.description);
        expect(bodyUpdate.article.body).toBe(dataUpdate.article.body);
    })

    for (let Invaliddata of InvalidArticlesDataAPIUpdate()) {
        test(`${Invaliddata.case}`, async ({ userToken }) => {
            const data = ArticlesData();
            const resCreate = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
            const body = await resCreate.json();
            const resUpdate = await articlesAPI.update(userToken, body.article.slug, Invaliddata.article.title, Invaliddata.article.description, Invaliddata.article.body, Invaliddata.article.tagList);
            expect(resUpdate.status()).toBe(422);
        });
    }

    test('ArticleAPI-TC11: Cập nhật Articles có title trùng lặp', async ({ userToken }) => {
        const data = ArticlesData();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        const body = await res.json();
        const dataUpdate = NegativeArticlesDataUpdate();
        const resUpdate = await articlesAPI.update(userToken, body.article.slug, dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
        expect(resUpdate.status()).toBe(422);
    });

    test('ArticleAPI-TC13: Kiểm tra lại Article đã post có tồn tại không', async ({ userToken }) => {
        const data = ArticlesData();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        const body = await res.json();
        expect(body.article.slug).toBe(body.article.slug);
        expect(body.article.title).toBe(data.article.title);
        expect(body.article.description).toBe(data.article.description);
        expect(body.article.body).toBe(data.article.body);

        const resSlug = await articlesAPI.getArticle(userToken, body.article.slug);
        expect(resSlug.status()).toBe(200);
        const bodySlug = await resSlug.json();
        expect(bodySlug.article.slug).toBe(body.article.slug);
        expect(bodySlug.article.title).toBe(data.article.title);
        expect(bodySlug.article.description).toBe(data.article.description);
        expect(bodySlug.article.body).toBe(data.article.body);
    });

    test('ArticleAPI-TC14: Tạo một post Article mới và comment vào đó', async ({ userToken }) => {
        const data = ArticlesData();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.article.slug).toBe(body.article.slug);
        expect(body.article.title).toBe(data.article.title);
        expect(body.article.description).toBe(data.article.description);
        expect(body.article.body).toBe(data.article.body);

        const article = body.article;
        const commentRes = await articlesAPI.postComment(userToken, article.slug, 'Test comment');
        expect(commentRes.status()).toBe(201);
        const bodyComment = await commentRes.json();
        expect(bodyComment.comment.body).toContain('Test comment')
    });

    test('ArticleAPI-TC15: Tạo một post Article mới và đưa nó vào favorites', async ({ userToken }) => {
        const data = ArticlesData();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.article.slug).toBe(body.article.slug);
        expect(body.article.title).toBe(data.article.title);
        expect(body.article.description).toBe(data.article.description);
        expect(body.article.body).toBe(data.article.body);

        const article = body.article;
        const favoriteRes = await articlesAPI.favorite(userToken, article.slug);
        expect(favoriteRes.status()).toBe(200);
        const bodyFavorites = await favoriteRes.json();
        expect(bodyFavorites.article.favorited).toBe(true);
        expect(bodyFavorites.article.favoritesCount).toBeGreaterThan(0);
    });

    test('ArticleAPI-TC16: Tạo một post Article mới và đưa nó vào favorites rồi unfavorite', async ({ userToken }) => {
        const data = ArticlesData();
        const res = await articlesAPI.post(userToken, data.article.title, data.article.description, data.article.body, data.article.tagList);
        expect(res.status()).toBe(201);
        const body = await res.json();
        expect(body.article.slug).toBe(body.article.slug);
        expect(body.article.title).toBe(data.article.title);
        expect(body.article.description).toBe(data.article.description);
        expect(body.article.body).toBe(data.article.body);

        const article = body.article;
        const favoriteRes = await articlesAPI.favorite(userToken, article.slug);
        expect(favoriteRes.status()).toBe(200);
        const bodyFavorites = await favoriteRes.json();
        expect(bodyFavorites.article.favorited).toBe(true);
        expect(bodyFavorites.article.favoritesCount).toBeGreaterThan(0);

        const unFavoriteRes = await articlesAPI.unFavorite(userToken, article.slug);
        expect(unFavoriteRes.status()).toBe(200);
        const bodyUnFavorites = await unFavoriteRes.json();
        expect(bodyUnFavorites.article.favorited).toBe(false);
        expect(bodyUnFavorites.article.favoritesCount).toBe(0);
    });
});