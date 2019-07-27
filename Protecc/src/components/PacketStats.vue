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
          <!-- table for dates -->
          <v-data-table
            :headers="dateHeader"
            v-bind:items="dateTableValues"
            item-key="date"
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.date }}</td>
              <td class="text-xs-right">{{ props.item.count }}</td>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex xs2 md3 lg2 />
      </v-layout>
      <br />
      <v-divider light insert />
      <v-layout>
        <!-- Displays packet count on different packet length -->
        <v-flex xs6>
          <!-- Bind length data to chart data -->
          <BarChart v-bind:chartData="getLengthData" />
          <!-- table for length -->
          <v-data-table
            :headers="lengthHeader"
            v-bind:items="lengthTableValues"
            item-key="date"
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.length }}</td>
              <td class="text-xs-right">{{ props.item.count }}</td>
            </template>
          </v-data-table>
        </v-flex>
        <v-divider vertical />
        <v-divider vertical />
        <!-- Displays packet count of different protocol -->
        <v-flex xs6>
          <!-- Bind protocol data to chart data -->
          <DoughnutChart v-bind:chartData="getProtocolData" />
          <!-- table for count -->
          <v-data-table
            :headers="protocolHeader"
            v-bind:items="protocolTableValues"
            item-key="date"
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.protocol }}</td>
              <td class="text-xs-right">{{ props.item.count }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <br />
    <br />
    <br />
    <br />
    <br />
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
      lengthData: {},
      dateHeader: [
        {
          text: 'Date',
          align: 'left',
          value: 'date'
        },
        { text: 'Count', value: 'count' }
      ],
      lengthHeader: [
        {
          text: 'Length',
          align: 'left',
          sortable: false,
          value: 'length'
        },
        { text: 'Count', sortable: false, value: 'count' }
      ],
      protocolHeader: [
        {
          text: 'Protocol',
          align: 'left',
          value: 'protocol'
        },
        { text: 'Count', value: 'count' }
      ]
    }
  },
  components: {
    BarChart,
    LineChart,
    DoughnutChart
  },
  computed: {
    protocolTableValues: function () {
      return Object.entries(this.protocolData).map(entry => {
        return { protocol: entry[0], count: entry[1] }
      })
    },
    lengthTableValues: function () {
      return Object.entries(this.lengthData).map(entry => {
        return { length: entry[0], count: entry[1] }
      })
    },
    dateTableValues: function () {
      return Object.entries(this.dateData).map(entry => {
        return { date: entry[0], count: entry[1] }
      })
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
  },
  created () {
    const uid = this.$store.getters.getUID
    if (uid != null) {
      this.$rtdbBind('dateData', db.ref('users/' + uid + '/stats/date'))
      this.$rtdbBind('lengthData', db.ref('users/' + uid + '/stats/length'))
      this.$rtdbBind('protocolData', db.ref('users/' + uid + '/stats/protocol'))
    }
  }
}
</script>
