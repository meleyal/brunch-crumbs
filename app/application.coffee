Router = require 'routers/router'
HelloView = require 'views/hello-view'

module.exports = class Application

  constructor: ->
    $ =>
      @initialize()
      Backbone.history.start pushState:true

  initialize: ->
    @router = new Router
    @helloView = new HelloView

window.app = new Application
