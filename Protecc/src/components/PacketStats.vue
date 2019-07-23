<template>
  <div id="packet-stats">
    <h3>Packets Overview</h3>
    <v-container>
      <v-layout>
        <v-flex xs2 md3 lg2 />
        <!-- Displays packet count on each date -->
        <v-flex xs8 md6 lg8>
          <!-- Bind date data to chart data -->
          <LineChart v-bind:chartData="getDateData" />
          <br />
        </v-flex>
        <v-flex xs2 md3 lg2 />
      </v-layout>
      <v-layout>
        <!-- Displays packet count on different packet length -->
        <v-flex xs6>
          <!-- Bind length data to chart data -->
          <BarChart v-bind:chartData="getLengthData" />
        </v-flex>
        <!-- Displays packet count of different protocol -->
        <v-flex xs6>
          <!-- Bind protocol data to chart data -->
          <DoughnutChart v-bind:chartData="getProtocolData" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'
import DoughnutChart from './DoughnutChart.vue'

export default {
  name: 'packet-stats',
  data () {
    return {}
  },
  components: {
    BarChart,
    LineChart,
    DoughnutChart
  },
  computed: {
    // test data set
    getData: function () {
      return {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: 'rgba(10, 255, 255, 0.1)',
            data: [10, 20, 30, 40, 50, 60, 70]
          }
        ]
      }
    },
    getProtocolData: function () {
      return {
        labels: this.$store.getters.getProtocolLabel,
        datasets: [
          {
            label: 'Packet Count',
            backgroundColor: [
              '#EF9A9A',
              '#F48FB1',
              '#B39DDB',
              '#90CAF9',
              '#80CBC4',
              '#FFF59D',
              '#FFAB91',
              '#BCAAA4'
            ],
            data: this.$store.getters.getProtocolData
          }
        ]
      }
    },
    getLengthData: function () {
      return {
        labels: this.$store.getters.getLengthLabel,
        datasets: [
          {
            label: 'Packet Count',
            backgroundColor: [
              '#EF9A9A',
              '#F48FB1',
              '#B39DDB',
              '#90CAF9',
              '#80CBC4',
              '#FFF59D'
            ],
            data: this.$store.getters.getLengthData
          }
        ]
      }
    },
    getDateData: function () {
      return {
        labels: this.$store.getters.getDateLabel,
        datasets: [
          {
            label: 'Packet Count',
            borderColor: '#81D4FA',
            pointBackgroundColor: '#A5D6A7',
            pointHoverBorderColor: '#2E7D32',
            pointHoverBorderWidth: 3,
            fill: false,
            data: this.$store.getters.getDateData
          }
        ]
      }
    }
  }
}
</script>
