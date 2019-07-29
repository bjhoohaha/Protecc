<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  // reactiveProp allow for chart data and options
  // from parent component to be passed as prop
  mixins: [reactiveProp],
  name: 'LineChart',
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              // x axis as time
              type: 'time',
              time: {
                unit: 'day'
              },
              ticks: {
                beginAtZero: true,
                display: false
              }
            }
          ]
        }
      }
    }
  },
  mounted () {
    // bind data to render the chart with props passed in
    this.renderChart(this.chartData, this.options)
  }
}
</script>
