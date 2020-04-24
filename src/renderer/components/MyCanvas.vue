<template>
  <div>
    <canvas ref="my-canvas"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'MyCanvas',
    data () {
      return {
        ctx: null
      }
    },
    props: {
      draw_line_flag: Number
    },
    methods: {
      initCanvas () {
        console.log('initializing the canvas')
        let canvas = this.$refs['my-canvas']
        this.ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // this.drawSmile()
        // this.drawLine()
        // this.drawCircle()
        console.log('what is this')
        console.log(this)
      },
      drawSmile () {
        const ctx_ = this.ctx
        ctx_.beginPath()
        ctx_.arc(75, 75, 50, 0, Math.PI * 2, true)
        ctx_.moveTo(110, 75)
        ctx_.arc(75, 75, 35, 0, Math.PI, false)
        ctx_.moveTo(65, 65)
        ctx_.arc(60, 65, 5, 0, Math.PI * 2, true)
        ctx_.moveTo(95, 65)
        ctx_.arc(90, 65, 5, 0, Math.PI * 2, true)
        ctx_.stroke()
      },
      drawLine () {
        const ctx_ = this.ctx
        ctx_.beginPath()
        ctx_.moveTo(120, 75)
        ctx_.lineTo(120, 20)
        ctx_.stroke()
      },
      drawCircle (x, y) {
        const ctx_ = this.ctx
        ctx_.beginPath()
        ctx_.arc(x, y, 2, 0, 2 * Math.PI, true)
        ctx_.fill()
        ctx_.stroke()
      },
      drawRandomPoint () {
        let x = Math.round((Math.random() * window.innerWidth))
        let y = Math.round((Math.random() * window.innerHeight))
        this.drawCircle(x, y)
      }
    },
    mounted () {
      this.initCanvas()
      window.onresize = () => {
        this.initCanvas()
      }
    },
    watch: {
      draw_line_flag: function (newVal, oldVal) {
        this.drawRandomPoint()
      }
    }
  }
</script>

<style>
  
</style>