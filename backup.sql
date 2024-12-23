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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@gmail.com','1234567890','$2a$10$LgU9fwwQr9EEXdmFCVKsjOmgJ62h0fOIJ9LCPZJ.ZO4krqfRqEyCe','Admin','admin'),(2,'demouser@gmail.com','9876543210','$2a$10$YeKTjxA8HHKzzEmIwR2A..hTLuiEMJh7js9Oy0Hw4y7xXomcB3lEO','User','TestUser'),(3,'demoadmin@gmail.com','9876543211','$2a$10$o6BLbe7Y4z3hGERPrG7ghegf2fJh6wrlcP7uIOBd8bDmUTSvbitN.','Admin','AdminUser');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wi_fi_scheme`
--

DROP TABLE IF EXISTS `wi_fi_scheme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wi_fi_scheme` (
  `wifi_scheme_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `availability_status` varchar(255) DEFAULT NULL,
  `data_limit` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fee` double DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `scheme_name` varchar(255) DEFAULT NULL,
  `speed` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`wifi_scheme_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wi_fi_scheme`
--

LOCK TABLES `wi_fi_scheme` WRITE;
/*!40000 ALTER TABLE `wi_fi_scheme` DISABLE KEYS */;
INSERT INTO `wi_fi_scheme` VALUES (1,'Available','500','High-speed internet for professionals',50,'Urban','Super Fast Internet','100'),(2,'Available','500','High-speed internet for professionals',50,'Urban','Super Fast Internet 1734663903429','100'),(3,'Available','500','High-speed internet for professionals',50,'Urban','Super Fast Internet 1734663939398','100'),(4,'Available','500','High-speed internet for professionals',50,'Urban','Super Fast Internet 1734663994989','100'),(5,'Available','500','High-speed internet for professionals',50,'Urban','Super Fast Internet 1734664034996','100');
/*!40000 ALTER TABLE `wi_fi_scheme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wi_fi_scheme_request`
--

DROP TABLE IF EXISTS `wi_fi_scheme_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wi_fi_scheme_request` (
  `wifi_scheme_request_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) NOT NULL,
  `preferred_setup_date` date NOT NULL,
  `proof` longblob NOT NULL,
  `request_date` date NOT NULL,
  `state` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `street_name` varchar(255) NOT NULL,
  `time_slot` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `wifi_scheme_id` bigint(20) NOT NULL,
  PRIMARY KEY (`wifi_scheme_request_id`),
  KEY `FKn4rmj4a4yy7jdnstsms8feim0` (`user_id`),
  KEY `FK66l6wgtnsmludnwu0f3xqnpux` (`wifi_scheme_id`),
  CONSTRAINT `FK66l6wgtnsmludnwu0f3xqnpux` FOREIGN KEY (`wifi_scheme_id`) REFERENCES `wi_fi_scheme` (`wifi_scheme_id`),
  CONSTRAINT `FKn4rmj4a4yy7jdnstsms8feim0` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wi_fi_scheme_request`
--

LOCK TABLES `wi_fi_scheme_request` WRITE;
/*!40000 ALTER TABLE `wi_fi_scheme_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `wi_fi_scheme_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-23  5:16:24
