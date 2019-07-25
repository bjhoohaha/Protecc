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
import firebase from '../firebase'
import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'
import DoughnutChart from './DoughnutChart.vue'

const db = firebase.db
export default {
  name: 'packet-stats',
  data () {
    return {
      dateData: {},
      protocolData: {},
      lengthData: {}
    }
  },
  components: {
    BarChart,
    LineChart,
    DoughnutChart
  },
  firebase: {
    dateData: db.ref('stats/date'),
    protocolData: db.ref('stats/protocol'),
    lengthData: db.ref('stats/length')
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
        labels: Object.keys(this.protocolData),
        datasets: [
          {
            label: 'Packet Count',
            backgroundColor: [
              '#EF9A9A',
              '#F48FB1',
              '#CE93D8',
              '#B39DDB',
              '#9FA8DA',
              '#90CAF9',
              '#81D4FA',
              '#80DEEA',
              '#80CBC4',
              '#A5D6A7',
              '#C5E1A5',
              '#E6EE9C',
              '#FFF59D',
              '#FFE082',
              '#FFCC80',
              '#FFAB91',
              '#BCAAA4',
              '#B0BEC5'
            ],
            data: Object.values(this.protocolData)
          }
        ]
      }
    },
    getLengthData: function () {
      return {
        labels: [
          '0-100',
          '100-200',
          '200-500',
          '500-1000',
          '1000-1500',
          '> 1500'
        ],
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
            data: Object.values(this.lengthData)
          }
        ]
      }
    },
    getDateData: function () {
      return {
        labels: Object.keys(this.dateData),
        datasets: [
          {
            label: 'Packet Count',
            borderColor: '#81D4FA',
            pointBackgroundColor: '#A5D6A7',
            pointHoverBorderColor: '#2E7D32',
            pointHoverBorderWidth: 3,
            fill: false,
            data: Object.values(this.dateData)
          }
        ]
      }
    }
  }
}
</script>
