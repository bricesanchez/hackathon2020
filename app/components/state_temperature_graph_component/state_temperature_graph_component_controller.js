import ApplicationController from '../../javascript/controllers/application_controller'

/* This is the custom StimulusReflex controller for the Example Reflex.
 * Learn more at: https://docs.stimulusreflex.com
 */
export default class extends ApplicationController {
  static targets = ["data"]
  initialize() {
    console.log("init")
  }

  connect () {
    super.connect()
    console.log(this.dataTarget.dataset.value)
  }

  beforeReflex(element, reflex, noop, reflexId) {
    console.log("before")
  }
}
