<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  // reactiveProp allow for chart data and options
  // from parent component to be passed as prop
  mixins: [reactiveProp],
  name: 'DoughnutChart',
  data () {
    return {
      options: {}
    }
  },
  options: {},
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
