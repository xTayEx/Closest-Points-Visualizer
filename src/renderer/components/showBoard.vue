<template>
  <div>
    <div id="controlPane">
      <el-input
        v-model="pointsCount"
        placeholder="Input the point count"
      ></el-input>
      <el-button 
        id="genButton" 
        @click="fillTheBoard()"
        round
        type="primary"
        icon="el-icon-check"
        :disabled="enableFlag === true"
        >
        Generate
      </el-button>
      <el-button
        id="solveButton"
        @click="solve()"
        round
        type="primary"
        icon="el-icon-s-opportunity"
        :disabled="enableFlag === true"
      >
        Solve it!
      </el-button>
    </div>
    <chart :options="Options" :auto-resize="true" id="pane"></chart>
  </div>
</template>

<script>
// import test from 'nearest-points'
import nearestPoints from 'nearest-points'
import Point from 'nearest-points/Point'

/* eslint-disable no-unused-vars */
export default {
  name: 'showBoard',
  data () {
    return {
      Options: {},
      pointsCount: 10,
      pointsData: [
        [0, 0],
        [200, 200],
        [400, 400],
        [600, 600],
        [800, 800],
        [1000, 1000]
      ],
      renderQ: [],
      renderDoneFlag: false,
      miniDis: undefined,
      enableFlag: false
    }
  },
  mounted () {
    // console.log(this.enableFlag)
    this.Options = {
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        left: '7%',
        right: '3%'
      },
      series: [{
        data: this.pointsData,
        type: 'scatter',
        itemStyle: {
          color: 'rgb(144, 202, 249)'
        }
      }, {
        name: 'left',
        data: [
          [],
          []
        ],
        type: 'line',
        lineStyle: {
          color: '#ff9100'
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{a}'
        }
      }, {
        name: 'right',
        data: [
          [],
          []
        ],
        type: 'line',
        lineStyle: {
          color: '#ff9100'
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{a}'
        }
      }, {
        // 暴力计算距离时两点之间的连线
        data: [],
        type: 'line',
        lineStyle: {
          color: 'black'
        },
        smooth: true
      }, {
        // 计算带状区域时两点之间的连线
        data: [],
        type: 'line',
        lineStyle: {
          color: '#9575cd'
        },
        smooth: true
      }, {
        // 带状区域的左边界
        data: [],
        type: 'line',
        lineStyle: {
          color: '#26a69a',
          type: 'dashed'
        }
      }, {
        // 带状区域的右边界
        data: [],
        type: 'line',
        lineStyle: {
          color: '#26a69a',
          type: 'dashed'
        }
      }]
    }
  },
  methods: {
    getRandomPoints: function (n) {
      let ret = []
      for (let i = 0; i < n; i++) {
        let x = Math.random() * 1000
        let y = Math.random() * 1000
        ret.push([x, y])
      }
      return ret
    },
    fillTheBoard: function () {
      const points = this.getRandomPoints(this.pointsCount)
      this.pointsData = points
      this.Options.series[0].data = this.pointsData
    },
    solve: function () {
      this.enableFlag = true
      // this.Options.series[7].data = []
      this.renderDoneFlag = false
      let argPoints = []
      // console.log('this.pointsData.length = ' + this.pointsData.length)
      for (let i = 0; i < this.pointsData.length; i++) {
        // console.log(typeof Point)
        argPoints.push(new Point(this.pointsData[i][0], this.pointsData[i][1], i))
      }
      let ret = nearestPoints(argPoints)
      this.miniDis = ret.mini
      this.renderQ = ret.renderQueue
      // const ansPoint1 = ret.ans1
      // const ansPoint2 = ret.ans2
      // this.Options.series[7].data = [[ansPoint1.x, ansPoint1.y], [ansPoint2.x, ansPoint2.y]]
      this.renderQ.push({
        type: 'intervalMove',
        lef_x: undefined,
        rig_x: undefined
      })
      this.render()
    },
    render: function () {
      let _this = this
      // this.$emit('frame', 'emitDEBUG')
      for (let i = 0; i < _this.renderQ.length; i++) {
        (function (i) {
          setTimeout(function () {
            const sendData = _this.renderQ[i]
            _this.$emit('frame', sendData.type)
            // console.log(i)
            const frame = _this.renderQ[i]
            if (frame.type === 'intervalMove') {
              let lef = frame.lef_x
              let rig = frame.rig_x
              _this.Options.series[1].data = [[lef, 0], [lef, 1000]]
              _this.Options.series[2].data = [[rig, 0], [rig, 1000]]
            } else if (frame.type === 'bruteCalcDis') {
              let ix = frame.ix
              let iy = frame.iy
              let jx = frame.jx
              let jy = frame.jy
              _this.Options.series[3].data = [[ix, iy], [jx, jy]]
            } else if (frame.type === 'stripBound') {
              let lef = frame.lef_x
              let rig = frame.rig_x
              _this.Options.series[5].data = [[lef, 0], [lef, 1000]]
              _this.Options.series[6].data = [[rig, 0], [rig, 1000]]
              _this.Options.series[1].data = []
              _this.Options.series[2].data = []
            } else if (frame.type === 'calcInStrip') {
              // console.log('calcInStrip')
              let ix = frame.ix
              let iy = frame.iy
              let jx = frame.jx
              let jy = frame.jy
              _this.Options.series[4].data = [[ix, iy], [jx, jy]]
            }
            if (i === _this.renderQ.length - 1) {
              _this.renderDoneFlag = true
            }
          }, (i + 1) * 1000)
        })(i)
      }
    }
  },
  watch: {
    renderDoneFlag: function () {
      if (this.renderDoneFlag === true) {
        this.enableFlag = false
        this.$message({
          showClose: true,
          message: 'Done!',
          type: 'success'
        })
        this.$emit('frame', 'done:' + Number.parseFloat(this.miniDis).toFixed(4))
      }
    }
  }
}
</script>

<style>
#controlPane, #pane {
  position: absolute;
  /* left: 50%; */
  /* transform: translateX(-50%); */
}

#controlPane {
  top: 5%;
  width: 60vw;
}

#pane {
  top: 10%;
}

#genButton {
  margin-left: 3vw;
}

#controlPane {
  display: inline-flex;
}

.el-input__inner {
  border-radius: 20px !important;
}
</style>