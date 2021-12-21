import ApplicationController from '../../javascript/controllers/application_controller'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

import 'chartjs-adapter-date-fns';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle)

/* This is the custom StimulusReflex controller for the Example Reflex.
 * Learn more at: https://docs.stimulusreflex.com
 */
export default class extends ApplicationController {
  static targets = ["data", "canvas"]
  

  connect (){ 
    super.connect()
    this.colors = ["#61615A", "#BA0900", "#6B7900", "#00C2A0", "#FFAA92", "#FF90C9", "#B903AA", "#D16100",
  "#DDEFFF", "#000035", "#7B4F4B", "#A1C299", "#300018", "#0AA6D8", "#013349", "#00846F",
  "#372101", "#FFB500", "#C2FFED", "#A079BF", "#CC0744", "#C0B9B2", "#C2FF99", "#001E09"]
    this.make_chart()
  }

  make_chart() {
    const datasets = this.buildData()
    this.chart = new Chart(this.canvasTarget.getContext('2d'), {
      type: "scatter",
      data: {
        datasets: datasets,
        options: {
          scales: {
            x: {
              // The axis for this scale is determined from the first letter of the id as `'x'`
              // It is recommended to specify `position` and / or `axis` explicitly.
              type: 'time',
              time: {
                time: {
                  unit: 'year'
                }
              },

              title: {
                display: true,
                text: 'Date'
              }     
            }
          }
        }
      } 
    })
  }

  afterReflex(element, reflex, noop, reflexId) {
    this.chart.destroy()
    this.make_chart()

    const current_url = new URL(document.location)
    current_url.searchParams.set(element.id, element.value)
    history.pushState({}, '', current_url)
  }

  buildData() {
    const datasets = []
    const parsed_data = JSON.parse(this.dataTarget.dataset.value)
    let index = 0
    Object.keys(parsed_data).forEach(key => {

      const current_data = []
      parsed_data[key].forEach(data => {
        current_data.push(
          { x: Date.parse(data.x)/1000/60/60/24/365 + 1970, y: parseFloat(data.y) }
        )
      })
      datasets.push({
        label: key,
        backgroundColor: this.colors[index],
        data: current_data,
      })
      index += 1
    })
    return datasets
  }
}
