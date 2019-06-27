-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: pmsmf
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- CREATE DATABASE pmsmf
--

CREATE DATABASE IF NOT EXISTS `pmsmf` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pmsmf`;

--
-- Table structure for table `cars`
--


DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manufacturer` char(20) NOT NULL,
  `model` char(20) DEFAULT NULL,
  `year_of_production` year(4) DEFAULT NULL,
  `license_no` char(10) DEFAULT NULL,
  `motor_capacity` char(10) DEFAULT NULL,
  `car_class` char(6) DEFAULT NULL,
  `push_type` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drivers` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `first_name` char(20) NOT NULL,
  `last_name` char(20) NOT NULL,
  `nationality` char(20) DEFAULT NULL,
  `address` char(20) DEFAULT NULL,
  `id_card_no` char(9) DEFAULT NULL,
  `mobile` char(10) DEFAULT NULL,
  `email` char(30) DEFAULT NULL,
  `sponsor` char(40) DEFAULT NULL,
  `remarks` text,
  `car_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idcars_idx` (`car_id`),
  CONSTRAINT `idcars` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `rally_types`
--

DROP TABLE IF EXISTS `rally_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rally_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rally_type` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rally_types`
--

LOCK TABLES `rally_types` WRITE;
/*!40000 ALTER TABLE `rally_types` DISABLE KEYS */;
INSERT INTO `rally_types` VALUES (1,'speed'),(2,'drift'),(3,'4x4');
/*!40000 ALTER TABLE `rally_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rallies`
--

DROP TABLE IF EXISTS `rallies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rallies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `city` char(20) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`id`),
  KEY `rally_type_fk_idx` (`type`),
  CONSTRAINT `rally_type_fk` FOREIGN KEY (`type`) REFERENCES `rally_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rallies`
--

LOCK TABLES `rallies` WRITE;
/*!40000 ALTER TABLE `rallies` DISABLE KEYS */;
/*!40000 ALTER TABLE `rallies` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `drift`
--

DROP TABLE IF EXISTS `drift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drift` (
  `id_drift` int(11) NOT NULL,
  KEY `id_drift_idx` (`id_drift`),
  CONSTRAINT `id_drift` FOREIGN KEY (`id_drift`) REFERENCES `rallies` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drift`
--

LOCK TABLES `drift` WRITE;
/*!40000 ALTER TABLE `drift` DISABLE KEYS */;
/*!40000 ALTER TABLE `drift` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `speed`
--

DROP TABLE IF EXISTS `speed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `speed` (
  `id` int(11) NOT NULL,
  `rally` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speed`
--

LOCK TABLES `speed` WRITE;
/*!40000 ALTER TABLE `speed` DISABLE KEYS */;
/*!40000 ALTER TABLE `speed` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `driftmanage`
--

DROP TABLE IF EXISTS `driftmanage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driftmanage` (
  `racingNumber` int(11) unsigned NOT NULL,
  `driver_id` int(10) NOT NULL,
  `drift_id` int(11) NOT NULL,
  `score_1` int(10) DEFAULT NULL,
  `score_2` int(10) DEFAULT NULL,
  `score_3` int(10) DEFAULT NULL,
  KEY `driver_id_idx` (`driver_id`),
  KEY `drift_id_idx` (`drift_id`),
  CONSTRAINT `drift_id` FOREIGN KEY (`drift_id`) REFERENCES `drift` (`id_drift`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `driver_id` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driftmanage`
--

LOCK TABLES `driftmanage` WRITE;
/*!40000 ALTER TABLE `driftmanage` DISABLE KEYS */;
/*!40000 ALTER TABLE `driftmanage` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `speedmanage`
--

DROP TABLE IF EXISTS `speedmanage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `speedmanage` (
  `racing_no` int(10) NOT NULL,
  `driver` int(11) NOT NULL,
  `speed_id` int(11) NOT NULL,
  `time_1` time DEFAULT NULL,
  `time_2` time DEFAULT NULL,
  `time_3` time DEFAULT NULL,
  `best_time` varchar(45) DEFAULT NULL,
  KEY `speed_id_idx` (`speed_id`),
  KEY `driver_id_speed_idx` (`driver`),
  CONSTRAINT `driver_id_speed` FOREIGN KEY (`driver`) REFERENCES `drivers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `speed_id` FOREIGN KEY (`speed_id`) REFERENCES `speed` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speedmanage`
--

LOCK TABLES `speedmanage` WRITE;
/*!40000 ALTER TABLE `speedmanage` DISABLE KEYS */;
/*!40000 ALTER TABLE `speedmanage` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-27 18:53:26
