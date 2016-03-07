-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2015 年 11 月 20 日 12:48
-- 服务器版本: 5.6.12-log
-- PHP 版本: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `postor`
--
CREATE DATABASE IF NOT EXISTS `postor` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `postor`;

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `orderId` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `orderInfo` char(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `usrPhoneNumber` bigint(11) NOT NULL,
  `usrId` int(6) NOT NULL,
  `usrName` char(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `positionId` int(3) NOT NULL,
  `postorId` int(8) NOT NULL,
  `importTime` timestamp NULL DEFAULT NULL,
  `exportTime` timestamp NULL DEFAULT NULL,
  `haveNoticed` binary(1) NOT NULL DEFAULT '0',
  `haveSAR` binary(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`orderId`),
  UNIQUE KEY `orderId` (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`orderId`, `orderInfo`, `usrPhoneNumber`, `usrId`, `usrName`, `positionId`, `postorId`, `importTime`, `exportTime`, `haveNoticed`, `haveSAR`) VALUES
('111', '123', 123, 111111, '123', 123, 123, '2015-11-03 16:00:00', NULL, '0', '0'),
('12145', '1212', 1212, 111111, '2112', 121212, 123, '2015-11-03 23:16:26', NULL, '0', '0'),
('123', '123', 123, 111111, '123', 123, 123, '2015-11-09 21:15:43', NULL, '0', '1'),
('2131', '123', 123, 111111, 'ccc', 22, 23, '2015-11-04 22:06:25', NULL, '0', '1');

-- --------------------------------------------------------

--
-- 表的结构 `positions`
--

CREATE TABLE IF NOT EXISTS `positions` (
  `positionId` int(3) NOT NULL,
  `haveProduct` binary(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`positionId`),
  UNIQUE KEY `positionId` (`positionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `postor`
--

CREATE TABLE IF NOT EXISTS `postor` (
  `postorId` int(8) NOT NULL,
  `name` char(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`postorId`),
  UNIQUE KEY `postorId` (`postorId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 表的结构 `usr`
--

CREATE TABLE IF NOT EXISTS `usr` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` char(15) COLLATE utf8_bin NOT NULL,
  `phoneNumber` bigint(11) NOT NULL,
  `psw` char(11) COLLATE utf8_bin NOT NULL,
  `lastLogin` timestamp NULL DEFAULT NULL,
  `lastIp` char(16) COLLATE utf8_bin NOT NULL,
  `token` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `expireTime` int(11) NOT NULL DEFAULT '3600',
  `grantTime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`phoneNumber`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1111112 ;

--
-- 转存表中的数据 `usr`
--

INSERT INTO `usr` (`id`, `name`, `phoneNumber`, `psw`, `lastLogin`, `lastIp`, `token`, `expireTime`, `grantTime`) VALUES
(1111111, 'icepro', 0, '123456', '2015-11-20 06:24:19', '127.0.0.1', 'Xy9XMwQ6VDFQIQQ6BzZQdldvBG0FOgciAGNQN1E2BDFXOlFlUzBUZ1VjAHVXPwRuW25VYA==', 3600, '2015-11-20 06:24:19');
--
-- 数据库: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
