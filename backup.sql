-- MariaDB dump 10.19  Distrib 10.5.23-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: appdb
-- ------------------------------------------------------
-- Server version	5.6.51

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `appdb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `appdb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `appdb`;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `feedback_text` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `turf_id` bigint(20) DEFAULT NULL,
  `booking_request_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `FKm930dj6n3pawldio07dhp14ba` (`turf_id`),
  KEY `FK99xixrb2y56sq6hfdhs64kpco` (`booking_request_id`),
  KEY `FK7k33yw505d347mw3avr93akao` (`user_id`),
  CONSTRAINT `FK7k33yw505d347mw3avr93akao` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK99xixrb2y56sq6hfdhs64kpco` FOREIGN KEY (`booking_request_id`) REFERENCES `turf_booking_request` (`booking_request_id`),
  CONSTRAINT `FKm930dj6n3pawldio07dhp14ba` FOREIGN KEY (`turf_id`) REFERENCES `turf` (`turf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turf`
--

DROP TABLE IF EXISTS `turf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turf` (
  `turf_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `availability_status` varchar(255) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `hourly_rate` double DEFAULT NULL,
  `image` longblob,
  `location` varchar(255) DEFAULT NULL,
  `turf_name` varchar(255) DEFAULT NULL,
  `turf_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`turf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turf`
--

LOCK TABLES `turf` WRITE;
/*!40000 ALTER TABLE `turf` DISABLE KEYS */;
/*!40000 ALTER TABLE `turf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turf_booking_request`
--

DROP TABLE IF EXISTS `turf_booking_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turf_booking_request` (
  `booking_request_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `booking_date` date DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `extended_time_approved` bit(1) DEFAULT NULL,
  `extending_time_request` bit(1) DEFAULT NULL,
  `extra_time_cost` double DEFAULT NULL,
  `extra_time_needed` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `time_slot` time DEFAULT NULL,
  `total_cost` double DEFAULT NULL,
  `turf_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`booking_request_id`),
  KEY `FKd3im9e63bbwdvjjy0bvrmdmdh` (`turf_id`),
  KEY `FKc5mpuuvg1ee9ojfvxrpi2s3eq` (`user_id`),
  CONSTRAINT `FKc5mpuuvg1ee9ojfvxrpi2s3eq` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKd3im9e63bbwdvjjy0bvrmdmdh` FOREIGN KEY (`turf_id`) REFERENCES `turf` (`turf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turf_booking_request`
--

LOCK TABLES `turf_booking_request` WRITE;
/*!40000 ALTER TABLE `turf_booking_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `turf_booking_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@gmail.com','1234567890','$2a$10$PLvC2T9hR0pqSoH9vh7zF.hOIWk9YHBvPhPbJ60lLerfTWXShgQhW','Admin','adminname');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-28  7:09:35
