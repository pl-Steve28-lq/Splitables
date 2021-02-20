import { Splitable } from './Splitable.js'

export class SplitableGroup {
  constructor(image, Width, Height, mouse) {
    Object.assign(this, {
      image, Width, Height, mouse,
      tmp: document.createElement('canvas'),
    })

    this.tmp.width = this.Width
    this.tmp.height = this.Height
    this.tmpctx = this.tmp.getContext('2d')
    console.log(this.Width, this.Height)
    this.Length = Math.min(this.Width, this.Height)
    this.ratio = this.image.width/this.image.height

    let wr = this.Width/this.image.width, hr = this.Height/this.image.height
    let hw = wr > hr

    let w = hw ? this.ratio*this.Height : this.Width,
        h = hw ? this.Height : this.ratio*this.Width
    this.X = hw ? (this.Width-w)/2 : 0
    this.Y = hw ? 0 : (this.Height-h)/2
    let chai = (2*hw-1)*(h-w)/2

    this.tmpctx.fillStyle = 'white'
    this.tmpctx.fillRect(
      0, 0, this.Width, this.Height
    )

    this.tmpctx.drawImage(
      this.image,
      this.X, this.Y, w, h
    )

    this.d = this.tmpctx.getImageData(
      this.X-hw*chai, this.Y-(!hw)*chai,
      this.Length, this.Length
    )


    let S = this.Length%(1<<V),
        data = this.d.data,
        imsi = [],
        Length = this.Length - S
    this.dataLen = Length
    this.length = data.length
    this.data = []
    let idx = 0, iidx = 0
    while (idx < this.length) {
      if (iidx > Length-1) {
        iidx = 0
        idx += 4*S
        this.data.push(imsi)
        imsi = []
      } else if (idx > 4*Length*this.Length-1) {
        break
      }
      let R = data[idx],
          G = data[idx+1],
          B = data[idx+2],
          A = data[idx+3]
      imsi.push([R, G, B, A])
      idx += 4
      iidx += 1
    }

    this.splitables = [
      new Splitable(
        this.Width/2, this.Height/2,
        this.Length/2, 0, this.askColor(0, 0, 0, [0]), [0]
      )
    ]
  }

  animate(ctx) {
    //*
    this.splitables.forEach(
      (e, i) => {
        e.draw(ctx)
        if (e.isMouseOn(this.mouse)) {
          let result = e.split().map(s => {
            s.clr = this.askColor(
              s.pos.x, s.pos.y, s.spt, s.idx
            )
            return s
          })
          this.splitables.splice(
            i, 1
          )
          result.forEach(
            sp => this.splitables.push(sp)
          )
        }
      }
    )
    //*/
  }

  askColor(x, y, sp, idx) {
    let X = 0, Y = 0, iidx = idx.length-1, L = V-iidx-1
    
    while (iidx > 0) {
      L += 1
      let v = idx[iidx], l = 1<<L
      let xi = parseInt(v/2), yi = v%2
      X += xi*l; Y += yi*l
      iidx -= 1
    }

    let colors = [], size = 1<<(V-sp)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        colors.push(this.getBlock(X+i, Y+j))
      }
    }

    return this.toColor(colors.reduce(
      (res, val) => res.map(
        (nval, idx) => nval+val[idx]
      )
    ).map(e => e/colors.length))
  }

  getBlock(x, y) {
    let L = this.dataLen/(1<<V)
    let colors = []
    for (let i = 0; i < L; i++) {
      for (let j = 0; j < L; j++) {
        colors.push(
          this.data[L*x+i][L*y+j]
        )
      }
    }
    return colors.reduce(
      (res, val) => res.map(
        (nval, idx) => nval+val[idx]
      )
    ).map(e => e/colors.length)
  }

  toColor(r) {
    let alpha = r[3] ? ` ,${r[3]}` : ''
    return `rgb(${r[0] | 0}, ${r[1] | 0}, ${r[2] | 0}${alpha})`
  }
}