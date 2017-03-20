const articleService = require('../service/articleService')
const commentService = require('../service/commentService')

module.exports = {
  getAllArticles(req, res, next) {
    let author = req.query.author
    articleService.getArticles(author)
      .then((articles) => {
        res.render('articles', {
          articles: articles
        })
      })
      .catch(next)
  },

  renderCreateArticlePage(req, res, next) {
    res.render('create')
  },

  createArticle(req, res, next) {
    let author = req.session.user._id
    let title = req.fields.title
    let content = req.fields.content

    // 校验参数
    try {
      if (!title.length) {
        throw new Error('请填写标题')
      }
      if (!content.length) {
        throw new Error('请填写内容')
      }
    } catch (e) {
      req.flash('error', e.message)
      return res.redirect('back')
    }

    let article = {
      author: author,
      title: title,
      content: content,
      pv: 0
    }

    articleService.create(article)
      .then((result) => {
        // 此 article 是插入 mongodb 后的值，包含 _id
        article = result.ops[0]
        req.flash('success', '发表成功')
        // 发表成功后跳转到该文章页
        res.redirect(`/articles/${article._id}`)
      })
      .catch(next)
  },

  getOneArticle(req, res, next) {
    let articleId = req.params.articleId
    
    Promise.all([
      articleService.getArticleById(articleId),// 获取文章信息
      commentService.getComments(articleId),// 获取该文章所有留言
      articleService.incPv(articleId)// pv 加 1
    ])
    .then((result) => {
      let article = result[0]
      let comments = result[1]
      if (!article) {
        throw new Error('该文章不存在')
      }
      res.render('article', {
        article: article,
        comments: comments
      })
    })
    .catch(next)
  },

  editArticlePage(req, res, next) {
    let articleId = req.params.articleId
    let author = req.session.user._id

    articleService.getRawArticleById(articleId)
      .then((article) => {
        if (!article) {
          throw new Error('该文章不存在')
        }
        if (author.toString() !== article.author._id.toString()) {
          throw new Error('权限不足')
        }
        res.render('edit', {
          article: article
        })
      })
      .catch(next)
  },

  editArticle(req, res, next) {
    let articleId = req.params.articleId
    let author = req.session.user._id
    let title = req.fields.title
    let content = req.fields.content

    articleService.updateArticleById(articleId, author, { title: title, content: content })
      .then(() => {
        req.flash('success', '编辑文章成功')
        // 编辑成功后跳转到上一页
        res.redirect(`/articles/${articleId}`)
      })
      .catch(next)
  },

  deleteArticle(req, res, next) {
    let articleId = req.params.articleId
    let author = req.session.user._id

    articleService.delArticleById(articleId, author)
      .then(() => {
        req.flash('success', '删除文章成功')
        // 删除成功后跳转到主页
        res.redirect('/articles')
      })
      .catch(next)
  }

}