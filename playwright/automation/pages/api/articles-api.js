export class ArticlesAPI {
    constructor(request) {
        this.request = request;
    }

    async post(token, title, description, body, tagList = []) {
        return await this.request.post('api/articles', {
            headers: {
                'Authorization': `Token ${token}`
            },
            data: {
                article: {
                    title: title,
                    description: description,
                    body: body,
                    tagList: Array.isArray(tagList) ? tagList : [tagList]
                }
            }
        });
    }

    async delete(token, slug) {
        return await this.request.delete(`api/articles/${slug}`, {
            headers: {
                'Authorization': `Token ${token}`
            },
        });
    }

    async update(token, slug, title, description, body, tagList = []) {
        return await this.request.put(`api/articles/${slug}`, {
            headers: {
                'Authorization': `Token ${token}`
            },
            data: {
                article: {
                    title: title,
                    description: description,
                    body: body,
                    tagList: Array.isArray(tagList) ? tagList : [tagList]
                }
            }
        });
    }

    async feed(token) {
        return await this.request.get(`api/articles/feed`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    }

    async getArticle(token, slug) {
        return await this.request.get(`api/articles/${slug}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
    }

    async getAllArticles(token){
        return await this.request.get('api/articles',{
            headers:{
                'Authorization': `Token ${token}`
            }
        });
    }

    async postComment(token, slug, comments){
        return await this.request.post(`api/articles/${slug}/comments`,{
            headers:{
                'Authorization': `Token ${token}`
            },
            data: {
                comment:{
                    body: comments
                }
            }
        });
    }

    async favorite(token, slug){
        return await this.request.post(`api/articles/${slug}/favorite`, {
            headers:{
                'Authorization': `Token ${token}`
            }
        });
    }

    async unFavorite(token, slug){
        return await this.request.delete(`api/articles/${slug}/favorite`, {
            headers:{
                'Authorization': `Token ${token}`
            }
        });
    }
}