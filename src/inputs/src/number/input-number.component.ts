import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Store } from '@qontu/component-store';
import * as fromConfig from '../base/store/index';
import { InputNumberConfig, INPUT_NUMBER_CONFIG } from './input-number.config';
import { InputBaseComponent } from '../base/input-base.component';
import {
  InlineEditorEvents,
  INLINE_EDITOR_TEMPLATE_CONFIG,
} from '@qontu/ngx-inline-editor';

@Component({
  selector: 'inline-editor-number',
  template: `
    <input
      #input
      type="number"
      class="inline-editor-input inline-editor-number"
      [ngModel]="value$ | async"
      (ngModelChange)="changeValue($event)"
      [disabled]="isDisabled$ | async"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
      (keyup.escape)="onEscape($event)"
      (keyup.enter)="onEnter($event)"
      (keypress)="onKeyPress($event)"
      [name]="config.name"
      [id]="config.id"
      [placeholder]="config.placeholder"
      [max]="config.max"
      [min]="config.min"
    />
  `,
  styleUrls: ['../base/input-base.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: Store,
      useFactory: fromConfig.createStore,
    },
  ],
})
export class InputNumberComponent extends InputBaseComponent<InputNumberConfig>
  implements OnInit {
  static type = 'number';
  type = InputNumberComponent.type;
  config: Partial<InputNumberConfig>;
  constructor(
    protected store$: Store<fromConfig.State>,
    ngControl: NgControl,
    protected events: InlineEditorEvents,
    @Inject(INLINE_EDITOR_TEMPLATE_CONFIG) globalConfig: any = {},
    @Inject(INPUT_NUMBER_CONFIG) inputConfig: InputNumberConfig,
    @Inject(INLINE_EDITOR_TEMPLATE_CONFIG) templateConfig: InputNumberConfig,
  ) {
    super(store$, ngControl, events);
    this.config = {
      ...globalConfig,
      ...inputConfig,
      ...templateConfig,
    };
  }
}