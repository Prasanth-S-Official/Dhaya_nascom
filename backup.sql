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
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bid` (
  `bid_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bid_amount` double DEFAULT NULL,
  `communication_preference` varchar(255) DEFAULT NULL,
  `proposal` varchar(1000) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `resume_image` tinytext,
  `status` varchar(255) DEFAULT NULL,
  `submission_date` datetime(6) DEFAULT NULL,
  `time_estimation` varchar(255) DEFAULT NULL,
  `withdraw_reason` varchar(500) DEFAULT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`bid_id`),
  KEY `FKbc9amjq8q9k31b1fwm7bei5ep` (`project_id`),
  KEY `FK4abkntgv9nvsfi86p7kfl63au` (`user_id`),
  CONSTRAINT `FK4abkntgv9nvsfi86p7kfl63au` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKbc9amjq8q9k31b1fwm7bei5ep` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

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
  `bid_id` bigint(20) DEFAULT NULL,
  `project_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `FK50y0yhmtq64dlsu0t1gigp1ir` (`bid_id`),
  KEY `FKd3k0p62wu7lsw335o1xul28ah` (`project_id`),
  KEY `FK7k33yw505d347mw3avr93akao` (`user_id`),
  CONSTRAINT `FK50y0yhmtq64dlsu0t1gigp1ir` FOREIGN KEY (`bid_id`) REFERENCES `bid` (`bid_id`),
  CONSTRAINT `FK7k33yw505d347mw3avr93akao` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKd3k0p62wu7lsw335o1xul28ah` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
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
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `project_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `attachments` varchar(1000) DEFAULT NULL,
  `budget` double DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `payment_terms` varchar(255) DEFAULT NULL,
  `priority` varchar(255) DEFAULT NULL,
  `skills_required` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `FKo06v2e9kuapcugnyhttqa1vpt` (`user_id`),
  CONSTRAINT `FKo06v2e9kuapcugnyhttqa1vpt` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'demo url',450000,'SEO Optimization','2025-01-31','demo description','Fixed Price','Low','demo skills','Open','demo title updated',1),(2,'https://www.orimi.com/pdf-test.pdf',450000,'Graphic Design','2025-01-09','Demo description','Fixed Price','High','demo skills','Open','demo title two',1);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'client@gmail.com','1234567890','$2a$10$Qu1gglWnZcE.5e1lGgwWCOJzpeTX24IZ3I9SEAJhCLd5O8DDPwX.O','Client','Client'),(5,'free@gmail.com','9876543213','$2a$10$461pSAits7Fkt3fmxrUCVOnGkitPkt1ekWURm7xeqSAnyn5gayifi','Freelancer','freelancer'),(6,'freeone@gmail.com','9876543214','$2a$10$wgVBlyc11W/ohxN9XUzNp.ArkQZh9jQ1mEY1/LNyrIuk45er7yGqS','Freelancer','freelancer');
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

-- Dump completed on 2025-01-09  6:15:56
