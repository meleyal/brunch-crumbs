{exec} = require 'child_process'
{print} = require 'util'

shell = (cmds, callback) ->
  exec(cmds, (err, stdout, stderr) ->
    print trimStdout if trimStdout = stdout.trim()
    error stderr.trim() if err
    callback() if callback?
  )

task 'docs', 'generate docs', ->
  shell 'docco app/*.coffee app/*/*.coffee', ->
    shell 'mv docs/application.html docs/index.html', ->
      shell 'sed -i "" s/application.html/index.html/g docs/*.html'

task 'pages', 'prepare docs for github pages', ->
  shell 'git checkout gh-pages', ->
    shell 'rm -r $(ls | ack -v docs)', ->
      shell 'mv docs/* .'
