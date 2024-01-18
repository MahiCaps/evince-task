-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 18, 2024 at 08:03 PM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evince-employee`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `email` varchar(60) NOT NULL,
  `employeeId` varchar(10) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `age` int NOT NULL,
  `mobileNumber` varchar(15) NOT NULL,
  `anotherMobileNumber` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email-ni` (`email`),
  UNIQUE KEY `mob` (`mobileNumber`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `employeeId`, `gender`, `age`, `mobileNumber`, `anotherMobileNumber`) VALUES
(7, 'nirmal', 'nirmal.mali1@yopmail.com', '12e343dff3', 'male', 18, '+918871638783', ''),
(8, 'nirmal', 'nirmal.mali144@yopmail.com', '12e34edff3', 'male', 18, '+918871338783', ''),
(9, 'fdsfsdf', 'fsdfsdfsdf@yopmail.com', '242fsfasfa', 'male', 23, '+91887433433', ''),
(10, 'fdsfsdf', 'fsdfsdsdf@yopmail.com', '24fsfasfaf', 'male', 23, '+91487433433', ''),
(11, 'shivani shah', 'shivani123@yopmail.com', 'shivani121', 'female', 19, '+918889644710', ''),
(12, 'shivani shah', 'cpasssss@yopmail.com', 'caps122232', 'female', 60, '+919876545322', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
