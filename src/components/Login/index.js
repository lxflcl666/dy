class Validate {
  constructor (name) {
    this.name = 'validate'
  }
  // 生成验证码
  createVal (n) {
    var datalist = []
    for (let i = 0; i < n; i++) {
      let item = parseInt(Math.random() * 99)
      if (item > 64 && item < 91) {
        item = String.fromCharCode(item)
        datalist.push(item)
      } else if (item < 10) {
        datalist.push(item)
      } else {
        i--
      }
    }
    return datalist.join('')
  }
  // 按钮倒计时
  setTime (n, ban, revise) {
    if (arguments.length >= 2) {
      ban()
    }
    var timer = setInterval(() => {
      n--
      if (n >= 0) {
        if (arguments.length >= 2) {
          ban()
        }
      } else {
        if (arguments.length === 3) {
          revise()
        }
        clearInterval(timer)
      }
    }, 1000)
  }
}

export default Validate
