var EventEmitter = require('events').EventEmitter

var life = new EventEmitter()

// 监听器上限个数
life.setMaxListeners(11)

// addEventListener
life.on('call', who => {
    console.log(who + "~~~~~~~~~~~");
})

life.emit('call', 'someone')
