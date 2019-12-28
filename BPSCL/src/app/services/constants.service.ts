import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ConstantsService {
  constructor() {}

  readonly age_unit_days = 1;
  readonly age_unit_months = 2;
  readonly age_unit_years = 3;
}
