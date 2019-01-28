import Vue from 'vue'

const DIRECTIVE = 'table',
  LEFT_SHADOW = document.createElement('div'),
  RIGHT_SHADOW = document.createElement('div'),
  ADD_STYLE = `width: 20px; position: absolute;`

// Register a global custom directive called `v-table`
Vue.directive(DIRECTIVE, {
  inserted: el => {
    const MOBILE_SCREEN_SIZE = 640,
      SCREEN_WIDTH = window.innerWidth
    if (SCREEN_WIDTH <= MOBILE_SCREEN_SIZE) {
      el.style.cssText = 'overflow-x: scroll;'
      const findHeight = el.clientHeight
      el.prepend(RIGHT_SHADOW)
      RIGHT_SHADOW.style.cssText = `${ADD_STYLE}
       box-shadow: -5px 0px 5px 0px rgba(0,0,0,0.15) inset;
       right: 10px; height: ${findHeight + 'px'} `
    }
    el.addEventListener('scroll', () => {
      const findWidth = el.scrollWidth - el.clientWidth,
        findHeight = el.clientHeight,
        GET_WIDTH = (el.scrollLeft / findWidth) * 100,
        CHECK_OVERFLOW_X = el.style.overflowX

      if (CHECK_OVERFLOW_X == 'scroll') {
        if (Math.round(GET_WIDTH) > 2) {
          el.prepend(LEFT_SHADOW)
          LEFT_SHADOW.style.cssText = `${ADD_STYLE}
           box-shadow: 5px 0px 5px 0px rgba(0,0,0,0.15) inset;
           left: 10px; height: ${findHeight + 'px'} `
        } else if (Math.round(GET_WIDTH) === 0) {
          el.removeChild(LEFT_SHADOW)
        }
        if (Math.round(GET_WIDTH) < 98) {
          el.prepend(RIGHT_SHADOW)
          RIGHT_SHADOW.style.cssText = `${ADD_STYLE}
           box-shadow: -5px 0px 5px 0px rgba(0,0,0,0.15) inset;
           right: 10px; height: ${findHeight + 'px'} `
        } else if (Math.round(GET_WIDTH) === 100) {
          el.removeChild(RIGHT_SHADOW)
        }
      }
    })
  },
})
