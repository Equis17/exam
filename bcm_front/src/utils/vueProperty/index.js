export function propSync(prop) {
  return {
    get() {
      return this[prop]
    },
    set(v) {
      this.$emit(`update:${prop}`, v)
    },
  }
}

export function modelSync(prop, evt) {
  return {
    get() {
      return this[prop]
    },
    set(value) {
      this.$emit(evt, value)
    },
  }
}
