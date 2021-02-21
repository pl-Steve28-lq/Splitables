import { BaseCanvasApp } from './BaseApp.js'

import { MouseManager } from './utils/MouseUtils.js'
import { SplitableGroup } from './SplitableGroup.js'
import { RoundButton } from './widgets/RoundButton.js'

class App extends BaseCanvasApp {
  constructor() { super() }

  init() {
    this.mouse = new MouseManager()
    this.mouse.setRefreshable(false)

    this.group = null
    this.image = new Image()
    this.image.src = '../assets/wak.png'
    this.image.onload = () => {
      this.group = new SplitableGroup(
        this.image, this.Width, this.Height, this.mouse
      )
      console.log('loaded!')
      this.loaded = true
    }

    this.reset = new RoundButton(
      this.Width/15, this.Height/2 - this.Height/6,
      this.Width/6, this.Height/8, "Reset", {}, 'NanumSquare',
      this.mouse
    ).setOnClickListener(this.init.bind(this))

    this.upload = new RoundButton(
      this.Width/15, this.Height/2,
      this.Width/6, this.Height/8, "Upload Image", {}, 'NanumSquare',
      this.mouse
    ).setOnClickListener(() => alert("구현 예정입니당"))
  }

  animate() {
    super.animate() 
    
    if (this.loaded) {
      this.group.animate(this.ctx)
      this.reset.animate(this.ctx)
      this.upload.animate(this.ctx)
    }
  }
}

window.onload = () => {
  let v = new App()
}