export class View {
  constructor(w, h, mouse) {
    this.size = {w, h}
    this.mouse = mouse
    this.onClick = () => {}
    this._clicked = false
  }

  animate(ctx) {
    if (this.isClicked(this.mouse)) this.onClick()
  }

  setOnClickListener = f => { this.onClick = f; return this }

  isClicked(mouse) {
    let dx = mouse.pos.x-this.pos.x,
        dy = mouse.pos.y-this.pos.y,
        X = 0 < dx && dx < this.size.w,
        Y = 0 < dy && dy < this.size.h,
        res = X && Y && mouse.isClicked && !this._clicked
    if (this._clicked && !mouse.isClicked) this._clicked = false
    else if (!this._clicked && mouse.isClicked) this._clicked = true
    return res
  }
}