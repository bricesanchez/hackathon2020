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

  connect () {
    super.connect()
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
            xAxis: {
              // The axis for this scale is determined from the first letter of the id as `'x'`
              // It is recommended to specify `position` and / or `axis` explicitly.
              type: 'time',
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
    Object.keys(parsed_data).forEach(key => {

      const current_data = []
      parsed_data[key].forEach(data => {
        current_data.push(
          { x: Date.parse(data.x), y: parseFloat(data.y) }
        )
      })
        
      datasets.push({
        label: key,
        data: current_data,
        xAxisID: 'xAxis'
      })
    })
    return datasets
  }
}
