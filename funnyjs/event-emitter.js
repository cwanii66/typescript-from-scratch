// 提取发布订阅的功能放在一个对象
const Events = (function() {

    let clientList = {},
        listen,
        trigger,
        remove;

    listen = function(key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };

    trigger = function(key, ...args) {
        const fns = clientList[key];

        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0, fn; fn = fns[i++]; ) {
            fn.apply(this, args);
        }
    };

    remove = function(key, fn) {
        const fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (let l = fns.length - 1; l >= 0; l--) {
                let _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };

    return {
        listen,
        trigger,
        remove
    }
})();

export default Events;

// Events.listen( 'squareMeter88', function( price ){ // 小红订阅消息
//     console.log( '价格= ' + price ); // 输出：'价格=2000000'
// });

// Events.trigger( 'squareMeter88', 2000000 ); // 售楼处发布消息