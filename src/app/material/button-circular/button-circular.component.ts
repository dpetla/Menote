import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-circular',
  templateUrl: './button-circular.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCircularComponent {
  @Input() public tooltip = '';
  @Output() public handleClick = new EventEmitter<void>();
}
