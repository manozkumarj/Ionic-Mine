import { Component, OnInit } from "@angular/core";
import { WheelSelector } from "@ionic-native/wheel-selector/ngx";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { LoadingController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: "app-edit-prescription",
  templateUrl: "./edit-prescription.page.html",
  styleUrls: ["./edit-prescription.page.scss"],
})
export class EditPrescriptionPage implements OnInit {
  currentSubTitle;
  currentTitle;
  drugSelected = false;
  backwardLink;
  forwardLink;
  columnValue;
  columnName;
  scales = [];
  unSelectedList = [];
  filteredList = [];
  selectedList = [];
  filteredPotencies = [];
  inputField: any;
  potencies = [];
  instructions = [];
  selectedInstructions = [];
  dateOptions: any =[];
  dateValue: any;
  selectedDate: any;
  daysFromDatabase;

  constructor(
    private selector: WheelSelector,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private loadingController : LoadingController,
    private db : DatabaseService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      this.currentUrl(params["type"]);   
    //this.loadMasters();
    this.loadMastersFromSqlLite();
    this.loadPotenciesMasters();
    this.loadDrugs();
   // this.updateData();
    this.updateDataFromSqlLite()
    });
    
  }

  currentUrl(type) {
    switch (+type) {
      case 1:
        console.log(+type);

        this.backwardLink = `/prescription/${this.commonService.currentAppointmentId}`;
        this.currentTitle = "Drug";
        this.forwardLink = "/edit-prescription/1/2";
        this.currentSubTitle = "Please select drug";
        this.columnName = "drug_id";

        break;
      case 2:
        this.backwardLink = `/prescription/${this.commonService.currentAppointmentId}`;
        this.currentTitle = "Scale";
        this.forwardLink = "/edit-prescription/1/2/3";
        this.currentSubTitle = "Please select scale";
        this.columnName = "scale_id";

        break;

      case 3:
        this.currentTitle = "Potency";
        this.currentSubTitle = "Please select potency";
        this.forwardLink = "/edit-prescription/1/2/3/4";
        this.backwardLink = "/edit-prescription/1/2";
        this.columnName = "potency_id";
        break;

      case 4:
        this.currentTitle = "Instructions";
        this.currentSubTitle = "Please select instruction";
        this.forwardLink = "/edit-prescription/1/2/3/4/5";
        this.backwardLink = "/edit-prescription/1/2/3";
        this.columnName = "instruction_id";
        break;

      case 5:
        this.currentTitle = "No of days";
        this.currentSubTitle = "Please select days";
        this.forwardLink = `/prescription/${this.commonService.currentAppointmentId}`;
        this.backwardLink = "/edit-prescription/1/2/3/4";
        this.columnName = "no_of_days";

        
      // Generating Weight options
      for (let i = 1; i <= 15; i++) {
        this.dateOptions.push({ description: i.toString() });
      }
      this.updateData()
      this.updateDataFromSqlLite();
      this.dateValue = this.daysFromDatabase? this.daysFromDatabase:1;
      this.selectDays();
      console.log("dateOptions are below");
      console.log(this.dateOptions);

     // this.dateValue = this.utilities.profilePageDetails["weight"];

        break;
    }
  }

  
  selectDays() {
    this.selector
      .show({
        title: "Select days",
        items: [this.dateOptions],
        positiveButtonText: "Done",
        negativeButtonText: "Cancel",
        theme: "light",
        wrapWheelText: true,
        defaultItems: [
          //the number '2'
          {
            index: 0,
            value: this.dateOptions[this.dateValue].description,
          },
        ],
      })
      .then(
        (result) => {
          console.log("Selected Weight value is --> " + result[0].description);
          console.log(result[0].description + " at index: " + result[0].index);
          this.dateValue = result[0].index;
          this.selectedDate = this.inputField = result[0].description;
        },
        (err) => console.log("Error: ", err)
      );
  }

  loadDrugs() {
    this.commonService.currentDrugs.forEach(currentDrug=>{
      this.unSelectedList.forEach(data=>{
        if(currentDrug==data.id){
            data.isCurrentDrug = true;
        }
      })
    });

    
    this.unSelectedList.forEach(data=>{
      if(!data.isCurrentDrug){
        this.filteredList.push(data);
      }
    })

  }
  async loadMastersFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getPrecriptionMasters()
            .then((res: any[]) => {
              
              console.log(res);
              this.resetMasters();
              res.forEach((data) => {
                if (data.master_type == "drugs") {
                  this.unSelectedList.push({
                    id: data.id,
                    name: data.name,
                    isCurrentDrug : false
                  });
                } else if (data.master_type == "scale") {
                  this.scales.push({
                    id: data.id,
                    name: data.name,
                  });
                } else if (data.master_type == "instruction") {
                  this.instructions.push({
                    id: data.id,
                    name: data.name,
                    isSelected: false,
                  });
                }
              });
             
            
           
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadMastersFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }
  
  
  async loadPotenciesMasters() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getPotenciesMasters()
            .then((res: any[]) => {
              
              console.log(res);
              this.potencies = [];
              this.potencies = res;
             
            
           
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "loadPotenciesMasters" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }
  
  

  loadMasters() {
    this.apiService.getMasters().subscribe((data) => {
      if (this.utilities.isInvalidApiResponseData(data)) {
        console.log(data);
        this.commonService.presentToast("Something went wrong", "toastError");
      } else {
        console.log(data);
        this.resetMasters();
        data[0].forEach((data) => {
          if (data.master_type == "drugs") {
            this.unSelectedList.push({
              id: data.id,
              name: data.name,
              isCurrentDrug : false
            });
          } else if (data.master_type == "scale") {
            this.scales.push({
              id: data.id,
              name: data.name,
            });
          } else if (data.master_type == "instruction") {
            this.instructions.push({
              id: data.id,
              name: data.name,
              isSelected: false,
            });
          }
        });
        console.log(this.instructions);
        data[1].forEach((data) => {
          this.potencies.push(data);
        });
        console.log(this.potencies);
        
        

        this.loadDrugs();
      }
    });
  }

  onChange(searchedValue) {
    if (!searchedValue) {
      this.filteredList = this.unSelectedList;
    }
    this.filteredList = this.unSelectedList.filter((item) => {
      return item.name.toLowerCase().indexOf(searchedValue.toLowerCase()) > -1;
    });
  }

  drugChanged(id) {
    var index = this.unSelectedList.findIndex((data) => {
      return data.id === id;
    });
    this.selectedList = [];
    this.drugSelected = true;
    this.selectedList = this.unSelectedList[index];
    this.commonService.currentDrugId = this.columnValue = this.selectedList[
      "id"
    ];
    this.submit();
  }

 async submit() {
    if (this.currentTitle == "Instructions") {
      var instructionIds = [];
      this.instructions.forEach((data) => {
        if (data.isSelected) {
          instructionIds.push(data.id);
        }
      });
      console.log(instructionIds.join());
      this.columnValue = instructionIds.join();
    }
     if(this.currentTitle =="No of days"){
       this.columnValue = this.selectedDate
     }
     const loading = await this.loadingController
     .create({
       message: "saving...",
       translucent: true,
     })
     .then((a) => {
       a.present().then(async (res) => {
    
    this.apiService
      .savePrescription(
        this.commonService.currentAppointmentId,
        this.commonService.currentDoctorId,
        this.commonService.currentUserId,
        this.commonService.currentRelativeId,
        this.commonService.currentDrugId,
        this.columnName,
        this.columnValue
      )
      .subscribe((data) => {
        a.dismiss();
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
        } else {
          
          let res = data[0][0];
          if (data[0][0]["query"]) {
            let receivedQuery = res["query"];
            console.log(receivedQuery);
            this.db
                    .crudOperations(receivedQuery)
                    .then((res) => {
                      a.dismiss();
                      this.router.navigate([this.forwardLink]);
                      this.commonService.presentToast(
                        "data Updated successfully",
                        "toastSuccess"
                      );
                    })
                    .catch((error) => {
                      this.utilities.sqlLiteErrorTrigger( "submit" , error);
                      this.commonService.presentToast(
                        "Something went wrong",
                        "toastError"
                      );
                      a.dismiss();
                      console.error(
                          JSON.stringify(error)
                      );
                    });
           
          }
        }
      });
      });
      });
  }

  scaleChanged(scaledId) {
    console.log(scaledId);
    this.columnValue = scaledId;
    this.filterPotency(scaledId);
    this.submit();
  }
  filterPotency(scaledId) {
    this.filteredPotencies = [];
    this.potencies.forEach((data) => {
      if (data.scale_id == scaledId) {
        this.filteredPotencies.push({
          id: data.potency_id,
          name: data.name,
        });
      }
    });
    console.log(this.filteredPotencies);
  }
  resetMasters() {
    this.potencies = [];
    this.filteredList = [];
    this.unSelectedList = [];
    this.scales = [];
    this.potencies = [];
    this.filteredPotencies = [];
    this.instructions = [];
  }

  potencyChanged(potencyId) {
    console.log(potencyId);
    this.columnValue = potencyId;
    this.submit();
  }
  async updateDataFromSqlLite() {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDrugDetail(
              this.commonService.currentAppointmentId,
              this.commonService.currentDoctorId,
              this.commonService.currentUserId,
              this.commonService.currentRelativeId,
              this.commonService.currentDrugId
            )
            .then((res: any[]) => {
              
              console.log(res);
              if (res.length > 0 )
           {
            this.inputField = res[this.columnName];
            console.log(this.columnName);
            if (res["scale_id"]) {
              this.filterPotency(res["scale_id"]);
              
            this.inputField = res[this.columnName];
            }

            if(res["no_of_days"]){
              this.daysFromDatabase = res["no_of_days"]
            }
            if (res["instruction_id"]) {
              var dataBaseIds = res["instruction_id"].split(",");
              this.instructions.forEach((data) => {
                dataBaseIds.forEach((id) => {
                  if (data.id == +id) {
                    data.isSelected = true;
                  }
                });
              });
            }
          }
            })
            .catch((error) => {
              this.utilities.sqlLiteErrorTrigger( "updateDataFromSqlLite" , error);
              this.commonService.presentToast("Something went wrong", "toastError");
              console.error(
                
                  JSON.stringify(error)
              );
              
            });
          a.dismiss();
        });
      });
  }
  updateData() {
    console.log("hi");
    this.apiService
      .getDrugDetail(
        this.commonService.currentAppointmentId,
        this.commonService.currentDoctorId,
        this.commonService.currentUserId,
        this.commonService.currentRelativeId,
        this.commonService.currentDrugId
      )
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else {
          if (data[0].length > 0 )
           {
            this.inputField = data[0][0][this.columnName];
            console.log(this.columnName);
            if (data[0][0]["scale_id"]) {
              this.filterPotency(data[0][0]["scale_id"]);
              
            this.inputField = data[0][0][this.columnName];
            }

            if(data[0][0]["no_of_days"]){
              this.daysFromDatabase = data[0][0]["no_of_days"]
            }
            if (data[0][0]["instruction_id"]) {
              var dataBaseIds = data[0][0]["instruction_id"].split(",");
              this.instructions.forEach((data) => {
                dataBaseIds.forEach((id) => {
                  if (data.id == +id) {
                    data.isSelected = true;
                  }
                });
              });
            }
          }
        }
      });
  }

  instructionsChanged(instructionId) {
    console.log(instructionId);
    var index = this.instructions.findIndex((data) => {
      return data.id === instructionId;
    });
    if (this.instructions[index].isSelected == true) {
      this.instructions[index].isSelected = false;
    } else {
      this.instructions[index].isSelected = true;
    }
  }
}
