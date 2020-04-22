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
  `appointment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned DEFAULT NULL,
  `doctor_id` int(10) unsigned NOT NULL,
  `mode_id` int(10) unsigned NOT NULL,
  `main_complaint` varchar(50) DEFAULT NULL,
  `appointment_at` varchar(45) DEFAULT NULL,
  `booked_at` varchar(45) DEFAULT NULL,
  `amount_paid` varchar(45) DEFAULT NULL,
  `payment_status` int(11) DEFAULT 0,
  `appointment_status` int(11) DEFAULT 0,
  `advice` varchar(500) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `review_date` varchar(50) DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_appointment`
--

/*!40000 ALTER TABLE `d_appointment` DISABLE KEYS */;
INSERT INTO `d_appointment` (`appointment_id`,`user_id`,`relative_id`,`doctor_id`,`mode_id`,`main_complaint`,`appointment_at`,`booked_at`,`amount_paid`,`payment_status`,`appointment_status`,`advice`,`notes`,`review_date`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (17,1,1,1,2,NULL,'2020-4-8 10:30:00',NULL,'20',0,0,NULL,NULL,NULL,1,'2020-04-06 14:18:57',1,'2020-04-06 14:19:53'),
 (18,1,1,2,3,'jus des...','2020-4-15 13:00:00',NULL,'52',0,0,NULL,NULL,NULL,1,'2020-04-10 08:42:16',1,'2020-04-10 08:42:16'),
 (19,1,0,1,4,'another jus','2020-4-16 11:00:00',NULL,'500',0,1,NULL,NULL,NULL,1,'2020-04-10 08:42:57',1,'2020-04-10 08:42:57'),
 (20,5,0,2,2,'testtttstst','2020-4-22 11:00:00',NULL,'22',0,0,NULL,NULL,NULL,5,'2020-04-16 21:25:23',5,'2020-04-16 21:25:23');
/*!40000 ALTER TABLE `d_appointment` ENABLE KEYS */;


--
-- Definition of table `d_doctor`
--

DROP TABLE IF EXISTS `d_doctor`;
CREATE TABLE `d_doctor` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` int(10) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(10) DEFAULT NULL,
  `gender_id` int(10) unsigned DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`uuid`,`username`) USING BTREE,
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_doctor`
--

/*!40000 ALTER TABLE `d_doctor` DISABLE KEYS */;
INSERT INTO `d_doctor` (`id`,`uuid`,`name`,`username`,`email`,`pwd`,`phone`,`gender_id`,`dob`,`created_at`) VALUES 
 (1,100000,'Doctor Bharat','bharat','bharat@gmail.com','bharat',NULL,1,NULL,'2020-03-31 13:00:58'),
 (2,100001,'Doctor Manoj','manoj','manoj@gmail.com','manoj',NULL,1,NULL,'2020-03-31 13:01:58'),
 (3,100002,'Doctor Mallesh','mallesh','mallesh@gmail.com','mallesh',NULL,1,NULL,'2020-03-31 13:02:58'),
 (4,100003,'Doctor Rohit','rohit','rohit@gmail.com','rohit',NULL,1,NULL,'2020-03-31 13:03:58');
/*!40000 ALTER TABLE `d_doctor` ENABLE KEYS */;


--
-- Definition of table `d_issue`
--

DROP TABLE IF EXISTS `d_issue`;
CREATE TABLE `d_issue` (
  `issue_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `doctor_id` int(10) unsigned DEFAULT NULL,
  `issue_type_id` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `issue_description` varchar(5000) DEFAULT NULL,
  `issue_raised_at` varchar(45) DEFAULT NULL,
  `issue_status` int(11) DEFAULT 0,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`issue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_issue`
--

/*!40000 ALTER TABLE `d_issue` DISABLE KEYS */;
INSERT INTO `d_issue` (`issue_id`,`user_id`,`doctor_id`,`issue_type_id`,`email`,`phone`,`issue_description`,`issue_raised_at`,`issue_status`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,NULL,'3','ccc@ccc.com','9876543333','9876543333','2020-04-10 12:17:07',0,NULL,'2020-04-10 12:17:07',NULL,NULL),
 (2,1,NULL,'5','eee@eee.com','9555555555','9555555555','2020-04-10 12:23:01',0,1,'2020-04-10 12:23:01',1,'2020-04-10 12:23:01');
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
-- Definition of table `d_transaction`
--

DROP TABLE IF EXISTS `d_transaction`;
CREATE TABLE `d_transaction` (
  `transaction_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `doctor_id` int(10) unsigned DEFAULT NULL,
  `appointment_id` int(10) DEFAULT NULL,
  `kit_id` int(10) DEFAULT NULL,
  `transaction_type_id` int(10) unsigned NOT NULL,
  `transaction_amount` double NOT NULL,
  `taxes` double DEFAULT NULL,
  `charges` double DEFAULT NULL,
  `net_amount` double DEFAULT NULL,
  `transaction_at` varchar(45) NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_transaction`
--

/*!40000 ALTER TABLE `d_transaction` DISABLE KEYS */;
INSERT INTO `d_transaction` (`transaction_id`,`user_id`,`doctor_id`,`appointment_id`,`kit_id`,`transaction_type_id`,`transaction_amount`,`taxes`,`charges`,`net_amount`,`transaction_at`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (18,1,1,17,NULL,1,20,0,0,20,'2020-04-06 14:19:53',1,'2020-04-06 14:18:57',1,'2020-04-06 14:19:53'),
 (19,1,1,NULL,1,3,250,0,0,250,'2020-04-06 14:27:35',1,'2020-04-06 14:27:35',1,'2020-04-06 14:27:35'),
 (20,1,2,18,NULL,1,52,0,0,52,'2020-04-10 08:42:16',1,'2020-04-10 08:42:16',1,'2020-04-10 08:42:16'),
 (21,1,1,19,NULL,1,500,0,0,500,'2020-04-10 08:42:57',1,'2020-04-10 08:42:57',1,'2020-04-10 08:42:57'),
 (22,5,2,NULL,4,3,350,0,0,350,'2020-04-16 21:11:15',5,'2020-04-16 21:11:15',5,'2020-04-16 21:11:15'),
 (23,5,2,NULL,3,3,300,0,0,300,'2020-04-16 21:24:00',5,'2020-04-16 21:24:00',5,'2020-04-16 21:24:00'),
 (24,5,2,20,NULL,1,22,0,0,22,'2020-04-16 21:25:23',5,'2020-04-16 21:25:23',5,'2020-04-16 21:25:23');
/*!40000 ALTER TABLE `d_transaction` ENABLE KEYS */;


--
-- Definition of table `d_user`
--

DROP TABLE IF EXISTS `d_user`;
CREATE TABLE `d_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `gender_id` varchar(50) DEFAULT NULL,
  `dob` varchar(50) DEFAULT NULL,
  `blood_group_id` varchar(50) DEFAULT NULL,
  `marital_status_id` varchar(50) DEFAULT NULL,
  `height` varchar(50) DEFAULT NULL,
  `weight` varchar(50) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_user`
--

/*!40000 ALTER TABLE `d_user` DISABLE KEYS */;
INSERT INTO `d_user` (`user_id`,`name`,`username`,`password`,`phone`,`email`,`gender_id`,`dob`,`blood_group_id`,`marital_status_id`,`height`,`weight`,`created_at`) VALUES 
 (1,'User AAA','aaa','aaa','9876543219','aaa@aaa.com','2','1990-2-15','3','3','6.2','74','2020-03-31 10:36:19'),
 (2,NULL,'bbb','bbb',NULL,'bbb@bbb.com',NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-31 10:55:35'),
 (3,NULL,'ccc','ccc',NULL,'ccc@ccc.com',NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-31 11:00:12'),
 (4,NULL,'rrr','rrr',NULL,'rrr@rrr.com',NULL,NULL,NULL,NULL,NULL,NULL,'2020-03-31 11:03:58'),
 (5,'Mmm','mmm','mmm','9876543210','mmm@mmm.com','2',NULL,'4','3',NULL,NULL,'2020-04-16 19:11:07'),
 (6,NULL,'manoj','manoj',NULL,'manoj@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,'2020-04-19 15:27:34');
/*!40000 ALTER TABLE `d_user` ENABLE KEYS */;


--
-- Definition of table `da_complaint_detail`
--

DROP TABLE IF EXISTS `da_complaint_detail`;
CREATE TABLE `da_complaint_detail` (
  `complaint_detail_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL DEFAULT 0,
  `doctor_id` int(10) unsigned NOT NULL,
  `appointment_id` int(10) unsigned NOT NULL,
  `is_recurring` varchar(45) DEFAULT NULL,
  `recurring_freq` varchar(45) DEFAULT NULL,
  `severity_id` varchar(45) DEFAULT NULL,
  `complaint_description` varchar(500) DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`complaint_detail_id`,`user_id`,`relative_id`,`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `da_complaint_detail`
--

/*!40000 ALTER TABLE `da_complaint_detail` DISABLE KEYS */;
INSERT INTO `da_complaint_detail` (`complaint_detail_id`,`user_id`,`relative_id`,`doctor_id`,`appointment_id`,`is_recurring`,`recurring_freq`,`severity_id`,`complaint_description`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (11,1,1,2,13,'1','2','2','gegegeg',1,'2020-04-06 13:07:07',5,'2020-04-16 21:29:52'),
 (12,1,0,1,15,'1','2','2','gegegeg',1,'2020-04-06 14:11:02',5,'2020-04-16 21:29:52'),
 (13,1,0,1,17,'1','2','2','gegegeg',1,'2020-04-06 14:19:20',5,'2020-04-16 21:29:52'),
 (14,1,0,1,19,'1','2','2','gegegeg',1,'2020-04-10 08:45:23',5,'2020-04-16 21:29:52'),
 (15,5,0,2,20,'1','2','2','gegegeg',5,'2020-04-16 21:25:48',5,'2020-04-16 21:29:52');
/*!40000 ALTER TABLE `da_complaint_detail` ENABLE KEYS */;


--
-- Definition of table `da_diagnosis`
--

DROP TABLE IF EXISTS `da_diagnosis`;
CREATE TABLE `da_diagnosis` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL DEFAULT 0,
  `doctor_id` int(10) unsigned NOT NULL,
  `diagnosis_id` int(10) unsigned NOT NULL,
  `other_diagnosis` varchar(45) DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `da_diagnosis`
--

/*!40000 ALTER TABLE `da_diagnosis` DISABLE KEYS */;
INSERT INTO `da_diagnosis` (`user_id`,`relative_id`,`doctor_id`,`diagnosis_id`,`other_diagnosis`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,20,1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `da_diagnosis` ENABLE KEYS */;


--
-- Definition of table `da_log`
--

DROP TABLE IF EXISTS `da_log`;
CREATE TABLE `da_log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `da_log`
--

/*!40000 ALTER TABLE `da_log` DISABLE KEYS */;
INSERT INTO `da_log` (`log_id`,`user_id`,`relative_id`,`doctor_id`,`appointment_id`,`mode_id`,`appointment_at`,`appointment_status`,`is_latest`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (15,1,1,1,17,2,'2020-4-8 10:30:00',0,0,1,'2020-04-06 14:18:57',1,'2020-04-06 14:19:53'),
 (16,1,1,2,18,3,'2020-4-15 13:00:00',0,0,1,'2020-04-10 08:42:16',1,'2020-04-10 08:42:16'),
 (17,1,0,1,19,4,'2020-4-16 11:00:00',0,0,1,'2020-04-10 08:42:57',1,'2020-04-10 08:42:57'),
 (18,5,0,2,20,2,'2020-4-22 11:00:00',0,0,5,'2020-04-16 21:25:23',5,'2020-04-16 21:25:23');
/*!40000 ALTER TABLE `da_log` ENABLE KEYS */;


--
-- Definition of table `da_prescription`
--

DROP TABLE IF EXISTS `da_prescription`;
CREATE TABLE `da_prescription` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL DEFAULT 0,
  `doctor_id` int(10) unsigned NOT NULL,
  `drug_id` int(10) unsigned NOT NULL,
  `scale_id` int(10) unsigned NOT NULL,
  `potency_id` int(10) unsigned NOT NULL,
  `dosage_id` int(10) unsigned NOT NULL,
  `freq_id` int(10) unsigned NOT NULL,
  `instruction_id` int(10) unsigned NOT NULL,
  `no_of_days` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`relative_id`,`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `da_prescription`
--

/*!40000 ALTER TABLE `da_prescription` DISABLE KEYS */;
INSERT INTO `da_prescription` (`user_id`,`relative_id`,`doctor_id`,`drug_id`,`scale_id`,`potency_id`,`dosage_id`,`freq_id`,`instruction_id`,`no_of_days`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,20,1,1,1,1,1,1,3,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `da_prescription` ENABLE KEYS */;


--
-- Definition of table `dd_clinic`
--

DROP TABLE IF EXISTS `dd_clinic`;
CREATE TABLE `dd_clinic` (
  `clinic_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int(10) unsigned NOT NULL,
  `clinic_name` varchar(100) DEFAULT NULL,
  `clinic_address` varchar(500) DEFAULT NULL,
  `walkin_fee` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`clinic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_clinic`
--

/*!40000 ALTER TABLE `dd_clinic` DISABLE KEYS */;
INSERT INTO `dd_clinic` (`clinic_id`,`doctor_id`,`clinic_name`,`clinic_address`,`walkin_fee`,`created_at`) VALUES 
 (1,1,'Appollo pharmacy','Hyderabad',500,'2020-04-02 15:00:19'),
 (2,1,'Kamineni Hospital','Hyderabad',450,'2020-04-02 15:00:19'),
 (3,2,'Appollo pharmacy-2','Hyderabad',520,'2020-04-02 15:00:19'),
 (4,2,'Kamineni Hospital-2','Hyderabad',470,'2020-04-02 15:00:19');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_kit`
--

/*!40000 ALTER TABLE `dd_kit` DISABLE KEYS */;
INSERT INTO `dd_kit` (`kit_id`,`doctor_id`,`name`,`price`,`description`,`is_active`,`created_at`) VALUES 
 (1,1,'First aid kit','250','First aid kit is useful in emergency',1,'2020-04-01 14:36:19'),
 (2,1,'Sanitizer','100','Sanitizer kit is useful in emergency',1,'2020-04-01 14:38:19'),
 (3,2,'Second doctor kit-1','300','Face mask is useful in emergency',1,'2020-04-03 11:00:19'),
 (4,2,'Second kit-2 doctor','350','Soap is so much useful in everyday life',1,'2020-04-03 14:38:19');
/*!40000 ALTER TABLE `dd_kit` ENABLE KEYS */;


--
-- Definition of table `dd_mode`
--

DROP TABLE IF EXISTS `dd_mode`;
CREATE TABLE `dd_mode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int(10) unsigned NOT NULL,
  `mode_id` int(10) unsigned NOT NULL,
  `minimum_min` varchar(45) NOT NULL,
  `price_per_min` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`doctor_id`,`mode_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_mode`
--

/*!40000 ALTER TABLE `dd_mode` DISABLE KEYS */;
INSERT INTO `dd_mode` (`id`,`doctor_id`,`mode_id`,`minimum_min`,`price_per_min`,`created_at`,`updated_at`) VALUES 
 (1,1,1,'10 mins',30,'2020-04-01 09:18:00','2020-04-01 09:18:00'),
 (2,2,1,'10 mins',32,'2020-04-01 09:18:00','2020-04-01 09:18:00'),
 (3,1,2,'10 mins',20,'2020-04-01 09:18:00','2020-04-01 09:18:00'),
 (4,2,2,'10 mins',22,'2020-04-01 09:18:00','2020-04-01 09:18:00'),
 (5,1,3,'24 Hours',50,'2020-04-01 09:18:00','2020-04-01 09:18:00'),
 (6,2,3,'24 Hours',52,'2020-04-01 09:18:00','2020-04-01 09:18:00'),
 (7,1,4,'Regular consultation',500,'2020-04-01 09:18:00','2020-04-01 09:18:00'),
 (8,2,4,'Regular consultation',520,'2020-04-01 09:18:00','2020-04-01 09:18:00');
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
-- Definition of table `dd_professional`
--

DROP TABLE IF EXISTS `dd_professional`;
CREATE TABLE `dd_professional` (
  `doctor_id` int(10) unsigned NOT NULL,
  `specialisation` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `qualifications` varchar(255) DEFAULT NULL,
  `certifications` varchar(255) DEFAULT NULL,
  `awards` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_professional`
--

/*!40000 ALTER TABLE `dd_professional` DISABLE KEYS */;
INSERT INTO `dd_professional` (`doctor_id`,`specialisation`,`experience`,`qualifications`,`certifications`,`awards`,`created_at`) VALUES 
 (1,'1,3,5,4','10','1,2,8','1,2','1,3',NULL);
/*!40000 ALTER TABLE `dd_professional` ENABLE KEYS */;


--
-- Definition of table `ddc_timing`
--

DROP TABLE IF EXISTS `ddc_timing`;
CREATE TABLE `ddc_timing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int(10) unsigned NOT NULL,
  `clinic_id` int(10) unsigned NOT NULL,
  `week_days` varchar(45) DEFAULT NULL,
  `from_time` varchar(45) DEFAULT NULL,
  `to_time` varchar(45) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`doctor_id`,`clinic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ddc_timing`
--

/*!40000 ALTER TABLE `ddc_timing` DISABLE KEYS */;
INSERT INTO `ddc_timing` (`id`,`doctor_id`,`clinic_id`,`week_days`,`from_time`,`to_time`,`remarks`,`created_at`) VALUES 
 (1,1,1,'2,6','10:00','20:00','none','2020-04-02 15:15:58'),
 (2,1,2,'1,3','11:00','14:00','none','2020-04-02 15:15:58'),
 (3,1,3,'0','10:00','11:30','none','2020-04-02 15:15:58'),
 (4,1,4,'5','13:00','19:00','none','2020-04-02 15:15:58'),
 (5,2,1,'1,5','10:00','18:00','none','2020-04-02 15:15:58'),
 (6,2,2,'2,3','11:00','13:00','none','2020-04-02 15:15:58'),
 (7,2,3,'0','10:30','11:30','none','2020-04-02 15:15:58'),
 (8,2,4,'6','14:00','19:00','none','2020-04-02 15:15:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dk_order`
--

/*!40000 ALTER TABLE `dk_order` DISABLE KEYS */;
INSERT INTO `dk_order` (`id`,`user_id`,`doctor_id`,`kit_id`,`amount_paid`,`order_status`,`created_at`) VALUES 
 (7,1,1,1,'250','completed','2020-04-06 14:27:35'),
 (8,5,2,4,'350','completed','2020-04-16 21:11:15'),
 (9,5,2,3,'300','completed','2020-04-16 21:24:00');
/*!40000 ALTER TABLE `dk_order` ENABLE KEYS */;


--
-- Definition of table `dk_photo`
--

DROP TABLE IF EXISTS `dk_photo`;
CREATE TABLE `dk_photo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int(10) unsigned NOT NULL,
  `kit_id` int(10) unsigned NOT NULL,
  `photo` blob NOT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`doctor_id`,`kit_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dk_photo`
--

/*!40000 ALTER TABLE `dk_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `dk_photo` ENABLE KEYS */;


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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `du_doctor`
--

/*!40000 ALTER TABLE `du_doctor` DISABLE KEYS */;
INSERT INTO `du_doctor` (`id`,`user_id`,`doctor_id`,`added_on`,`is_active`,`created_at`,`updated_at`) VALUES 
 (9,1,1,'2020-04-01 22:03:03',1,'2020-04-01 22:03:03','2020-04-01 22:03:03'),
 (10,1,2,'2020-04-02 09:03:27',1,'2020-04-02 09:03:27','2020-04-02 09:03:27'),
 (11,5,2,'2020-04-16 19:15:18',1,'2020-04-16 19:15:18','2020-04-16 19:15:18');
/*!40000 ALTER TABLE `du_doctor` ENABLE KEYS */;


--
-- Definition of table `du_photo`
--

DROP TABLE IF EXISTS `du_photo`;
CREATE TABLE `du_photo` (
  `photo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL DEFAULT 0,
  `photo` blob NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`photo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

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
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `relative_name` varchar(100) NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`)
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
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `allergy_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`),
  KEY `FK_ehr_allergy_id` (`allergy_id`),
  CONSTRAINT `FK_ehr_allergy_id` FOREIGN KEY (`allergy_id`) REFERENCES `m_allergy` (`allergy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_allergy`
--

/*!40000 ALTER TABLE `ehr_allergy` DISABLE KEYS */;
INSERT INTO `ehr_allergy` (`id`,`user_id`,`relative_id`,`allergy_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (36,1,1,2,1,'2020-04-13 19:24:51',1,'2020-04-13 19:24:51'),
 (37,1,1,10,1,'2020-04-13 19:24:51',1,'2020-04-13 19:24:51'),
 (38,5,1,1,5,'2020-04-16 21:57:13',5,'2020-04-16 21:57:13'),
 (39,5,1,4,5,'2020-04-16 21:57:13',5,'2020-04-16 21:57:13');
/*!40000 ALTER TABLE `ehr_allergy` ENABLE KEYS */;


--
-- Definition of table `ehr_chronic`
--

DROP TABLE IF EXISTS `ehr_chronic`;
CREATE TABLE `ehr_chronic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `disease_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`,`disease_id`),
  KEY `FK_ehr_disease_id` (`disease_id`),
  CONSTRAINT `FK_ehr_disease_id` FOREIGN KEY (`disease_id`) REFERENCES `m_disease` (`disease_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_chronic`
--

/*!40000 ALTER TABLE `ehr_chronic` DISABLE KEYS */;
INSERT INTO `ehr_chronic` (`id`,`user_id`,`relative_id`,`disease_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (3,1,1,5,1,'2020-04-13 19:28:34',1,'2020-04-13 19:28:34'),
 (4,1,1,6,1,'2020-04-13 19:28:34',1,'2020-04-13 19:28:34');
/*!40000 ALTER TABLE `ehr_chronic` ENABLE KEYS */;


--
-- Definition of table `ehr_current_medication`
--

DROP TABLE IF EXISTS `ehr_current_medication`;
CREATE TABLE `ehr_current_medication` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `medication_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`,`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_current_medication`
--

/*!40000 ALTER TABLE `ehr_current_medication` DISABLE KEYS */;
INSERT INTO `ehr_current_medication` (`id`,`user_id`,`relative_id`,`medication_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,1,2,1,'2020-04-13 19:26:55',1,'2020-04-13 19:26:55'),
 (2,1,1,5,1,'2020-04-13 19:26:55',1,'2020-04-13 19:26:55'),
 (3,5,1,3,5,'2020-04-16 21:59:07',5,'2020-04-16 21:59:07');
/*!40000 ALTER TABLE `ehr_current_medication` ENABLE KEYS */;


--
-- Definition of table `ehr_family_history`
--

DROP TABLE IF EXISTS `ehr_family_history`;
CREATE TABLE `ehr_family_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `relation_id` int(10) unsigned NOT NULL,
  `disease_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`,`relation_id`,`disease_id`)
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
  `file_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `file_type_id` int(10) unsigned NOT NULL,
  `file_date` varchar(45) NOT NULL,
  `upload_date` varchar(45) NOT NULL,
  `file_blob` mediumtext NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_file`
--

/*!40000 ALTER TABLE `ehr_file` DISABLE KEYS */;
INSERT INTO `ehr_file` (`file_id`,`user_id`,`relative_id`,`file_type_id`,`file_date`,`upload_date`,`file_blob`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,6,1,2,'2020-04-22 08:57:41','2020-04-22 08:57:41','data:image/jpeg;base64,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',6,'2020-04-22 08:57:41',6,'2020-04-22 08:57:41');
/*!40000 ALTER TABLE `ehr_file` ENABLE KEYS */;


--
-- Definition of table `ehr_injury`
--

DROP TABLE IF EXISTS `ehr_injury`;
CREATE TABLE `ehr_injury` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `injury_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`,`injury_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_injury`
--

/*!40000 ALTER TABLE `ehr_injury` DISABLE KEYS */;
INSERT INTO `ehr_injury` (`id`,`user_id`,`relative_id`,`injury_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (3,1,1,9,1,'2020-04-13 19:28:20',1,'2020-04-13 19:28:20'),
 (4,1,1,10,1,'2020-04-13 19:28:20',1,'2020-04-13 19:28:20');
/*!40000 ALTER TABLE `ehr_injury` ENABLE KEYS */;


--
-- Definition of table `ehr_lifestyle`
--

DROP TABLE IF EXISTS `ehr_lifestyle`;
CREATE TABLE `ehr_lifestyle` (
  `lifestyle_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `smoking_id` int(10) unsigned DEFAULT NULL,
  `alcohol_id` int(10) unsigned DEFAULT NULL,
  `excercise_id` int(10) unsigned DEFAULT NULL,
  `activity_level_id` int(10) unsigned DEFAULT NULL,
  `profession_id` int(10) unsigned DEFAULT NULL,
  `food_id` int(10) unsigned DEFAULT NULL,
  `heat_id` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) NOT NULL,
  PRIMARY KEY (`lifestyle_id`,`user_id`,`relative_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_lifestyle`
--

/*!40000 ALTER TABLE `ehr_lifestyle` DISABLE KEYS */;
INSERT INTO `ehr_lifestyle` (`lifestyle_id`,`user_id`,`relative_id`,`smoking_id`,`alcohol_id`,`excercise_id`,`activity_level_id`,`profession_id`,`food_id`,`heat_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (7,1,1,3,2,2,3,8,1,1,1,'2020-04-14 15:59:37',1,'2020-04-14 16:01:33'),
 (8,5,1,2,2,3,2,3,2,3,5,'2020-04-16 22:01:24',5,'2020-04-16 22:03:30');
/*!40000 ALTER TABLE `ehr_lifestyle` ENABLE KEYS */;


--
-- Definition of table `ehr_post_medication`
--

DROP TABLE IF EXISTS `ehr_post_medication`;
CREATE TABLE `ehr_post_medication` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `medication_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`,`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_post_medication`
--

/*!40000 ALTER TABLE `ehr_post_medication` DISABLE KEYS */;
INSERT INTO `ehr_post_medication` (`id`,`user_id`,`relative_id`,`medication_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (3,1,1,9,1,'2020-04-13 19:27:46',1,'2020-04-13 19:27:46'),
 (4,1,1,10,1,'2020-04-13 19:27:46',1,'2020-04-13 19:27:46');
/*!40000 ALTER TABLE `ehr_post_medication` ENABLE KEYS */;


--
-- Definition of table `ehr_surgery`
--

DROP TABLE IF EXISTS `ehr_surgery`;
CREATE TABLE `ehr_surgery` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `surgery_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`,`surgery_id`)
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
  `vital_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `temperature` decimal(4,1) DEFAULT NULL,
  `pulse` int(10) unsigned DEFAULT NULL,
  `resp_rate` int(10) unsigned DEFAULT NULL,
  `bp_systolic` int(10) unsigned DEFAULT NULL,
  `bp_diastolic` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`vital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_vital`
--

/*!40000 ALTER TABLE `ehr_vital` DISABLE KEYS */;
INSERT INTO `ehr_vital` (`vital_id`,`user_id`,`relative_id`,`temperature`,`pulse`,`resp_rate`,`bp_systolic`,`bp_diastolic`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,0,'1.4',11,19,14,18,1,'2020-04-09 10:08:34',1,'2020-04-09 11:30:04'),
 (3,1,2,'1.4',53,19,14,18,1,'2020-04-09 11:32:16',1,'2020-04-09 11:33:07'),
 (5,5,1,'1.4',11,19,14,18,5,'2020-04-16 21:53:57',5,'2020-04-16 21:53:57'),
 (6,5,1,'0.0',0,0,0,0,5,'2020-04-16 21:55:43',5,'2020-04-16 21:55:43');
/*!40000 ALTER TABLE `ehr_vital` ENABLE KEYS */;


--
-- Definition of table `m_activity_level`
--

DROP TABLE IF EXISTS `m_activity_level`;
CREATE TABLE `m_activity_level` (
  `activity_level_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`activity_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_activity_level`
--

/*!40000 ALTER TABLE `m_activity_level` DISABLE KEYS */;
INSERT INTO `m_activity_level` (`activity_level_id`,`name`,`is_active`) VALUES 
 (1,'Super high','1'),
 (2,'High','1'),
 (3,'Medium','1'),
 (4,'Low','1');
/*!40000 ALTER TABLE `m_activity_level` ENABLE KEYS */;


--
-- Definition of table `m_alcohol`
--

DROP TABLE IF EXISTS `m_alcohol`;
CREATE TABLE `m_alcohol` (
  `alcohol_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`alcohol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_alcohol`
--

/*!40000 ALTER TABLE `m_alcohol` DISABLE KEYS */;
INSERT INTO `m_alcohol` (`alcohol_id`,`name`,`is_active`) VALUES 
 (1,'Occasionally','1'),
 (2,'Addicted','1'),
 (3,'Regularly','1'),
 (4,'Never','1');
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
 (1,'Drug allergy','1'),
 (2,'Food allergy','1'),
 (3,'Contact dermatitis','1'),
 (4,'Latex allergy','1'),
 (5,'Allergic Asthama','1'),
 (6,'Allergic rhinitis','1'),
 (7,'Animal allergy','1'),
 (8,'Anaphylaxis','1'),
 (9,'Allergy to mold','1'),
 (10,'Pets allergy','1'),
 (11,'Eye allergy','1'),
 (12,'Skin allergy','1');
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
 (1,'A -ve','1'),
 (2,'A +ve','1'),
 (3,'B -ve','1'),
 (4,'B +ve','1'),
 (5,'AB -ve','1'),
 (6,'AB +ve','1'),
 (7,'O -ve','1'),
 (8,'O +ve','1');
/*!40000 ALTER TABLE `m_blood_group` ENABLE KEYS */;


--
-- Definition of table `m_certification`
--

DROP TABLE IF EXISTS `m_certification`;
CREATE TABLE `m_certification` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_active` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_certification`
--

/*!40000 ALTER TABLE `m_certification` DISABLE KEYS */;
INSERT INTO `m_certification` (`id`,`name`,`is_active`) VALUES 
 (1,'certification 1',1),
 (2,'certification  2',1),
 (3,'certification  3',1),
 (4,'certification  4',1),
 (5,'certification  5',1),
 (6,'certification  6',1),
 (7,'certification 7',1),
 (8,'certification  8',1),
 (9,'certification  9',1),
 (10,'certification  10 ',1);
/*!40000 ALTER TABLE `m_certification` ENABLE KEYS */;


--
-- Definition of table `m_chronic`
--

DROP TABLE IF EXISTS `m_chronic`;
CREATE TABLE `m_chronic` (
  `chronic_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`chronic_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_chronic`
--

/*!40000 ALTER TABLE `m_chronic` DISABLE KEYS */;
INSERT INTO `m_chronic` (`chronic_id`,`name`,`is_active`) VALUES 
 (1,'chronic1','1'),
 (2,'chronic 2','1');
/*!40000 ALTER TABLE `m_chronic` ENABLE KEYS */;


--
-- Definition of table `m_current_medication`
--

DROP TABLE IF EXISTS `m_current_medication`;
CREATE TABLE `m_current_medication` (
  `current_medication_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`current_medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_current_medication`
--

/*!40000 ALTER TABLE `m_current_medication` DISABLE KEYS */;
INSERT INTO `m_current_medication` (`current_medication_id`,`name`,`is_active`) VALUES 
 (1,'Acarbose','1'),
 (2,'Acebutolol hcl','1'),
 (3,'Acetazolamide','1'),
 (4,'Advair Diskus','1'),
 (5,'Afeditab CR\r','1'),
 (6,'Albuterol','1'),
 (7,'Albuterol sulfate','1'),
 (8,'Alendronate sodium','1'),
 (9,'Amantadine','1'),
 (10,'Amiloride hcl','1');
/*!40000 ALTER TABLE `m_current_medication` ENABLE KEYS */;


--
-- Definition of table `m_diagnosis`
--

DROP TABLE IF EXISTS `m_diagnosis`;
CREATE TABLE `m_diagnosis` (
  `diagnosis_id` int(10) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`diagnosis_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_diagnosis`
--

/*!40000 ALTER TABLE `m_diagnosis` DISABLE KEYS */;
INSERT INTO `m_diagnosis` (`diagnosis_id`,`name`,`is_active`) VALUES 
 (1,'test','1'),
 (2,'test2','1');
/*!40000 ALTER TABLE `m_diagnosis` ENABLE KEYS */;


--
-- Definition of table `m_disease`
--

DROP TABLE IF EXISTS `m_disease`;
CREATE TABLE `m_disease` (
  `disease_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`disease_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_disease`
--

/*!40000 ALTER TABLE `m_disease` DISABLE KEYS */;
INSERT INTO `m_disease` (`disease_id`,`name`,`is_active`) VALUES 
 (1,'Allergies','1'),
 (2,'Arthritis','1'),
 (3,'Asthma','1'),
 (4,'Blood Pressure','1'),
 (5,'Cancer','1'),
 (6,'Cholesterol','1'),
 (7,'Chronic Pain','1'),
 (8,'Cold & Flu','1'),
 (9,'Depression','1'),
 (10,'Diabetes','1');
/*!40000 ALTER TABLE `m_disease` ENABLE KEYS */;


--
-- Definition of table `m_dosage`
--

DROP TABLE IF EXISTS `m_dosage`;
CREATE TABLE `m_dosage` (
  `dosage_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`dosage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_dosage`
--

/*!40000 ALTER TABLE `m_dosage` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_dosage` ENABLE KEYS */;


--
-- Definition of table `m_drugs`
--

DROP TABLE IF EXISTS `m_drugs`;
CREATE TABLE `m_drugs` (
  `drug_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`drug_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_drugs`
--

/*!40000 ALTER TABLE `m_drugs` DISABLE KEYS */;
INSERT INTO `m_drugs` (`drug_id`,`name`,`is_active`) VALUES 
 (1,'paracetamol','1'),
 (2,'asprin','1');
/*!40000 ALTER TABLE `m_drugs` ENABLE KEYS */;


--
-- Definition of table `m_excercise`
--

DROP TABLE IF EXISTS `m_excercise`;
CREATE TABLE `m_excercise` (
  `excercise_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`excercise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_excercise`
--

/*!40000 ALTER TABLE `m_excercise` DISABLE KEYS */;
INSERT INTO `m_excercise` (`excercise_id`,`name`,`is_active`) VALUES 
 (1,'Regular','1'),
 (2,'Lazy','1'),
 (3,'Once in full moon','1');
/*!40000 ALTER TABLE `m_excercise` ENABLE KEYS */;


--
-- Definition of table `m_file_type`
--

DROP TABLE IF EXISTS `m_file_type`;
CREATE TABLE `m_file_type` (
  `file_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `icon` varchar(100) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`file_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_file_type`
--

/*!40000 ALTER TABLE `m_file_type` DISABLE KEYS */;
INSERT INTO `m_file_type` (`file_type_id`,`name`,`icon`,`is_active`) VALUES 
 (1,'Prescription','newspaper-outline','1'),
 (2,'Labtest','library-outline','1'),
 (3,'Bill','receipt-outline','1');
/*!40000 ALTER TABLE `m_file_type` ENABLE KEYS */;


--
-- Definition of table `m_food`
--

DROP TABLE IF EXISTS `m_food`;
CREATE TABLE `m_food` (
  `food_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
-- Definition of table `m_freq`
--

DROP TABLE IF EXISTS `m_freq`;
CREATE TABLE `m_freq` (
  `freq_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`freq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_freq`
--

/*!40000 ALTER TABLE `m_freq` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_freq` ENABLE KEYS */;


--
-- Definition of table `m_gender`
--

DROP TABLE IF EXISTS `m_gender`;
CREATE TABLE `m_gender` (
  `gender_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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
-- Definition of table `m_heat`
--

DROP TABLE IF EXISTS `m_heat`;
CREATE TABLE `m_heat` (
  `heat_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`heat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_heat`
--

/*!40000 ALTER TABLE `m_heat` DISABLE KEYS */;
INSERT INTO `m_heat` (`heat_id`,`name`,`is_active`) VALUES 
 (1,'Cold intolerance','1'),
 (2,'Cold tolerance','1'),
 (3,'Heat intolerance','1'),
 (4,'Heat tolerance','1');
/*!40000 ALTER TABLE `m_heat` ENABLE KEYS */;


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
 (1,'Strains','1'),
 (2,'Knee injuries','1'),
 (3,'Swollen muscles','1'),
 (4,'Achilles tendon rupture','1'),
 (5,'Fractures','1'),
 (6,'Dislocations','1'),
 (7,'Rotator cuff injury','1'),
 (8,'Bone fractures','1'),
 (9,'Exercise','1'),
 (10,'Accidents','1');
/*!40000 ALTER TABLE `m_injury` ENABLE KEYS */;


--
-- Definition of table `m_instruction`
--

DROP TABLE IF EXISTS `m_instruction`;
CREATE TABLE `m_instruction` (
  `instruction_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`instruction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_instruction`
--

/*!40000 ALTER TABLE `m_instruction` DISABLE KEYS */;
INSERT INTO `m_instruction` (`instruction_id`,`name`,`is_active`) VALUES 
 (1,'After food','1'),
 (2,'before food','1');
/*!40000 ALTER TABLE `m_instruction` ENABLE KEYS */;


--
-- Definition of table `m_issue`
--

DROP TABLE IF EXISTS `m_issue`;
CREATE TABLE `m_issue` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_issue`
--

/*!40000 ALTER TABLE `m_issue` DISABLE KEYS */;
INSERT INTO `m_issue` (`id`,`name`,`is_active`) VALUES 
 (1,'Booking an appointment',1),
 (2,'Wrong information',1),
 (3,'Consultation Related',1),
 (4,'Homeo kits Related',1),
 (5,'Other issues',1);
/*!40000 ALTER TABLE `m_issue` ENABLE KEYS */;


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
  `medication_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `medication_type_id` int(10) unsigned NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_medication`
--

/*!40000 ALTER TABLE `m_medication` DISABLE KEYS */;
INSERT INTO `m_medication` (`medication_id`,`name`,`medication_type_id`,`is_active`) VALUES 
 (1,'Acarbose',1,'1'),
 (2,'Acebutolol hcl',1,'1'),
 (3,'Acetazolamide',1,'1'),
 (4,'Advair Diskus',1,'1'),
 (5,'Afeditab CR\r',1,'1'),
 (6,'Albuterol',1,'1'),
 (7,'Albuterol sulfate',1,'1'),
 (8,'Alendronate sodium',1,'1'),
 (9,'Amantadine',1,'1'),
 (10,'Amiloride hcl',1,'1'),
 (11,'Aminophylline',2,'1'),
 (12,'Amlodipine atorvastatin',2,'1'),
 (13,'Amlodipine besylate',2,'1'),
 (14,'Anagrelide',2,'1'),
 (15,'Anastrozole',2,'1'),
 (16,'Budesonide',2,'1'),
 (17,'Bumetanide',2,'1'),
 (18,'Buproban SR',2,'1'),
 (19,'Bupropion SR',2,'1'),
 (20,'Betaxolol hcl',2,'1');
/*!40000 ALTER TABLE `m_medication` ENABLE KEYS */;


--
-- Definition of table `m_mode`
--

DROP TABLE IF EXISTS `m_mode`;
CREATE TABLE `m_mode` (
  `mode_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_active` int(10) unsigned NOT NULL,
  PRIMARY KEY (`mode_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_mode`
--

/*!40000 ALTER TABLE `m_mode` DISABLE KEYS */;
INSERT INTO `m_mode` (`mode_id`,`name`,`icon`,`is_active`) VALUES 
 (1,'Video Consultation','videocam',1),
 (2,'Audio Consultation','logo-whatsapp',1),
 (3,'Chat Consultation','chatbubbles',1),
 (4,'Physical Visit','calendar',1);
/*!40000 ALTER TABLE `m_mode` ENABLE KEYS */;


--
-- Definition of table `m_parameter`
--

DROP TABLE IF EXISTS `m_parameter`;
CREATE TABLE `m_parameter` (
  `parameter_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
-- Definition of table `m_post_medication`
--

DROP TABLE IF EXISTS `m_post_medication`;
CREATE TABLE `m_post_medication` (
  `post_medication_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`post_medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_post_medication`
--

/*!40000 ALTER TABLE `m_post_medication` DISABLE KEYS */;
INSERT INTO `m_post_medication` (`post_medication_id`,`name`,`is_active`) VALUES 
 (1,'Aminophylline','1'),
 (2,'Amlodipine atorvastatin','1'),
 (3,'Amlodipine besylate','1'),
 (4,'Anagrelide','1'),
 (5,'Anastrozole','1'),
 (6,'Budesonide','1'),
 (7,'Bumetanide','1'),
 (8,'Buproban SR','1'),
 (9,'Bupropion SR','1'),
 (10,'Betaxolol hcl','1');
/*!40000 ALTER TABLE `m_post_medication` ENABLE KEYS */;


--
-- Definition of table `m_potency`
--

DROP TABLE IF EXISTS `m_potency`;
CREATE TABLE `m_potency` (
  `potency_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`potency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_potency`
--

/*!40000 ALTER TABLE `m_potency` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_potency` ENABLE KEYS */;


--
-- Definition of table `m_profession`
--

DROP TABLE IF EXISTS `m_profession`;
CREATE TABLE `m_profession` (
  `profession_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`profession_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_profession`
--

/*!40000 ALTER TABLE `m_profession` DISABLE KEYS */;
INSERT INTO `m_profession` (`profession_id`,`name`,`is_active`) VALUES 
 (1,'Family Physician','1'),
 (2,'Pediatrician','1'),
 (3,'Gynecologist','1'),
 (4,'Surgeon','1'),
 (5,'Psychiatrist','1'),
 (6,'Cardiologist','1'),
 (7,'Dermatologist','1'),
 (8,'Endocrinologist','1'),
 (9,'Gastroenterologist','1'),
 (10,'Nephrologist','1'),
 (11,'Ophthalmologist','1'),
 (12,'Otolaryngologist','1'),
 (13,'Pulmonologist','1'),
 (14,'Neurologist','1'),
 (15,'Radiologist','1');
/*!40000 ALTER TABLE `m_profession` ENABLE KEYS */;


--
-- Definition of table `m_qualification`
--

DROP TABLE IF EXISTS `m_qualification`;
CREATE TABLE `m_qualification` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_active` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_qualification`
--

/*!40000 ALTER TABLE `m_qualification` DISABLE KEYS */;
INSERT INTO `m_qualification` (`id`,`name`,`is_active`) VALUES 
 (1,'MBBS',1),
 (2,'BDS',1),
 (3,'BAMS',1),
 (4,'BUMS',1),
 (5,'BHMS',1),
 (6,'BYNS',1),
 (7,'MS',1),
 (8,'MD',1),
 (9,'DNB',1);
/*!40000 ALTER TABLE `m_qualification` ENABLE KEYS */;


--
-- Definition of table `m_relation`
--

DROP TABLE IF EXISTS `m_relation`;
CREATE TABLE `m_relation` (
  `relation_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`relation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_relation`
--

/*!40000 ALTER TABLE `m_relation` DISABLE KEYS */;
INSERT INTO `m_relation` (`relation_id`,`name`,`is_active`) VALUES 
 (1,'Father','1'),
 (2,'Mother','1'),
 (3,'Elder brother','1'),
 (4,'Younger brother','1'),
 (5,'Elder sister','1'),
 (6,'Younger sister','1'),
 (7,'Uncle','1'),
 (8,'Aunt','1'),
 (9,'Husband','1'),
 (10,'Wife','1'),
 (11,'Son','1'),
 (12,'Daughter','1');
/*!40000 ALTER TABLE `m_relation` ENABLE KEYS */;


--
-- Definition of table `m_scale`
--

DROP TABLE IF EXISTS `m_scale`;
CREATE TABLE `m_scale` (
  `scale_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`scale_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_scale`
--

/*!40000 ALTER TABLE `m_scale` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_scale` ENABLE KEYS */;


--
-- Definition of table `m_setting`
--

DROP TABLE IF EXISTS `m_setting`;
CREATE TABLE `m_setting` (
  `setting_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
-- Definition of table `m_severity`
--

DROP TABLE IF EXISTS `m_severity`;
CREATE TABLE `m_severity` (
  `severity_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`severity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_severity`
--

/*!40000 ALTER TABLE `m_severity` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_severity` ENABLE KEYS */;


--
-- Definition of table `m_smoking`
--

DROP TABLE IF EXISTS `m_smoking`;
CREATE TABLE `m_smoking` (
  `smoking_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`smoking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_smoking`
--

/*!40000 ALTER TABLE `m_smoking` DISABLE KEYS */;
INSERT INTO `m_smoking` (`smoking_id`,`name`,`is_active`) VALUES 
 (1,'Chain smoker','1'),
 (2,'Occasionally','1'),
 (3,'Regularly','1'),
 (4,'Never','1');
/*!40000 ALTER TABLE `m_smoking` ENABLE KEYS */;


--
-- Definition of table `m_specialisation`
--

DROP TABLE IF EXISTS `m_specialisation`;
CREATE TABLE `m_specialisation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_specialisation`
--

/*!40000 ALTER TABLE `m_specialisation` DISABLE KEYS */;
INSERT INTO `m_specialisation` (`id`,`name`,`is_active`) VALUES 
 (1,'Cardiologist','1'),
 (2,'Dermatologist','1'),
 (3,'Endocrinologist','1'),
 (4,'Gastroenterologist','1'),
 (5,'Nephrologist','1'),
 (6,'Ophthalmologist','1'),
 (7,'Otolaryngologist','1'),
 (8,'Pulmonologist','1'),
 (9,'Neurologist','1'),
 (10,'Radiologist','1');
/*!40000 ALTER TABLE `m_specialisation` ENABLE KEYS */;


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
 (1,'Appendectomy','1'),
 (2,'Breast biopsy','1'),
 (3,'Carotid endarterectomy','1'),
 (4,'Cataract surgery','1'),
 (5,'Cesarean section','1'),
 (6,'Cholecystectomy','1'),
 (7,'Coronary artery bypass','1'),
 (8,'Debridement of wound','1'),
 (9,'Dilation and curettage','1'),
 (10,'Free skin graft','1'),
 (11,'Hemorrhoidectomy','1'),
 (12,'Hysterectomy','1'),
 (13,'Hysteroscopy','1');
/*!40000 ALTER TABLE `m_surgery` ENABLE KEYS */;


--
-- Definition of table `m_transaction_type`
--

DROP TABLE IF EXISTS `m_transaction_type`;
CREATE TABLE `m_transaction_type` (
  `transaction_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `is_active` varchar(45) NOT NULL,
  PRIMARY KEY (`transaction_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_transaction_type`
--

/*!40000 ALTER TABLE `m_transaction_type` DISABLE KEYS */;
INSERT INTO `m_transaction_type` (`transaction_type_id`,`name`,`is_active`) VALUES 
 (1,'Booked appointment','1'),
 (2,'Cancelled appointment','1'),
 (3,'Booked kit','1'),
 (4,'Cancelled kit','1');
/*!40000 ALTER TABLE `m_transaction_type` ENABLE KEYS */;


--
-- Definition of procedure `sp_doctor_appointments`
--

DROP PROCEDURE IF EXISTS `sp_doctor_appointments`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_appointments`(IN IN_doctor_id INT)
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







/*  Upcoming*/
SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.id = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where doctor_id=IN_doctor_id and appointment_status=0
;


/*  prevoius*/
SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.id = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where doctor_id=IN_doctor_id and appointment_status=1
;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_clinic_detail_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_clinic_detail_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_clinic_detail_get`(IN IN_doctor_id INT , IN IN_clinic_id INT)
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


  SELECT * FROM dd_clinic c left join ddc_timing t on
t.clinic_id = c.clinic_id and t.doctor_id = c.doctor_id where c.doctor_id = IN_doctor_id and c.clinic_id = IN_clinic_id;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_clinic_save`
--

DROP PROCEDURE IF EXISTS `sp_doctor_clinic_save`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_clinic_save`(IN IN_doctor_id INT , IN_clinic_id INT ,IN_clinic_name VARCHAR(255) , IN_clinic_address VARCHAR(5000)
                                                                     , IN_walkin_fee INT , IN IN_week_days VARCHAR(255) ,IN IN_from_time VARCHAR(255), IN IN_to_time VARCHAR(255))
BEGIN

 Declare max_clinic_id Int ;

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




if(IN_clinic_id is null)
   then
  set max_clinic_id = (select case when max(clinic_id)  is null then 0 else max(clinic_id)  end as 'clinic_id' from dd_clinic) +1;


  INSERT INTO dd_clinic (clinic_id, doctor_id, clinic_name, clinic_address, walkin_fee, created_at)
  VALUES (max_clinic_id , IN_doctor_id , IN_clinic_name , IN_clinic_address , IN_walkin_fee, Now());

INSERT INTO ddc_timing (doctor_id, clinic_id, week_days, from_time, to_time, remarks, created_at)
  VALUES ( IN_doctor_id , max_clinic_id ,IN_week_days , IN_from_time , IN_to_time , null , Now());



else

   UPDATE  dd_clinic SET clinic_name = IN_clinic_name , clinic_address = IN_clinic_address , walkin_fee = IN_walkin_fee  WHERE doctor_id = IN_doctor_id AND clinic_id = IN_clinic_id;

   UPDATE  ddc_timing SET week_days = IN_week_days , from_time = IN_from_time , to_time = IN_to_time  WHERE doctor_id = IN_doctor_id AND clinic_id = IN_clinic_id;

end if;



END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_consultation_details_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_consultation_details_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_consultation_details_get`(IN IN_doctor_id INT(10),IN IN_user_id INT(10)
                                                                       ,IN IN_relative_id INT(10))
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





/*details*/

SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.uuid = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where d.doctor_id= IN_doctor_id and d.appointment_status=1 and d.user_id = IN_user_id and d.relative_id= IN_relative_id;

/* Complaint*/
SELECT main_complaint, advice,review_date FROM d_appointment d
where doctor_id=IN_doctor_id and user_id = IN_user_id and relative_id= IN_relative_id
;


/*Complaint Details*/

SELECT case when is_recurring=1 then 'yes' else 'no' end as recurring ,recurring_freq,m.name as severity
 ,complaint_description FROM da_complaint_detail d
left join m_severity m on m.severity_id = d.severity_id
where doctor_id=IN_doctor_id and user_id = IN_user_id and relative_id= IN_relative_id
 ;

/*Diagnosis*/

SELECT d.other_diagnosis ,m.name as diagnosis FROM da_diagnosis d
left join m_diagnosis m on d.diagnosis_id = m.diagnosis_id
where doctor_id=IN_doctor_id and user_id = IN_user_id and relative_id= IN_relative_id
;

/*prescription*/

SELECT m.name as drug,s.name as scale,p.name as potency,ds.name as dosage,f.name as freq,i.name as inst
,no_of_days FROM da_prescription d
left join m_drugs m on d.drug_id=m.drug_id
left join m_scale s on d.scale_id = s.scale_id
left join m_potency p on d.potency_id = p.potency_id
left join m_dosage ds on ds.dosage_id = d.dosage_id
left join m_freq f on f.freq_id = d.freq_id
left join m_instruction i on i.instruction_id = d.instruction_id
where doctor_id=IN_doctor_id and user_id = IN_user_id and relative_id= IN_relative_id;



END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_kits_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_kits_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
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


SELECT o.doctor_id ,  u.name as 'user_name', k.name as 'kit_name' ,o.amount_paid , o.created_at FROM dk_order o

left join d_user u on o.user_id= u.user_id

left join dd_kit k on k.kit_id = o.kit_id and k.doctor_id = o.doctor_id where o.doctor_id = IN_doctor_id;



END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_kit_detail_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_kit_detail_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_kit_detail_get`(IN IN_doctor_id INT , IN IN_kit_id INT)
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


  SELECT * FROM dd_kit d where doctor_id = IN_doctor_id and kit_id = IN_kit_id;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_kit_save`
--

DROP PROCEDURE IF EXISTS `sp_doctor_kit_save`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_kit_save`(IN IN_doctor_id INT , IN IN_kit_id INT ,IN IN_kit_name VARCHAR(255) , IN IN_kit_description VARCHAR(5000)
                                                                     , IN IN_kit_price INT)
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

  if(IN_kit_id is null)
   then
  INSERT INTO dd_kit ( doctor_id, name, price, description, is_active, created_at)
  VALUES (IN_doctor_id ,  IN_kit_name , IN_kit_price ,IN_kit_description ,  1 , Now());

else

   UPDATE  dd_kit SET name = IN_kit_name , description = IN_kit_description , price = IN_kit_price  WHERE doctor_id = IN_doctor_id AND kit_id = IN_kit_id;

end if;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_login`
--

DROP PROCEDURE IF EXISTS `sp_doctor_login`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_login`(IN IN_username VARCHAR(255),IN IN_password VARCHAR(255))
BEGIN



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




  SELECT * FROM d_doctor d where username =IN_username and pwd =IN_password;




 END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_masters_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_masters_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_masters_get`()
BEGIN


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


SELECT * ,'specialisation' as 'master_type' FROM m_specialisation where is_active =1

union
     select *, 'gender' as'master_type'  from m_gender where is_active =1

union

 SELECT * , 'qualification' as 'master_type' FROM m_qualification m
union

 SELECT * , 'certification' as 'master_type' FROM m_certification m

union

 SELECT * , 'award' as 'master_type' FROM m_award ;









COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_mode_detail_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_mode_detail_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_mode_detail_get`(IN IN_doctor_id INT , IN IN_mode_id INT)
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


 SELECT * FROM dd_mode d
 left join m_mode m on d.mode_id = m.mode_id
 where d.doctor_id =IN_doctor_id and d.mode_id = IN_mode_id;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_mode_save`
--

DROP PROCEDURE IF EXISTS `sp_doctor_mode_save`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_mode_save`(IN IN_doctor_id INT , IN IN_mode_id INT ,IN IN_session VARCHAR(255),IN IN_price INT)
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



   UPDATE  dd_mode SET minimum_min = IN_session , price_per_min = IN_price  WHERE doctor_id = IN_doctor_id AND mode_id = IN_mode_id;



END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_orders_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_orders_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_orders_get`(IN IN_doctor_id INT)
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


SELECT o.doctor_id ,  u.name as 'user_name', k.name as 'kit_name' ,o.amount_paid , o.created_at FROM dk_order o

left join d_user u on o.user_id= u.user_id

left join dd_kit k on k.kit_id = o.kit_id and k.doctor_id = o.doctor_id where o.doctor_id = IN_doctor_id;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_payments`
--

DROP PROCEDURE IF EXISTS `sp_doctor_payments`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_payments`(IN IN_doctor_id INT(10))
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


 /*total net amount */
select (SELECT sum(net_amount) FROM d_transaction where transaction_type_id in (1, 3)) - (SELECT sum(net_amount) FROM d_transaction where transaction_type_id in (2, 4))as total_net_amount;

SELECT dt.*,case when dt.kit_id is null then 'appointment' else 'kit' end as 'transaction_for' , dk.kit_name , du.name as user_name , m.name as mode_name , da.relative_id , dr.relative_name FROM d_transaction dt
left join dd_kit dk on dt.kit_id = dk.kit_id and dt.doctor_id = dk.doctor_id
left join d_user du on du.user_id = dt.user_id
left join d_appointment da on da.appointment_id = dt.appointment_id
left join m_mode m on da.mode_id = m.mode_id
left join du_relative dr on dr.relative_id = da.relative_id

where dt.doctor_id=IN_doctor_id ;






END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_personal_save`
--

DROP PROCEDURE IF EXISTS `sp_doctor_personal_save`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_personal_save`(IN IN_doctor_id INT ,IN IN_name VARCHAR(255),IN IN_phone VARCHAR(255),
                                                               IN IN_email VARCHAR(255) ,IN IN_gender_id INT , IN IN_dob VARCHAR(255))
BEGIN



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



UPDATE d_doctor
SET name = IN_name, phone = IN_phone, email = IN_email , gender_id = IN_gender_id , dob = IN_dob
WHERE id = IN_doctor_id;

COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_previous_consultations`
--

DROP PROCEDURE IF EXISTS `sp_doctor_previous_consultations`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_previous_consultations`(IN IN_doctor_id INT)
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



SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.id = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where doctor_id= IN_doctor_id and appointment_status=1
;



END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_professional_save`
--

DROP PROCEDURE IF EXISTS `sp_doctor_professional_save`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_professional_save`(IN IN_doctor_id INT, IN IN_column_name VARCHAR(255),
                                                                       IN IN_value VARCHAR(255))
BEGIN

DECLARE var_professional_count INT;


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


 Set var_professional_count = (SELECT count(*) FROM dd_professional  where doctor_id= IN_doctor_id);

if(var_professional_count !=0) then

SET @sql = CONCAT("UPDATE dd_professional SET ", IN_column_name, " = '", IN_value ,"' WHERE doctor_id = ", IN_doctor_id);
     PREPARE stmt FROM @sql;
     EXECUTE stmt;
     DEALLOCATE PREPARE stmt;

else

SET @sql = CONCAT("INSERT INTO  dd_professional ( doctor_id, ", IN_column_name, ") VALUES(",IN_doctor_id ,", '" ,IN_value ,"') ");
     PREPARE stmt FROM @sql;
     EXECUTE stmt;
     DEALLOCATE PREPARE stmt;


end if;






COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_profile_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_profile_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_profile_get`(IN IN_doctor_id INT)
BEGIN


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



     SELECT * FROM d_doctor where id = IN_doctor_id;


SELECT * FROM dd_professional  where doctor_id = IN_doctor_id;


  SELECT * FROM dd_clinic c left join ddc_timing t on
t.clinic_id = c.clinic_id and t.doctor_id = c.doctor_id where c.doctor_id = IN_doctor_id;

SELECT * FROM dd_mode d left join
m_mode m on m.mode_id = d.mode_id where d.doctor_id = IN_doctor_id;








COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_register`
--

DROP PROCEDURE IF EXISTS `sp_doctor_register`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_register`(IN IN_username VARCHAR(255),IN IN_email VARCHAR(255),
                                                               IN IN_password VARCHAR(255))
BEGIN

 declare max_doctor_id int;

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


     INSERT INTO d_doctor (uuid ,name , username, email, pwd)
     VALUES ( Floor((RAND()*100000) +100000) ,IN_username,IN_username , IN_email ,IN_password);


 set max_doctor_id = (select case when max(id)  is null then 0 else max(id)  end as 'doctor_id' from d_doctor);

    Insert into dd_mode (doctor_id, mode_id, minimum_min, price_per_min, created_at)
    values(max_doctor_id , 1 , '10 min' , 30 , now());

Insert into dd_mode (doctor_id, mode_id, minimum_min, price_per_min, created_at)
    values(max_doctor_id , 2, '10 min ' , 20 , now());

Insert into dd_mode (doctor_id, mode_id, minimum_min, price_per_min, created_at)
    values(max_doctor_id , 3 , '24 hrs', 30 , now());
 Insert into dd_mode (doctor_id, mode_id, minimum_min, price_per_min, created_at)
    values(max_doctor_id , 4 , null  , 500 , now());

COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_today_queue`
--

DROP PROCEDURE IF EXISTS `sp_doctor_today_queue`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_today_queue`(IN IN_doctor_id INT)
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







/* Todays queue Upcoming*/

SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.id = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where doctor_id=IN_doctor_id and appointment_status=0 and date(appointment_at)=date(now())

;


/* Todays queue Completed*/
SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.id = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where doctor_id=IN_doctor_id and appointment_status=1 and date(appointment_at)=date(now())

;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_update_profile`
--

DROP PROCEDURE IF EXISTS `sp_doctor_update_profile`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_update_profile`(IN IN_doctor_id INT, IN IN_column_name VARCHAR(255),
                                                                       IN IN_value VARCHAR(255))
BEGIN


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

     # UPDATE d_user SET + IN_column_name = IN_value WHERE user_id = IN_user_id;

     SET @sql = CONCAT("UPDATE d_doctor SET ", IN_column_name, " = '", IN_value ,"' WHERE id = ", IN_doctor_id);
     PREPARE stmt FROM @sql;
     EXECUTE stmt;
     DEALLOCATE PREPARE stmt;


COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_userfile_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_userfile_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_userfile_get`(IN IN_user_id INT , IN IN_relative_id INT)
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


SELECT * FROM ehr_file e
left join m_file_type m on e.file_type_id = m.file_type_id
where user_id = IN_user_id and relative_id = IN_relative_id
;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_userlifestyle_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_userlifestyle_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_userlifestyle_get`(IN IN_user_id INT , IN IN_relative_id INT)
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


SELECT e.user_id,e.relative_id, ms.name as 'smoking',ma.name 'alcohol',me.name as 'exercise' ,
 mac.name as 'activity',mp.name as 'profession'  , Group_concat(mf.name) as food_name FROM ehr_lifestyle e
left join m_smoking ms on ms.smoking_id=e.smoking_id
left join m_alcohol ma on ma.alcohol_id=e.alcohol_id
left join m_exercise me on me.exercise_id=e.excercise_id
left join m_activity_level mac on mac.activity_level_id=e.activity_level_id
left join m_profession mp on mp.profession_id=e.profession_id
left join ehr_lifestyle_food l on e.user_id = l.user_id and l.relative_id and e.user_id
left join m_food mf on mf.food_id = l.food_id
where e.user_id = IN_user_id and e.relative_id = IN_relative_id
group by e.user_id and e.relative_id
;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_usermedicalhistory_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_usermedicalhistory_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_usermedicalhistory_get`(IN IN_user_id INT , IN IN_relative_id INT)
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


SELECT Group_concat(m.name) as allergy FROM ehr_allergy e left join m_allergy m on m.allergy_id = e.allergy_id
where e.user_id = IN_user_id and e.relative_id = IN_relative_id
group by e.user_id and e.relative_id;


SELECT Group_concat(m.name) as current_medication FROM ehr_current_medication e left join m_medication m on m.medication_id = e.medication_id
where user_id = IN_user_id and relative_id = IN_relative_id
group by e.user_id and e.relative_id;


SELECT Group_concat(m.name) as past_medication FROM ehr_past_medication e left join m_medication m on m.medication_id = e.medication_id
where user_id = IN_user_id and relative_id = IN_relative_id
group by e.user_id and e.relative_id;

SELECT Group_concat(m.name) as surgery FROM ehr_surgery e left join m_surgery m on m.surgery_id = e.surgery_id
where user_id = IN_user_id and relative_id = IN_relative_id
group by e.user_id and e.relative_id;


SELECT Group_concat(m.name)  as injury FROM ehr_injury e left join m_injury m on m.injury_id = e.injury_id
where user_id = IN_user_id and relative_id = IN_relative_id
group by e.user_id and e.relative_id;

SELECT Group_concat(m.name) as chronic FROM ehr_chronic e left join m_chronic m on m.chronic_id = e.disease_id
where user_id = IN_user_id and relative_id = IN_relative_id
group by e.user_id and e.relative_id ;


SELECT m.name as relation_name , Group_concat(md.name) as disease_name FROM ehr_family_history e left join m_relation m on m.relation_id = e.relation_id
left join m_disease md on md.disease_id = e.disease_id
where user_id = IN_user_id and relative_id = IN_relative_id
group by e.relation_id;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_uservitals_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_uservitals_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_uservitals_get`(IN IN_user_id INT , IN IN_relative_id INT)
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


SELECT * FROM ehr_vital where user_id = IN_user_id and relative_id = IN_relative_id;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_doctor_user_previousconsultations`
--

DROP PROCEDURE IF EXISTS `sp_doctor_user_previousconsultations`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_user_previousconsultations`(IN IN_doctor_id INT , IN IN_user_id INT  , IN IN_relative_id INT)
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



SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.id = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where d.doctor_id= IN_doctor_id and d.user_id = IN_user_id and d.relative_id = IN_relative_id and d.appointment_status=1
;



END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_issue_save`
--

DROP PROCEDURE IF EXISTS `sp_issue_save`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_issue_save`(IN IN_user_id INT , IN IN_doctor_id INT , IN_issue_type_id INT ,IN IN_email varchar(255),
                                                            IN IN_phone varchar(255) , IN IN_issue_description VARCHAR(5000))
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


  Insert into d_issue (user_id, doctor_id, issue_type_id, email , phone , issue_description, issue_raised_at, created_at,
   updated_at, updated_by, created_by)
    values (IN_user_id , IN_doctor_id, IN_issue_type_id, IN_email, IN_phone,  IN_issue_description, Now(), now(), now(),
            IN_user_id, IN_user_id);


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
-- Definition of procedure `sp_master_issue_get`
--

DROP PROCEDURE IF EXISTS `sp_master_issue_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_issue_get`()
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

SELECT * FROM homeotel.m_issue where is_active =1;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_master_lifestyle_get`
--

DROP PROCEDURE IF EXISTS `sp_master_lifestyle_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_lifestyle_get`(IN IN_user_id INT, IN IN_relative_id INT)
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

  SELECT * FROM homeotel.m_smoking where is_active =1;

  SELECT * FROM homeotel.m_alcohol where is_active =1;

  SELECT * FROM homeotel.m_excercise where is_active =1;

  SELECT * FROM homeotel.m_activity_level where is_active =1;

  SELECT * FROM homeotel.m_profession where is_active =1;

  SELECT * FROM homeotel.m_food where is_active =1;

  SELECT * FROM homeotel.m_heat where is_active =1;

  
  SELECT el.smoking_id, m.name FROM homeotel.ehr_lifestyle el
    LEFT JOIN m_smoking m ON el.smoking_id = m.smoking_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT el.alcohol_id, m.name FROM homeotel.ehr_lifestyle el
    LEFT JOIN m_alcohol m ON el.alcohol_id = m.alcohol_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT el.excercise_id, m.name FROM homeotel.ehr_lifestyle el
    LEFT JOIN m_excercise m ON el.excercise_id = m.excercise_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT el.activity_level_id, m.name FROM homeotel.ehr_lifestyle el
    LEFT JOIN m_activity_level m ON el.activity_level_id = m.activity_level_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT el.profession_id, m.name FROM homeotel.ehr_lifestyle el
    LEFT JOIN m_profession m ON el.profession_id = m.profession_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT el.food_id, m.name FROM homeotel.ehr_lifestyle el
    LEFT JOIN m_food m ON el.food_id = m.food_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT el.heat_id, m.name FROM homeotel.ehr_lifestyle el
    LEFT JOIN m_heat m ON el.heat_id = m.heat_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_master_medical_history_get`
--

DROP PROCEDURE IF EXISTS `sp_master_medical_history_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_medical_history_get`(IN IN_user_id INT, IN IN_relative_id INT)
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

  SELECT * FROM homeotel.m_allergy where is_active =1;

  SELECT * FROM homeotel.m_current_medication where is_active =1;

  SELECT * FROM homeotel.m_post_medication where is_active =1;

  SELECT * FROM homeotel.m_surgery where is_active =1;

  SELECT * FROM homeotel.m_injury where is_active =1;

  SELECT * FROM homeotel.m_disease where is_active =1;

  SELECT * FROM homeotel.m_relation where is_active =1;

  
  SELECT ea.allergy_id, ma.name FROM homeotel.ehr_allergy ea
    LEFT JOIN m_allergy ma ON ea.allergy_id = ma.allergy_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT em.medication_id, m.name FROM homeotel.ehr_current_medication em
    LEFT JOIN m_current_medication m ON em.medication_id = m.current_medication_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT em.medication_id, m.name FROM homeotel.ehr_post_medication em
    LEFT JOIN m_post_medication m ON em.medication_id = m.post_medication_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT es.surgery_id, m.name FROM homeotel.ehr_surgery es
    LEFT JOIN m_surgery m ON es.surgery_id = m.surgery_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT ei.injury_id, m.name FROM homeotel.ehr_injury ei
    LEFT JOIN m_injury m ON ei.injury_id = m.injury_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT ec.disease_id, m.name FROM homeotel.ehr_chronic ec
    LEFT JOIN m_disease m ON ec.disease_id = m.disease_id
    where user_id = IN_user_id AND relative_id = IN_relative_id;

  SELECT ef.relation_id, ef.disease_id, mr.name AS relationName, md.name AS diseaseName
    FROM ehr_family_history ef
    LEFT JOIN m_relation mr ON ef.relation_id = mr.relation_id
    LEFT JOIN m_disease md ON ef.disease_id = md.disease_id
    WHERE user_id = IN_user_id AND relative_id = IN_relative_id;


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
-- Definition of procedure `sp_user_allergies_upsert`
--

DROP PROCEDURE IF EXISTS `sp_user_allergies_upsert`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_allergies_upsert`(IN IN_user_id INT, IN IN_relative_id INT,
                         IN IN_commaSeparatedAllergy_ids VARCHAR(2000),IN IN_commaSeparatedAllergyObject VARCHAR(2000))
BEGIN

    set @sql = concat("DELETE FROM ehr_allergy WHERE user_id = ",IN_user_id," AND relative_id = ",IN_relative_id);
    PREPARE q FROM @sql;
    execute q;


    SET @save_allergies_query = CONCAT("INSERT INTO ehr_allergy (user_id, relative_id, allergy_id, created_by, updated_by,created_at, updated_at)
                                        VALUES ",replace(IN_commaSeparatedAllergyObject,"timestamp",now()));
    PREPARE save_allergies_query FROM @save_allergies_query;
    EXECUTE save_allergies_query;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_appointments_get`
--

DROP PROCEDURE IF EXISTS `sp_user_appointments_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_appointments_get`(IN IN_userId INT)
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

    SELECT a.appointment_id,a.user_id,a.relative_id,a.doctor_id, a.mode_id, a.appointment_at,a.amount_paid,a.appointment_status,
    u.username,d.name AS doctorName,d.username AS doctorUserame, c.is_recurring, c.recurring_freq, c.severity_id, c.complaint_description
    FROM d_appointment a
    LEFT JOIN d_user u ON a.user_id = u.user_id
    LEFT JOIN d_doctor d ON a.doctor_id = d.id
    LEFT JOIN da_complaint_detail c ON a.appointment_id = c.appointment_id
     where a.user_id = IN_userId;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_book_appointment`
--

DROP PROCEDURE IF EXISTS `sp_user_book_appointment`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_book_appointment`(IN IN_appointment_id INT, IN IN_doctor_id INT, IN IN_user_id INT, IN IN_relative_id INT,
                                                                       IN IN_mode_id INT, IN IN_appointment_at VARCHAR(255),
                                                                       IN IN_amount_paid VARCHAR(255), IN IN_main_complaint VARCHAR(255))
BEGIN

DECLARE appointmentId INT;


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


  IF (IN_appointment_id > 0) THEN

    UPDATE d_appointment SET relative_id = IN_relative_id,mode_id=IN_mode_id,appointment_at=IN_appointment_at,
            amount_paid=IN_amount_paid,main_complaint=IN_main_complaint,updated_at=now() WHERE appointment_id = IN_appointment_id;

    UPDATE da_log SET relative_id = IN_relative_id,mode_id=IN_mode_id,appointment_at=IN_appointment_at,
            updated_at=now() WHERE appointment_id = IN_appointment_id;

    UPDATE d_transaction SET transaction_amount=IN_amount_paid,net_amount=IN_amount_paid, transaction_at=now(),
            updated_at=now() WHERE appointment_id = IN_appointment_id;

  ELSE

     INSERT INTO d_appointment (user_id, relative_id, doctor_id, mode_id, appointment_at, amount_paid, main_complaint, created_by,
                                updated_by, created_at, updated_at)
     VALUES (IN_user_id,IN_relative_id,IN_doctor_id,IN_mode_id,IN_appointment_at,IN_amount_paid, IN_main_complaint,IN_user_id,
             IN_user_id,now(),now());
     SET appointmentId = LAST_INSERT_ID();


     INSERT INTO da_log (appointment_id, user_id, relative_id, doctor_id, mode_id, appointment_at, created_by,
                                updated_by, created_at, updated_at)
     VALUES (appointmentId, IN_user_id,IN_relative_id,IN_doctor_id,IN_mode_id,IN_appointment_at,IN_user_id,IN_user_id,now(),now());


     INSERT INTO d_transaction (appointment_id, user_id, doctor_id, transaction_type_id, transaction_amount, transaction_at,
     net_amount, taxes, charges, created_by, updated_by, created_at, updated_at)
     VALUES (appointmentId, IN_user_id,IN_doctor_id,1,IN_amount_paid,now(),IN_amount_paid,0,0,IN_user_id,IN_user_id,now(),now());

  END IF;


COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_complaint_detail`
--

DROP PROCEDURE IF EXISTS `sp_user_complaint_detail`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_complaint_detail`(IN IN_appointment_id INT,IN IN_user_id INT,
                                                                       IN IN_doctor_id INT, IN IN_relative_id INT,
                                                                       IN IN_is_recurring INT, IN IN_recurring_freq INT,
                                                                       IN IN_severity_id INT,
                                                                       IN IN_complaint_description VARCHAR(255))
BEGIN

DECLARE Var_id INT;


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


 Set Var_id = (SELECT count(*) FROM da_complaint_detail d where appointment_id=IN_appointment_id);


  IF (Var_id > 0) Then
     UPDATE da_complaint_detail SET is_recurring = IN_is_recurring, recurring_freq = IN_recurring_freq,
     severity_id = IN_severity_id, complaint_description = IN_complaint_description, updated_by = IN_user_id,
     updated_at = now();
  ELSE
     INSERT INTO da_complaint_detail (user_id, doctor_id, relative_id, appointment_id, is_recurring, recurring_freq,
     severity_id, complaint_description, created_by, updated_by, created_at, updated_at)
     VALUES (IN_user_id, IN_doctor_id, IN_relative_id,IN_appointment_id,IN_is_recurring, IN_recurring_freq,
     IN_severity_id, IN_complaint_description,IN_user_id,IN_user_id,now(),now());
 END IF;



COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_doctorConsultant_masters_get`
--

DROP PROCEDURE IF EXISTS `sp_user_doctorConsultant_masters_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_doctorConsultant_masters_get`(IN IN_doctorId INT)
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

 SELECT name AS colOne, username AS colTwo, '' AS colThree, '' AS colFour,'doctorDetails' AS  master_type FROM d_doctor where id=IN_doctorId

 UNION

 SELECT m.mode_id AS colOne, m.name AS colTwo, dm.minimum_min AS colThree, dm.price_per_min AS colFour,
 'modes' AS  master_type FROM m_mode m LEFT JOIN dd_mode dm ON m.mode_id = dm.mode_id where dm.doctor_id=IN_doctorId

 UNION

 SELECT clinic_id AS colOne, week_days AS colTwo, from_time AS colThree, to_time AS colFour,
 'doctorSlotDetails' AS  master_type FROM ddc_timing where doctor_id=IN_doctorId;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_doctorKits_get`
--

DROP PROCEDURE IF EXISTS `sp_user_doctorKits_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_doctorKits_get`(IN IN_doctorId INT, IN IN_userId INT)
BEGIN

DECLARE doctorId INT;

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

     IF (IN_doctorId = 0) THEN
        SELECT * FROM dd_kit d where doctor_id IN (SELECT concat(doctor_id) FROM du_doctor where user_id=IN_userId);
        SELECT o.kit_id, o.created_at, k.name, k.description, k.price FROM dk_order o LEFT JOIN dd_kit k ON o.kit_id = k.kit_id WHERE user_id=IN_userId;
     ELSE
        SELECT * FROM dd_kit d where doctor_id = IN_doctorId;
        SELECT o.kit_id, o.created_at, k.name, k.description, k.price FROM dk_order o LEFT JOIN dd_kit k ON o.kit_id = k.kit_id WHERE o.doctor_id = IN_doctorId AND o.user_id=IN_userId;
     END IF;



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
-- Definition of procedure `sp_user_files_get`
--

DROP PROCEDURE IF EXISTS `sp_user_files_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_files_get`(IN IN_user_id INT)
BEGIN

  SELECT f.file_id, f.relative_id, f.file_type_id, f.file_date, f.file_blob AS photo, mf.name FROM ehr_file f
  LEFT JOIN m_file_type mf ON f.file_type_id = mf.file_type_id WHERE f.user_id = IN_user_id;

  SELECT * FROM m_file_type WHERE is_active = 1;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_file_delete`
--

DROP PROCEDURE IF EXISTS `sp_user_file_delete`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_file_delete`(IN IN_file_id INT)
BEGIN

  DELETE FROM ehr_file WHERE file_id = IN_file_id;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_file_upsert`
--

DROP PROCEDURE IF EXISTS `sp_user_file_upsert`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_file_upsert`(IN IN_user_id INT, IN IN_relative_id INT, IN IN_file_id INT,
                                                    IN IN_file_type_id INT, IN IN_photo MEDIUMTEXT)
BEGIN

  IF (IN_file_id > 0) THEN

    UPDATE ehr_file SET relative_id = IN_relative_id, file_type_id = IN_file_type_id, file_blob =IN_photo, updated_at=now()
     WHERE file_id = IN_file_id;

  ELSE

    INSERT INTO ehr_file (user_id, relative_id, file_type_id, file_blob, created_by, updated_by, file_date, upload_date,
    created_at, updated_at)
    VALUES (IN_user_id, IN_relative_id, IN_file_type_id,IN_photo,IN_user_id, IN_user_id, now(), now(), now(), now());

  END IF;

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
-- Definition of procedure `sp_user_lifestyle_upsert`
--

DROP PROCEDURE IF EXISTS `sp_user_lifestyle_upsert`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_lifestyle_upsert`(IN IN_user_id INT, IN IN_relative_id INT,
                           IN IN_smoking_id INT, IN IN_alcohol_id INT, IN IN_excercise_id INT, IN IN_activity_level_id INT,
                           IN IN_profession_id INT, IN IN_food_id INT, IN IN_heat_id INT)
BEGIN

DECLARE lifestyleCount INT;

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

  SET lifestyleCount = (SELECT COUNT(*) FROM ehr_lifestyle WHERE user_id = IN_user_id AND relative_id = IN_relative_id);

  IF (lifestyleCount > 0) THEN

    UPDATE ehr_lifestyle SET smoking_id = IN_smoking_id, alcohol_id = IN_alcohol_id, excercise_id = IN_excercise_id,
      activity_level_id = IN_activity_level_id, profession_id = IN_profession_id, food_id = IN_food_id,
      heat_id = IN_heat_id, updated_at=now()
     WHERE user_id = IN_user_id AND relative_id = IN_relative_id;

  ELSE

    INSERT INTO ehr_lifestyle (user_id, relative_id, smoking_id, alcohol_id, excercise_id, activity_level_id, profession_id,
               food_id, heat_id, created_by, updated_by, created_at, updated_at)
               VALUES (IN_user_id, IN_relative_id, IN_smoking_id,IN_alcohol_id,IN_excercise_id, IN_activity_level_id,
               IN_profession_id, IN_food_id, IN_heat_id, user_id, user_id, now(), now());

  END IF;

COMMIT;

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
-- Definition of procedure `sp_user_medical_history_upsert`
--

DROP PROCEDURE IF EXISTS `sp_user_medical_history_upsert`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_medical_history_upsert`(IN IN_medical_history_name VARCHAR(255), IN IN_user_id INT,
                                               IN IN_relative_id INT, IN IN_commaSeparatedAllergy_ids VARCHAR(2000),
                                               IN IN_commaSeparatedAllergyObject VARCHAR(2000))
BEGIN

DECLARE Var_table_name VARCHAR(30);
DECLARE Var_id_field_name VARCHAR(30);


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

    IF(IN_medical_history_name = 'allergies') THEN

     SET Var_table_name = 'ehr_allergy';
     SET Var_id_field_name = 'allergy_id';

    ELSEIF(IN_medical_history_name = 'currentMedication') THEN

     SET Var_table_name = 'ehr_current_medication';
     SET Var_id_field_name = 'medication_id';

    ELSEIF(IN_medical_history_name = 'postMedication') THEN

     SET Var_table_name = 'ehr_post_medication';
     SET Var_id_field_name = 'medication_id';

    ELSEIF(IN_medical_history_name = 'surgeries') THEN

     SET Var_table_name = 'ehr_surgery';
     SET Var_id_field_name = 'surgery_id';

    ELSEIF(IN_medical_history_name = 'injuries') THEN

     SET Var_table_name = 'ehr_injury';
     SET Var_id_field_name = 'injury_id';

    ELSEIF(IN_medical_history_name = 'chronics') THEN

     SET Var_table_name = 'ehr_chronic';
     SET Var_id_field_name = 'disease_id';

    END IF;


    set @sql = concat("DELETE FROM ",Var_table_name,"
                          WHERE user_id = ",IN_user_id," AND relative_id = ",IN_relative_id);
    PREPARE q FROM @sql;
    execute q;

    SET @save_allergies_query = CONCAT("INSERT INTO ",Var_table_name,"
                            (user_id, relative_id, ",Var_id_field_name,", created_by, updated_by,created_at, updated_at)
                            VALUES ",replace(IN_commaSeparatedAllergyObject,"timestamp",now()));
    PREPARE save_allergies_query FROM @save_allergies_query;
    EXECUTE save_allergies_query;

COMMIT;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_photo_get`
--

DROP PROCEDURE IF EXISTS `sp_user_photo_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_photo_get`(IN IN_user_id INT, IN IN_relative_id INT)
BEGIN

  SELECT * FROM du_photo WHERE user_id = IN_user_id AND relative_id = IN_relative_id;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_photo_save`
--

DROP PROCEDURE IF EXISTS `sp_user_photo_save`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_photo_save`(IN IN_user_id INT, IN IN_relative_id INT,IN IN_photo BLOB)
BEGIN


  DELETE FROM du_photo WHERE user_id = IN_user_id AND relative_id = IN_relative_id;

  INSERT INTO du_photo (user_id, relative_id, photo, created_at) VALUES (IN_user_id, IN_relative_id, IN_photo, now());

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_profile_details`
--

DROP PROCEDURE IF EXISTS `sp_user_profile_details`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_profile_details`(IN IN_userId INT)
BEGIN

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

 SELECT * FROM d_user where user_id=IN_userId;

 SELECT blood_group_id AS id, name AS name, 'blood_group' as master_type from m_blood_group WHERE is_active = 1

 Union

 SELECT marital_status_id AS id, name AS name, 'marital_status' as master_type from m_marital_status WHERE is_active = 1

 Union

 SELECT gender_id AS id, name AS name, 'gender' as master_type from m_gender WHERE is_active = 1;

 SELECT * FROM du_photo WHERE user_id = IN_userId AND relative_id = 0;

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

     INSERT INTO d_transaction (kit_id, user_id, doctor_id, transaction_type_id, transaction_amount,
     net_amount, taxes, charges, transaction_at, created_by, updated_by, created_at, updated_at)
     VALUES (IN_kitId, IN_userId,IN_doctorId,3,IN_price,IN_price,0,0,now(),IN_userId,IN_userId,now(),now());


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

--
-- Definition of procedure `sp_user_update_profile`
--

DROP PROCEDURE IF EXISTS `sp_user_update_profile`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_update_profile`(IN IN_user_id INT, IN IN_column_name VARCHAR(255),
                                                                       IN IN_value VARCHAR(255))
BEGIN


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

     

     SET @sql = CONCAT("UPDATE d_user SET ", IN_column_name, " = '", IN_value ,"' WHERE user_id = ",IN_user_id);
     PREPARE stmt FROM @sql;
     EXECUTE stmt;
     DEALLOCATE PREPARE stmt;


COMMIT;
END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_vitals_get`
--

DROP PROCEDURE IF EXISTS `sp_user_vitals_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_vitals_get`(IN IN_user_id INT)
BEGIN

  SELECT * FROM ehr_vital WHERE user_id = IN_user_id;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_vital_delete`
--

DROP PROCEDURE IF EXISTS `sp_user_vital_delete`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_vital_delete`(IN IN_vital_id INT)
BEGIN

  DELETE FROM ehr_vital WHERE vital_id = IN_vital_id;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_vital_upsert`
--

DROP PROCEDURE IF EXISTS `sp_user_vital_upsert`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_vital_upsert`(IN IN_user_id INT, IN IN_vital_id INT, IN IN_relative_id INT,
                                                    IN IN_temperature VARCHAR(30), IN IN_pulserate VARCHAR(30),
                                                    IN IN_respiratoryrate VARCHAR(30), IN IN_bp_systolic VARCHAR(30),
                                                    IN IN_bp_diastolic VARCHAR(30))
BEGIN

  IF (IN_vital_id > 0) THEN

    UPDATE ehr_vital SET relative_id = IN_relative_id, temperature = IN_temperature, pulse =IN_pulserate, resp_rate =IN_respiratoryrate,
           bp_systolic=IN_bp_systolic,bp_diastolic=IN_bp_diastolic,updated_at=now() WHERE vital_id = IN_vital_id;

  ELSE

    INSERT INTO ehr_vital (user_id, relative_id, temperature, pulse, resp_rate, bp_systolic, bp_diastolic, created_by,
                           updated_by, created_at, updated_at) VALUES (IN_user_id, IN_relative_id, IN_temperature,
                           IN_pulserate, IN_respiratoryrate, IN_bp_systolic, IN_bp_diastolic, IN_user_id, IN_user_id, now(), now());

  END IF;

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
