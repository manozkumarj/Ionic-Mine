CREATE TABLE IF NOT EXISTS "d_appointment" (
  "appointment_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned DEFAULT NULL,
  "doctor_id" int(10) unsigned NOT NULL,
  "mode_id" int(10) unsigned NOT NULL,
  "main_complaint" varchar(50) DEFAULT NULL,
  "appointment_at" varchar(45) DEFAULT NULL,
  "booked_at" varchar(45) DEFAULT NULL,
  "amount_paid" varchar(45) DEFAULT NULL,
  "payment_status" int(11) DEFAULT "0",
  "appointment_status" int(11) DEFAULT "0",
  "advice" varchar(500) DEFAULT NULL,
  "notes" varchar(500) DEFAULT NULL,
  "review_date" varchar(50) DEFAULT NULL,
  "created_by" int(10) unsigned DEFAULT NULL,
  "created_at" varchar(45) DEFAULT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("appointment_id")
);
CREATE TABLE IF NOT EXISTS "d_doctor" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "uuid" int(10) unsigned NOT NULL,
  "name" varchar(255) NOT NULL,
  "username" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "pwd" varchar(255) NOT NULL DEFAULT "",
  "phone" varchar(10) DEFAULT NULL,
  "gender_id" int(10) unsigned DEFAULT NULL,
  "dob" date DEFAULT NULL,
  "created_at" varchar(45) NOT NULL,
  PRIMARY KEY ("id","uuid","username") USING BTREE,
  UNIQUE KEY "username" ("username"),
  UNIQUE KEY "uuid" ("uuid"),
  UNIQUE KEY "email" ("email")
);
CREATE TABLE IF NOT EXISTS "d_issue" (
  "issue_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned DEFAULT NULL,
  "doctor_id" int(10) unsigned DEFAULT NULL,
  "issue_type_id" varchar(45) DEFAULT NULL,
  "email" varchar(255) DEFAULT NULL,
  "phone" varchar(255) DEFAULT NULL,
  "issue_description" varchar(5000) DEFAULT NULL,
  "issue_raised_at" varchar(45) DEFAULT NULL,
  "issue_status" int(11) DEFAULT "0",
  "created_by" int(10) unsigned DEFAULT NULL,
  "created_at" varchar(45) DEFAULT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("issue_id")
);
CREATE TABLE IF NOT EXISTS "d_setting" (
  "user_id" int(10) unsigned NOT NULL,
  "doctor_id" int(10) unsigned NOT NULL,
  "setting_id" int(10) unsigned NOT NULL,
  "value" varchar(45) DEFAULT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("doctor_id","user_id")
);
CREATE TABLE IF NOT EXISTS "d_transaction" (
  "transaction_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "doctor_id" int(10) unsigned DEFAULT NULL,
  "appointment_id" int(11) DEFAULT NULL,
  "kit_id" int(11) DEFAULT NULL,
  "transaction_type_id" int(10) unsigned NOT NULL,
  "transaction_amount" double NOT NULL,
  "taxes" double DEFAULT NULL,
  "charges" double DEFAULT NULL,
  "net_amount" double DEFAULT NULL,
  "transaction_at" varchar(45) NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("transaction_id") USING BTREE
);
CREATE TABLE IF NOT EXISTS "d_user" (
  "user_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(100) DEFAULT NULL,
  "username" varchar(100) DEFAULT NULL,
  "password" varchar(50) DEFAULT NULL,
  "phone" varchar(50) DEFAULT NULL,
  "email" varchar(50) DEFAULT NULL,
  "gender_id" varchar(50) DEFAULT NULL,
  "dob" varchar(50) DEFAULT NULL,
  "blood_group_id" varchar(50) DEFAULT NULL,
  "marital_status_id" varchar(50) DEFAULT NULL,
  "height" varchar(50) DEFAULT NULL,
  "weight" varchar(50) DEFAULT NULL,
  "created_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("user_id") USING BTREE,
  UNIQUE KEY "username" ("username"),
  UNIQUE KEY "email" ("email")
);
CREATE TABLE IF NOT EXISTS "da_complaint_detail" (
  "complaint_detail_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL DEFAULT "0",
  "doctor_id" int(10) unsigned NOT NULL,
  "appointment_id" int(10) unsigned NOT NULL,
  "is_recurring" varchar(45) DEFAULT NULL,
  "recurring_freq" varchar(45) DEFAULT NULL,
  "severity_id" varchar(45) DEFAULT NULL,
  "complaint_description" varchar(500) DEFAULT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("complaint_detail_id","user_id","relative_id","doctor_id")
);
CREATE TABLE IF NOT EXISTS "da_diagnosis" (
  "appointment_id" int(10) unsigned NOT NULL,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL DEFAULT "0",
  "doctor_id" int(10) unsigned NOT NULL,
  "diagnosis_id" int(10) unsigned NOT NULL,
  "other_diagnosis" varchar(45) DEFAULT NULL,
  "created_by" int(10) unsigned DEFAULT NULL,
  "created_at" varchar(45) DEFAULT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("user_id","relative_id","doctor_id","appointment_id") USING BTREE
);
CREATE TABLE IF NOT EXISTS "da_log" (
  "log_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "doctor_id" int(10) unsigned NOT NULL,
  "appointment_id" int(10) unsigned NOT NULL,
  "mode_id" int(10) unsigned NOT NULL,
  "appointment_at" varchar(45) DEFAULT NULL,
  "appointment_status" int(11) DEFAULT "0",
  "is_latest" int(11) DEFAULT "0",
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("log_id")
);
CREATE TABLE IF NOT EXISTS "da_prescription" (
  "appointment_id" int(10) unsigned NOT NULL,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL DEFAULT "0",
  "doctor_id" int(10) unsigned NOT NULL,
  "drug_id" int(10) unsigned NOT NULL,
  "scale_id" int(10) unsigned DEFAULT NULL,
  "potency_id" int(10) unsigned DEFAULT NULL,
  "dosage_id" int(10) unsigned DEFAULT NULL,
  "freq_id" int(10) unsigned DEFAULT NULL,
  "instruction_id" varchar(255) DEFAULT NULL,
  "no_of_days" int(10) unsigned DEFAULT NULL,
  "created_by" int(10) unsigned DEFAULT NULL,
  "created_at" varchar(45) DEFAULT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("user_id","relative_id","doctor_id","appointment_id","drug_id") USING BTREE
);
CREATE TABLE IF NOT EXISTS "dd_clinic" (
  "clinic_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "doctor_id" int(10) unsigned NOT NULL,
  "clinic_name" varchar(100) DEFAULT NULL,
  "clinic_address" varchar(500) DEFAULT NULL,
  "walkin_fee" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  PRIMARY KEY ("clinic_id")
);
CREATE TABLE IF NOT EXISTS "dd_kit" (
  "kit_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "doctor_id" int(10) unsigned NOT NULL,
  "name" varchar(45) DEFAULT NULL,
  "price" varchar(45) DEFAULT NULL,
  "description" varchar(255) DEFAULT NULL,
  "is_active" int(11) DEFAULT "0",
  "created_at" varchar(45) NOT NULL,
  PRIMARY KEY ("kit_id") USING BTREE
);
CREATE TABLE IF NOT EXISTS "dd_mode" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "doctor_id" int(10) unsigned NOT NULL,
  "mode_id" int(10) unsigned NOT NULL,
  "minimum_min" varchar(45) DEFAULT NULL,
  "price_per_min" int(10) unsigned DEFAULT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","doctor_id","mode_id")
);
CREATE TABLE IF NOT EXISTS "dd_photo" (
  "doctor_id" int(10) unsigned NOT NULL,
  "photo" mediumtext NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("doctor_id")
);
CREATE TABLE IF NOT EXISTS "dd_professional" (
  "doctor_id" int(10) unsigned NOT NULL,
  "specialisation" varchar(255) DEFAULT NULL,
  "experience" varchar(255) DEFAULT NULL,
  "qualifications" varchar(255) DEFAULT NULL,
  "certifications" varchar(255) DEFAULT NULL,
  "awards" varchar(255) DEFAULT NULL,
  "created_at" datetime DEFAULT NULL,
  PRIMARY KEY ("doctor_id")
);
CREATE TABLE IF NOT EXISTS "ddc_timing" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "doctor_id" int(10) unsigned NOT NULL,
  "clinic_id" int(10) unsigned NOT NULL,
  "week_days" varchar(45) DEFAULT NULL,
  "from_time" varchar(45) DEFAULT NULL,
  "to_time" varchar(45) DEFAULT NULL,
  "remarks" varchar(100) DEFAULT NULL,
  "created_at" varchar(45) NOT NULL,
  PRIMARY KEY ("id","doctor_id","clinic_id")
);
CREATE TABLE IF NOT EXISTS "dk_order" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "doctor_id" int(10) unsigned NOT NULL,
  "kit_id" int(10) unsigned NOT NULL,
  "amount_paid" varchar(45) DEFAULT NULL,
  "order_status" varchar(45) DEFAULT NULL,
  "created_at" varchar(45) NOT NULL,
  PRIMARY KEY ("id","doctor_id","user_id","kit_id")
);
CREATE TABLE IF NOT EXISTS "dk_photo" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "doctor_id" int(10) unsigned NOT NULL,
  "kit_id" int(10) unsigned NOT NULL,
  "photo" mediumtext,
  "created_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","doctor_id","kit_id") USING BTREE
);
CREATE TABLE IF NOT EXISTS "dko_log" (
  "doctor_id" int(10) unsigned NOT NULL,
  "user_id" int(10) unsigned NOT NULL,
  "kit_id" int(10) unsigned NOT NULL,
  "order_status" varchar(45) DEFAULT NULL,
  "is_latest" int(11) DEFAULT "0",
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("doctor_id","user_id","kit_id")
);
CREATE TABLE IF NOT EXISTS "du_doctor" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "doctor_id" int(10) unsigned NOT NULL,
  "added_on" varchar(45) DEFAULT NULL,
  "is_active" int(11) DEFAULT "0",
  "created_at" varchar(45) DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id") USING BTREE
);
CREATE TABLE IF NOT EXISTS "du_photo" (
  "photo_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL DEFAULT "0",
  "photo" mediumtext NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("photo_id")
);
CREATE TABLE IF NOT EXISTS "du_relative" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "relative_name" varchar(100) NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","user_id","relative_id")
);
CREATE TABLE IF NOT EXISTS "ehr_allergy" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "allergy_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","user_id","relative_id"),
  KEY "FK_ehr_allergy_id" ("allergy_id"),
  CONSTRAINT "FK_ehr_allergy_id" FOREIGN KEY ("allergy_id") REFERENCES "m_allergy" ("allergy_id")
);
CREATE TABLE IF NOT EXISTS "ehr_chronic" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "disease_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","user_id","relative_id","disease_id"),
  KEY "FK_ehr_disease_id" ("disease_id"),
  CONSTRAINT "FK_ehr_disease_id" FOREIGN KEY ("disease_id") REFERENCES "m_disease" ("disease_id")
);
CREATE TABLE IF NOT EXISTS "ehr_current_medication" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "medication_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","user_id","relative_id","medication_id")
);
CREATE TABLE IF NOT EXISTS "ehr_family_history" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "relation_id" int(10) unsigned NOT NULL,
  "disease_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned DEFAULT NULL,
  "created_at" varchar(45) DEFAULT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","user_id","relative_id","relation_id","disease_id")
);
CREATE TABLE IF NOT EXISTS "ehr_file" (
  "file_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "file_type_id" int(10) unsigned NOT NULL,
  "file_date" varchar(45) NOT NULL,
  "upload_date" varchar(45) NOT NULL,
  "file_blob" mediumtext NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("file_id")
);
CREATE TABLE IF NOT EXISTS "ehr_injury" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "injury_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","user_id","relative_id","injury_id")
);
CREATE TABLE IF NOT EXISTS "ehr_lifestyle" (
  "lifestyle_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "smoking_id" int(10) unsigned DEFAULT NULL,
  "alcohol_id" int(10) unsigned DEFAULT NULL,
  "excercise_id" int(10) unsigned DEFAULT NULL,
  "activity_level_id" int(10) unsigned DEFAULT NULL,
  "profession_id" int(10) unsigned DEFAULT NULL,
  "food_id" int(10) unsigned DEFAULT NULL,
  "heat_id" int(10) unsigned DEFAULT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) NOT NULL,
  PRIMARY KEY ("lifestyle_id","user_id","relative_id")
);
CREATE TABLE IF NOT EXISTS "ehr_lifestyle_food" (
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "food_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned DEFAULT NULL,
  "created_at" varchar(45) DEFAULT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("user_id","relative_id","food_id")
);
CREATE TABLE IF NOT EXISTS "ehr_past_medication" (
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "medication_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("user_id","relative_id","medication_id")
);
CREATE TABLE IF NOT EXISTS "ehr_post_medication" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "medication_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","user_id","relative_id","medication_id")
);
CREATE TABLE IF NOT EXISTS "ehr_surgery" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "surgery_id" int(10) unsigned NOT NULL,
  "created_by" int(10) unsigned DEFAULT NULL,
  "created_at" varchar(45) DEFAULT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("id","user_id","relative_id","surgery_id")
);
CREATE TABLE IF NOT EXISTS "ehr_vital" (
  "vital_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int(10) unsigned NOT NULL,
  "relative_id" int(10) unsigned NOT NULL,
  "temperature" decimal(4,1) DEFAULT NULL,
  "pulse" int(10) unsigned DEFAULT NULL,
  "resp_rate" int(10) unsigned DEFAULT NULL,
  "bp_systolic" int(10) unsigned DEFAULT NULL,
  "bp_diastolic" int(10) unsigned DEFAULT NULL,
  "created_by" int(10) unsigned NOT NULL,
  "created_at" varchar(45) NOT NULL,
  "updated_by" int(10) unsigned DEFAULT NULL,
  "updated_at" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("vital_id")
);
CREATE TABLE IF NOT EXISTS "m_activity_level" (
  "activity_level_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("activity_level_id")
) AUTO_INCREMENT=5;
INSERT INTO "m_activity_level" ("activity_level_id","name","is_active") VALUES 
 (1,"Super high","1"),
 (2,"High","1"),
 (3,"Medium","1"),
 (4,"Low","1");
CREATE TABLE IF NOT EXISTS "m_alcohol" (
  "alcohol_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("alcohol_id")
)AUTO_INCREMENT=5;
INSERT INTO "m_alcohol" ("alcohol_id","name","is_active") VALUES 
 (1,"Occasionally","1"),
 (2,"Addicted","1"),
 (3,"Regularly","1"),
 (4,"Never","1");
CREATE TABLE IF NOT EXISTS "m_allergy" (
  "allergy_id" int(10) unsigned NOT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("allergy_id")
);
INSERT INTO "m_allergy" ("allergy_id","name","is_active") VALUES 
 (1,"Drug allergy","1"),
 (2,"Food allergy","1"),
 (3,"Contact dermatitis","1"),
 (4,"Latex allergy","1"),
 (5,"Allergic Asthama","1"),
 (6,"Allergic rhinitis","1"),
 (7,"Animal allergy","1"),
 (8,"Anaphylaxis","1"),
 (9,"Allergy to mold","1"),
 (10,"Pets allergy","1"),
 (11,"Eye allergy","1"),
 (12,"Skin allergy","1");
CREATE TABLE IF NOT EXISTS "m_award" (
  "award_id" int(10) unsigned NOT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("award_id")
);
INSERT INTO "m_award" ("award_id","name","is_active") VALUES 
 (1,"B. C. Roy award ","1"),
 (2,"Ashoka chakra","1"),
 (3,"Uttam jeevan raksha padak","1"),
 (4," Sarvottam yudh seva medal ","1"),
 (5," Om prakash bhasin award","1");
CREATE TABLE IF NOT EXISTS "m_blood_group" (
  "blood_group_id" int(10) unsigned NOT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("blood_group_id")
);
INSERT INTO "m_blood_group" ("blood_group_id","name","is_active") VALUES 
 (1,"A -ve","1"),
 (2,"A +ve","1"),
 (3,"B -ve","1"),
 (4,"B +ve","1"),
 (5,"AB -ve","1"),
 (6,"AB +ve","1"),
 (7,"O -ve","1"),
 (8,"O +ve","1");
CREATE TABLE IF NOT EXISTS "m_certification" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(255) NOT NULL,
  "is_active" int(10) unsigned NOT NULL,
  PRIMARY KEY ("id")
) AUTO_INCREMENT=11;
INSERT INTO "m_certification" ("id","name","is_active") VALUES 
 (1,"certification 1",1),
 (2,"certification  2",1),
 (3,"certification  3",1),
 (4,"certification  4",1),
 (5,"certification  5",1),
 (6,"certification  6",1),
 (7,"certification 7",1),
 (8,"certification  8",1),
 (9,"certification  9",1),
 (10,"certification  10 ",1);
CREATE TABLE IF NOT EXISTS "m_chronic" (
  "chronic_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("chronic_id") USING BTREE
)AUTO_INCREMENT=3;
INSERT INTO "m_chronic" ("chronic_id","name","is_active") VALUES 
 (1,"chronic1","1"),
 (2,"chronic 2","1");
CREATE TABLE IF NOT EXISTS "m_current_medication" (
  "current_medication_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("current_medication_id")
) AUTO_INCREMENT=11;
INSERT INTO "m_current_medication" ("current_medication_id","name","is_active") VALUES 
 (1,"Acarbose","1"),
 (2,"Acebutolol hcl","1"),
 (3,"Acetazolamide","1"),
 (4,"Advair Diskus","1"),
 (5,"Afeditab CR\r","1"),
 (6,"Albuterol","1"),
 (7,"Albuterol sulfate","1"),
 (8,"Alendronate sodium","1"),
 (9,"Amantadine","1"),
 (10,"Amiloride hcl","1");
CREATE TABLE IF NOT EXISTS "m_diagnosis" (
  "diagnosis_id" int(10) unsigned NOT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("diagnosis_id") USING BTREE
);
INSERT INTO "m_diagnosis" ("diagnosis_id","name","is_active") VALUES 
 (1,"test","1"),
 (2,"test2","1");
CREATE TABLE IF NOT EXISTS "m_disease" (
  "disease_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("disease_id")
) AUTO_INCREMENT=11;
INSERT INTO "m_disease" ("disease_id","name","is_active") VALUES 
 (1,"Allergies","1"),
 (2,"Arthritis","1"),
 (3,"Asthma","1"),
 (4,"Blood Pressure","1"),
 (5,"Cancer","1"),
 (6,"Cholesterol","1"),
 (7,"Chronic Pain","1"),
 (8,"Cold & Flu","1"),
 (9,"Depression","1"),
 (10,"Diabetes","1");
CREATE TABLE IF NOT EXISTS "m_dosage" (
  "dosage_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("dosage_id")
);
CREATE TABLE IF NOT EXISTS "m_drugs" (
  "drug_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("drug_id")
) AUTO_INCREMENT=10;
INSERT INTO "m_drugs" ("drug_id","name","is_active") VALUES 
 (1,"paracetamol","1"),
 (2,"asprin","1"),
 (3,"Acetaminophen","1"),
 (4,"Alprazolam","1"),
 (5,"Hydrochlorothiazide","1"),
 (6,"Losartan","1"),
 (7,"Naproxen","1"),
 (8,"Zoloft","1"),
 (9,"Viagra","1");
CREATE TABLE IF NOT EXISTS "m_excercise" (
  "excercise_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("excercise_id")
)AUTO_INCREMENT=4;
INSERT INTO "m_excercise" ("excercise_id","name","is_active") VALUES 
 (1,"Regular","1"),
 (2,"Lazy","1"),
 (3,"Once in full moon","1");
CREATE TABLE IF NOT EXISTS "m_exercise" (
  "exercise_id" int(10) unsigned NOT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("exercise_id")
);
INSERT INTO "m_exercise" ("exercise_id","name","is_active") VALUES 
 (1,"Regular","1"),
 (2,"Lazy","1"),
 (3,"Once in full moon","1");
CREATE TABLE IF NOT EXISTS "m_file_type" (
  "file_type_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "icon" varchar(100) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("file_type_id")
)AUTO_INCREMENT=4;
INSERT INTO "m_file_type" ("file_type_id","name","icon","is_active") VALUES 
 (1,"Prescription","newspaper-outline","1"),
 (2,"Labtest","library-outline","1"),
 (3,"Bill","receipt-outline","1");
CREATE TABLE IF NOT EXISTS "m_food" (
  "food_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("food_id")
)AUTO_INCREMENT=4;
INSERT INTO "m_food" ("food_id","name","is_active") VALUES 
 (1,"Sweets","1"),
 (2,"Oil Food","1"),
 (3,"Chinese","1");
CREATE TABLE IF NOT EXISTS "m_freq" (
  "freq_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("freq_id")
);
CREATE TABLE IF NOT EXISTS "m_gender" (
  "gender_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("gender_id")
)AUTO_INCREMENT=4;
INSERT INTO "m_gender" ("gender_id","name","is_active") VALUES 
 (1,"Male","1"),
 (2,"Female","1"),
 (3,"Other","1");
CREATE TABLE IF NOT EXISTS "m_heat" (
  "heat_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("heat_id")
)AUTO_INCREMENT=5;
INSERT INTO "m_heat" ("heat_id","name","is_active") VALUES 
 (1,"Cold intolerance","1"),
 (2,"Cold tolerance","1"),
 (3,"Heat intolerance","1"),
 (4,"Heat tolerance","1");
CREATE TABLE IF NOT EXISTS "m_injury" (
  "injury_id" int(10) unsigned NOT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("injury_id")
);
INSERT INTO "m_injury" ("injury_id","name","is_active") VALUES 
 (1,"Strains","1"),
 (2,"Knee injuries","1"),
 (3,"Swollen muscles","1"),
 (4,"Achilles tendon rupture","1"),
 (5,"Fractures","1"),
 (6,"Dislocations","1"),
 (7,"Rotator cuff injury","1"),
 (8,"Bone fractures","1"),
 (9,"Exercise","1"),
 (10,"Accidents","1");
CREATE TABLE IF NOT EXISTS "m_instruction" (
  "instruction_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("instruction_id")
)AUTO_INCREMENT=8;
INSERT INTO "m_instruction" ("instruction_id","name","is_active") VALUES 
 (1,"Before Breakfast","1"),
 (2,"After Breakfast","1"),
 (3,"Before Lunch","1"),
 (4,"After Lunch","1"),
 (5,"Before Dinner","1"),
 (6,"After Dinner","1"),
 (7,"As Required","1");
CREATE TABLE IF NOT EXISTS "m_issue" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" int(10) unsigned NOT NULL,
  PRIMARY KEY ("id")
)AUTO_INCREMENT=6;
INSERT INTO "m_issue" ("id","name","is_active") VALUES 
 (1,"Booking an appointment",1),
 (2,"Wrong information",1),
 (3,"Consultation Related",1),
 (4,"Homeo kits Related",1),
 (5,"Other issues",1);
CREATE TABLE IF NOT EXISTS "m_marital_status" (
  "marital_status_id" int(10) unsigned NOT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("marital_status_id")
);
INSERT INTO "m_marital_status" ("marital_status_id","name","is_active") VALUES 
 (1,"Married","1"),
 (2,"Unmarried","1"),
 (3,"Divorced","1"),
 (4,"Widow","1");
CREATE TABLE IF NOT EXISTS "m_medication" (
  "medication_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "medication_type_id" int(10) unsigned NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("medication_id")
) AUTO_INCREMENT=21;
INSERT INTO "m_medication" ("medication_id","name","medication_type_id","is_active") VALUES 
 (1,"Acarbose",1,"1"),
 (2,"Acebutolol hcl",1,"1"),
 (3,"Acetazolamide",1,"1"),
 (4,"Advair Diskus",1,"1"),
 (5,"Afeditab CR\r",1,"1"),
 (6,"Albuterol",1,"1"),
 (7,"Albuterol sulfate",1,"1"),
 (8,"Alendronate sodium",1,"1"),
 (9,"Amantadine",1,"1"),
 (10,"Amiloride hcl",1,"1"),
 (11,"Aminophylline",2,"1"),
 (12,"Amlodipine atorvastatin",2,"1"),
 (13,"Amlodipine besylate",2,"1"),
 (14,"Anagrelide",2,"1"),
 (15,"Anastrozole",2,"1"),
 (16,"Budesonide",2,"1"),
 (17,"Bumetanide",2,"1"),
 (18,"Buproban SR",2,"1"),
 (19,"Bupropion SR",2,"1"),
 (20,"Betaxolol hcl",2,"1");
CREATE TABLE IF NOT EXISTS "m_mode" (
  "mode_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "icon" varchar(255) DEFAULT NULL,
  "is_active" int(10) unsigned NOT NULL,
  PRIMARY KEY ("mode_id") USING BTREE
)AUTO_INCREMENT=5;
INSERT INTO "m_mode" ("mode_id","name","icon","is_active") VALUES 
 (1,"Video Consultation","videocam",1),
 (2,"Audio Consultation","logo-whatsapp",1),
 (3,"Chat Consultation","chatbubbles",1),
 (4,"Physical Visit","calendar",1);
CREATE TABLE IF NOT EXISTS "m_parameter" (
  "parameter_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("parameter_id")
);
CREATE TABLE IF NOT EXISTS "m_post_medication" (
  "post_medication_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("post_medication_id")
) AUTO_INCREMENT=11;
INSERT INTO "m_post_medication" ("post_medication_id","name","is_active") VALUES 
 (1,"Aminophylline","1"),
 (2,"Amlodipine atorvastatin","1"),
 (3,"Amlodipine besylate","1"),
 (4,"Anagrelide","1"),
 (5,"Anastrozole","1"),
 (6,"Budesonide","1"),
 (7,"Bumetanide","1"),
 (8,"Buproban SR","1"),
 (9,"Bupropion SR","1"),
 (10,"Betaxolol hcl","1");
CREATE TABLE IF NOT EXISTS "m_potency" (
  "potency_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "scale_id" int(11) DEFAULT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("potency_id")
) AUTO_INCREMENT=19;
INSERT INTO "m_potency" ("potency_id","scale_id","name","is_active") VALUES 
 (1,1,"0/1","1"),
 (2,1,"0/2","1"),
 (3,1,"0/3","1"),
 (4,1,"0/4","1"),
 (5,1,"0/5","1"),
 (6,1,"0/6","1"),
 (7,2,"1","1"),
 (8,2,"2","1"),
 (9,2,"3","1"),
 (10,2,"4","1"),
 (11,2,"5","1"),
 (12,2,"6","1"),
 (13,3,"10","1"),
 (14,3,"20","1"),
 (15,3,"30","1"),
 (16,3,"40","1"),
 (17,3,"50","1"),
 (18,3,"60","1");
CREATE TABLE IF NOT EXISTS "m_profession" (
  "profession_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("profession_id")
) AUTO_INCREMENT=16;
INSERT INTO "m_profession" ("profession_id","name","is_active") VALUES 
 (1,"Family Physician","1"),
 (2,"Pediatrician","1"),
 (3,"Gynecologist","1"),
 (4,"Surgeon","1"),
 (5,"Psychiatrist","1"),
 (6,"Cardiologist","1"),
 (7,"Dermatologist","1"),
 (8,"Endocrinologist","1"),
 (9,"Gastroenterologist","1"),
 (10,"Nephrologist","1"),
 (11,"Ophthalmologist","1"),
 (12,"Otolaryngologist","1"),
 (13,"Pulmonologist","1"),
 (14,"Neurologist","1"),
 (15,"Radiologist","1");
CREATE TABLE IF NOT EXISTS "m_qualification" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(255) NOT NULL,
  "is_active" int(10) unsigned NOT NULL,
  PRIMARY KEY ("id")
) AUTO_INCREMENT=10;
INSERT INTO "m_qualification" ("id","name","is_active") VALUES 
 (1,"MBBS",1),
 (2,"BDS",1),
 (3,"BAMS",1),
 (4,"BUMS",1),
 (5,"BHMS",1),
 (6,"BYNS",1),
 (7,"MS",1),
 (8,"MD",1),
 (9,"DNB",1);
CREATE TABLE IF NOT EXISTS "m_relation" (
  "relation_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("relation_id")
) AUTO_INCREMENT=14;
INSERT INTO "m_relation" ("relation_id","name","is_active") VALUES 
 (1,"Self","1"),
 (2,"Father","1"),
 (3,"Mother","1"),
 (4,"Elder brother","1"),
 (5,"Younger brother","1"),
 (6,"Elder sister","1"),
 (7,"Younger sister","1"),
 (8,"Uncle","1"),
 (9,"Aunt","1"),
 (10,"Husband","1"),
 (11,"Wife","1"),
 (12,"Son","1"),
 (13,"Daughter","1");
CREATE TABLE IF NOT EXISTS "m_scale" (
  "scale_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("scale_id")
)AUTO_INCREMENT=4;
INSERT INTO "m_scale" ("scale_id","name","is_active") VALUES 
 (1,"Decimal","1"),
 (2,"Centisemal","1"),
 (3,"Scale 3","1");
CREATE TABLE IF NOT EXISTS "m_setting" (
  "setting_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("setting_id")
);
CREATE TABLE IF NOT EXISTS "m_severity" (
  "severity_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("severity_id")
);
CREATE TABLE IF NOT EXISTS "m_smoking" (
  "smoking_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("smoking_id")
)AUTO_INCREMENT=5;
INSERT INTO "m_smoking" ("smoking_id","name","is_active") VALUES 
 (1,"Chain smoker","1"),
 (2,"Occasionally","1"),
 (3,"Regularly","1"),
 (4,"Never","1");
CREATE TABLE IF NOT EXISTS "m_specialisation" (
  "id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("id")
) AUTO_INCREMENT=11;
INSERT INTO "m_specialisation" ("id","name","is_active") VALUES 
 (1,"Cardiologist","1"),
 (2,"Dermatologist","1"),
 (3,"Endocrinologist","1"),
 (4,"Gastroenterologist","1"),
 (5,"Nephrologist","1"),
 (6,"Ophthalmologist","1"),
 (7,"Otolaryngologist","1"),
 (8,"Pulmonologist","1"),
 (9,"Neurologist","1"),
 (10,"Radiologist","1");
CREATE TABLE IF NOT EXISTS "m_surgery" (
  "surgery_id" int(10) unsigned NOT NULL,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("surgery_id")
);
INSERT INTO "m_surgery" ("surgery_id","name","is_active") VALUES 
 (1,"Appendectomy","1"),
 (2,"Breast biopsy","1"),
 (3,"Carotid endarterectomy","1"),
 (4,"Cataract surgery","1"),
 (5,"Cesarean section","1"),
 (6,"Cholecystectomy","1"),
 (7,"Coronary artery bypass","1"),
 (8,"Debridement of wound","1"),
 (9,"Dilation and curettage","1"),
 (10,"Free skin graft","1"),
 (11,"Hemorrhoidectomy","1"),
 (12,"Hysterectomy","1"),
 (13,"Hysteroscopy","1");
CREATE TABLE IF NOT EXISTS "m_transaction_type" (
  "transaction_type_id" int(10) unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(45) NOT NULL,
  "is_active" varchar(45) NOT NULL,
  PRIMARY KEY ("transaction_type_id")
)AUTO_INCREMENT=5;
INSERT INTO "m_transaction_type" ("transaction_type_id","name","is_active") VALUES 
 (1,"Booked appointment","1"),
 (2,"Cancelled appointment","1"),
 (3,"Booked kit","1"),
 (4,"Cancelled kit","1");