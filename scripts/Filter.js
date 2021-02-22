class _Filter {
  filter = [
    "circle", "small_Circle", "diamond", "triangle",
    "square", "small_Square", "star",
    "chaos"
  ]

  getFilterName(idx) {
    return this.filter[idx%this.filter.length]
  }

  getFilter(idx, splitable) {
    let fn = this.getFilterName(idx)
    if (fn != "chaos") return this[fn].bind(splitable)
    return this.getFilter(
      Math.random()*this.filter.length | 0,
      splitable
    )
  }

  circle(ctx) {
    ctx.fillStyle = this.clr
    ctx.beginPath()
    ctx.arc(
      this.pos.x, this.pos.y,
      this.r, 0, 2*Math.PI
    )
    ctx.closePath()
    ctx.fill()
  }

  small_Circle(ctx) {
    ctx.fillStyle = this.clr
    ctx.beginPath()
    ctx.arc(
      this.pos.x, this.pos.y,
      3*this.r/4, 0, 2*Math.PI
    )
    ctx.closePath()
    ctx.fill()
  }

  diamond(ctx) {
    ctx.fillStyle = this.clr
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y+this.r)
    ctx.lineTo(this.pos.x+this.r, this.pos.y)
    ctx.lineTo(this.pos.x, this.pos.y-this.r)
    ctx.lineTo(this.pos.x-this.r, this.pos.y)
    ctx.lineTo(this.pos.x, this.pos.y+this.r)
    ctx.closePath()
    ctx.fill()
  }

  triangle(ctx) {
    ctx.fillStyle = this.clr
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y-this.r)
    ctx.lineTo(this.pos.x-this.r, this.pos.y+this.r)
    ctx.lineTo(this.pos.x+this.r, this.pos.y+this.r)
    ctx.lineTo(this.pos.x, this.pos.y-this.r)
    ctx.closePath()
    ctx.fill()
  }

  square(ctx) {
    ctx.fillStyle = this.clr
    ctx.fillRect(
      this.pos.x-this.r, this.pos.y-this.r,
      2*this.r, 2*this.r
    )
  }

  small_Square(ctx) {
    ctx.fillStyle = this.clr
    ctx.fillRect(
      this.pos.x-2*this.r/3, this.pos.y-2*this.r/3,
      4*this.r/3, 4*this.r/3
    )
  }

  star(ctx) {
    ctx.fillStyle = this.clr
    ctx.beginPath()
    let vAngle = Math.PI / 5,
        posX = new Array(11),
        posY = new Array(11)
    for (let i = 11; i > 0; i--) {
      let r = 1.2*this.r*(i % 2 + 1)/2,
          curAngle = vAngle * i
      posX[i] = r*Math.sin(curAngle) + this.pos.x
      posY[i] = r*Math.cos(curAngle) + this.pos.y
    }
    ctx.moveTo(posX[1], posY[1])
    for (let i = 10; i > 0; i--) ctx.lineTo(posX[i], posY[i]);
    ctx.closePath()
    ctx.fill()
  }
}

export const Filter = new _Filter()