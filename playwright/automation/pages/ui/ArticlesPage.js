export class ArticlesPage {
    constructor(page) {
        this.page = page;

        this.newArticleLink = this.page.getByRole('link', { name: 'New Article' });
        this.titleInput = this.page.getByRole('textbox', { name: 'Article Title' });
        this.descriptionInput = this.page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.bodyInput = this.page.getByRole('textbox', { name: 'Write your article' });
        this.tagInput = this.page.getByRole('textbox', { name: 'Enter tags' });
        this.publishArticleButton = this.page.getByRole('button', { name: 'Publish Article' });
        this.updateArticlesButton = this.page.getByRole('button', { name: 'Update Article' });
        this.errorMessage = this.page.getByText('Title already exists..');
        this.editLink = this.page.getByRole('link', { name: 'Edit Article' }).first();
        this.deleteButton = this.page.getByRole('button', { name: 'Delete Article' }).first();
        this.commentsInput = this.page.getByRole('textbox', { name: 'Write a comment...' });
        this.postCommentButton = this.page.getByRole('button', { name: 'Post Comment' });
        this.removeCommentButton = this.page.locator('.card-footer').locator('.ion-trash-a');
        this.commentCard = this.page.locator('.card').locator('.card-text');
        this.yourFeedButton = this.page.locator('.nav nav-pills outline-active').locator('.nav-link');
        this.globalFeedButton = this.page.getByRole('button', { name: 'Global Feed' });
        this.previewLink = this.page.locator('.article-preview .preview-link');
        this.previewTitles = this.page.locator('.article-preview .preview-link h1');
        this.favoriteButton = this.page.locator('.article-preview').first().locator('button.btn-outline-primary');
        this.unFavoriteButton = this.page.locator('.article-preview').first().locator('button.active');
        this.nextPageButton = this.page.getByRole('button', { name: 'Next page' });
    }

    async nextPage() {
        await this.nextPageButton.click();
    }

    async goto() {
        await this.page.goto('/#/');
    }

    async yourFeed() {
        await this.yourFeedButton.click();
    }

    async globalFeed() {
        await this.globalFeedButton.click({ force: true });
    }

    async addFavorite() {
        await this.favoriteButton.click();
    }

    async unFavorite() {
        await this.unFavoriteButton.click();
    }

    async removeComment() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.removeCommentButton.click();
    }

    async fillComment(comment) {
        await this.commentsInput.fill(comment);
    }

    async postComment() {
        await this.postCommentButton.click();
    }

    async deleteArticle() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.deleteButton.click();
    }

    async gotoCreateNewArticle() {
        this.newArticleLink.click();
    }

    async gotoEdit() {
        this.editLink.click();
    }

    async fillCreateNewArticle(title, description, body, tagList) {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        const tags = Array.isArray(tagList) ? tagList : [tagList];
        await this.tagInput.fill(tags.join(','));
    }

    async fillUpdateArticle(title, description, body, tagList) {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.bodyInput.fill(body);
        const tags = Array.isArray(tagList) ? tagList : [tagList];
        await this.tagInput.fill(tags.join(','));
    }
    async newArticle() {
        return this.page.getByRole('heading', { name: 'title' });
    }

    async publish() {
        await this.publishArticleButton.click();
    }

    async publishUpdate() {
        await this.updateArticlesButton.click();
    }
}
