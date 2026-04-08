import { test, expect } from '../../fixture/login-ui.js';
import { ArticlesPage } from '../../pages/ui/ArticlesPage.js';
import { ArticlesData } from '../../data/articles.data.js';
import { InvalidArticlesDataUI, NegativeArticles, ArticlesDataUpdate, InvalidArticlesDataUpdateUI } from '../../data/articles.data.js';

test.describe('Kiểm tra chức năng Articles', () => {
    let articlePage;

    test.beforeEach(async ({ LoginPage }) => {
        articlePage = new ArticlesPage(LoginPage);
    });

    test('ArticleUI-TC01: Đăng mới Article thành công', async ({ page }) => {
        const newArticle = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(newArticle.article.title, newArticle.article.description, newArticle.article.body, newArticle.article.tagList);
        await articlePage.publish();
        await expect(page).toHaveURL(/#\/article\//);
        const url = page.url();
        const slug = url.split('#/article/')[1];
        await expect(page).toHaveURL(`#/article/${slug}`);

        const res = await page.request.get(`api/articles/${slug}`);
        const body = await res.json();
        expect(body.article.title).toBe(newArticle.article.title);
        expect(body.article.description).toBe(newArticle.article.description);
        expect(body.article.body).toBe(newArticle.article.body);
    });

    for (let data of InvalidArticlesDataUI()) {
        test(`${data.case}`, async ({ page }) => {
            await articlePage.gotoCreateNewArticle();
            await expect(page).toHaveURL('#/editor');
            await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
            await articlePage.publish();


            for (let field of data.article.field) {
                const form = page.locator('form');
                const input = form.locator(`[name="${field.name}"]`);
                const validity = await input.evaluate((el, expected) => el.validity[expected], field.expected);
                expect(validity).toBe(true);
            }

            await expect(articlePage.publishArticleButton).toBeVisible();
            await expect(page).toHaveURL('#/editor');
        });
    }

    test('ArticleUI-TC05: Đăng bài thất bại vì trùng tên title của bài khác', async ({ page }) => {
        const data = NegativeArticles();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');

        await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
        await articlePage.publish();
        await expect(articlePage.errorMessage).toBeVisible();
        await expect(articlePage.publishArticleButton).toBeVisible();
        await expect(page).toHaveURL('#/editor');
    });

    test('ArticleUI-TC06: Xóa bài viết Articles thành công', async ({ page }) => {
        const data = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');

        await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
        await articlePage.publish();
        await expect(page).toHaveURL(/#\/article\//);
        const url = page.url();
        const slug = url.split('#/article/')[1];
        await expect(page).toHaveURL(`#/article/${slug}`);

        await articlePage.deleteArticle();
        await expect(page).toHaveURL('#/');
        const res = await page.request.get(`api/articles/${slug}`);
        expect(res.status()).toBe(404);
    });

    test('ArticleUI-TC07: Update bài viết Artcles thành công', async ({ page }) => {
        const data = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
        await articlePage.publish();
        await expect(page).toHaveURL(/#\/article\//);

        const url = page.url();
        const slug = url.split('#/article/')[1];
        await articlePage.gotoEdit();
        await expect(page).toHaveURL(`#/editor/${slug}`);

        const dataUpdate = ArticlesDataUpdate();
        await articlePage.fillUpdateArticle(dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
        await articlePage.publishUpdate();

        await expect(page).toHaveURL(/#\/article\//);
        const newUrl = page.url();
        const newSlug = newUrl.split('#/article/')[1];
        await expect(page).toHaveURL(`#/article/${newSlug}`);

        const res = await page.request.get(`api/articles/${newSlug}`);
        const body = await res.json();
        expect(body.article.title).toBe(dataUpdate.article.title);
        expect(body.article.description).toBe(dataUpdate.article.description);
        expect(body.article.body).toBe(dataUpdate.article.body);
        await expect(page).toHaveURL(`#/article/${newSlug}`);
    });

    for (let dataUpdate of InvalidArticlesDataUpdateUI()) {
        test(`${dataUpdate.case}`, async ({ page }) => {
            const dataCreate = ArticlesData();
            await articlePage.gotoCreateNewArticle();
            await expect(page).toHaveURL('#/editor');
            await articlePage.fillCreateNewArticle(dataCreate.article.title, dataCreate.article.description, dataCreate.article.body, dataCreate.article.tagList);
            await articlePage.publish();
            await expect(page).toHaveURL(/#\/article\//);
            const url = page.url();
            const slug = url.split('#/article/')[1];
            await articlePage.gotoEdit();
            await expect(page).toHaveURL(`#/editor/${slug}`);

            await articlePage.fillUpdateArticle(dataUpdate.article.title, dataUpdate.article.description, dataUpdate.article.body, dataUpdate.article.tagList);
            await articlePage.publishUpdate();

            for (let field of dataUpdate.article.field) {
                const form = page.locator('form');
                const input = form.locator(`[name="${field.name}"]`);
                const validity = await input.evaluate((el, expected) => el.validity[expected], field.expected);
                expect(validity).toBe(true);
            }

            await expect(page).toHaveURL(`#/editor/${slug}`);
            await expect(articlePage.updateArticlesButton).toBeVisible();

        });
    }

    test('ArticleUI-TC11: Update bài viết thất bại vì trùng tên title của bài khác', async ({ page }) => {
        const ArticleA = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(ArticleA.article.title, ArticleA.article.description, ArticleA.article.body, ArticleA.article.tagList);
        await articlePage.publish();
        await expect(page).toHaveURL(/#\/article\//);
        const urlA = page.url();
        const slugA = urlA.split('#/article/')[1];
        await expect(page).toHaveURL(`#/article/${slugA}`);

        const ArticleB = ArticlesData();
        expect(ArticleA.article.title).not.toBe(ArticleB.article.title);
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(ArticleB.article.title, ArticleB.article.description, ArticleB.article.body, ArticleB.article.tagList);
        await articlePage.publish();
        await expect(page).toHaveURL(/#\/article\//);
        const urlB = page.url();
        const slugB = urlB.split('#/article/')[1];
        await expect(page).toHaveURL(`#/article/${slugB}`);

        await articlePage.gotoEdit();
        await expect(page).toHaveURL(`#/editor/${slugB}`);
        await articlePage.fillUpdateArticle(ArticleA.article.title, ArticleB.article.description, ArticleB.article.body, ArticleB.article.tagList);

        const updateRes = page.waitForResponse(resp =>
            resp.url().includes(`/api/articles/${slugB}`) &&
            ['PUT', 'PATCH'].includes(resp.request().method())
        );
        await articlePage.publishUpdate();
        const updateResponse = await updateRes;
        expect(updateResponse.ok(), 'API phải từ chối cập nhật trùng title').toBeFalsy();

        await expect(page).toHaveURL(`#/editor/${slugB}`);
        await expect(articlePage.updateArticlesButton).toBeVisible();

        const res = await page.request.get(`api/articles/${slugB}`);
        const body = await res.json();
        expect(body.article.title, 'Article title should remain unchanged when updating with duplicate title').toBe(ArticleB.article.title);
        expect(body.article.description).toBe(ArticleB.article.description);
        expect(body.article.body).toBe(ArticleB.article.body);

    });

    test('ArticleUI-TC12: Thêm bình luận vào bài viết Articles thành công', async ({ page }) => {
        const data = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
        await articlePage.publish();

        await articlePage.fillComment('Test Comment');
        await articlePage.postComment();
        await expect(articlePage.commentCard).toHaveText('Test Comment');

    });

    test('ArticleUI-TC13: Xóa bình luận khỏi bài viết Articles thành công', async ({ page }) => {
        const data = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
        await articlePage.publish();

        await articlePage.fillComment('Test Comment');
        await articlePage.postComment();
        await expect(articlePage.commentCard).toHaveText('Test Comment');

        await articlePage.removeComment();
        await expect(articlePage.commentCard).toBeHidden();
    });

    test('ArticleUI-TC14: Thêm bình luận thất bại khi bỏ trống bình luận', async ({ page }) => {
        const data = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
        await articlePage.publish();

        await articlePage.fillComment('');
        await articlePage.postComment();
        await expect(articlePage.commentCard).toBeHidden();
    });

    test('ArticleUI-TC15: Thêm bài Article vào yêu thích', async ({ page }) => {
        const data = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
        await articlePage.publish();
        await expect(page).toHaveURL(/#\/article\//);

        await articlePage.goto();
        await articlePage.globalFeed();
        await page.waitForLoadState('load');
        await expect(articlePage.previewLink.first()).toBeVisible();
        await articlePage.addFavorite(data.article.title);
        await expect(articlePage.unFavoriteButton).toContainText('1');
    });

    test('ArticleUI-TC16: Bỏ yêu thích bài Article', async ({ page }) => {
        const data = ArticlesData();
        await articlePage.gotoCreateNewArticle();
        await expect(page).toHaveURL('#/editor');
        await articlePage.fillCreateNewArticle(data.article.title, data.article.description, data.article.body, data.article.tagList);
        await articlePage.publish();
        await expect(page).toHaveURL(/#\/article\//);

        await articlePage.goto();
        await articlePage.globalFeed();
        await page.waitForLoadState('load');
        await expect(articlePage.previewLink.first()).toBeVisible();
        await articlePage.addFavorite(data.article.title);
        await expect(articlePage.unFavoriteButton).toContainText('1');

        await articlePage.unFavorite(data.article.title);
        await expect(articlePage.favoriteButton).toContainText('0');
    });

    test('ArticleUI-TC17: Xem danh sách Articles trong Global Feed và chuyển trang', async ({ page }) => {
        await articlePage.goto();
        await articlePage.globalFeed();

        await expect(articlePage.previewLink.first()).toBeVisible();

        const seenTitles = new Set();

        while (await articlePage.nextPageButton.isVisible()) {
            const count = await articlePage.previewTitles.count();
            expect(count).toBeGreaterThan(0);
            expect(count, 'Số bài viết trong 1 trang phải nhỏ hơn hoặc bằng 3').toBeLessThanOrEqual(3);

            for (let i = 0; i < count; i++) {
                const title = (await articlePage.previewTitles.nth(i).textContent())?.trim();
                expect(title, 'Mỗi article phải có title').toBeTruthy();
                expect(seenTitles.has(title),`Title bị lặp trong Global Feed: ${title}`).toBeFalsy();
                seenTitles.add(title);
            }

            await articlePage.nextPage();
        }

        const finalCount = await articlePage.previewTitles.count();
        expect(finalCount).toBeGreaterThan(0);
        expect(finalCount, 'Số bài viết trong 1 trang phải nhỏ hơn hoặc bằng 3').toBeLessThanOrEqual(3);

        for (let i = 0; i < finalCount; i++) {
            const title = (await articlePage.previewTitles.nth(i).textContent())?.trim();
            expect(title, 'Mỗi article phải có title').toBeTruthy();
            expect(seenTitles.has(title),`Title bị lặp trong Global Feed: ${title}`).toBeFalsy();
            seenTitles.add(title);
        }
    });
});
