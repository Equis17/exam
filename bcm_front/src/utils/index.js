/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六', ][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export const mergeNumberOfExps = expressions => {
  const res = []
  const isNumChar = n => /^[\d|\.]$/.test(n)
  for (let i = 0; i < expressions.length; i++) {
    if (i > 0 && isNumChar(expressions[i - 1]) && isNumChar(expressions[i])) {
      res[res.length - 1] += expressions[i]
      continue
    }
    res.push(expressions[i])
  }
  return res
}

/**
 * 校验表达式是否符合计算法则
 * @param {Array} expressions - 合并数字后的表达式数组
 * @returns {Boolean}
 */
export const validExp = (expressions, mergeNum = true) => {
  const temp = mergeNum ? mergeNumberOfExps(expressions) : expressions
  const arr = temp.filter(t => !'()'.includes(t))
  // 去括号后 length应该为奇数  并且第一个字符和最后一个字符应该为数字而非计算符号
  if (temp.length % 2 === 0 || arr.length % 2 === 0 || Number.isNaN(+arr[0]) || Number.isNaN(+arr[arr.length - 1])) {
    return false
  }
  for (let i = 0; i < arr.length - 1; i += 2) {
    if (typeof (+arr[i]) !== 'number' || !Number.isNaN(+arr[i + 1])) return false
  }
  return true
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) {
      s++
    } else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * 表格時間格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue == '') return ''
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export function url2Base64(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if (xhr.status === 200) {
        const reader = new FileReader()
        reader.readAsDataURL(xhr.response)
        reader.onloadend = function() {
          const base64data = reader.result.replace(/^data:image\/(png|jpg);base64,/, '')
          resolve(base64data)
        }
      }
    }
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.send()
  })
}

export function url2Base64WithHead(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if (xhr.status === 200) {
        const reader = new FileReader()
        reader.readAsDataURL(xhr.response)
        reader.onloadend = function() {
          resolve(reader.result)
        }
      }
    }
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.send()
  })
}

export function list2tree(
  data,
  id,
  parentId,
  children
) {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  for (const d of data) {
    const parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (const d of data) {
    const parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

export function mapTree(tree, nodeKey = 'id', nodeChildren = 'children', cb) {
  return tree.map(node => {
    return {
      ...node,
      ...cb(node),
      [nodeChildren]: node[nodeChildren] ? mapTree(node[nodeChildren], nodeKey, nodeChildren, cb) : [],
    }
  })
}

export function tree2list(tree, nodeKey = 'id', nodeChildren = 'children') {
  let list = []
  tree.forEach(node => {
    if (node[nodeChildren]) {
      list = list.concat(tree2list(node[nodeChildren], nodeKey, nodeChildren))
      delete node[nodeChildren]
    }
    list.push(node)
  })
  return list
}

export const getConnectedStr = (...args) => {
  const filteredList = args.filter(Boolean)
  return filteredList.length ? filteredList.join('-') : '-'
}

// 解决乘除精度
const operationNumber = function(arg1, arg2, operator) {
  const oper = ['+', '-', '*', '/', ]
  // 不合法的运算
  if (isNaN(arg1) || isNaN(arg2) || oper.indexOf(operator) < 0) {
    return NaN
  }
  // 除以0
  if (operator === '/' && Number(arg2) === 0) {
    return Infinity
  }
  // 和0相乘
  if (operator === '*' && Number(arg2) === 0) {
    return 0
  }
  // 相等两个数字相减
  if ((arg1 === arg2 || Number(arg1) === Number(arg2)) && operator === '-') {
    return 0
  }
  let r1, r2
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  const max = Math.max(r1, r2)
  const _r1 = max - r1
  const _r2 = max - r2
  if (_r1 !== 0) {
    arg1 = arg1 + '0'.repeat(_r1)
  }
  if (_r2 !== 0) {
    arg2 = arg2 + '0'.repeat(_r2)
  }
  arg1 = Number(arg1.toString().replace('.', ''))
  arg2 = Number(arg2.toString().replace('.', ''))
  const r3 = operator === '*' ? (max * 2) : (operator === '/' ? 0 : max)
  // eslint-disable-next-line no-eval
  let newNum = eval(arg1 + operator + arg2)

  if (r3 !== 0) {
    let nStr = newNum.toString()
    nStr = nStr.replace(/^-/, '')
    if (nStr.length < r3 + 1) {
      nStr = '0'.repeat(r3 + 1 - nStr.length) + nStr
    }
    nStr = nStr.replace(new RegExp('(\\\d{' + r3 + '})$'), '.$1')
    if (newNum < 0) {
      nStr = '-' + nStr
    }
    newNum = nStr * 1
  }
  return newNum
}
// 乘法
export const myMul = function(arg1, arg2) {
  return operationNumber(arg1, arg2, '*')
}
// 除法
export const myDiv = function(arg1, arg2) {
  return operationNumber(arg1, arg2, '/')
}

export function fileSizeFormat(val) {
  if (!val) return ''
  const size = +val
  switch (true) {
    case size < 1024:
      return size + 'B'
    case size < 1024 ** 2: {
      let temp = size / 1024
      temp = temp.toFixed(2)
      return temp + 'KB'
    }
    case size < 1024 ** 3: {
      let temp = size / 1024 ** 2
      temp = temp.toFixed(2)
      return temp + 'MB'
    }
    default: {
      let temp = size / 1024 ** 3
      temp = temp.toFixed(2)
      return temp + 'GB'
    }
  }
}

export function isUrl(str) {
  return /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(str)
}

export function arrayToEnum(arr, value = 'value', label = 'label') {
  if (!Array.isArray(arr)) throw new Error('该方法只适用于数组')
  if (!arr.length) return {}
  return arr.reduce((p, c) => ({ ...p, [c[value]]: c[label], }), {})
}

export function enumToArray(obj, value = 'value', label = 'label') {
  if (Object.prototype.toString.call(obj) !== '[object Object]') throw new Error('该方法只适用于对象')
  if (!Object.keys(obj).length) return []
  return Object.entries(obj).map(([key, val, ]) => ({
    [value]: key,
    [label]: val,
  }))
}

// 獲取唯一值
export function uniqueId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
