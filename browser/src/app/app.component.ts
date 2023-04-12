import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mt-root',
  template: `
  <tui-root>
    <router-outlet></router-outlet>
  </tui-root>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
