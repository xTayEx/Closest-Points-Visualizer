<template>
  <div id="app">
    <div id="container">
      <resultBoard id="result" :framedata="frameData"></resultBoard>
      <showBoard id="show" @frame="frameHandle"></showBoard>
    </div>
  </div>
</template>

<script>
  import LandingPage from '@/components/LandingPage'
  import MyCanvas from '@/components/MyCanvas'
  import showBoard from '@/components/showBoard'
  import resultBoard from '@/components/resultBoard'
  export default {
    name: 'nearest_points_visualize',
    components: {
      MyCanvas,
      LandingPage,
      showBoard,
      resultBoard
    },
    data () {
      return {
        drawer: false,
        direction: 'ltr',
        drawFlag: 0,
        frameData: undefined
      }
    },
    methods: {
      handleClose (done) {
        this.$confirm('close?')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      changeFlag () {
        // console.log('asdfasdf')
        this.drawFlag = (this.drawFlag + 1) % 10
        // console.log(this.drawFlag)
      },
      switchFlag () {
        console.log('in switchFlag')
      },
      frameHandle (e) {
        this.frameData = e
      }
    }
  }
</script>

<style>
body, html {
  width: 100%;
  height: 100%;
}

#container {
  display: flex;
  width: 100%;
  height: 100%;
}

#result {
  padding-top: 4vh;
  padding-left: 2vw;
  width: 30vw;
  margin-right: 2vw;
}

#show {
  margin-left: 1vw;
}
</style>
