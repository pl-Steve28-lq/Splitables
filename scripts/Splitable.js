export class Splitable {
  constructor(x, y, r, spt, clr, idx) {
    Object.assign(this, {
      pos: {x, y}, r, spt, clr, idx
    })
  }

  split() {
    if (this.spt < V) {
      let res = []
      for (let i of [0, 1, 2, 3]) {
        let X = 1-2*(i%2)
        let Y = 1-2*parseInt(i/2)
        res.push(
          new Splitable(
            this.pos.x - this.r*X/2, this.pos.y - this.r*Y/2,
            this.r/2, this.spt+1, 'black', this.idx.concat(i)
          )
        )
      }
      return res
    } else return [this]
  }

  draw(ctx) {
    ctx.fillStyle = this.clr
    ctx.beginPath()
    ctx.arc(
      this.pos.x, this.pos.y,
      this.r, 0, 2*Math.PI
    )
    ctx.closePath()
    ctx.fill()
  }

  isMouseOn(mouse) {
    let X = mouse.pos.x,
        Y = mouse.pos.y
    return (X-this.pos.x)**2 + (Y-this.pos.y)**2 <= this.r**2
  }
}