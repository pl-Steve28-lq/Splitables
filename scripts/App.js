import { BaseCanvasApp } from './BaseApp.js'

import { MouseManager } from './utils/MouseUtils.js'
import { SplitableGroup } from './SplitableGroup.js'
import { RoundButton } from './widgets/RoundButton.js'

class App extends BaseCanvasApp {
  constructor() { super() }

  init(
    src="../assets/wak.png",
    filterIdx=0
  ) {
    Object.assign(this, {
      mouse: new MouseManager(), loaded: false,
      group: null, image: new Image(),
      input: this.id('input'),
      idx: filterIdx
    })
    this.mouse.setRefreshable(false)

    this.image.src = src
    this.image.onload = () => {
      this.group = new SplitableGroup(
        this.image, this.Width, this.Height,
        this.mouse, filterIdx
      )
      console.log('loaded!')
      this.loaded = true
      this.filter.setText(this.group.getFilterName())
    }

    
    
    let btnL = 1/12, btnT = 1/2,
        btnW = 1/8, btnH = 1/10
    
    let button = document.createElement('button')
    button.addEventListener('click', e => {
      this.input.click()
    })
    button.setAttribute(
      'style',
      `position:absolute;
      top:${btnT*100}%;
      left:${(btnL-btnH/2)*100}%;
      width:${(btnW+btnH)*100}%;
      height:${btnH*100}%;
      opacity:0;
      `.replace('\n', '')
    )
    document.body.appendChild(button)
    
    this.reset = new RoundButton(
      this.Width*btnL,
      this.Height*(btnT-1/6),
      this.Width*btnW,
      this.Height*btnH,
      "Reset", {}, 'NanumSquare',
      this.mouse
    ).setOnClickListener(this.init.bind(this, src, this.idx))

    this.upload = new RoundButton(
      this.Width*btnL,
      this.Height*btnT,
      this.Width*btnW,
      this.Height*btnH,
      "Upload", {}, 'NanumSquare',
      this.mouse
    )

    this.filter = new RoundButton(
      this.Width*btnL,
      this.Height*(btnT+1/6),
      this.Width*btnW,
      this.Height*btnH,
      "", {}, 'NanumSquare',
      this.mouse
    ).setOnClickListener(
      () => {
        this.idx += 1
        this.group.applyFilter(this.idx)
        this.filter.setText(this.group.getFilterName())
      }
    )
    
    this.input.addEventListener(
      'change', this.imageInit.bind(this)
    )
  }

  animate() {
    super.animate() 
    
    if (this.loaded) {
      this.group.animate(this.ctx)
      this.reset.animate(this.ctx)
      this.upload.animate(this.ctx)
      this.filter.animate(this.ctx)
    }
  }
  
  imageInit(e) {
    let filelist = Array.from(e.target.files),
        len = filelist.length
    if (len > 1) {
      alert('사진 업로드는 한 장만 가능합니다!')
      return
    } else if (len == 0) return
    let file = filelist[0]
    if (!file.type.match("image/.*")) {
      alert('사진만 업로드 가능합니다!')
      return
    }
    let reader = new FileReader()
    reader.onload = e => {
      this.init(e.target.result)
    }
    reader.readAsDataURL(file)
  }
}

window.onload = () => {
  let v = new App()
}