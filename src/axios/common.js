// 获取对象的构造函数
function getType(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}
/**
 * 函数防抖
 * @param { Promise } fn 执行函数
 */
let timer = null
export const debonce = fn => {
  return () => {
    clearTimeout(timer)
    timer = setTimeout(async (...data) => {
      fn(...data)
    }, 300)
  }
}
/**
 * 函数节流
 * @param { Function } fn 延时调用函数
 */
let lastTime = null
export const throttle = fn => {
  return (...data) => {
    const nowTime = +new Date()
    if (nowTime > lastTime + 800 || !lastTime) {
      fn(...data)
      lastTime = nowTime
    }
  }
}
/**
 * 回到顶部
 */
export const backTop = () => {
  const y = document.documentElement.scrollTop || document.body.scrollTop
  if (y > 0) {
    window.requestAnimationFrame(backTop)
    window.scrollTo(0, y - y / 8)
  }
}
/**
 * 回到顶部无动画
 */
export const backToTop = () => {
  window.scrollTo(0, 0)
}
/**
 * cookie
 */
export const oCookie = {
  add(info, lifeCircle) {
    const oDate = new Date()
    oDate.setDate(new Date().getDate() + lifeCircle)
    for (const iterator of info) {
      document.cookie = iterator + ';expires=' + oDate + ';path=/'
    }
  },
  del(info) {
    const oDate = new Date()
    oDate.setDate(new Date().getDate() - 1)
    for (const iterator of info) {
      document.cookie = iterator + '=abc;expires=' + oDate + ';path=/;max-age=0'
    }
  },
  get(info) {
    const json = {}
    const cookie = document.cookie.replace(/\s+/g, '').split(';')
    for (const iterator_cookie of cookie) {
      const keyValArr = iterator_cookie.split('=')
      for (const iterator_info of info) {
        if (iterator_info === keyValArr[0]) {
          json[iterator_info] = keyValArr[1]
        }
      }
    }
    return json
  }
}

/**
 * qs.stringify
 */
export const qsStringify = json => {
  const res = []
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      res.push(`${key}=${json[key]}`)
    }
  }
  return res.join('&')
}
/**
 * 
 * @param {Object} obj 拷贝对象 
 * @param {Object} copy 生成对象
 */
export const deepClone = data => {
  var type = getType(data);
  var obj;
  if(type === 'array'){
    obj = [];
  } else if(type === 'object'){
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if(type === 'array'){
    for(var i = 0, len = data.length; i < len; i++){
      obj.push(deepClone(data[i]));
    }
  } else if(type === 'object'){
    for(var key in data){
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

/**
 * 导出时间
 * @param {Date} t
 */
export const getDate = t => {
  return new Date(new Date(t).getTime() + 28800000).toISOString().split('T')[0]
}
