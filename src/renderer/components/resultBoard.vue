<template>
  <div>
    <span>
      The process will be shown here:
      <p><i :class="computedStyle"></i>{{ computedFrameData }}</p>
    </span>
    <br>
    <span>
      The result will be shown here:
      <p>{{ mini }}</p>
    </span>
    <!-- <div id="code-container">
      <highlight-code lang="python">
        def closest(lef,rig):
          if rig-lef <= 3:
            for i in range(lef,rig+1):
              for j in range(i+1,rig+1):
                update(ps[i],ps[j])
            sort(points,lef,rig+1,cmpy)
          mid = (lef + rig) / 2
          midval = points[mid].x
          closest(lef, mid)
          closest(mid + 1, rig)
          buffer = []
          merge(points, lef, mid + 1, points, mid + 1, rig + 1, buffer)
          sort(buffer, 0, buffer.length - 1, cmpy)
          copy(buffer, 0, rig - lef + 1, points, lef)    
      </highlight-code>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ['framedata'],
  name: 'resultBoard',
  data () {
    return {
      mini: 'INFINITY'
    }
  },
  computed: {
    computedFrameData: function () {
      // console.log('in receiver')
      // console.log(this.framedata)
      if (this.framedata === undefined) {
        return ''
      }
      const Type = this.framedata.split(':')[0]
      // console.log(Type)
      if (Type === 'intervalMove') {
        return ' Division'
      } else if (Type === 'bruteCalcDis') {
        return ' Brute Force'
      } else if (Type === 'calcInStrip' || Type === 'stripBound') {
        return ' Merge'
      } else if (Type === 'done') {
        return ' Done!'
      }
    },
    computedStyle: function () {
      // console.log('in computedStyle, this.framedata is')
      // console.log(this.framedata)
      if (this.framedata === undefined) {
        return ''
      } else if (this.framedata.indexOf('done') !== -1) {
        return 'make-green el-icon-check'
      } else {
        return 'make-blue el-icon-loading'
      }
    }
  },
  watch: {
    framedata: function () {
      if (this.framedata.indexOf('done') !== -1) {
        // console.log('debug for showing result')
        // console.log(this.framedata)
        this.mini = this.framedata.split(':')[1]
      }
    }
  }
}
</script>

<style scoped>
span {
  font-weight: bold;
}

.make-green {
  font-weight: bold;
  color: green;
}

.make-blue {
  color: rgb(144, 202, 249);
}

#code-container {
  margin-top: 10vh;
}

</style>