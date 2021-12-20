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
  initialize() {
    console.log("init")
  }

  connect () {
    super.connect()
    const datasets = this.buildData()
    console.log(datasets)
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

  buildData() {
    const datasets = []
    const parsed_data = JSON.parse(this.dataTarget.dataset.value)
    Object.keys(parsed_data).forEach(key => {

      const current_data = []
      parsed_data[key].forEach(data => {
        console.log(Date.parse(data.x))
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

  changeGraphFilter(event) {
    
  }

  beforeReflex(element, reflex, noop, reflexId) {
    console.log("before")
  }
}
