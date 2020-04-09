import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-edit-file",
  templateUrl: "./edit-file.page.html",
  styleUrls: ["./edit-file.page.scss"],
})
export class EditFilePage implements OnInit {
  selectedFile;
  action;
  photo;

  fileTypesMasters;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private utilities: UtilitiesService
  ) {
    console.log("this.utilities.filesPageState is below");
    console.log(this.utilities.filesPageState);
    console.log("this.utilities.selectedRelativeId is below");
    console.log(this.utilities.selectedRelativeId);
    this.photo = this.utilities.filesPageState["photo"];
    this.selectedFile = this.utilities.filesPageState["fileTypeId"];
    if (this.utilities.filesPageState["type"] == "add") {
      this.action = "Add File";
    } else {
      this.action = "Edit File";
    }
  }

  ngOnInit() {
    this.fileTypesMasters = this.utilities.filesPageState["fileTypesMasters"];
    console.log("this.fileTypesMasters are showing below");
    console.log(this.fileTypesMasters);
  }

  selectFile(id) {
    console.log("Selected file ID -> " + id);
    this.selectedFile = id;
  }

  save() {
    console.log("About to upsert files's data into DB");
    console.log("this.utilities.filesPageState is below");
    console.log(this.utilities.filesPageState);

    let selectedFile = this.selectedFile;
    if (!selectedFile) {
      alert("Please select file type");
    }

    let fileId = this.utilities.filesPageState["fileId"];
    let fileTypeId = selectedFile;
    let relativeId = this.utilities.selectedRelativeId;
    let photo = this.utilities.filesPageState["photo"];

    if (relativeId && fileTypeId && photo) {
      console.log("Submit");

      this.apiService
        .upsertFileDetails(fileId, relativeId, fileTypeId, photo)
        .subscribe((data) => {
          console.log("Returned from Backend");
          console.log(JSON.stringify(data));
          if (this.utilities.isInvalidApiResponseData(data)) {
            console.log("Returned Error");
            console.log(data[0][0]);
            if (data[0][0]["error"]) {
              console.log("Something went wrong");
            }
          } else {
            console.log("Returned Success");
            this.router.navigate(["/files"]);
          }
        });
    }
  }
}
