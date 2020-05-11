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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_appointment`
--

/*!40000 ALTER TABLE `d_appointment` DISABLE KEYS */;
INSERT INTO `d_appointment` (`appointment_id`,`user_id`,`relative_id`,`doctor_id`,`mode_id`,`main_complaint`,`appointment_at`,`booked_at`,`amount_paid`,`payment_status`,`appointment_status`,`advice`,`notes`,`review_date`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,1,1,1,'test','2020-04-21 11:00:00',NULL,'30',0,1,NULL,NULL,NULL,1,'2020-04-21 14:01:23',1,'2020-04-21 14:01:23'),
 (3,2,1,1,3,'qwerty','2020-05-10 11:00:00',NULL,'30',1,1,NULL,NULL,NULL,2,'2020-05-07 15:05:41',2,'2020-05-07 15:05:41'),
 (4,2,1,1,3,'zasedf','2020-05-07 11:30:00',NULL,'30',1,1,NULL,NULL,NULL,2,'2020-05-07 15:12:18',2,'2020-05-07 15:12:18'),
 (5,2,1,1,3,'nhfyee','2020-05-07 17:00:00',NULL,'30',1,1,NULL,NULL,NULL,2,'2020-05-07 15:55:11',2,'2020-05-07 15:55:11'),
 (6,2,1,1,3,'aswedftg','2020-05-07 14:30:00',NULL,'30',1,1,NULL,NULL,NULL,2,'2020-05-07 16:17:37',2,'2020-05-07 16:17:37'),
 (7,2,1,1,3,'asqwerfght','2020-05-08 13:30:00',NULL,'30',1,1,NULL,NULL,NULL,2,'2020-05-07 16:22:42',2,'2020-05-07 16:22:42'),
 (9,2,1,1,2,'eerr','2020-05-11 10:30:00',NULL,'20',0,0,NULL,NULL,NULL,2,'2020-05-11 11:43:57',2,'2020-05-11 11:52:18');
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
  `phone` varchar(10) DEFAULT NULL,
  `gender_id` int(10) unsigned DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`uuid`,`username`) USING BTREE,
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_doctor`
--

/*!40000 ALTER TABLE `d_doctor` DISABLE KEYS */;
INSERT INTO `d_doctor` (`id`,`uuid`,`name`,`username`,`email`,`pwd`,`phone`,`gender_id`,`dob`,`created_at`) VALUES 
 (1,178760,'Mdoc','Mdoc','maruthi_a@yahoo.com','asdf','9876543210',1,NULL,'2020-04-21 13:11:53');
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
 (1,NULL,1,'1',NULL,NULL,NULL,'2020-04-21 13:22:52',0,NULL,'2020-04-21 13:22:52',NULL,'2020-04-21 13:22:52'),
 (2,NULL,1,'1',NULL,NULL,NULL,'2020-04-21 13:22:59',0,NULL,'2020-04-21 13:22:59',NULL,'2020-04-21 13:22:59');
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
  `appointment_id` int(11) DEFAULT NULL,
  `kit_id` int(11) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_transaction`
--

/*!40000 ALTER TABLE `d_transaction` DISABLE KEYS */;
INSERT INTO `d_transaction` (`transaction_id`,`user_id`,`doctor_id`,`appointment_id`,`kit_id`,`transaction_type_id`,`transaction_amount`,`taxes`,`charges`,`net_amount`,`transaction_at`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,1,1,NULL,1,30,0,0,30,'2020-04-21 14:01:23',1,'2020-04-21 14:01:23',1,'2020-04-21 14:01:23'),
 (2,1,1,NULL,1,3,100,0,0,100,'2020-04-21 14:09:58',1,'2020-04-21 14:09:58',1,'2020-04-21 14:09:58'),
 (3,2,1,2,NULL,2,20,0,0,20,'2020-05-09 21:25:45',2,'2020-05-07 13:08:54',2,'2020-05-10 12:33:09'),
 (4,2,1,3,NULL,1,30,0,0,30,'2020-05-07 15:05:42',2,'2020-05-07 15:05:42',2,'2020-05-07 15:05:42'),
 (5,2,1,4,NULL,1,30,0,0,30,'2020-05-07 15:12:18',2,'2020-05-07 15:12:18',2,'2020-05-07 15:12:18'),
 (6,2,1,5,NULL,1,30,0,0,30,'2020-05-07 15:55:11',2,'2020-05-07 15:55:11',2,'2020-05-07 15:55:11'),
 (7,2,1,6,NULL,1,30,0,0,30,'2020-05-07 16:17:37',2,'2020-05-07 16:17:37',2,'2020-05-07 16:17:37'),
 (8,2,1,7,NULL,1,30,0,0,30,'2020-05-07 16:22:42',2,'2020-05-07 16:22:42',2,'2020-05-07 16:22:42'),
 (9,2,1,8,NULL,2,30,0,0,30,'2020-05-11 11:30:04',2,'2020-05-11 11:30:04',2,'2020-05-11 11:55:54'),
 (10,2,1,9,NULL,1,20,0,0,20,'2020-05-11 11:52:18',2,'2020-05-11 11:43:57',2,'2020-05-11 11:52:18');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `d_user`
--

/*!40000 ALTER TABLE `d_user` DISABLE KEYS */;
INSERT INTO `d_user` (`user_id`,`name`,`username`,`password`,`phone`,`email`,`gender_id`,`dob`,`blood_group_id`,`marital_status_id`,`height`,`weight`,`created_at`) VALUES 
 (1,'mark','Mark','asdf123@','9297000327','maruthi.2406@gmail.com','1','1985-6-24','6','2','6.0','78','2020-04-21 12:57:50'),
 (2,'Manoj Kumar','manoj','manoj','9988776600','manoj@gmail.com','1','1993-1-2','2','2','5.8','64','2020-04-22 12:14:31');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `da_complaint_detail`
--

/*!40000 ALTER TABLE `da_complaint_detail` DISABLE KEYS */;
INSERT INTO `da_complaint_detail` (`complaint_detail_id`,`user_id`,`relative_id`,`doctor_id`,`appointment_id`,`is_recurring`,`recurring_freq`,`severity_id`,`complaint_description`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,0,1,1,'2','2','1','ytedwd',1,'2020-04-21 14:10:47',2,'2020-05-11 11:44:18'),
 (2,2,3,1,2,'2','2','1','ytedwd',2,'2020-05-09 21:18:50',2,'2020-05-11 11:44:18'),
 (3,2,1,1,3,'2','2','1','ytedwd',2,'2020-05-11 11:28:58',2,'2020-05-11 11:44:18'),
 (4,2,1,1,8,'2','2','1','ytedwd',2,'2020-05-11 11:43:24',2,'2020-05-11 11:44:18'),
 (5,2,1,1,9,'2','2','1','ytedwd',2,'2020-05-11 11:44:12',2,'2020-05-11 11:44:18');
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
  `appointment_status` int(11) DEFAULT 0,
  `is_latest` int(11) DEFAULT 0,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `da_log`
--

/*!40000 ALTER TABLE `da_log` DISABLE KEYS */;
INSERT INTO `da_log` (`log_id`,`user_id`,`relative_id`,`doctor_id`,`appointment_id`,`mode_id`,`appointment_at`,`appointment_status`,`is_latest`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,1,0,1,1,1,'2020-04-23 10:00:00',0,0,1,'2020-04-21 14:01:23',1,'2020-04-21 14:01:23'),
 (2,2,3,1,2,2,'2020-05-10 13:00:00',0,0,2,'2020-05-07 13:08:54',2,'2020-05-09 21:25:45'),
 (3,2,1,1,3,3,'2020-05-10 11:00,false:00',0,0,2,'2020-05-07 15:05:41',2,'2020-05-07 15:05:41'),
 (4,2,1,1,4,3,'2020-05-07 17:30:00',0,0,2,'2020-05-07 15:12:18',2,'2020-05-07 15:12:18'),
 (5,2,1,1,5,3,'2020-05-07 17:00:00',0,0,2,'2020-05-07 15:55:11',2,'2020-05-07 15:55:11'),
 (6,2,1,1,6,3,'2020-05-07 14:30:00',0,0,2,'2020-05-07 16:17:37',2,'2020-05-07 16:17:37'),
 (7,2,1,1,7,3,'2020-05-08 13:30:00',0,0,2,'2020-05-07 16:22:42',2,'2020-05-07 16:22:42'),
 (8,2,1,1,8,1,'2020-05-11 13:00:00',0,0,2,'2020-05-11 11:30:04',2,'2020-05-11 11:30:04'),
 (9,2,1,1,9,2,'2020-05-11 10:30:00',0,0,2,'2020-05-11 11:43:57',2,'2020-05-11 11:52:18');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_clinic`
--

/*!40000 ALTER TABLE `dd_clinic` DISABLE KEYS */;
INSERT INTO `dd_clinic` (`clinic_id`,`doctor_id`,`clinic_name`,`clinic_address`,`walkin_fee`,`created_at`) VALUES 
 (1,1,'test clin','HNo 1, Jubilee hills',300,'2020-04-21 13:16:56'),
 (2,1,'test clin2 ','HNo 2, HYD',500,'2020-04-21 13:16:56');
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
  `is_active` int(11) DEFAULT 0,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`kit_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_kit`
--

/*!40000 ALTER TABLE `dd_kit` DISABLE KEYS */;
INSERT INTO `dd_kit` (`kit_id`,`doctor_id`,`name`,`price`,`description`,`is_active`,`created_at`) VALUES 
 (1,1,'Kit one - viral fever','100','used to stop viral fever',1,'2020-04-21 14:09:07');
/*!40000 ALTER TABLE `dd_kit` ENABLE KEYS */;


--
-- Definition of table `dd_mode`
--

DROP TABLE IF EXISTS `dd_mode`;
CREATE TABLE `dd_mode` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int(10) unsigned NOT NULL,
  `mode_id` int(10) unsigned NOT NULL,
  `minimum_min` varchar(45) DEFAULT NULL,
  `price_per_min` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`doctor_id`,`mode_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dd_mode`
--

/*!40000 ALTER TABLE `dd_mode` DISABLE KEYS */;
INSERT INTO `dd_mode` (`id`,`doctor_id`,`mode_id`,`minimum_min`,`price_per_min`,`created_at`,`updated_at`) VALUES 
 (1,1,1,'10 min',30,'2020-04-21 13:11:53',NULL),
 (2,1,2,'10 min ',20,'2020-04-21 13:11:53',NULL),
 (3,1,3,'24 hrs',30,'2020-04-21 13:11:53',NULL),
 (4,1,4,NULL,500,'2020-04-21 13:11:53',NULL);
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
 (1,'4','10','1','1','3',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ddc_timing`
--

/*!40000 ALTER TABLE `ddc_timing` DISABLE KEYS */;
INSERT INTO `ddc_timing` (`id`,`doctor_id`,`clinic_id`,`week_days`,`from_time`,`to_time`,`remarks`,`created_at`) VALUES 
 (1,1,1,'1,2,3,4,5','10:00','18:00',NULL,'2020-04-21 13:16:56'),
 (2,1,2,'6,0','11:00','14:00',NULL,'2020-04-21 13:16:56');
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
 (1,1,1,1,'100','completed','2020-04-21 14:09:58');
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
  `is_latest` int(11) DEFAULT 0,
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
  `is_active` int(11) DEFAULT 0,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `du_doctor`
--

/*!40000 ALTER TABLE `du_doctor` DISABLE KEYS */;
INSERT INTO `du_doctor` (`id`,`user_id`,`doctor_id`,`added_on`,`is_active`,`created_at`,`updated_at`) VALUES 
 (1,1,1,'2020-04-21 13:25:44',1,'2020-04-21 13:25:44','2020-04-21 13:25:44'),
 (2,1,1,'2020-04-21 13:26:20',1,'2020-04-21 13:26:20','2020-04-21 13:26:20'),
 (3,2,1,'2020-05-05 22:01:27',1,'2020-05-05 22:01:27','2020-05-05 22:01:27');
/*!40000 ALTER TABLE `du_doctor` ENABLE KEYS */;


--
-- Definition of table `du_photo`
--

DROP TABLE IF EXISTS `du_photo`;
CREATE TABLE `du_photo` (
  `photo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL DEFAULT 0,
  `photo` mediumtext NOT NULL,
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
  `photo` mediumtext NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`relative_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `du_relative`
--

/*!40000 ALTER TABLE `du_relative` DISABLE KEYS */;
INSERT INTO `du_relative` (`id`,`user_id`,`relative_id`,`relative_name`,`photo`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (3,2,3,'aaaa','',2,'2020-05-05 15:51:05',2,'2020-05-05 15:51:05'),
 (4,2,4,'bbb','',2,'2020-05-05 16:26:45',2,'2020-05-05 16:26:45'),
 (5,2,5,'ccc','',2,'2020-05-05 22:43:42',2,'2020-05-05 22:43:42'),
 (6,2,2,'ddd','',2,'2020-05-05 22:45:12',2,'2020-05-05 22:45:12');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_allergy`
--

/*!40000 ALTER TABLE `ehr_allergy` DISABLE KEYS */;
INSERT INTO `ehr_allergy` (`id`,`user_id`,`relative_id`,`allergy_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,2,1,3,2,'2020-04-30 09:50:45',2,'2020-04-30 09:50:45'),
 (2,2,1,7,2,'2020-04-30 09:50:45',2,'2020-04-30 09:50:45');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_chronic`
--

/*!40000 ALTER TABLE `ehr_chronic` DISABLE KEYS */;
INSERT INTO `ehr_chronic` (`id`,`user_id`,`relative_id`,`disease_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,2,1,8,2,'2020-04-30 09:51:23',2,'2020-04-30 09:51:23');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_current_medication`
--

/*!40000 ALTER TABLE `ehr_current_medication` DISABLE KEYS */;
INSERT INTO `ehr_current_medication` (`id`,`user_id`,`relative_id`,`medication_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,2,1,6,2,'2020-04-30 09:50:54',2,'2020-04-30 09:50:54'),
 (2,2,1,9,2,'2020-04-30 09:50:54',2,'2020-04-30 09:50:54');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_family_history`
--

/*!40000 ALTER TABLE `ehr_family_history` DISABLE KEYS */;
INSERT INTO `ehr_family_history` (`id`,`user_id`,`relative_id`,`relation_id`,`disease_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (3,2,1,3,1,1,NULL,1,NULL),
 (4,2,1,1,1,2,'2020-05-01 16:46:31',2,'2020-05-01 16:46:31'),
 (5,2,1,1,5,2,'2020-05-01 16:46:31',2,'2020-05-01 16:46:31'),
 (6,2,1,1,8,2,'2020-05-01 16:46:31',2,'2020-05-01 16:46:31'),
 (7,2,2,2,3,2,'2020-05-05 07:55:56',2,'2020-05-05 07:55:56'),
 (8,2,2,2,6,2,'2020-05-05 07:55:56',2,'2020-05-05 07:55:56');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_injury`
--

/*!40000 ALTER TABLE `ehr_injury` DISABLE KEYS */;
INSERT INTO `ehr_injury` (`id`,`user_id`,`relative_id`,`injury_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,2,1,5,2,'2020-04-30 09:51:18',2,'2020-04-30 09:51:18');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_lifestyle`
--

/*!40000 ALTER TABLE `ehr_lifestyle` DISABLE KEYS */;
INSERT INTO `ehr_lifestyle` (`lifestyle_id`,`user_id`,`relative_id`,`smoking_id`,`alcohol_id`,`excercise_id`,`activity_level_id`,`profession_id`,`food_id`,`heat_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,2,1,2,2,3,1,2,3,2,2,'2020-04-30 09:48:49',2,'2020-04-30 09:48:57');
/*!40000 ALTER TABLE `ehr_lifestyle` ENABLE KEYS */;


--
-- Definition of table `ehr_lifestyle_food`
--

DROP TABLE IF EXISTS `ehr_lifestyle_food`;
CREATE TABLE `ehr_lifestyle_food` (
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `food_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_post_medication`
--

/*!40000 ALTER TABLE `ehr_post_medication` DISABLE KEYS */;
INSERT INTO `ehr_post_medication` (`id`,`user_id`,`relative_id`,`medication_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,2,1,8,2,'2020-04-30 09:51:02',2,'2020-04-30 09:51:02'),
 (2,2,1,9,2,'2020-04-30 09:51:02',2,'2020-04-30 09:51:02');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ehr_surgery`
--

/*!40000 ALTER TABLE `ehr_surgery` DISABLE KEYS */;
INSERT INTO `ehr_surgery` (`id`,`user_id`,`relative_id`,`surgery_id`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,2,1,2,2,'2020-04-30 09:51:10',2,'2020-04-30 09:51:10'),
 (2,2,1,9,2,'2020-04-30 09:51:10',2,'2020-04-30 09:51:10');
/*!40000 ALTER TABLE `ehr_surgery` ENABLE KEYS */;


--
-- Definition of table `ehr_vital`
--

DROP TABLE IF EXISTS `ehr_vital`;
CREATE TABLE `ehr_vital` (
  `vital_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `relative_id` int(10) unsigned NOT NULL,
  `temperature` varchar(10) DEFAULT NULL,
  `pulse` int(10) unsigned DEFAULT NULL,
  `resp_rate` int(10) unsigned DEFAULT NULL,
  `bp_systolic` int(10) unsigned DEFAULT NULL,
  `bp_diastolic` int(10) unsigned DEFAULT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`vital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ehr_vital`
--

/*!40000 ALTER TABLE `ehr_vital` DISABLE KEYS */;
INSERT INTO `ehr_vital` (`vital_id`,`user_id`,`relative_id`,`temperature`,`pulse`,`resp_rate`,`bp_systolic`,`bp_diastolic`,`created_by`,`created_at`,`updated_by`,`updated_at`) VALUES 
 (1,2,1,'200.99',199,198,197,196,2,'2020-04-22 12:17:14',2,'2020-04-22 12:17:14');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `m_relation`
--

/*!40000 ALTER TABLE `m_relation` DISABLE KEYS */;
INSERT INTO `m_relation` (`relation_id`,`name`,`is_active`) VALUES 
 (1,'Self','1'),
 (2,'Father','1'),
 (3,'Mother','1'),
 (4,'Elder brother','1'),
 (5,'Younger brother','1'),
 (6,'Elder sister','1'),
 (7,'Younger sister','1'),
 (8,'Uncle','1'),
 (9,'Aunt','1'),
 (10,'Husband','1'),
 (11,'Wife','1'),
 (12,'Son','1'),
 (13,'Daughter','1');
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








SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.id = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where doctor_id=IN_doctor_id and appointment_status=0
;



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
-- Definition of procedure `sp_doctor_clinics_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_clinics_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_clinics_get`(IN IN_doctor_id INT)
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
t.clinic_id = c.clinic_id and t.doctor_id = c.doctor_id where c.doctor_id = IN_doctor_id;
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







SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.uuid = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where d.doctor_id= IN_doctor_id and d.appointment_status=1 and d.user_id = IN_user_id and d.relative_id= IN_relative_id;


SELECT main_complaint, advice,review_date FROM d_appointment d
where doctor_id=IN_doctor_id and user_id = IN_user_id and relative_id= IN_relative_id
;




SELECT case when is_recurring=1 then 'yes' else 'no' end as recurring ,recurring_freq,m.name as severity
 ,complaint_description FROM da_complaint_detail d
left join m_severity m on m.severity_id = d.severity_id
where doctor_id=IN_doctor_id and user_id = IN_user_id and relative_id= IN_relative_id
 ;



SELECT d.other_diagnosis ,m.name as diagnosis FROM da_diagnosis d
left join m_diagnosis m on d.diagnosis_id = m.diagnosis_id
where doctor_id=IN_doctor_id and user_id = IN_user_id and relative_id= IN_relative_id
;



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
-- Definition of procedure `sp_doctor_modes_get`
--

DROP PROCEDURE IF EXISTS `sp_doctor_modes_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_doctor_modes_get`(IN IN_doctor_id INT)
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


SELECT * FROM dd_mode d left join
m_mode m on m.mode_id = d.mode_id where d.doctor_id = IN_doctor_id;
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



   UPDATE  dd_mode SET minimum_min = IN_session , price_per_min = IN_price , created_at = now() WHERE doctor_id = IN_doctor_id AND mode_id = IN_mode_id;



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

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
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


 
select (SELECT sum(net_amount) FROM d_transaction where transaction_type_id in (1, 3)) - (SELECT sum(net_amount) FROM d_transaction where transaction_type_id in (2, 4))as total_net_amount;

SELECT dt.*,case when dt.kit_id is null then 'appointment' else 'kit' end as 'transaction_for' , dk.name as kit_name, du.name as user_name , m.name as mode_name , da.relative_id , dr.relative_name FROM d_transaction dt
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

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
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


     INSERT INTO d_doctor (uuid ,name , username, email, pwd , created_at)
     VALUES ( Floor((RAND()*100000) +100000) ,IN_username,IN_username , IN_email ,IN_password ,now());


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

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
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









SELECT d.user_id,du.name as user_name,d.relative_id ,r.relative_name ,d.appointment_at,dc.name as doctor_name,m.name as mode FROM homeotel.d_appointment d
left join homeotel.d_user du on du.user_id=d.user_id
left join homeotel.d_doctor dc on dc.id = d.doctor_id
left join homeotel.m_mode m on d.mode_id = m.mode_id
left join du_relative r on d.relative_id = r.relative_id and d.user_id = r.user_id
where doctor_id=IN_doctor_id and appointment_status=0 and date(appointment_at)=date(now())

;



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

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */ $$
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
-- Definition of procedure `sp_master_medical_history`
--

DROP PROCEDURE IF EXISTS `sp_master_medical_history`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */ $$
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

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */ $$
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
-- Definition of procedure `sp_master_relations_get`
--

DROP PROCEDURE IF EXISTS `sp_master_relations_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_relations_get`()
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

  SELECT * FROM homeotel.m_relation where is_active =1;


END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_master_relations_medical_history_get`
--

DROP PROCEDURE IF EXISTS `sp_master_relations_medical_history_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_master_relations_medical_history_get`(IN IN_user_id INT, IN IN_relative_id INT)
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

  SELECT * FROM homeotel.m_disease where is_active =1;

  SELECT * FROM homeotel.m_relation where is_active =1;

  SELECT efh.relative_id, efh.relation_id, efh.disease_id, md.name as diseaseName, mr.name as relationName
    FROM homeotel.ehr_family_history efh
    LEFT JOIN m_disease md ON efh.disease_id = md.disease_id
    LEFT JOIN m_relation mr ON efh.relation_id = mr.relation_id
    where efh.user_id = IN_user_id AND efh.relative_id = IN_relative_id;


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
-- Definition of procedure `sp_user_add_relative_save`
--

DROP PROCEDURE IF EXISTS `sp_user_add_relative_save`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_add_relative_save`(IN IN_user_id INT,
                                              IN IN_relative_name VARCHAR(100), IN IN_relation_id INT,IN IN_photo MEDIUMTEXT)
BEGIN


  INSERT INTO du_relative (user_id, relative_id, relative_name, photo, created_by, updated_by, created_at, updated_at)
    VALUES (IN_user_id, IN_relation_id, IN_relative_name, IN_photo, IN_user_id, IN_user_id, now(), now());

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
-- Definition of procedure `sp_user_cancel_appointment`
--

DROP PROCEDURE IF EXISTS `sp_user_cancel_appointment`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_cancel_appointment`(IN IN_appointment_id INT)
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

    DELETE FROM d_appointment WHERE appointment_id = IN_appointment_id;

    UPDATE d_transaction SET transaction_type_id = 2, updated_at=now() WHERE appointment_id = IN_appointment_id;


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

SELECT appointment_at FROM d_appointment WHERE doctor_id = IN_doctorId AND appointment_status = 0;



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

 SELECT d.id, d.name as doctorName, d.uuid, d.username, dp.photo, p.experience, ms.name as specialisation FROM du_doctor du
   LEFT JOIN d_doctor d ON du.doctor_id = d.id
   LEFT JOIN dd_photo dp ON dp.doctor_id = d.id
   LEFT JOIN dd_professional p ON p.doctor_id = d.id
   LEFT JOIN m_specialisation ms ON ms.id = d.id
   where du.user_id=IN_userId;

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

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_find_doctor`(IN IN_user_id INT, IN IN_uuid INT)
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

 SELECT d.id, d.name as doctorName, d.uuid, d.username, p.experience, ms.name as specialisation FROM d_doctor d
   LEFT JOIN dd_professional p ON d.id = p.doctor_id
   LEFT JOIN m_specialisation ms ON ms.id = p.doctor_id
   where uuid=IN_uuid;

# where d.id NOT IN(SELECT Group_concat(doctor_id) FROM du_doctor WHERE user_id = 2) AND uuid=IN_uuid;


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

 SELECT u.user_id, u.username, u.name, p.photo
   FROM d_user u
   Left JOIN du_photo p ON u.user_id = p.user_id AND p.relative_id = 1
   where (u.email=IN_username and u.password=IN_password) OR (u.username=IN_username and u.password=IN_password);

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_photo_save`(IN IN_user_id INT, IN IN_relative_id INT,IN IN_photo MEDIUMTEXT)
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

 SELECT * FROM du_photo WHERE user_id = IN_userId AND relative_id = 1;

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
-- Definition of procedure `sp_user_relation_medical_history_upsert`
--

DROP PROCEDURE IF EXISTS `sp_user_relation_medical_history_upsert`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_relation_medical_history_upsert`(IN IN_user_id INT,
                         IN IN_relative_id INT, IN IN_relation_id INT, IN IN_commaSeparated VARCHAR(2000))
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

    set @sql = concat("DELETE FROM ehr_family_history WHERE user_id = ",IN_user_id," AND relative_id = ",IN_relative_id," AND relation_id = ",IN_relation_id);
    PREPARE q FROM @sql;
    execute q;

    SET @save_query = CONCAT("INSERT INTO ehr_family_history
                            (user_id, relative_id, relation_id, disease_id, created_by, updated_by,created_at, updated_at)
                            VALUES ",replace(IN_commaSeparated,"timestamp",now()));
    PREPARE save_query FROM @save_query;
    EXECUTE save_query;

COMMIT;

END $$
/*!50003 SET SESSION SQL_MODE=@TEMP_SQL_MODE */  $$

DELIMITER ;

--
-- Definition of procedure `sp_user_relatives_get`
--

DROP PROCEDURE IF EXISTS `sp_user_relatives_get`;

DELIMITER $$

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_relatives_get`(IN IN_user_id INT)
BEGIN

  SELECT * FROM du_relative WHERE user_id = IN_user_id;

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

/*!50003 SET @TEMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ $$
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
