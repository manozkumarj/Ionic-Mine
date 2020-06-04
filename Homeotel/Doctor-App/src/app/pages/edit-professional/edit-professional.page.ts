import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { CommonService } from "src/app/services/common.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: "app-edit-professional",
  templateUrl: "./edit-professional.page.html",
  styleUrls: ["./edit-professional.page.scss"],
})
export class EditProfessionalPage implements OnInit {
  title;
  subTitle;
  forwardLink;
  backwardLink;
  columnName;
  inputField;
  selectedList = [];
  unSelectedList = [];
  filteredList = [];
  isTextField = false;
  lastPage = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public commonService: CommonService,
    private utilities: UtilitiesService,
    private db : DatabaseService,
    private loadingController : LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      this.CurrentUrl(params["questionNumber"]);
      this.title = `${params["questionNumber"]} of 5`;
    });
  }

  CurrentUrl(questionNumber) {
    switch (+questionNumber) {
      case 1:
        console.log("1");
        this.subTitle = "Specialisations";
        this.forwardLink = "/edit-professional/1/2";
        this.backwardLink = "/doctor-professional";
        this.columnName = "specialisation";
        this.unSelectedList=[];
        this.commonService.specialisations.forEach((data) => {
          this.unSelectedList.push({
            id: data.id,
            name: data.name,
            isSelected: false,
          });
        });
        this.filteredList = [];
        this.filteredList = this.unSelectedList;

       // this.updateData(this.columnName);
        this.updateDataFromSqlLite(this.columnName);

        break;
      case 2:
        console.log("2");
        this.isTextField = true;
        this.subTitle ="Please enter your expereince in years"
        this.forwardLink = "/edit-professional/1/2/3";
        this.backwardLink = "/edit-professional/1";
        this.columnName = "experience";
       // this.updateData(this.columnName);
        this.updateDataFromSqlLite(this.columnName);
        break;
      case 3:
        console.log("3");
        this.subTitle = "Qualifications";
        this.forwardLink = "/edit-professional/1/2/3/4";
        this.backwardLink = "/edit-professional/1/2/3";
        this.columnName = "qualifications";
        this.unSelectedList=[];
        this.commonService.qualifications.forEach((data) => {
          this.unSelectedList.push({
            id: data.id,
            name: data.name,
            isSelected: false,
          });
        });
        this.filteredList = [];
        this.filteredList = this.unSelectedList;

       // this.updateData(this.columnName);
        this.updateDataFromSqlLite(this.columnName);


        break;
      case 4:
        console.log("4");
        
        this.subTitle = "Certifications";
        this.forwardLink = "/edit-professional/1/2/3/4/5";
        this.backwardLink = "/edit-professional/1/2/3/4";
        this.columnName = "certifications";
        this.unSelectedList=[];
        this.commonService.certifications.forEach((data) => {
          this.unSelectedList.push({
            id: data.id,
            name: data.name,
            isSelected: false,
          });
        });
        this.filteredList = [];
        this.filteredList = this.unSelectedList;

       // this.updateData(this.columnName);
        this.updateDataFromSqlLite(this.columnName);

        break;
      case 5:
        console.log("5");
        this.lastPage = true;
        this.subTitle = "Awards";
        this.backwardLink = "/edit-professional/1/2/3/4";
        this.forwardLink = "/doctor-professional";
        this.columnName = "awards";
        this.unSelectedList=[];
        this.commonService.awards.forEach((data) => {
          this.unSelectedList.push({
            id: data.id,
            name: data.name,
            isSelected: false,
          });
        });
        this.filteredList = [];
        this.filteredList = this.unSelectedList;

       // this.updateData(this.columnName);
        this.updateDataFromSqlLite(this.columnName);

        break;
    }
  }

  onChange(searchedValue) {
    

    if (!searchedValue) {
      this.filteredList = this.unSelectedList;
    }
    this.filteredList = this.unSelectedList.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(searchedValue.toLowerCase()) > -1 &&
        item.isSelected == false
      );
    });
  }

  deSelect(id) {
    var index = this.unSelectedList.findIndex((data) => {
      return data.id === id;
    });

    this.unSelectedList[index].isSelected = false;
    this.filteredList = this.unSelectedList;
    this.selectedList = [];
    this.unSelectedList.forEach((data) => {
      if (data.isSelected == true) {
        this.selectedList.push(data);
      }
    });
  }

  select(id) {
    var index = this.unSelectedList.findIndex((data) => {
      return data.id === id;
    });
    this.unSelectedList[index].isSelected = true;
    this.filteredList = this.unSelectedList;
    console.log(this.filteredList);
    this.selectedList.push(this.unSelectedList[index]);
  }

  skip() {
    this.router.navigate([this.forwardLink]);
  }

  async submit() {
   var columnValue
    if(this.isTextField){
      columnValue = this.inputField;
    }
      else
      {
        var selectedIds = [];
        this.selectedList.forEach((data) => {
          selectedIds.push(data.id);
        });
    
         columnValue = selectedIds.join();
      }
    
      const loading = await this.loadingController
      .create({
        message: "loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
      this.apiService
      .saveProfessional(
        this.commonService.currentDoctorId,
        this.columnName,
        columnValue
      )
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
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
            else{
              this.commonService.presentToast(
                "Something went wrong",
                "toastError"
              );
            }
          
        }
      });
      });
      });
  }

  updateData(id) {
    console.log(id);
    this.apiService
      .getProfile(this.commonService.currentDoctorId)
      .subscribe((data) => {
        if (this.utilities.isInvalidApiResponseData(data)) {
          console.log(data);
          this.commonService.presentToast("Something went wrong", "toastError");
        } else 
        {
          console.log(data);
          if(data[1].length >0){
            if(this.isTextField){
              this.inputField = data[1][0][id];
           }
           if(data[1][0][id]){
            var dataBaseIds = data[1][0][id].split(",");
            console.log(dataBaseIds)
            this.unSelectedList.forEach(data =>
            {
              dataBaseIds.forEach(id => {
                if (data.id == +id) {
                  data.isSelected = true;
                }
              });
            });
            console.log(this.unSelectedList);
            console.log(this.selectedList);
            this.selectedList= [];
            this.unSelectedList.forEach(data=>{
              if(data.isSelected== true){
                this.selectedList.push(data)
              }
            });
            console.log(this.selectedList);
          }
         
          }
          
         
          
          
        }
    
      });
  }
  async updateDataFromSqlLite(id) {
    const loading = await this.loadingController
      .create({
        message: "Loading...",
        translucent: true,
      })
      .then((a) => {
        a.present().then(async (res) => {
          this.db
            .getDoctorProfessional(this.commonService.currentDoctorId)
            .then((res: any[]) => {
              
              console.log(res);
              if(res.length >0){
                if(this.isTextField){
                  this.inputField = res[id];
               }
               if(res[id]){
                var dataBaseIds = res[id].split(",");
                console.log(dataBaseIds)
                this.unSelectedList.forEach(data =>
                {
                  dataBaseIds.forEach(id => {
                    if (data.id == +id) {
                      data.isSelected = true;
                    }
                  });
                });
                console.log(this.unSelectedList);
                console.log(this.selectedList);
                this.selectedList= [];
                this.unSelectedList.forEach(data=>{
                  if(data.isSelected== true){
                    this.selectedList.push(data)
                  }
                });
                console.log(this.selectedList);
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
 

}
