fs = require 'fs'
clone = require("nodegit").Repo.clone

repositories =
    'blaze-layout': 'https://github.com/EventedMind/blaze-layout.git'
    'iron-router':  'https://github.com/EventedMind/iron-router.git'
    'jade':         'https://github.com/i4han/jade.git'
    'browser':      'https://github.com/i4han/browser.git'

rm_rf = (path) ->
    files = [];
    files = fs.readdirSync path
    files.forEach (file, index) ->
        curPath = path + "/" + file
        if fs.lstatSync(curPath).isDirectory()
            rm_rf curPath
        else
            fs.unlinkSync curPath
    fs.rmdirSync path

git_clone = (dir) ->
    clone repositories[dir], dir, null, (err, repo) -> throw err if err

task 'all', 'Clone all packages', ->
    process.chdir '..'
    for dir, url of repositories
        git_clone dir

task 'blaze-layout', 'Clone blaze-layout', ->
    process.chdir '..'
    git_clone 'blaze-layout'

task 'iron-router', 'Clone iron-router', ->
    process.chdir '..'
    git_clone 'iron-router'

task 'jade', 'Clone jade', ->
    process.chdir '..'
    git_clone 'jade'

task 'browser', 'Clone browser', ->
    process.chdir '..'
    git_clone 'browser'
    
task 'clean', 'Clean packages', ->
    process.chdir '..'
    for dir, url of repositories
        rm_rf dir
        