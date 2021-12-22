import { Controller } from 'stimulus'
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
export default class extends Controller {
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
    console.log(datasets)
    console.log(this.canvasTarget)
    this.chart = new Chart(this.canvasTarget.getContext('2d'), {
      type: "doughnut",
      data: datasets
    })
  }

  buildData() {
    const rawdata = JSON.parse(this.dataTarget.dataset.value)
    const labels = []
    const dataset = [{data: [], backgroundColor: []}]
    let index = 0
    Object.keys(rawdata).forEach(key => {
      labels.push(parseInt(key).toString() + "h")
      dataset[0]["data"].push(rawdata[key])
      dataset[0]["backgroundColor"].push(this.colors[index])
      index += 1
    })
    return {labels: labels, datasets: dataset}
  }
}
