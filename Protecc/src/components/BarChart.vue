<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  // reactiveProp allow for chart data and options
  // from parent component to be passed as prop
  mixins: [reactiveProp],
  name: 'BarChart',
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: { beginAtZero: true }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },
  options: {},
  mounted () {
    // bind data to render the chart with props passed in
    this.renderChart(this.chartData, this.options)
  }
}
</script>
