fs = require 'fs'
clone = require("nodegit").Repo.clone

repositories =
    'blaze-layout': 'https://github.com/EventedMind/blaze-layout.git'
    'iron-router':  'https://github.com/EventedMind/iron-router.git'
    'deps-ext':     'https://github.com/EventedMind/deps-ext.git'
    'jade':         'https://github.com/i4han/jade.git'
    'bin':          'https://github.com/i4han/bin.git'
    'browser':      'https://github.com/i4han/browser.git'
dirs = Object.keys repositories
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

task_clone = (dir) ->
    process.chdir '..'
    git_clone dir

task 'all', 'Clone all packages', ->
    process.chdir '..'
    for dir, url of repositories
        git_clone dir
        
task 'clean', 'Clean packages', ->
    process.chdir '..'
    for dir, url of repositories
        rm_rf dir

task dirs[0], "Clone #{dirs[0]}", -> task_clone dirs[0]
task dirs[1], "Clone #{dirs[1]}", -> task_clone dirs[1]
task dirs[2], "Clone #{dirs[2]}", -> task_clone dirs[2]
task dirs[3], "Clone #{dirs[3]}", -> task_clone dirs[3]
task dirs[4], "Clone #{dirs[4]}", -> task_clone dirs[4]
task dirs[5], "Clone #{dirs[5]}", -> task_clone dirs[5]

