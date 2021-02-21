import { View } from './View.js'

export class Button extends View {
  constructor(x, y, w, h, text, clrs, font, mouse) {
    super(w, h, mouse)
    Object.assign(this, {
      pos: {x, y},
      text, clrs, font
    })
  }

  animate(ctx) {
    super.animate(ctx)

    ctx.strokeStyle = this.clrs.strokecolor || 'black'
    ctx.fillStyle = this.clrs.color || 'white'
    ctx.fillRect(
      this.pos.x, this.pos.y,
      this.size.w, this.size.h
    )
    ctx.strokeRect(
      this.pos.x, this.pos.y,
      this.size.w, this.size.h
    )
    ctx.fillStyle = this.clrs.textcolor || 'black'
    ctx.strokeStyle = this.clrs.textcolor || 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    let px = 40
    while (1) {
      if (px == 0) return
      ctx.font = `${px}px ${this.font}`
      let data = ctx.measureText(this.text)
      if (
        data.width < this.size.w+this.size.h/2 &&
        data.actualBoundingBoxAscent + data.actualBoundingBoxDescent < this.size.h/2
      ) break
      px -= 1
    }
    ctx.fillText(
      this.text,
      this.pos.x + this.size.w/2,
      this.pos.y + this.size.h/2
    )
  }
}