import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "mt-action-button",
  templateUrl: "./action-button.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent implements AfterViewInit {
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  @Input() frontLabel: string;
  @Input() backLabel: string;
  @Input() disabled: boolean = false;

  handleClick(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }

  ngAfterViewInit(): void {
    var btn: any = document.querySelector('.btn');

    var btnFront = btn.querySelector('.btn-front');

    btnFront.addEventListener('click', (event: any) => {
      if (!this.disabled) {
        var mx = event.clientX - btn.offsetLeft,
          my = event.clientY - btn.offsetTop;

        var w = btn.offsetWidth,
          h = btn.offsetHeight;

        var directions = [
          { id: 'top', x: w / 2, y: 0 },
          { id: 'right', x: w, y: h / 2 },
          { id: 'bottom', x: w / 2, y: h },
          { id: 'left', x: 0, y: h / 2 }
        ];

        directions.sort(function (a, b) {
          return distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y);
        });

        btn.setAttribute('data-direction', directions.shift().id);
        btn.classList.add('is-open');
      }
    });

    function distance(x1: any, y1: any, x2: any, y2: any) {
      var dx = x1 - x2;
      var dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
}