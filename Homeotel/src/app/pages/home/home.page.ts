import { Component, OnInit } from "@angular/core";
import { CommonService } from "./../../services/common.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  healthTips = [
    {
      avatar:
        "https://m.media-amazon.com/images/M/MV5BNDdhMzMxOTctNDMyNS00NTZmLTljNWEtNTc4MDBmZTYxY2NmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      time: "150024551241",
    },
    {
      avatar:
        "https://m.media-amazon.com/images/M/MV5BZTEyMTlmYTUtMDE0My00NWJmLWJlZmEtNzhjNGI0Mzk0NTA4XkEyXkFqcGdeQXVyNTkzNDQ4ODc@._V1_SX300.jpg",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      time: "150024551242",
    },
    {
      avatar:
        "https://m.media-amazon.com/images/M/MV5BYzM0ZTg2OTEtNzI4My00NjBlLWFhYTctY2E4NzdiYzY1YWYwXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      time: "150024551243",
    },
  ];

  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  search() {
    console.log("Clicked on Search");
  }
}
