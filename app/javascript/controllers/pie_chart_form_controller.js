import { Controller } from 'stimulus'

export default class extends Controller {
  submit(event) {
    const element = event.target
    const current_url = new URL(document.location)
    current_url.searchParams.set(element.id, element.value)
    history.pushState({}, '', current_url)
    this.element.requestSubmit()
  }
}
