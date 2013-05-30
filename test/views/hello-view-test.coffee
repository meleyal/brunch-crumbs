HelloView = require 'views/hello-view'

describe 'HelloView', ->

  it 'should exist', ->
    view = new HelloView
    expect(view).toBeDefined()
