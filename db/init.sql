CREATE DATABASE IF NOT EXISTS `rowan_rocketry` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `rowan_rocketry`;

DROP TABLE IF EXISTS `Emails`;
CREATE TABLE `Emails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `SponsorDonations`;
CREATE TABLE `SponsorDonations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(255) NOT NULL,
  `contactname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contribution` decimal(15,4) NOT NULL,
  `messagetext` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `SponsorInfos`;
CREATE TABLE `SponsorInfos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(255) NOT NULL,
  `contactname` varchar(255) NOT NULL,
  `addresslocation` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contribution` decimal(15,4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;