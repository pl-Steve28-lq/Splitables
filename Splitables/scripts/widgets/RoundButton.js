import { Button } from './Button.js'

export class RoundButton extends Button {
  constructor(x, y, w, h, text, clrs, font, mouse) {
    super(x, y, w, h, text, clrs, font, mouse)
  }

  animate(ctx) {
    super.animate(ctx)

    ctx.strokeStyle = this.clrs.strokecolor || 'black'
    ctx.fillStyle = this.clrs.color || 'white'

    ctx.beginPath()
    ctx.arc(
      this.pos.x, this.pos.y+this.size.h/2,
      this.size.h/2,
      Math.PI/2, 3*Math.PI/2
    )
    ctx.arc(
      this.pos.x+this.size.w, this.pos.y+this.size.h/2,
      this.size.h/2,
      3*Math.PI/2, Math.PI/2
    )
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = this.clrs.textcolor || 'black'
    ctx.strokeStyle = this.clrs.textcolor || 'black'

    ctx.fillText(
      this.text,
      this.pos.x + this.size.w/2,
      this.pos.y + this.size.h/2
    )
  }
}