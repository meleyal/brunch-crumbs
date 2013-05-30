module.exports = class Router extends Backbone.Router

  routes:
    '': 'index'
    '*all': 'redirect'

  index: ->
    $('body').append app.helloView.render().el

  redirect: ->
    @navigate ''
