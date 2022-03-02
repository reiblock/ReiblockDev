import { Component, HostListener, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("openCloseToggel", { static: true }) openCloseToggel: any;
  headerScroll = false;
  menuOpen: any;
  isShow = false;
  dropdown: any;
  sideNavOpened = false;

  @HostListener("document:scroll")
  scroll() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.headerScroll = true;
    } else {
      this.headerScroll = false;
    }
  }

  constructor() {}

  ngOnInit(): void {
  }

  onToggel(id: any) {
    this.dropdown = document.getElementById(id);
    if (this.dropdown.style.display === "block") {
      this.dropdown.style.display = "none";
    } else {
      this.dropdown.style.display = "block";
    }
  }
}
