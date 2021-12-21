import ApplicationController from './application_controller'

/* This is the custom StimulusReflex controller for the Example Reflex.
 * Learn more at: https://docs.stimulusreflex.com
 */
export default class extends ApplicationController {
  connect () {
    super.connect()
  }

  validate() {
    setTimeout(() => {
  
      const old_action = this.element.getAttribute("action")
      this.element.setAttribute("action", "/comments/validate_new")
      this.element.requestSubmit()
      this.element.setAttribute("action", old_action)
              
    }, 100)
  }
}
