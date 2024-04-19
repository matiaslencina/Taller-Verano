import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.components.html',
  styleUrls: ['./form.components.css']
})
export class FormComponents {
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();

  onKeyDown(event: KeyboardEvent): void {
    this.keydownEvent.emit(event);
    event.stopPropagation(); // detiene la propagación del evento
  }
}