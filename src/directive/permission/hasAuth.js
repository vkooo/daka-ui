import store from '@/store'


export default {
  inserted(el, binding ) {
    const { value } = binding
    const allAuth = "*:*:*";
    const auths = store.getters && store.getters.auths

    let flag = []
    if (typeof value === 'string') {
      flag.push(value)
    }else{
      flag = value
    }

    if (flag && flag instanceof Array && flag.length > 0) {
      const authFlag = flag

      const hasAuths = auths.some(item => {
        return allAuth === item || authFlag.includes(item)
      })

      if (!hasAuths) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
