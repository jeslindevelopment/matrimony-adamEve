if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const loaded = {}

const load = (name) => {
  name = name || 'config'
  if (loaded.hasOwnProperty(name)) {
    return loaded[name]
  } else {
    try {
      let items = require('./' + process.env.NODE_ENV + '.' + name)
      items.load = load
      loaded[name] = items
      return loaded[name]
    } catch (e) {
      if (e.toString().startsWith('SyntaxError')) {
        console.error('app:config ' + e.toString())
      } else {
        console.error('app:config Configuration file not available for `' + process.env.NODE_ENV + '` environtment. Please create `' + process.env.NODE_ENV + '.' + name + '.json` in `config` directory !')
      }
      process.exit(1)
    }
  }
}

let config = load() || {}
module.exports = config
