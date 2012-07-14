module.exports = class Router extends Backbone.Router

  routes:
    '': 'index'
    '*all': 'redirect'

  index: ->
    $('#content').append app.helloView.render().el

  redirect: ->
    @navigate ''
