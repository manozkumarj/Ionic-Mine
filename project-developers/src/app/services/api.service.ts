import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  totalDevelopers: number;
  developers;

  constructor() {
    this.developers = [
      {
        id: 1,
        name: "Manoj Kumar",
        role: "Software Developer",
        gender: "Male"
      },
      {
        id: 2,
        name: "Mahesh Kumar",
        role: "PHP Developer",
        gender: "Male"
      },
      {
        id: 3,
        name: "Mallesh",
        role: "JAVA Developer",
        gender: "Male"
      },
      {
        id: 4,
        name: "Archana",
        role: "Designer",
        gender: "Female"
      }
    ];

    this.totalDevelopers = this.developers.length;
  }

  getAllDevelopers() {
    return this.developers;
  }

  getDeveloper(id) {
    return this.developers.find(developer => developer.id == id);
  }

  addDeveloper(developer) {
    return this.developers.unshift(developer);
  }

  deleteDeveloper(currentDeveloperId) {
    return this.developers = this.developers.filter(developer => developer.id != currentDeveloperId);
  }
}
