export function ArticlesData() {
    return {
        article: {
            title: `New Article${Date.now()}`,
            description: "Description of the new article",
            body: "Body of the new article",
            tagList: ["new", "article"]
        }
    }
}

export function InvalidArticlesDataAPI() {
    return [
        {
            case: 'ArticleAPI-TC02: Đăng bài khi bỏ trống title',
            article: {
                title: "",
                description: "Description of the new article",
                body: "Body of the new article",
                tagList: ["new", "article"]
            }
        },
        {
            case: 'ArticleAPI-TC03: Đăng bài khi bỏ trống description',
            article: {
                title: "New Article",
                description: "",
                body: "Body of the new article",
                tagList: ["new", "article"]
            }
        },
        {
            case: 'ArticleAPI-TC04: Đăng bài khi bỏ trống body',
            article: {
                title: "New Article",
                description: "Description of the new article",
                body: "",
                tagList: ["new", "article"]
            }
        }
    ]
}

export function NegativeArticles() {
    return {
        article: {
            title: `Tester 1`,
            description: "Description of the new article",
            body: "Body of the new article",
            tagList: ["newe", "articlea"]
        }
    }
}

export function ArticlesDataUpdate() {
    return {
        article: {
            title: `Update${Date.now()}`,
            description: "Update",
            body: "Update Body",
            tagList: ["Update", "Update data"]
        }
    }
}

export function InvalidArticlesDataAPIUpdate() {
    return [
        {
            case: 'ArticleAPI-TC08: Cập nhật bài viết khi bỏ trống title',
            article: {
                title: "",
                description: "Description of the new article",
                body: "Body of the new article",
                tagList: ["new", "article"]
            }
        },
        {
            case: 'ArticleAPI-TC09: Cập nhật bài viết khi bỏ trống description',
            article: {
                title: "New Article",
                description: "",
                body: "Body of the new article",
                tagList: ["new", "article"]
            }
        },
        {
            case: 'ArticleAPI-TC10: Cập nhật bài viết khi bỏ trống body',
            article: {
                title: "New Article",
                description: "Description of the new article",
                body: "",
                tagList: ["new", "article"]
            }
        }
    ]
}

export function NegativeArticlesDataUpdate() {
    return {
        article: {
            title: `Lorem Ipsum 1`,
            description: "Description of the new article",
            body: "Body of the new article",
            tagList: ["new", "article"]
        }
    }
}

export function InvalidArticlesDataUI() {
    return [
        {
            case: 'ArticleUI-TC02: Đăng bài thất bại khi bỏ trống title',
            article: {
                field: [{ name: 'title', expected: "valueMissing" }],
                title: "",
                description: "Description of the new article",
                body: "Body of the new article",
                tagList: ["new", "article"]
            }
        },
        {
            case: 'ArticleUI-TC03: Đăng bài thất bại khi bỏ trống description',
            article: {
                field: [{ name: 'description', expected: "valueMissing" }],
                title: "New Article",
                description: "",
                body: "Body of the new article",
                tagList: ["new", "article"]
            }
        },
        {
            case: 'ArticleUI-TC04: Đăng bài thất bại khi bỏ trống body',
            article: {
                field: [{ name: 'body', expected: "valueMissing" }],
                title: "New Article",
                description: "Description of the new article",
                body: "",
                tagList: ["new", "article"]
            }
        }
    ]
}

export function InvalidArticlesDataUpdateUI() {
    return [
        {
            case: 'ArticleUI-TC08: Cập nhật bài viết thất bại khi bỏ trống title',
            article: {
                field: [{ name: 'title', expected: "valueMissing" }],
                title: "",
                description: "Description of the new article",
                body: "Body of the new article",
                tagList: ["new", "article"]
            }
        },
        {
            case: 'ArticleUI-TC09: Cập nhật bài viết thất bại khi bỏ trống description',
            article: {
                field: [{ name: 'description', expected: "valueMissing" }],
                title: "New Article",
                description: "",
                body: "Body of the new article",
                tagList: ["new", "article"]
            }
        },
        {
            case: 'ArticleUI-TC10: Cập nhật bài viết thất bại khi bỏ trống body',
            article: {
                field: [{ name: 'body', expected: "valueMissing" }],
                title: "New Article",
                description: "Description of the new article",
                body: "",
                tagList: ["new", "article"]
            }
        }
    ]
}
