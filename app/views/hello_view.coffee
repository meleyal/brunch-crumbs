module.exports = class HelloView extends Backbone.View

  className: 'hello'

  template: require './templates/hello'

  render: ->
    @$el.html @template
    this
