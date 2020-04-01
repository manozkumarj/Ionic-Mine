-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version 5.5.5-10.4.6-MariaDB


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema homeotel
--

CREATE DATABASE IF NOT EXISTS homeotel;
USE homeotel;

--
-- Definition of table `d_appointment`
--

DROP TABLE IF EXISTS `d_appointment`;
CREATE TABLE `d_appointment` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `appointment_id` int(10) unsigned NOT NULL,
  `mode_id` int(10) unsigned NOT NULL,
  `appointment_at` varchar(45) DEFAULT NULL,
  `booked_at` varchar(45) DEFAULT NULL,
  `amount_paid` varchar(45) DEFAULT NULL,
  `payment_status` int(10) DEFAULT 0,
  `appointment_status` int(10) DEFAULT 0,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_appointment`
--

/*!40000 ALTER TABLE `d_appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `d_appointment` ENABLE KEYS */;


--
-- Definition of table `d_doctor`
--

DROP TABLE IF EXISTS `d_doctor`;
CREATE TABLE `d_doctor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL DEFAULT '',
  `phone` int(10) unsigned DEFAULT NULL,
  `gender_id` int(10) unsigned DEFAULT NULL,
  `dob` date NOT NULL,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`uuid`,`username`) USING BTREE,
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_doctor`
--

/*!40000 ALTER TABLE `d_doctor` DISABLE KEYS */;
INSERT INTO `d_doctor` (`id`,`uuid`,`name`,`username`,`email`,`pwd`,`phone`,`gender_id`,`dob`,`created_at`) VALUES 
 (1,100000,'Doctor Bharat','bharat','bharat@gmail.com','bharat',NULL,1,'0000-00-00','2020-03-31 13:00:58'),
 (2,100001,'Doctor Manoj','manoj','manoj@gmail.com','manoj',NULL,1,'0000-00-00','2020-03-31 13:01:58'),
 (3,100002,'Doctor Mallesh','mallesh','mallesh@gmail.com','mallesh',NULL,1,'0000-00-00','2020-03-31 13:02:58'),
 (4,100003,'Doctor Rohit','rohit','rohit@gmail.com','rohit',NULL,1,'0000-00-00','2020-03-31 13:03:58');
/*!40000 ALTER TABLE `d_doctor` ENABLE KEYS */;


--
-- Definition of table `d_issue`
--

DROP TABLE IF EXISTS `d_issue`;
CREATE TABLE `d_issue` (
  `user_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `issue_type` varchar(45) DEFAULT NULL,
  `issue_description` varchar(45) DEFAULT NULL,
  `issue_raised_at` varchar(45) DEFAULT NULL,
  `issue_status` int(10) DEFAULT 0,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_issue`
--

/*!40000 ALTER TABLE `d_issue` DISABLE KEYS */;
/*!40000 ALTER TABLE `d_issue` ENABLE KEYS */;


--
-- Definition of table `d_setting`
--

DROP TABLE IF EXISTS `d_setting`;
CREATE TABLE `d_setting` (
  `user_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `setting_id` int(10) unsigned NOT NULL,
  `value` varchar(45) DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_setting`
--

/*!40000 ALTER TABLE `d_setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `d_setting` ENABLE KEYS */;


--
-- Definition of table `d_user`
--

DROP TABLE IF EXISTS `d_user`;
CREATE TABLE `d_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_user`
--

/*!40000 ALTER TABLE `d_user` DISABLE KEYS */;
INSERT INTO `d_user` (`user_id`,`username`,`email`,`password`,`created_at`) VALUES 
 (1,'aaa','aaa@aaa.com','aaa','2020-03-31 10:36:19'),
 (2,'bbb','bbb@bbb.com','bbb','2020-03-31 10:55:35'),
 (3,'ccc','ccc@ccc.com','ccc','2020-03-31 11:00:12'),
 (4,'rrr','rrr@rrr.com','rrr','2020-03-31 11:03:58');
/*!40000 ALTER TABLE `d_user` ENABLE KEYS */;


--
-- Definition of table `da_log`
--

DROP TABLE IF EXISTS `da_log`;
CREATE TABLE `da_log` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `appointment_id` int(10) unsigned NOT NULL,
  `mode_id` int(10) unsigned NOT NULL,
  `appointment_at` varchar(45) DEFAULT NULL,
  `appointment_status` int(10) DEFAULT 0,
  `is_latest` int(10) DEFAULT 0,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `da_log`
--

/*!40000 ALTER TABLE `da_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `da_log` ENABLE KEYS */;


--
-- Definition of table `dd_clinic`
--

DROP TABLE IF EXISTS `dd_clinic`;
CREATE TABLE `dd_clinic` (
  `doctor_id` int(10) unsigned NOT NULL,
  `clinic_id` int(10) unsigned NOT NULL,
  `clinic_name` varchar(100) DEFAULT NULL,
  `clinic_address` varchar(500) DEFAULT NULL,
  `walkin_fee` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`clinic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_clinic`
--

/*!40000 ALTER TABLE `dd_clinic` DISABLE KEYS */;
/*!40000 ALTER TABLE `dd_clinic` ENABLE KEYS */;


--
-- Definition of table `dd_kit`
--

DROP TABLE IF EXISTS `dd_kit`;
CREATE TABLE `dd_kit` (
  `kit_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int(10) unsigned NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_active` int(10) DEFAULT 0,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`kit_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_kit`
--

/*!40000 ALTER TABLE `dd_kit` DISABLE KEYS */;
INSERT INTO `dd_kit` (`kit_id`,`doctor_id`,`name`,`price`,`description`,`is_active`,`created_at`) VALUES 
 (1,1,'First aid kit','$250','First aid kit is useful in emergency',1,'2020-04-01 14:36:19'),
 (2,1,'Sanitizer','$100','Sanitizer kit is useful in emergency',1,'2020-04-01 14:38:19');
/*!40000 ALTER TABLE `dd_kit` ENABLE KEYS */;


--
-- Definition of table `dd_mode`
--

DROP TABLE IF EXISTS `dd_mode`;
CREATE TABLE `dd_mode` (
  `doctor_id` int(10) unsigned NOT NULL,
  `mode_id` int(10) unsigned NOT NULL,
  `minimum_min` int(10) unsigned DEFAULT NULL,
  `price_per_min` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`mode_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_mode`
--

/*!40000 ALTER TABLE `dd_mode` DISABLE KEYS */;
/*!40000 ALTER TABLE `dd_mode` ENABLE KEYS */;


--
-- Definition of table `dd_photo`
--

DROP TABLE IF EXISTS `dd_photo`;
CREATE TABLE `dd_photo` (
  `doctor_id` int(10) unsigned NOT NULL,
  `photo` blob NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_photo`
--

/*!40000 ALTER TABLE `dd_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `dd_photo` ENABLE KEYS */;


--
-- Definition of table `ddc_timing`
--

DROP TABLE IF EXISTS `ddc_timing`;
CREATE TABLE `ddc_timing` (
  `doctor_id` int(10) unsigned NOT NULL,
  `clinic_id` int(10) unsigned NOT NULL,
  `from_date` varchar(45) DEFAULT NULL,
  `to_date` varchar(45) DEFAULT NULL,
  `from_time` varchar(45) DEFAULT NULL,
  `to_time` varchar(45) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`clinic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ddc_timing`
--

/*!40000 ALTER TABLE `ddc_timing` DISABLE KEYS */;
/*!40000 ALTER TABLE `ddc_timing` ENABLE KEYS */;


--
-- Definition of table `dk_order`
--

DROP TABLE IF EXISTS `dk_order`;
CREATE TABLE `dk_order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `kit_id` int(10) unsigned NOT NULL,
  `amount_paid` varchar(45) DEFAULT NULL,
  `order_status` varchar(45) DEFAULT NULL,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`doctor_id`,`user_id`,`kit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dk_order`
--

/*!40000 ALTER TABLE `dk_order` DISABLE KEYS */;
INSERT INTO `dk_order` (`id`,`user_id`,`doctor_id`,`kit_id`,`amount_paid`,`order_status`,`created_at`) VALUES 
 (1,1,1,2,'$100','completed','2020-04-01 23:23:22');
/*!40000 ALTER TABLE `dk_order` ENABLE KEYS */;


--
-- Definition of table `dko_log`
--

DROP TABLE IF EXISTS `dko_log`;
CREATE TABLE `dko_log` (
  `doctor_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `kit_id` int(10) unsigned NOT NULL,
  `order_status` varchar(45) DEFAULT NULL,
  `is_latest` int(10) DEFAULT 0,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`user_id`,`kit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dko_log`
--

/*!40000 ALTER TABLE `dko_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `dko_log` ENABLE KEYS */;


--
-- Definition of table `du_doctor`
--

DROP TABLE IF EXISTS `du_doctor`;
CREATE TABLE `du_doctor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `added_on` varchar(45) DEFAULT NULL,
  `is_active` int(10) DEFAULT 0,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `du_doctor`
--

/*!40000 ALTER TABLE `du_doctor` DISABLE KEYS */;
INSERT INTO `du_doctor` (`id`,`user_id`,`doctor_id`,`added_on`,`is_active`,`created_at`,`updated_at`) VALUES 
 (9,1,1,'2020-04-01 22:03:03',1,'2020-04-01 22:03:03','2020-04-01 22:03:03');
/*!40000 ALTER TABLE `du_doctor` ENABLE KEYS */;


--
-- Definition of table `du_photo`
--

DROP TABLE IF EXISTS `du_photo`;
CREATE TABLE `du_photo` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL DEFAULT 0,
  `photo` blob NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `du_photo`
--

/*!40000 ALTER TABLE `du_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `du_photo` ENABLE KEYS */;


--
-- Definition of table `du_relative`
--

DROP TABLE IF EXISTS `du_relative`;
CREATE TABLE `du_relative` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `relative_name` varchar(100) NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `du_relative`
--

/*!40000 ALTER TABLE `du_relative` DISABLE KEYS */;
/*!40000 ALTER TABLE `du_relative` ENABLE KEYS */;


--
-- Definition of table `ehr_allergy`
--

DROP TABLE IF EXISTS `ehr_allergy`;
CREATE TABLE `ehr_allergy` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `allergy_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`),
  KEY `FK_ehr_allergy_id` (`allergy_id`),
  CONSTRAINT `FK_ehr_allergy_id` FOREIGN KEY (`allergy_id`) REFERENCES `m_allergy` (`allergy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_allergy`
--

/*!40000 ALTER TABLE `ehr_allergy` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_allergy` ENABLE KEYS */;


--
-- Definition of table `ehr_chronic`
--

DROP TABLE IF EXISTS `ehr_chronic`;
CREATE TABLE `ehr_chronic` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `disease_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`disease_id`),
  KEY `FK_ehr_disease_id` (`disease_id`),
  CONSTRAINT `FK_ehr_disease_id` FOREIGN KEY (`disease_id`) REFERENCES `m_disease` (`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_chronic`
--

/*!40000 ALTER TABLE `ehr_chronic` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_chronic` ENABLE KEYS */;


--
-- Definition of table `ehr_consultation`
--

DROP TABLE IF EXISTS `ehr_consultation`;
CREATE TABLE `ehr_consultation` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `appointment_id` int(10) unsigned NOT NULL,
  `parameter_id` int(10) unsigned NOT NULL,
  `value` varchar(45) DEFAULT NULL,
  `added_by` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_consultation`
--

/*!40000 ALTER TABLE `ehr_consultation` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_consultation` ENABLE KEYS */;


--
-- Definition of table `ehr_current_medication`
--

DROP TABLE IF EXISTS `ehr_current_medication`;
CREATE TABLE `ehr_current_medication` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `medication_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`medication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_current_medication`
--

/*!40000 ALTER TABLE `ehr_current_medication` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_current_medication` ENABLE KEYS */;


--
-- Definition of table `ehr_family_history`
--

DROP TABLE IF EXISTS `ehr_family_history`;
CREATE TABLE `ehr_family_history` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `relation_id` int(10) unsigned NOT NULL,
  `disease_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`relation_id`,`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_family_history`
--

/*!40000 ALTER TABLE `ehr_family_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_family_history` ENABLE KEYS */;


--
-- Definition of table `ehr_file`
--

DROP TABLE IF EXISTS `ehr_file`;
CREATE TABLE `ehr_file` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `file_type_id` int(10) unsigned NOT NULL,
  `file_date` varchar(45) NOT NULL,
  `upload_date` varchar(45) NOT NULL,
  `file_blob` blob NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_file`
--

/*!40000 ALTER TABLE `ehr_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_file` ENABLE KEYS */;


--
-- Definition of table `ehr_injury`
--

DROP TABLE IF EXISTS `ehr_injury`;
CREATE TABLE `ehr_injury` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `injury_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`injury_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_injury`
--

/*!40000 ALTER TABLE `ehr_injury` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_injury` ENABLE KEYS */;


--
-- Definition of table `ehr_lifestyle`
--

DROP TABLE IF EXISTS `ehr_lifestyle`;
CREATE TABLE `ehr_lifestyle` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `smoking_id` int(10) unsigned DEFAULT NULL,
  `alcohol_id` int(10) unsigned DEFAULT NULL,
  `excercise_id` int(10) unsigned DEFAULT NULL,
  `activity_level_id` int(10) unsigned DEFAULT NULL,
  `profession_id` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_lifestyle`
--

/*!40000 ALTER TABLE `ehr_lifestyle` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_lifestyle` ENABLE KEYS */;


--
-- Definition of table `ehr_lifestyle_food`
--

DROP TABLE IF EXISTS `ehr_lifestyle_food`;
CREATE TABLE `ehr_lifestyle_food` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `food_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_lifestyle_food`
--

/*!40000 ALTER TABLE `ehr_lifestyle_food` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_lifestyle_food` ENABLE KEYS */;


--
-- Definition of table `ehr_past_medication`
--

DROP TABLE IF EXISTS `ehr_past_medication`;
CREATE TABLE `ehr_past_medication` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `medication_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`medication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_past_medication`
--

/*!40000 ALTER TABLE `ehr_past_medication` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_past_medication` ENABLE KEYS */;


--
-- Definition of table `ehr_surgery`
--

DROP TABLE IF EXISTS `ehr_surgery`;
CREATE TABLE `ehr_surgery` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `surgery_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`surgery_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_surgery`
--

/*!40000 ALTER TABLE `ehr_surgery` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_surgery` ENABLE KEYS */;


--
-- Definition of table `ehr_vital`
--

DROP TABLE IF EXISTS `ehr_vital`;
CREATE TABLE `ehr_vital` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `date` varchar(45) NOT NULL,
  `temperature` decimal(4,1) DEFAULT NULL,
  `pulse` int(10) unsigned DEFAULT NULL,
  `resp_rate` int(10) unsigned DEFAULT NULL,
  `bp_systolic` int(10) unsigned DEFAULT NULL,
  `bp_diastolic` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_vital`
--

/*!40000 ALTER TABLE `ehr_vital` DISABLE KEYS */;
/*!40000 ALTER TABLE `ehr_vital` ENABLE KEYS */;


--
-- Definition of table `m_activity_level`
--

DROP TABLE IF EXISTS `m_activity_level`;
CREATE TABLE `m_activity_level` (
  `activity_level_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`activity_level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_activity_level`
--

/*!40000 ALTER TABLE `m_activity_level` DISABLE KEYS */;
INSERT INTO `m_activity_level` (`activity_level_id`,`name`,`is_active`) VALUES 
 (1,'Level 1','1'),
 (2,'Level 2','1'),
 (3,'Level 3 ','1');
/*!40000 ALTER TABLE `m_activity_level` ENABLE KEYS */;


--
-- Definition of table `m_alcohol`
--

DROP TABLE IF EXISTS `m_alcohol`;
CREATE TABLE `m_alcohol` (
  `alcohol_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`alcohol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_alcohol`
--

/*!40000 ALTER TABLE `m_alcohol` DISABLE KEYS */;
INSERT INTO `m_alcohol` (`alcohol_id`,`name`,`is_active`) VALUES 
 (1,'Occasionally','1'),
 (2,'Addicted','1');
/*!40000 ALTER TABLE `m_alcohol` ENABLE KEYS */;


--
-- Definition of table `m_allergy`
--

DROP TABLE IF EXISTS `m_allergy`;
CREATE TABLE `m_allergy` (
  `allergy_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`allergy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_allergy`
--

/*!40000 ALTER TABLE `m_allergy` DISABLE KEYS */;
INSERT INTO `m_allergy` (`allergy_id`,`name`,`is_active`) VALUES 
 (1,'Skin','1'),
 (2,'Dust','1'),
 (3,'Sun','1');
/*!40000 ALTER TABLE `m_allergy` ENABLE KEYS */;


--
-- Definition of table `m_award`
--

DROP TABLE IF EXISTS `m_award`;
CREATE TABLE `m_award` (
  `award_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`award_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_award`
--

/*!40000 ALTER TABLE `m_award` DISABLE KEYS */;
INSERT INTO `m_award` (`award_id`,`name`,`is_active`) VALUES 
 (1,'B. C. Roy award ','1'),
 (2,'Ashoka chakra','1'),
 (3,'Uttam jeevan raksha padak','1'),
 (4,' Sarvottam yudh seva medal ','1'),
 (5,' Om prakash bhasin award','1');
/*!40000 ALTER TABLE `m_award` ENABLE KEYS */;


--
-- Definition of table `m_blood_group`
--

DROP TABLE IF EXISTS `m_blood_group`;
CREATE TABLE `m_blood_group` (
  `blood_group_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`blood_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_blood_group`
--

/*!40000 ALTER TABLE `m_blood_group` DISABLE KEYS */;
INSERT INTO `m_blood_group` (`blood_group_id`,`name`,`is_active`) VALUES 
 (1,'O','1'),
 (2,'A','1'),
 (3,'AB','1'),
 (4,'B','1');
/*!40000 ALTER TABLE `m_blood_group` ENABLE KEYS */;


--
-- Definition of table `m_disease`
--

DROP TABLE IF EXISTS `m_disease`;
CREATE TABLE `m_disease` (
  `disease_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_disease`
--

/*!40000 ALTER TABLE `m_disease` DISABLE KEYS */;
INSERT INTO `m_disease` (`disease_id`,`name`,`is_active`) VALUES 
 (1,'option1','1'),
 (2,'option2','1');
/*!40000 ALTER TABLE `m_disease` ENABLE KEYS */;


--
-- Definition of table `m_exercise`
--

DROP TABLE IF EXISTS `m_exercise`;
CREATE TABLE `m_exercise` (
  `exercise_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`exercise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_exercise`
--

/*!40000 ALTER TABLE `m_exercise` DISABLE KEYS */;
INSERT INTO `m_exercise` (`exercise_id`,`name`,`is_active`) VALUES 
 (1,'Regular','1'),
 (2,'Lazy','1'),
 (3,'Once in full moon','1');
/*!40000 ALTER TABLE `m_exercise` ENABLE KEYS */;


--
-- Definition of table `m_file_type`
--

DROP TABLE IF EXISTS `m_file_type`;
CREATE TABLE `m_file_type` (
  `file_type_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`file_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_file_type`
--

/*!40000 ALTER TABLE `m_file_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_file_type` ENABLE KEYS */;


--
-- Definition of table `m_food`
--

DROP TABLE IF EXISTS `m_food`;
CREATE TABLE `m_food` (
  `food_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_food`
--

/*!40000 ALTER TABLE `m_food` DISABLE KEYS */;
INSERT INTO `m_food` (`food_id`,`name`,`is_active`) VALUES 
 (1,'Sweets','1'),
 (2,'Oil Food','1'),
 (3,'Chinese','1');
/*!40000 ALTER TABLE `m_food` ENABLE KEYS */;


--
-- Definition of table `m_gender`
--

DROP TABLE IF EXISTS `m_gender`;
CREATE TABLE `m_gender` (
  `gender_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_gender`
--

/*!40000 ALTER TABLE `m_gender` DISABLE KEYS */;
INSERT INTO `m_gender` (`gender_id`,`name`,`is_active`) VALUES 
 (1,'Male','1'),
 (2,'Female','1'),
 (3,'Other','1');
/*!40000 ALTER TABLE `m_gender` ENABLE KEYS */;


--
-- Definition of table `m_injury`
--

DROP TABLE IF EXISTS `m_injury`;
CREATE TABLE `m_injury` (
  `injury_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`injury_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_injury`
--

/*!40000 ALTER TABLE `m_injury` DISABLE KEYS */;
INSERT INTO `m_injury` (`injury_id`,`name`,`is_active`) VALUES 
 (1,'option1','1'),
 (2,'option2','1');
/*!40000 ALTER TABLE `m_injury` ENABLE KEYS */;


--
-- Definition of table `m_marital_status`
--

DROP TABLE IF EXISTS `m_marital_status`;
CREATE TABLE `m_marital_status` (
  `marital_status_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`marital_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_marital_status`
--

/*!40000 ALTER TABLE `m_marital_status` DISABLE KEYS */;
INSERT INTO `m_marital_status` (`marital_status_id`,`name`,`is_active`) VALUES 
 (1,'Married','1'),
 (2,'Unmarried','1'),
 (3,'Divorced','1'),
 (4,'Widow','1');
/*!40000 ALTER TABLE `m_marital_status` ENABLE KEYS */;


--
-- Definition of table `m_medication`
--

DROP TABLE IF EXISTS `m_medication`;
CREATE TABLE `m_medication` (
  `medication_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_medication`
--

/*!40000 ALTER TABLE `m_medication` DISABLE KEYS */;
INSERT INTO `m_medication` (`medication_id`,`name`,`is_active`) VALUES 
 (1,'Covid 19','1'),
 (2,'Covid 20','1');
/*!40000 ALTER TABLE `m_medication` ENABLE KEYS */;


--
-- Definition of table `m_mode`
--

DROP TABLE IF EXISTS `m_mode`;
CREATE TABLE `m_mode` (
  `mode_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` int(10) unsigned NOT NULL,
  PRIMARY KEY (`mode_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_mode`
--

/*!40000 ALTER TABLE `m_mode` DISABLE KEYS */;
INSERT INTO `m_mode` (`mode_id`,`name`,`is_active`) VALUES 
 (1,'Video consultation',1),
 (2,'Audio consultation',1),
 (3,'Chat consultation',1),
 (4,'Personal visit',1);
/*!40000 ALTER TABLE `m_mode` ENABLE KEYS */;


--
-- Definition of table `m_parameter`
--

DROP TABLE IF EXISTS `m_parameter`;
CREATE TABLE `m_parameter` (
  `parameter_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`parameter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_parameter`
--

/*!40000 ALTER TABLE `m_parameter` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_parameter` ENABLE KEYS */;


--
-- Definition of table `m_profession`
--

DROP TABLE IF EXISTS `m_profession`;
CREATE TABLE `m_profession` (
  `profession_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`profession_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_profession`
--

/*!40000 ALTER TABLE `m_profession` DISABLE KEYS */;
INSERT INTO `m_profession` (`profession_id`,`name`,`is_active`) VALUES 
 (1,'White Collar','1'),
 (2,'No Collar','1');
/*!40000 ALTER TABLE `m_profession` ENABLE KEYS */;


--
-- Definition of table `m_qualification`
--

DROP TABLE IF EXISTS `m_qualification`;
CREATE TABLE `m_qualification` (
  `qualification_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`qualification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_qualification`
--

/*!40000 ALTER TABLE `m_qualification` DISABLE KEYS */;
INSERT INTO `m_qualification` (`qualification_id`,`name`,`is_active`) VALUES 
 (1,' (MD) doctor of medicine by research.\n','1'),
 (2,'Doctor of philosophy (PhD)','1'),
 (3,'Master of clinical medicine (MCM) ','1'),
 (4,'Master of medical science (MMSc,  MMedSc) \n','1'),
 (5,'Master of Philosophy (Mphil)','1');
/*!40000 ALTER TABLE `m_qualification` ENABLE KEYS */;


--
-- Definition of table `m_relation`
--

DROP TABLE IF EXISTS `m_relation`;
CREATE TABLE `m_relation` (
  `relation_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`relation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_relation`
--

/*!40000 ALTER TABLE `m_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_relation` ENABLE KEYS */;


--
-- Definition of table `m_setting`
--

DROP TABLE IF EXISTS `m_setting`;
CREATE TABLE `m_setting` (
  `setting_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`setting_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_setting`
--

/*!40000 ALTER TABLE `m_setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_setting` ENABLE KEYS */;


--
-- Definition of table `m_smoking`
--

DROP TABLE IF EXISTS `m_smoking`;
CREATE TABLE `m_smoking` (
  `smoking_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`smoking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_smoking`
--

/*!40000 ALTER TABLE `m_smoking` DISABLE KEYS */;
INSERT INTO `m_smoking` (`smoking_id`,`name`,`is_active`) VALUES 
 (1,'Chain smoker','1'),
 (2,'Occasionally','1');
/*!40000 ALTER TABLE `m_smoking` ENABLE KEYS */;


--
-- Definition of table `m_specialization`
--

DROP TABLE IF EXISTS `m_specialization`;
CREATE TABLE `m_specialization` (
  `specialization_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`specialization_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_specialization`
--

/*!40000 ALTER TABLE `m_specialization` DISABLE KEYS */;
INSERT INTO `m_specialization` (`specialization_id`,`name`,`is_active`) VALUES 
 (1,'Anesthesiologists','1'),
 (2,'Cardiologists','1'),
 (3,'Dermatologists','1'),
 (4,'Endocrinologists','1'),
 (5,'Family Physicians','1'),
 (6,'Gastroenterologists','1'),
 (7,'Colon and Rectal Surgeons','1');
/*!40000 ALTER TABLE `m_specialization` ENABLE KEYS */;


--
-- Definition of table `m_surgery`
--

DROP TABLE IF EXISTS `m_surgery`;
CREATE TABLE `m_surgery` (
  `surgery_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`surgery_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_surgery`
--

/*!40000 ALTER TABLE `m_surgery` DISABLE KEYS */;
INSERT INTO `m_surgery` (`surgery_id`,`name`,`is_active`) VALUES 
 (1,'option1','1'),
 (2,'option2','1');
/*!40000 ALTER TABLE `m_surgery` ENABLE KEYS */;


--
-- Definition of table `m_transaction_type`
--

DROP TABLE IF EXISTS `m_transaction_type`;
CREATE TABLE `m_transaction_type` (
  `transaction_type_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`transaction_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_transaction_type`
--

/*!40000 ALTER TABLE `m_transaction_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_transaction_type` ENABLE KEYS */;


--
-- Definition of procedure `sp_doctor_kits_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_kits_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_kits_get`(IN IN_doctor_id INT)
BEGIN

DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;


  SELECT * FROM dd_kit d where doctor_id = IN_doctor_id;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_master_doctor_personaldetail_get`
--

DROP PROCEDURE IF EXISTS `sp_master_doctor_personaldetail_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_doctor_personaldetail_get`()
BEGIN

DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

 SELECT award_id as id, name, 'awards' as master_type from m_award WHERE is_active = 1

Union

 SELECT specialization_id as id, name, 'specialization' as master_type from m_specialization WHERE is_active = 1

Union

 SELECT qualification_id as id, name, 'qualification' as master_type from m_qualification WHERE is_active = 1


 ;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_master_lifestyle_get`
--

DROP PROCEDURE IF EXISTS `sp_master_lifestyle_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_lifestyle_get`()
BEGIN

DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

 SELECT smoking_id as id, name, 'smoking' as master_type from m_smoking WHERE is_active = 1

Union

 SELECT alcohol_id as id, name, 'alcohol' as master_type from m_alcohol WHERE is_active = 1

Union

 SELECT exercise_id as id, name, 'exercise' as master_type from m_exercise WHERE is_active = 1

Union

 SELECT activity_level_id as id, name, 'activity_level' as master_type from m_activity_level WHERE is_active = 1

Union

 SELECT profession_id as id, name, 'profession' as master_type from m_profession WHERE is_active = 1

Union

 SELECT food_id as id, name, 'food' as master_type from m_food WHERE is_active = 1

 ;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_master_medical_history`
--

DROP PROCEDURE IF EXISTS `sp_master_medical_history`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_medical_history`()
BEGIN

DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

 SELECT allergy_id as id, name, 'allery' as master_type from m_allergy WHERE is_active = 1

Union

 SELECT medication_id as id, name, 'medication' as master_type from m_medication WHERE is_active = 1

Union

 SELECT surgery_id as id, name, 'surgery' as master_type from m_surgery WHERE is_active = 1

Union

 SELECT surgery_id as id, name, 'surgery' as master_type from m_surgery WHERE is_active = 1


Union

 SELECT injury_id as id, name, 'injury' as master_type from m_injury WHERE is_active = 1

Union

 SELECT injury_id as id, name, 'injury' as master_type from m_injury WHERE is_active = 1

Union

 SELECT disease_id as id, name, 'disease' as master_type from m_disease WHERE is_active = 1



 ;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_master_registration_get`
--

DROP PROCEDURE IF EXISTS `sp_master_registration_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_registration_get`()
BEGIN

DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;

END;

 SELECT gender_id as id, name, 'gender' as master_type from m_gender WHERE is_active = 1

 UNION

  SELECT marital_status_id as id, name, 'marital_status' as master_type from m_marital_status WHERE is_active = 1

 UNION

  SELECT blood_group_id as id, name, 'blood_group' as master_type from m_blood_group WHERE is_active = 1



 ;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_add_doctor`
--

DROP PROCEDURE IF EXISTS `sp_user_add_doctor`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_add_doctor`(IN IN_userId INT,IN IN_doctorId INT)
BEGIN

DECLARE Var_email INT;


DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

START TRANSACTION;


     INSERT INTO du_doctor (user_id,doctor_id,added_on,is_active,created_at,updated_at)
     VALUES (IN_userId,IN_doctorId,now(),1,now(),now());


COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_doctors`
--

DROP PROCEDURE IF EXISTS `sp_user_doctors`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_doctors`(IN IN_userId INT)
BEGIN

DECLARE Var_email INT;


DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

 SELECT * FROM du_doctor du LEFT JOIN d_doctor d ON du.doctor_id = d.id where du.user_id=IN_userId;

 END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_find_doctor`
--

DROP PROCEDURE IF EXISTS `sp_user_find_doctor`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_find_doctor`(IN IN_uuid INT)
BEGIN

DECLARE Var_email INT;


DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

 SELECT * FROM d_doctor d where uuid=IN_uuid;

 END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_login`
--

DROP PROCEDURE IF EXISTS `sp_user_login`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_login`(IN IN_username VARCHAR(255),IN IN_password VARCHAR(255))
BEGIN

DECLARE Var_email INT;


DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

 SELECT * FROM d_user d where (email=IN_username and password=IN_password) OR (username=IN_username and password=IN_password);

 END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_purchase_homeokit`
--

DROP PROCEDURE IF EXISTS `sp_user_purchase_homeokit`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_purchase_homeokit`(IN IN_userId INT,IN IN_doctorId INT, IN IN_kitId INT,
                                                                 IN IN_price VARCHAR(225))
BEGIN

DECLARE Var_email INT;


DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

START TRANSACTION;


     INSERT INTO dk_order (user_id,doctor_id,kit_id,amount_paid,order_status,created_at)
     VALUES (IN_userId,IN_doctorId,IN_kitId,IN_price,'completed',now());


COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_register`
--

DROP PROCEDURE IF EXISTS `sp_user_register`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_register`(IN IN_username VARCHAR(255),IN IN_email VARCHAR(255),
                                                               IN IN_password VARCHAR(255))
BEGIN

DECLARE Var_email INT;


DECLARE exit handler for sqlexception
  BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

DECLARE exit handler for sqlwarning
 BEGIN

    GET DIAGNOSTICS CONDITION 1
    @p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
    SELECT @p1 as error_code  , @p2 as error;
    ROLLBACK;

END;

START TRANSACTION;


 Set Var_email = (SELECT count(*) FROM d_user d where email=IN_email);


     INSERT INTO d_user (username,email, password, created_at)
     VALUES (IN_username,IN_email,IN_password,now());




COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
