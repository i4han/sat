// Generated by CoffeeScript 1.7.1
var fs, main, stylus, _;

if (typeof Meteor === "undefined" || Meteor === null) {
  _ = require('underscore');
  fs = require('fs');
  stylus = require('stylus');
} else if (!Package.underscore._.isEmpty(this.Config) && !Package.underscore._.isEmpty(this.__)) {
  return this.Config;
} else {
  _ = this._;
  this.module = {
    exports: {}
  };
  if (Meteor.isServer) {
    fs = Npm.require('fs');
  }
}

main = {
  title: 'App',
  home_url: 'http://www.hi16.ca',
  autogen_prefix: 'auto_',
  callback_port: 3003,
  init: function() {
    if ((typeof Meteor === "undefined" || Meteor === null) || Meteor.isServer) {
      this.home_dir = process.env.HOME + '/';
      this.meteor_dir = process.env.METEOR_APP + '/';
      this.source_dir = this.meteor_dir + 'lib/';
      this.target_dir = this.meteor_dir + 'client/';
    }
    return this;
  }
}.init();

this.Config = {
  title: main.title,
  home_url: main.home_url,
  callback_port: main.callback_port,
  sets: 'content dialog form layout login'.split(' '),
  indent_string: '    ',
  collections: 'connects items updates boxes colors'.split(' '),
  instagram: {
    callback_path: '/callback/instagram/',
    response_type: 'code',
    grant_type: 'authorization_code',
    oauth_url: 'https://api.instagram.com/oauth/authorize/',
    client_id: '91ee62d198554e1c83305df1dc007335',
    final_url: main.home_url,
    request_url: 'https://api.instagram.com/oauth/access_token/',
    subscription_url: 'https://api.instagram.com/v1/subscriptions/',
    callback_url: 'http://www.hi16.ca:3003/callback/instagram/?command=update',
    media_url: function(media_id, access_token) {
      return "https://api.instagram.com/v1/media/" + media_id + "/?access_token=" + access_token;
    },
    redirect_uri: function(user_id) {
      return "http://www.hi16.ca:3003/callback/instagram/?command=oauth&user_id=" + user_id;
    }
  },
  pages: {
    jade: {
      target_file: main.target_dir + main.autogen_prefix + '1.jade',
      indent: 1,
      format: function(name, block) {
        return "template(name=\"" + name + "\")\n" + block + "\n\n";
      }
    },
    stylus: {
      target_file: main.target_dir + main.autogen_prefix + '6.css',
      indent: 0,
      format: function(name, block) {
        return stylus(block).render() + '\n';
      }
    },
    HTML: {
      target_file: main.target_dir + main.autogen_prefix + '2.html',
      indent: 1,
      format: function(name, block) {
        return "<template name=\"" + name + "\">\n" + block + "\n</template>";
      }
    },
    head: {
      target_file: main.target_dir + main.autogen_prefix + '0.jade',
      indent: 1,
      header: 'head\n',
      format: function(name, block) {
        return block;
      }
    },
    less: {
      target_file: main.target_dir + main.autogen_prefix + '5.less',
      indent: 0,
      format: function(name, block) {
        return block;
      }
    },
    css: {
      target_file: main.target_dir + main.autogen_prefix + '4.css',
      indent: 0,
      format: function(name, block) {
        return block;
      }
    },
    styl: {
      target_file: main.target_dir + main.autogen_prefix + '3.styl',
      indent: 0,
      format: function(name, block) {
        return block;
      }
    }
  },
  auto_generated_files: [],
  init: function() {
    var i;
    this.redis = {};
    if ((typeof Meteor === "undefined" || Meteor === null) || Meteor.isServer) {
      this.config_file = main.meteor_dir + 'config.coffee';
      this.meteor_dir = main.meteor_dir;
      this.package_dir = main.meteor_dir + 'packages/';
      this.config_js = this.package_dir + 'sat/';
      this.source_dir = main.source_dir;
      this.target_dir = main.target_dir;
      this.storables = main.meteor_dir + 'private/storables';
      this.set_prefix = '';
      this.autogen_prefix = main.autogen_prefix;
      if (typeof Meteor === "undefined" || Meteor === null) {
        this.redis = (require('redis')).createClient();
      } else {
        this.redis = (Npm.require('redis')).createClient();
        this.server_config = this.meteor_dir + 'server/config';
      }
    }
    this.templates = Object.keys(this.pages);
    this.auto_generated_files = (function() {
      var _i, _len, _ref, _results;
      _ref = this.templates;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(this.pages[i].target_file);
      }
      return _results;
    }).call(this);
    delete this.init;
    return this;
  },
  quit: function() {
    if (!_.isEmpty(this.redis)) {
      return this.redis.quit();
    }
  }
}.init();

this.__ = {
  queryString: function(obj) {
    var i, parts;
    parts = [];
    for (i in obj) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
    return parts.join("&");
  },
  trim: function(str) {
    return str.trim();
  },
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  dasherize: function(str) {
    return str.trim().replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase();
  },
  prettyJSON: function(obj) {
    return JSON.stringify(obj, null, 4);
  },
  getValue: function(id) {
    var element;
    element = document.getElementById(id);
    if (element) {
      return element.value;
    } else {
      return null;
    }
  },
  trimmedValue: function(id) {
    var element;
    element = document.getElementById(id);
    if (element) {
      return element.value.replace(/^\s*|\s*$/g, "");
    } else {
      return null;
    }
  },
  reKey: function(obj, oldName, newName) {
    if (obj.hasOwnProperty(oldName)) {
      obj[newName] = obj[oldName];
      delete obj[oldName];
    }
    return this;
  }
};

this.__.renameKeys = function(obj, keyObject) {
  return _.each(_.keys(keyObject, function(key) {
    return this.__.reKey(obj, key, keyObject[key]);
  }));
};

this.__.repeat = function(pattern, count) {
  var result;
  if (count < 1) {
    return '';
  }
  result = '';
  while (count > 0) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result;
};

this.__.deepExtend = function(target, source) {
  var prop;
  for (prop in source) {
    if (prop in target) {
      __.deepExtend(target[prop], source[prop]);
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
};

this.__.flatten = function(obj, chained_keys) {
  var flatObject, i, j, toReturn, _i, _j, _len, _len1;
  toReturn = {};
  for (_i = 0, _len = obj.length; _i < _len; _i++) {
    i = obj[_i];
    if (typeof obj[i] === 'object') {
      flatObject = this.__.flatten(obj[i]);
      for (_j = 0, _len1 = flatObject.length; _j < _len1; _j++) {
        j = flatObject[_j];
        if (chained_keys) {
          toReturn[i + '_' + j] = flatObject[j];
        } else {
          toReturn[j] = flatObject[j];
        }
      }
    } else {
      toReturn[i] = obj[i];
    }
  }
  return toReturn;
};

this.__.log = function(arg) {
  if (this.Config.redis.connected) {
    return this.Config.redis.rpush('log', arg + '');
  } else {
    return console.log(arg + '');
  }
};

if (typeof Meteor === "undefined" || Meteor === null) {
  module.exports.Config = this.Config;
  module.exports.__ = this.__;
}
