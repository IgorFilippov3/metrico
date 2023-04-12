import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { SidebarItemModel } from "./models/sidebar-item.model";

@Component({
  selector: "mt-sidebar",
  templateUrl: "./sidebar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  items: SidebarItemModel[];

  ngOnInit(): void {
    this.items = [
      { label: 'Control Panel', path: "/panel/how-to", exact: false },
      { label: "lighthouse metrics", path: "/lighthouse", exact: false, },
      { label: "User Experience Reports ", path: "/user-experience", exact: false },
      { label: "Code Coverage", path: "/code-coverage", exact: false, beta: true },
      { label: "FAQ", path: "/faq", exact: false },
    ];
  }
}