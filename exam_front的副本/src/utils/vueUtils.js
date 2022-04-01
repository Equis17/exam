// 回顯數據字典
export function getDictsLabel(data, value) {
  const actions = []
  Object.keys(data).map((key) => {
    if (String(data[key]['dictValue']) === String(value)) {
      actions.push(data[key]['dictLabel'])
      return false
    }
  })
  return actions.join('')
}

// 获取下拉框
export function getOpts(list, key = 'id', label = 'name') {
  return list.map(item => ({
    ...item,
    optId: item[key],
    optLabel: typeof label === 'string' ? item[label] : typeof label === 'function' ? label(item) : '',
  }))
}

export const getMoreOpts = async(opts, vm) => {
  return Promise.all(opts.map(async({ key, api, optId, optLabel, }) => {
    const res = await api()
    vm.$set(
      vm.opts,
      key,
      getOpts(res.data, optId, (data) => getConnectedStr(...optLabel.split('|').map((prop) => data[prop])))
    )
  }))
}

export function addDateRange(data, [startParam, endParam, ], dateRange) {
  const search = data
  search[startParam] = ''
  search[endParam] = ''
  if (dateRange != null) {
    search[startParam] = dateRange[0]
    search[endParam] = dateRange[1]
  }
  return search
}

// 获取下拉框label
export function getOptsLabel(list = [], id, param = 'optLabel') {
  const found = list.find(item => String(item.optId) === String(id))
  return found ? found[param] : undefined
}

// export function downloadGet(fileName) {
//   window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
// }

export const getConnectedStr = (...args) => {
  const filteredList = args.filter(Boolean)
  return filteredList.length ? filteredList.join('-') : '-'
}

export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}
