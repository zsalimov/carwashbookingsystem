-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 18 May 2023, 00:12:33
-- Sunucu sürümü: 10.3.38-MariaDB-0+deb10u1
-- PHP Sürümü: 7.3.31-1~deb10u3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `carwashbookingsystem`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defCompany`
--

CREATE TABLE `defCompany` (
  `cId` int(11) NOT NULL,
  `cName` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defCompany`
--

INSERT INTO `defCompany` (`cId`, `cName`) VALUES
(1, 'Shell'),
(3, 'ESSO'),
(5, 'Petrol Office'),
(43, 'Shell'),
(44, 'Shell Bristol'),
(45, 'Esso Carwash'),
(46, 'Elf');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defOpenCloseDurations`
--

CREATE TABLE `defOpenCloseDurations` (
  `ocdId` int(11) NOT NULL,
  `ocdName` varchar(64) NOT NULL,
  `ocdStartTime` varchar(8) NOT NULL,
  `ocdEndTime` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defOpenCloseDurations`
--

INSERT INTO `defOpenCloseDurations` (`ocdId`, `ocdName`, `ocdStartTime`, `ocdEndTime`) VALUES
(1, 'Standard', '08:00', '17:00'),
(2, 'Non stop', '00:00', '24:00'),
(3, '12 hours', '08:00', '20:00'),
(4, 'Sunday Shift', '08:00', '14:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defOpenClosePattern`
--

CREATE TABLE `defOpenClosePattern` (
  `ocpId` int(11) NOT NULL,
  `ocpName` varchar(32) NOT NULL,
  `ocpDay1` int(11) NOT NULL,
  `ocpDay2` int(11) NOT NULL,
  `ocpDay3` int(11) NOT NULL,
  `ocpDay4` int(11) NOT NULL,
  `ocpDay5` int(11) NOT NULL,
  `ocpDay6` int(11) NOT NULL,
  `ocpDay7` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defOpenClosePattern`
--

INSERT INTO `defOpenClosePattern` (`ocpId`, `ocpName`, `ocpDay1`, `ocpDay2`, `ocpDay3`, `ocpDay4`, `ocpDay5`, `ocpDay6`, `ocpDay7`) VALUES
(1, 'Non Stop', 2, 2, 2, 2, 2, 2, 2),
(2, 'Standard', 1, 1, 1, 1, 1, 1, 4),
(3, 'Six day 12 hours Sunday 1600', 3, 3, 3, 3, 3, 3, 4);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defPostProcess`
--

CREATE TABLE `defPostProcess` (
  `ppId` int(11) NOT NULL,
  `ppName` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defPostProcess`
--

INSERT INTO `defPostProcess` (`ppId`, `ppName`) VALUES
(1, 'Vacuum interior'),
(2, 'Polishing'),
(3, 'Interior Cleaning'),
(4, 'Headlights restoration'),
(5, 'Wipercleaner water fulfillment'),
(6, 'Wipe down dashboard'),
(7, 'Cleaning and treatment of leather');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defReservation`
--

CREATE TABLE `defReservation` (
  `rId` int(11) NOT NULL,
  `rVehicleId` int(11) NOT NULL,
  `rWasherId` int(11) NOT NULL,
  `rStartTime` datetime NOT NULL,
  `rEndTime` datetime NOT NULL,
  `rPrice` float NOT NULL,
  `rCancelled` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defReservation`
--

INSERT INTO `defReservation` (`rId`, `rVehicleId`, `rWasherId`, `rStartTime`, `rEndTime`, `rPrice`, `rCancelled`) VALUES
(1, 10, 8, '2023-03-07 12:33:07', '2023-03-07 13:33:07', 32.25, 0),
(2, 9, 8, '2023-03-07 08:59:10', '2023-03-07 08:59:14', 5.99, 0),
(3, 9, 8, '2023-03-07 08:59:10', '2023-03-07 08:59:14', 5.99, 0),
(4, 10, 8, '2023-03-08 09:51:04', '2023-03-08 09:51:04', 32.25, 1),
(5, 10, 8, '2023-03-08 09:53:10', '2023-03-08 10:53:10', 0, 0),
(6, 10, 8, '2023-03-08 11:20:50', '2023-03-08 11:30:00', 32.25, 0),
(7, 10, 9, '2023-03-09 23:57:33', '2023-03-09 23:58:33', 5.99, 0),
(8, 11, 9, '2023-03-09 06:10:00', '2023-03-09 06:15:00', 4.99, 1),
(9, 11, 9, '2023-03-09 12:40:00', '2023-03-09 12:45:00', 2.495, 1),
(10, 12, 9, '2023-03-09 13:00:00', '2023-03-09 13:20:00', 19.99, 1),
(11, 12, 9, '2023-03-09 06:15:00', '2023-03-09 06:20:00', 4.99, 1),
(12, 11, 9, '2023-03-09 04:00:00', '2023-03-09 04:03:00', 6.99, 0),
(13, 11, 9, '2023-03-09 04:03:00', '2023-03-09 04:06:00', 6.99, 0),
(14, 11, 9, '2023-03-09 04:15:00', '2023-03-09 04:20:00', 4.99, 0),
(15, 11, 9, '2023-03-09 12:21:00', '2023-03-09 12:24:00', 3.495, 1),
(16, 11, 9, '2023-03-09 10:15:00', '2023-03-09 10:18:00', 6.99, 1),
(17, 11, 9, '2023-03-09 13:15:00', '2023-03-09 13:20:00', 4.99, 1),
(18, 11, 9, '2023-03-09 10:20:00', '2023-03-09 10:30:00', 6.99, 0),
(19, 11, 9, '2023-03-09 12:20:00', '2023-03-09 12:30:00', 3.495, 0),
(20, 11, 9, '2023-03-09 13:20:00', '2023-03-09 13:25:00', 4.99, 0),
(21, 11, 9, '2023-03-09 13:33:00', '2023-03-09 13:36:00', 6.99, 0),
(22, 11, 9, '2023-03-09 16:24:00', '2023-03-09 16:27:00', 6.99, 0),
(23, 11, 9, '2023-03-10 09:27:00', '2023-03-10 09:30:00', 6.99, 1),
(24, 11, 9, '2023-03-10 03:21:00', '2023-03-10 03:24:00', 6.99, 0),
(25, 11, 9, '2023-03-10 05:21:00', '2023-03-10 05:24:00', 6.99, 1),
(26, 11, 9, '2023-03-09 17:27:00', '2023-03-09 17:30:00', 6.99, 0),
(27, 11, 9, '2023-03-09 17:40:00', '2023-03-09 17:50:00', 6.99, 0),
(28, 12, 9, '2023-03-09 17:50:00', '2023-03-09 17:55:00', 4.99, 0),
(29, 11, 9, '2023-03-09 19:30:00', '2023-03-09 19:40:00', 6.99, 1),
(30, 11, 9, '2023-03-09 21:33:00', '2023-03-09 21:36:00', 6.99, 0),
(31, 11, 9, '2023-03-09 21:40:00', '2023-03-09 21:50:00', 6.99, 1),
(32, 11, 9, '2023-03-10 03:30:00', '2023-03-10 03:40:00', 9.99, 0),
(33, 11, 8, '2023-03-14 10:20:00', '2023-03-14 10:30:00', 6.99, 0),
(34, 11, 8, '2023-03-15 13:40:00', '2023-03-15 13:50:00', 6.99, 0),
(35, 11, 8, '2023-03-15 13:50:00', '2023-03-15 14:00:00', 6.99, 0),
(36, 11, 8, '2023-03-16 12:30:00', '2023-03-16 12:40:00', 6.99, 0),
(37, 11, 8, '2023-03-16 12:20:00', '2023-03-16 12:30:00', 6.99, 1),
(38, 11, 8, '2023-03-15 17:40:00', '2023-03-15 17:50:00', 2.097, 0),
(39, 11, 9, '2023-03-15 17:21:00', '2023-03-15 17:24:00', 6.99, 1),
(40, 12, 9, '2023-03-15 17:25:00', '2023-03-15 17:30:00', 4.99, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defServiceType`
--

CREATE TABLE `defServiceType` (
  `stId` int(11) NOT NULL,
  `stName` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defServiceType`
--

INSERT INTO `defServiceType` (`stId`, `stName`) VALUES
(1, 'Self-Service'),
(2, 'Valeting '),
(3, 'Home');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defStore`
--

CREATE TABLE `defStore` (
  `sId` int(11) NOT NULL,
  `sCompanyId` int(11) NOT NULL,
  `sName` varchar(120) NOT NULL,
  `sLatitude` float NOT NULL DEFAULT 51.5,
  `sLongitude` float NOT NULL DEFAULT -0.11
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defStore`
--

INSERT INTO `defStore` (`sId`, `sCompanyId`, `sName`, `sLatitude`, `sLongitude`) VALUES
(1, 1, 'Shell', 55.5, -0.11),
(4, 1, 'Shell Yeovil', 52.5, 1.3),
(9, 1, 'London', 55.5, -2.6),
(28, 3, 'CarWashJet', 51.4538, -2.60582),
(29, 3, 'KingsWood CarWash', 51.4617, -2.50866),
(30, 3, 'Bath CarWash', 51.38, -2.358),
(32, 3, 'Street Wash', 51.1233, -2.74246),
(33, 3, 'new1', 51.1521, -2.80154),
(34, 3, 'new2', 51.1164, -2.70542),
(40, 3, 'dasdasda', 52.4946, -2.15371),
(41, 3, 'Zeki\'s Store', 51.3279, -2.29349);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defStoreFeedback`
--

CREATE TABLE `defStoreFeedback` (
  `sfUserId` int(11) NOT NULL,
  `sfStoreId` int(11) NOT NULL,
  `sfContent` text NOT NULL,
  `sfStars` int(11) NOT NULL,
  `sfTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `sfIp` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defStoreResponsibility`
--

CREATE TABLE `defStoreResponsibility` (
  `srId` int(11) NOT NULL,
  `srName` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defUser`
--

CREATE TABLE `defUser` (
  `uId` int(11) NOT NULL,
  `uUserTypeId` int(11) NOT NULL,
  `uName` varchar(80) NOT NULL,
  `uAddress` varchar(120) NOT NULL,
  `uPhone` varchar(30) NOT NULL,
  `uEmail` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defUser`
--

INSERT INTO `defUser` (`uId`, `uUserTypeId`, `uName`, `uAddress`, `uPhone`, `uEmail`) VALUES
(1, 2, 'John Doe', '43 Bath Road,\r\nBristol,\r\nBS4 5JQ', '07568 2563', 'johndoe@gmail.com'),
(2, 1, 'Zeki Ak', '43 MendipView Road,\r\nStreet,\r\nSomerset\r\nBA16 9FJ', '07565 244449', 'zak@gmail.com'),
(3, 4, 'Billy Jones', '1A Mead Street,\r\nBristol,\r\nBS4 5DE', '07565 244456', 'bjones@sky.com'),
(4, 2, 'Jonny Freeman', '100 High street,\r\nBirmingham,\r\nBR56DF', '07565 241000', 'jfreeman@bt.co.uk'),
(5, 4, 'Maxwell Deen', '34 Priory street,\r\nBristol,\r\nBS56TA', '07565 242565', 'maxdeen@yahoo.co.uk'),
(6, 4, 'Tom Akansel', '34 Bridgewater street,\r\nBath,\r\nBA56TR', '07458 256925', 'takansel@sky.co.uk'),
(7, 3, 'Benjamin White', '25 Windmillhill street,\r\nBath,\r\nBA65RT', '07565 245896', 'bwhite@bt.uk.co'),
(8, 3, 'Daniel Davidson', '34 Church road,\r\nTaunton,\r\nTA12GD', '07458 254582', 'danson@gmail.co.uk'),
(9, 3, 'Jake Dark', '34 Mill street,\r\nYeovil,\r\nBA22FD', '07565 241586', 'jakedark@live.com');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defUserType`
--

CREATE TABLE `defUserType` (
  `utId` int(11) NOT NULL,
  `utName` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defUserType`
--

INSERT INTO `defUserType` (`utId`, `utName`) VALUES
(0, 'Customer'),
(1, 'SiteAdmin'),
(2, 'CompanyAdmin'),
(3, 'StoreAdmin');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defVehicle`
--

CREATE TABLE `defVehicle` (
  `vId` int(11) NOT NULL,
  `vPlateNumber` varchar(64) NOT NULL,
  `vVehicleTypeId` int(11) NOT NULL,
  `vUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defVehicle`
--

INSERT INTO `defVehicle` (`vId`, `vPlateNumber`, `vVehicleTypeId`, `vUserId`) VALUES
(1, 'WK65 GHJ', 1, 3),
(2, 'TR67 KLM', 1, 3),
(3, 'TA69 TYP', 1, 5),
(11, 'KP65 WLN', 1, 63),
(12, 'PK65 WLN', 4, 63);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defVehicleType`
--

CREATE TABLE `defVehicleType` (
  `vtId` int(11) NOT NULL,
  `vtName` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defVehicleType`
--

INSERT INTO `defVehicleType` (`vtId`, `vtName`) VALUES
(1, 'Car'),
(2, 'Motorcycle'),
(3, 'Boat'),
(4, 'Truck'),
(5, 'Bus'),
(6, 'Minivan');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defWasher`
--

CREATE TABLE `defWasher` (
  `wId` int(11) NOT NULL,
  `wStoreId` int(11) NOT NULL,
  `wName` varchar(120) NOT NULL,
  `wOpenClosePatternId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defWasher`
--

INSERT INTO `defWasher` (`wId`, `wStoreId`, `wName`, `wOpenClosePatternId`) VALUES
(1, 1, 'Shell Bristol self/jet washer', 2),
(2, 1, 'Shell Bristol', 2),
(3, 4, 'BP Bristol hand wash', 3),
(4, 9, 'London3', 2),
(7, 9, 'Yeovil', 2),
(8, 32, 'Street Sevals', 2),
(9, 32, 'Walltown', 1),
(10, 28, 'South', 3),
(11, 28, 'North', 2),
(12, 31, 'Washer 1', 2),
(13, 31, 'Washer2', 3),
(14, 31, 'Washer3', 1),
(15, 40, 'My', 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `defWasherType`
--

CREATE TABLE `defWasherType` (
  `wtId` int(11) NOT NULL,
  `wtDescription` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `defWasherType`
--

INSERT INTO `defWasherType` (`wtId`, `wtDescription`) VALUES
(1, 'Hand Washes'),
(2, 'Unmanned Automatic'),
(3, 'Tunnel/Conveyor Washes'),
(4, 'Self-Serve Jet Washes'),
(5, 'Franchised/Network Hand Washes');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(5, '2014_10_12_000000_create_users_table', 1),
(6, '2014_10_12_100000_create_password_resets_table', 1),
(7, '2019_08_19_000000_create_failed_jobs_table', 1),
(8, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(9, '2023_01_20_120557_create_defcompanies_table', 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'main', 'a2aa989a7f0a78a8ea5653164bdf26cd3ffa3effc31e1ce2285874c059c266bb', '[\"*\"]', NULL, NULL, '2023-01-18 23:31:53', '2023-01-18 23:31:53'),
(3, 'App\\Models\\User', 2, 'main', '233466fd5808c93add04c6176bf9b635e336e36285754b61764e1c47cc7bac72', '[\"*\"]', NULL, NULL, '2023-01-19 00:06:14', '2023-01-19 00:06:14'),
(11, 'App\\Models\\User', 1, 'main', '250d19ac696fbf91687ee0e19236b412f6d40bb362d5a68a5957c4cb14036f6f', '[\"*\"]', '2023-01-19 14:26:02', NULL, '2023-01-19 14:25:56', '2023-01-19 14:26:02'),
(28, 'App\\Models\\User', 1, 'main', 'd2fbd7f87e4b1e9938104aa3f4dfd892a2d272da357b2c35ade4c1c67d4abb56', '[\"*\"]', NULL, NULL, '2023-01-21 23:19:00', '2023-01-21 23:19:00'),
(29, 'App\\Models\\User', 1, 'main', '30fd51ffdf6a222fc9c80c84f9125aaf7a9279bb64e97357e3da0bc27db1c848', '[\"*\"]', NULL, NULL, '2023-01-21 23:19:33', '2023-01-21 23:19:33'),
(30, 'App\\Models\\User', 1, 'main', '651d06ab7f4161c1054f240fd0b9747751028ccf7ac0fb249d41a6243dddd13b', '[\"*\"]', NULL, NULL, '2023-01-21 23:19:36', '2023-01-21 23:19:36'),
(31, 'App\\Models\\User', 1, 'main', 'f16db258226c92f4df647801190ecd2079a101f7b26e67ac1197196c98c0fb67', '[\"*\"]', NULL, NULL, '2023-01-21 23:21:37', '2023-01-21 23:21:37'),
(76, 'App\\Models\\User', 1, 'main', '776ba47fc16735e85d062ab30c51c06061da97bb688a3e3e0d3515de65b3d23b', '[\"*\"]', NULL, NULL, '2023-01-23 11:47:16', '2023-01-23 11:47:16'),
(77, 'App\\Models\\User', 1, 'main', '8c004096aa130e79fe2d590c01132776bf5ae89e104002be4759f78ab13b9b7c', '[\"*\"]', NULL, NULL, '2023-01-23 11:47:51', '2023-01-23 11:47:51'),
(78, 'App\\Models\\User', 1, 'main', '03adacf559cac0f4b2f6fc905fea196c610cae8771c4b7927648fea43188f744', '[\"*\"]', NULL, NULL, '2023-01-23 11:48:03', '2023-01-23 11:48:03'),
(79, 'App\\Models\\User', 1, 'main', '72a482a5005d649501b01f267b30c6735a8c3a9c6bdbff0f8fa0a4073e713763', '[\"*\"]', NULL, NULL, '2023-01-23 11:49:11', '2023-01-23 11:49:11'),
(80, 'App\\Models\\User', 1, 'main', 'fc3e3fe08cdfbe9c0035956f566a1c17dd87cc00f2b3d60c6bfd451855c7d67f', '[\"*\"]', NULL, NULL, '2023-01-23 11:49:23', '2023-01-23 11:49:23'),
(81, 'App\\Models\\User', 1, 'main', '8041928022eab8a5d43383bb4efa04e66650e24bfa942798db71839fab2dff36', '[\"*\"]', NULL, NULL, '2023-01-23 11:51:23', '2023-01-23 11:51:23'),
(82, 'App\\Models\\User', 1, 'main', 'da8931c6823270de688e1307574ed94727bc9c5f6d5209a669097ae31da9d92b', '[\"*\"]', NULL, NULL, '2023-01-23 12:07:28', '2023-01-23 12:07:28'),
(83, 'App\\Models\\User', 1, 'main', 'cee9553a48e97df470e53603095d2e9e175a8d3eea2bae96b2a82a7587210e6a', '[\"*\"]', NULL, NULL, '2023-01-23 12:08:53', '2023-01-23 12:08:53'),
(84, 'App\\Models\\User', 1, 'main', '9641568f6f99551a585d04e62d642d277179142cf0cf56b472c8374bbd48fd7b', '[\"*\"]', NULL, NULL, '2023-01-23 12:09:10', '2023-01-23 12:09:10'),
(85, 'App\\Models\\User', 1, 'main', 'e8000ef38bd5245e6b7766579ddcc1a8514e386b3b865a4922a89233b9b5c825', '[\"*\"]', NULL, NULL, '2023-01-23 12:09:16', '2023-01-23 12:09:16'),
(86, 'App\\Models\\User', 1, 'main', '4fcaaa2d28cc76021f028491c834eb5019d92303703b59854c1df64f454b4aed', '[\"*\"]', NULL, NULL, '2023-01-23 12:09:17', '2023-01-23 12:09:17'),
(87, 'App\\Models\\User', 1, 'main', '6ec5213bf77a1bdcfea53388484a42f02025b3d1bdb736bc82ad79ee0fb289dd', '[\"*\"]', NULL, NULL, '2023-01-23 12:09:19', '2023-01-23 12:09:19'),
(122, 'App\\Models\\User', 1, 'main', '2536ab701fabd2d19fd51bf22cc46d39c59b48195a752fff5e11c83625dc7c89', '[\"*\"]', NULL, NULL, '2023-01-23 18:20:43', '2023-01-23 18:20:43'),
(123, 'App\\Models\\User', 1, 'main', '15d4dfb7935d5591e00e49fdfac6552b7ee8d97fb9135ebd5664b253640b3208', '[\"*\"]', NULL, NULL, '2023-01-23 18:20:45', '2023-01-23 18:20:45'),
(124, 'App\\Models\\User', 1, 'main', '4681ad839890ee645c0304c169d499c2632c5eb3ad09184de4a1061e476603da', '[\"*\"]', NULL, NULL, '2023-01-23 18:20:48', '2023-01-23 18:20:48'),
(125, 'App\\Models\\User', 1, 'main', '69fb8a07aa68a5dfd8e458a6dd576186fb6db1773e07a656f798a4238c754eb4', '[\"*\"]', NULL, NULL, '2023-01-23 18:20:51', '2023-01-23 18:20:51'),
(126, 'App\\Models\\User', 1, 'main', '92c298c2a250bd5fd0ffbd43cbb58cebb08e7512cd3597272ea53a72021304ff', '[\"*\"]', NULL, NULL, '2023-01-23 18:22:25', '2023-01-23 18:22:25'),
(127, 'App\\Models\\User', 1, 'main', '9f5c4ec19540e391b588b497a2bf4c74241548aa38b759adaf99033f8abf2823', '[\"*\"]', NULL, NULL, '2023-01-23 18:22:32', '2023-01-23 18:22:32'),
(128, 'App\\Models\\User', 1, 'main', 'd7017e7080cdb2182c4abbe833dcee4f4c8ffb3f80cbb56275a33102d3b7480b', '[\"*\"]', NULL, NULL, '2023-01-23 18:22:57', '2023-01-23 18:22:57'),
(129, 'App\\Models\\User', 1, 'main', '050db21b892fc68192133b7e362f228f7e0d02a5689d139ed377b28d41e58fab', '[\"*\"]', NULL, NULL, '2023-01-23 18:24:09', '2023-01-23 18:24:09'),
(130, 'App\\Models\\User', 1, 'main', '5b9c0ce7af23653d4caf25fb7f24f539541c0129f56e6c0ad45bc44124d4ff67', '[\"*\"]', NULL, NULL, '2023-01-23 18:24:13', '2023-01-23 18:24:13'),
(131, 'App\\Models\\User', 1, 'main', '984e40a104e637c9c62c7cc713ebb820c222a9734feec193f295ff49f71fcec1', '[\"*\"]', NULL, NULL, '2023-01-23 18:24:16', '2023-01-23 18:24:16'),
(132, 'App\\Models\\User', 1, 'main', 'da85e76972789b1715d2b81313b580b31f421457b8b060fe118ab7516eb71b89', '[\"*\"]', NULL, NULL, '2023-01-23 18:24:45', '2023-01-23 18:24:45'),
(133, 'App\\Models\\User', 1, 'main', '33f0cb980968f46665dae9adab8edb1d35e2f1d9fba2dfa2608576d68101b149', '[\"*\"]', NULL, NULL, '2023-01-23 18:24:51', '2023-01-23 18:24:51'),
(135, 'App\\Models\\User', 1, 'main', 'bf4216af538292e8c12ff3313f8ab308d75e2d685921b948ec218308173f4e05', '[\"*\"]', NULL, NULL, '2023-01-23 18:38:20', '2023-01-23 18:38:20'),
(136, 'App\\Models\\User', 1, 'main', '0b8488d4063caf49196e2840b1dae336cd54fa072bea37167ebb4593128011f9', '[\"*\"]', NULL, NULL, '2023-01-23 18:38:24', '2023-01-23 18:38:24'),
(137, 'App\\Models\\User', 1, 'main', 'cc96a43b07a62b11de7f609f0c89a7967b5ca63e777718bb8e1c30e2c986977f', '[\"*\"]', NULL, NULL, '2023-01-23 18:38:26', '2023-01-23 18:38:26'),
(138, 'App\\Models\\User', 1, 'main', '23e41155370fb003bfeb8c672555d02552a014e84d0d12f8f67edec25f531fa1', '[\"*\"]', NULL, NULL, '2023-01-23 18:38:27', '2023-01-23 18:38:27'),
(140, 'App\\Models\\User', 1, 'main', '26d8d0b4beb774e0a4356b58c686aaa11e6f5869f22e0467268e8e13fddc90a4', '[\"*\"]', NULL, NULL, '2023-01-23 18:40:53', '2023-01-23 18:40:53'),
(141, 'App\\Models\\User', 1, 'main', 'ad6faa84a82dcf8fac5cb107abd2e45e8084d0b1fb863e168626be8cf4e97e8a', '[\"*\"]', NULL, NULL, '2023-01-23 18:40:58', '2023-01-23 18:40:58'),
(158, 'App\\Models\\User', 2, 'main', '6206269496211d3bdc08a9fe4ec0efc12a835cc1aa23123d70d1a9c697e905a5', '[\"*\"]', NULL, NULL, '2023-01-23 19:08:49', '2023-01-23 19:08:49'),
(159, 'App\\Models\\User', 2, 'main', 'a6c2e4a9254bae354670089a516f87b6fcf50595040afe4d6c8cfc8ac0f6301a', '[\"*\"]', NULL, NULL, '2023-01-23 19:08:55', '2023-01-23 19:08:55'),
(160, 'App\\Models\\User', 2, 'main', '3513134c32431e68e555e2111da2a26e3a885e02ed003ecee96ae894657e489e', '[\"*\"]', NULL, NULL, '2023-01-23 19:09:21', '2023-01-23 19:09:21'),
(161, 'App\\Models\\User', 2, 'main', 'c753b552bf7423e26d31983602c7cf234b062841edd2ddab603a4972ab173a4f', '[\"*\"]', NULL, NULL, '2023-01-23 19:09:38', '2023-01-23 19:09:38'),
(162, 'App\\Models\\User', 2, 'main', '6a302ea7386c36c7415f0be36ca37dfbeb9d614cd5b3b448a78f940df7b4bd42', '[\"*\"]', NULL, NULL, '2023-01-23 19:11:35', '2023-01-23 19:11:35'),
(163, 'App\\Models\\User', 2, 'main', '2b39359041c0eef72b7e3eb34275eafd7c47e8c20967f5b70d42f6b0749d2256', '[\"*\"]', NULL, NULL, '2023-01-23 19:13:24', '2023-01-23 19:13:24'),
(172, 'App\\Models\\User', 60, 'main', '1cefde3e06375b5c0c8d17dd47dde50d78492adfb092733514804e77d169a8a7', '[\"*\"]', NULL, NULL, '2023-01-23 19:38:37', '2023-01-23 19:38:37'),
(173, 'App\\Models\\User', 61, 'main', 'b47da136ed65756c667ac73995385b3cbf7a66bb6b9daf465a326d86b85c82e6', '[\"*\"]', NULL, NULL, '2023-01-23 19:39:19', '2023-01-23 19:39:19'),
(222, 'App\\Models\\User', 62, 'main', '52c75b8cb68e1d257a211a72f124cd06f7e8065f402d743b575fe3f6da510495', '[\"*\"]', NULL, NULL, '2023-01-24 15:50:36', '2023-01-24 15:50:36'),
(261, 'App\\Models\\User', 60, 'main', '9b57df5db75229bc65c94e2999e92dd553c2f81ce32f15f006967836281f5a2e', '[\"*\"]', '2023-01-26 09:41:09', NULL, '2023-01-26 09:41:07', '2023-01-26 09:41:09'),
(286, 'App\\Models\\User', 1, 'main', '4dab28cb69aa16a6dadaa66e4f4c8d5cfd14a4dacfdf9b47d1a5e7685bab703c', '[\"*\"]', NULL, NULL, '2023-01-27 17:01:46', '2023-01-27 17:01:46'),
(287, 'App\\Models\\User', 1, 'main', 'b35897f4eab2dc78ee820c8000c87e1dd41cd9cfc3506f8a19cc9e02594b115d', '[\"*\"]', NULL, NULL, '2023-01-27 17:02:02', '2023-01-27 17:02:02'),
(288, 'App\\Models\\User', 1, 'main', 'd00154e1504881585229f57d50b6964f53625c7298608e1a1498c5e1b5848278', '[\"*\"]', NULL, NULL, '2023-01-27 17:02:26', '2023-01-27 17:02:26'),
(292, 'App\\Models\\User', 1, 'main', '6b22003b455932d8aff066b8a18592356f988c606278cb9593d25df49d0f9933', '[\"*\"]', NULL, NULL, '2023-01-27 17:08:44', '2023-01-27 17:08:44'),
(293, 'App\\Models\\User', 1, 'main', 'ad0fe54688aa9d62cbebd764311d7c2d80620e9cd8494abc2e4b4f619cb029b3', '[\"*\"]', NULL, NULL, '2023-01-27 17:08:51', '2023-01-27 17:08:51'),
(297, 'App\\Models\\User', 1, 'main', 'f2330672c7a9c98e54f472d78e00ea5b907fe32abb4f5774270bac68e20c74b8', '[\"*\"]', NULL, NULL, '2023-01-27 17:14:39', '2023-01-27 17:14:39'),
(308, 'App\\Models\\User', 1, 'main', '22ab6dbb829356339130e4b10c6725e289545d66165eb2d8d38b5ca2833b9477', '[\"*\"]', NULL, NULL, '2023-01-27 18:32:53', '2023-01-27 18:32:53'),
(318, 'App\\Models\\User', 63, 'main', '10f21b29d8502bf53f8b7e4627225fe118c2d78104cbf6eaba428409a0c1ad0e', '[\"*\"]', NULL, NULL, '2023-01-27 18:59:04', '2023-01-27 18:59:04'),
(368, 'App\\Models\\User', 60, 'main', 'da7ca9176d9e93caf2e2d3f84f84454b0e00beadb2266adc348324184096bff9', '[\"*\"]', '2023-01-30 15:54:34', NULL, '2023-01-30 15:54:32', '2023-01-30 15:54:34'),
(384, 'App\\Models\\User', 1, 'main', '703a1fc6516587a7941dd29428f45462dca3a568c84e817223fabffbc8560782', '[\"*\"]', NULL, NULL, '2023-01-31 23:27:45', '2023-01-31 23:27:45'),
(393, 'App\\Models\\User', 64, 'main', '1ad32253acce388bcc74eafc8506e9038240513fb9df27cff8e989f42143071b', '[\"*\"]', NULL, NULL, '2023-02-01 10:09:07', '2023-02-01 10:09:07'),
(409, 'App\\Models\\User', 1, 'main', '8f5bb99b4c8ae70873228df7fbfdd16f4eddded899778cb46e9d45c5aca13391', '[\"*\"]', NULL, NULL, '2023-02-01 15:28:11', '2023-02-01 15:28:11'),
(410, 'App\\Models\\User', 1, 'main', '32e39f9d55ade9afb3bc80943c6ab9e8af0e54e0984231d2a49b8fce97dee924', '[\"*\"]', NULL, NULL, '2023-02-01 15:28:17', '2023-02-01 15:28:17'),
(411, 'App\\Models\\User', 1, 'main', 'bb142cc75b0931d1a31faa3a47dd921c449e52868d47d83bbf67b640cdff4261', '[\"*\"]', NULL, NULL, '2023-02-01 15:28:19', '2023-02-01 15:28:19'),
(412, 'App\\Models\\User', 1, 'main', '8f5aa47babfdcc05cac464e39f94b90f1ffdd69192cce701104dac214b0efe23', '[\"*\"]', NULL, NULL, '2023-02-01 15:28:32', '2023-02-01 15:28:32'),
(413, 'App\\Models\\User', 1, 'main', '64d5f97c29e1f974a7665376a2ef4cd27239e1986619e30deb947a263b6a6c98', '[\"*\"]', NULL, NULL, '2023-02-01 15:28:38', '2023-02-01 15:28:38'),
(423, 'App\\Models\\User', 1, 'main', '613a89e2de292bfe71d2279260061c9438159afae6ce52fd5dd0df30dc44ffe7', '[\"*\"]', NULL, NULL, '2023-02-01 16:24:11', '2023-02-01 16:24:11'),
(424, 'App\\Models\\User', 1, 'main', 'e4dbb5020ecc7fff61b791dce9976d6a6fad2487f30168f1443d8d888ac04547', '[\"*\"]', NULL, NULL, '2023-02-01 16:24:15', '2023-02-01 16:24:15'),
(425, 'App\\Models\\User', 1, 'main', 'd9d4202debd70fe96e940b972b75c66f56d019ca1892c8bb0ac084d29e554072', '[\"*\"]', NULL, NULL, '2023-02-01 16:24:19', '2023-02-01 16:24:19'),
(426, 'App\\Models\\User', 1, 'main', 'ccd09f38a111db5c0725373d07ae066df6c3d54020892c8aacc33c31a7674d90', '[\"*\"]', NULL, NULL, '2023-02-01 16:24:20', '2023-02-01 16:24:20'),
(427, 'App\\Models\\User', 1, 'main', '26a58386a9c1afee20caa837a690b5536f1ed61c2ff5415781ecc9a800fcab6d', '[\"*\"]', NULL, NULL, '2023-02-01 16:24:20', '2023-02-01 16:24:20'),
(428, 'App\\Models\\User', 1, 'main', '189412700caa9b293216d53fa766b0cad9a9ea8b6a03cd95060ee9aacc05b179', '[\"*\"]', NULL, NULL, '2023-02-01 16:24:21', '2023-02-01 16:24:21'),
(475, 'App\\Models\\User', 1, 'main', '0cbbb09c5da29c5b32dcc507dc8ecf031e089893e239802c42dd8a2a1307b6fe', '[\"*\"]', '2023-02-02 13:11:44', NULL, '2023-02-02 13:11:42', '2023-02-02 13:11:44'),
(507, 'App\\Models\\User', 1, 'main', '8fed782b3bd0feb9158199ae539e2ed0941e9ffe5a8691c10c6bacdb3b7e52c3', '[\"*\"]', NULL, NULL, '2023-02-03 11:00:22', '2023-02-03 11:00:22'),
(509, 'App\\Models\\User', 61, 'main', '2b97dd36e67b03d6f12dbe93c0ef28e278ed60c1489ed9302f0728a7e09a1caa', '[\"*\"]', NULL, NULL, '2023-02-03 11:01:38', '2023-02-03 11:01:38'),
(564, 'App\\Models\\User', 1, 'main', '81b5b2e0939f4635ec8279c152d87800caf841366c75d2af8d8781b6c1758eae', '[\"*\"]', '2023-02-05 21:11:04', NULL, '2023-02-05 21:11:03', '2023-02-05 21:11:04'),
(586, 'App\\Models\\User', 1, 'main', 'bcfa52b61f08f15523cae45ac0904ca009b8950a431522231ba09b34ee871689', '[\"*\"]', NULL, NULL, '2023-02-05 23:39:24', '2023-02-05 23:39:24'),
(587, 'App\\Models\\User', 1, 'main', '3242f58c20bd0f1daf10bf77474d76c63970bbf22b67cbeffe004a2bd814549e', '[\"*\"]', NULL, NULL, '2023-02-05 23:39:25', '2023-02-05 23:39:25'),
(603, 'App\\Models\\User', 61, 'main', 'b2155bccdeae4264894a5a03266b4b63b82f17e07d997196bb5f5f5d14b1ef3c', '[\"*\"]', '2023-02-09 23:37:27', NULL, '2023-02-06 18:52:24', '2023-02-09 23:37:27'),
(609, 'App\\Models\\User', 61, 'main', '991c407406372efda5fe00ce65ebf3e0c71ee536553aa001e2507eac0c987afd', '[\"*\"]', '2023-02-07 15:59:53', NULL, '2023-02-07 15:59:51', '2023-02-07 15:59:53'),
(620, 'App\\Models\\User', 1, 'main', 'bd2a7bdce310f3cb84e000ebfa1848d0954b8a69c0efdc6c2e91dd13e149f1f1', '[\"*\"]', '2023-02-07 23:52:27', NULL, '2023-02-07 23:52:26', '2023-02-07 23:52:27'),
(687, 'App\\Models\\User', 64, 'main', '327784be024a577dafa678dbcc3645d377a16cc8731bd69677376d3f57f3a5d9', '[\"*\"]', '2023-02-10 21:20:16', NULL, '2023-02-10 20:21:41', '2023-02-10 21:20:16'),
(704, 'App\\Models\\User', 1, 'main', 'dc9cadea10306b9a9d3badaf830e876497519e5d74cccaf41933e4c7a0b5d0b3', '[\"*\"]', '2023-02-15 12:40:08', NULL, '2023-02-15 12:40:06', '2023-02-15 12:40:08'),
(763, 'App\\Models\\User', 64, 'main', 'fd49a1ca98f8e1d538a747f2ca35b73617a3e01765c1f9f052439798254e8226', '[\"*\"]', '2023-02-23 17:41:33', NULL, '2023-02-23 17:41:30', '2023-02-23 17:41:33'),
(806, 'App\\Models\\User', 64, 'main', 'b1f670969e5f9a931e1322b2effcae97334696bbbd5d8385f52e6aff29514257', '[\"*\"]', '2023-03-04 11:38:28', NULL, '2023-03-04 11:38:26', '2023-03-04 11:38:28'),
(855, 'App\\Models\\User', 1, 'main', '1b2e21e08b4ea33746b36b3218be47d44b473412069410675f785b5c2920f502', '[\"*\"]', '2023-03-14 22:49:46', NULL, '2023-03-14 22:49:41', '2023-03-14 22:49:46'),
(856, 'App\\Models\\User', 1, 'main', '8333fecc79251bba841174025ebc7e785350c21d5772fb9fcaf5a1b55b6d0e6c', '[\"*\"]', NULL, NULL, '2023-03-14 22:49:42', '2023-03-14 22:49:42'),
(858, 'App\\Models\\User', 1, 'main', '915015fd726b6850ab35d5bd9dc04e781b5d8cfb0323d146290f026503432fff', '[\"*\"]', NULL, NULL, '2023-03-14 23:38:44', '2023-03-14 23:38:44'),
(859, 'App\\Models\\User', 1, 'main', 'ca510206bf3be4946afcc840d5ff124e62220af93394cb3e75a9558ac15323b5', '[\"*\"]', NULL, NULL, '2023-03-14 23:38:50', '2023-03-14 23:38:50'),
(860, 'App\\Models\\User', 1, 'main', '701859e450c87569ee301d75b2d91081a4d6a15929843a6548d5cb2057709042', '[\"*\"]', NULL, NULL, '2023-03-14 23:38:53', '2023-03-14 23:38:53'),
(861, 'App\\Models\\User', 1, 'main', '7b7125008e32b6701c9b40b2227dc6c30cc14711c210e2dc86e5fbc061db7616', '[\"*\"]', NULL, NULL, '2023-03-14 23:38:56', '2023-03-14 23:38:56'),
(862, 'App\\Models\\User', 1, 'main', '01ba0781cddcb4483ad12dc0a75399dd5e6be3bde62c3ef71e769d96d08a1e15', '[\"*\"]', NULL, NULL, '2023-03-14 23:38:58', '2023-03-14 23:38:58'),
(863, 'App\\Models\\User', 1, 'main', 'cae3ab5edaa21aa854391f663556966ad71f94ffc9899a74bb20c4272c6f885a', '[\"*\"]', NULL, NULL, '2023-03-14 23:38:59', '2023-03-14 23:38:59'),
(865, 'App\\Models\\User', 66, 'main', '6a40f8ac5b3715b151e912c9af1f9e066d44fb1d499d7ac42ddd0ca3d061ea35', '[\"*\"]', NULL, NULL, '2023-03-15 11:49:03', '2023-03-15 11:49:03'),
(901, 'App\\Models\\User', 1, 'main', '885da4b5d78b1a12700fc4e57c9ee0ddba031b8687e3e0738a7f1b037a563c40', '[\"*\"]', '2023-03-15 17:43:58', NULL, '2023-03-15 17:43:52', '2023-03-15 17:43:58'),
(938, 'App\\Models\\User', 80, 'main', 'bf7c66d9b5885bde689ffa6ad272d99b9d6ee23aa72dbfd18e2540e3c680ba50', '[\"*\"]', NULL, NULL, '2023-03-16 19:54:16', '2023-03-16 19:54:16'),
(940, 'App\\Models\\User', 84, 'main', '53e62912fcffa5656eb0009917626b5d00d372817c7bba96fdaf8783c2e4fadf', '[\"*\"]', NULL, NULL, '2023-03-16 21:39:04', '2023-03-16 21:39:04'),
(945, 'App\\Models\\User', 1, 'main', 'a35655b5084d02d8f728dbcbc3abb6bd4288d3625b179a0683c8b9c119b5bc3e', '[\"*\"]', '2023-03-17 11:19:22', NULL, '2023-03-17 11:19:14', '2023-03-17 11:19:22'),
(947, 'App\\Models\\User', 96, 'main', '5f27357e8d0d8e7d26bf718370dab875ef96df68b2118705f598ac0c62b424fd', '[\"*\"]', NULL, NULL, '2023-03-17 11:59:01', '2023-03-17 11:59:01'),
(955, 'App\\Models\\User', 123, 'main', '83e89c250344259623388af3f9c73a6d5951201830a2ade3b4b0322faaefd135', '[\"*\"]', NULL, NULL, '2023-03-18 22:58:30', '2023-03-18 22:58:30'),
(957, 'App\\Models\\User', 124, 'main', '0ce6414f7dd8d6ab6b1f499f8375ece336a9d7538dd2c0e253b76f88001b004a', '[\"*\"]', NULL, NULL, '2023-03-18 23:10:17', '2023-03-18 23:10:17'),
(962, 'App\\Models\\User', 157, 'main', 'b0c90518d040550ea18d8ed3538a1d011ecb6715701bf35d8a744036054ce3f2', '[\"*\"]', NULL, NULL, '2023-03-20 12:25:54', '2023-03-20 12:25:54'),
(963, 'App\\Models\\User', 164, 'main', '0c82afbc4528999509022c8f5e675749ba7dadb52821656ec3069665889a3788', '[\"*\"]', NULL, NULL, '2023-03-20 12:35:07', '2023-03-20 12:35:07'),
(964, 'App\\Models\\User', 1, 'main', 'eeee85142be6786f213bfccc2dc1ab9f3607659380462dd84e6416901ff05ebd', '[\"*\"]', '2023-03-20 12:48:45', NULL, '2023-03-20 12:48:40', '2023-03-20 12:48:45'),
(966, 'App\\Models\\User', 165, 'main', 'bf120c9d12bc99dd6b84fb243b3d9325eebff92c2e1d8ffce88b3a1ec09ceb28', '[\"*\"]', NULL, NULL, '2023-03-20 16:28:34', '2023-03-20 16:28:34'),
(978, 'App\\Models\\User', 63, 'main', '06a205fd71c10e4530cf0f64ea793cd80f4ee339e69623d40ea34aa7f163e167', '[\"*\"]', '2023-03-23 12:33:16', NULL, '2023-03-23 12:33:14', '2023-03-23 12:33:16'),
(982, 'App\\Models\\User', 1, 'main', 'df979e24c2d23b2b598d031ba5c64a79f531192cffbb6b19e44a1d41814793c4', '[\"*\"]', '2023-03-23 16:31:15', NULL, '2023-03-23 16:26:57', '2023-03-23 16:31:15'),
(983, 'App\\Models\\User', 64, 'main', 'bcd37351ebeb5765b31799da9b46fae00102175df2acf5d0a16f0360b5eee733', '[\"*\"]', '2023-03-24 23:07:22', NULL, '2023-03-24 23:07:17', '2023-03-24 23:07:22'),
(985, 'App\\Models\\User', 167, 'main', '3c3d19e728543b10e0deb5a0740f58049c268095f820f67582999bb84355ea51', '[\"*\"]', NULL, NULL, '2023-05-13 10:46:25', '2023-05-13 10:46:25'),
(987, 'App\\Models\\User', 167, 'main', '8e9b4dace2e692816e32dcfae87a2504f86f466e24e0bba7850d8b373e424b2b', '[\"*\"]', '2023-05-13 19:45:23', NULL, '2023-05-13 16:34:40', '2023-05-13 19:45:23'),
(988, 'App\\Models\\User', 1, 'main', 'cd19f8826efc9e78d828595c126d5aa97b470181f63df1de396c2ea5a25eb930', '[\"*\"]', '2023-05-17 18:45:50', NULL, '2023-05-17 18:45:03', '2023-05-17 18:45:50');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refReservationServiceType`
--

CREATE TABLE `refReservationServiceType` (
  `rstRezervationId` int(11) NOT NULL,
  `rstServiceTypeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refRezervationPostProcess`
--

CREATE TABLE `refRezervationPostProcess` (
  `rppRezervationId` int(11) NOT NULL,
  `rppPostProcessId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refStorePostProcess`
--

CREATE TABLE `refStorePostProcess` (
  `sppStoreId` int(11) NOT NULL,
  `sppPostProcessId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refUserCompany`
--

CREATE TABLE `refUserCompany` (
  `ucUserId` int(11) NOT NULL,
  `ucCompanyId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `refUserCompany`
--

INSERT INTO `refUserCompany` (`ucUserId`, `ucCompanyId`) VALUES
(44, 46),
(47, 1),
(60, 4),
(64, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refUserCounterResponsibility`
--

CREATE TABLE `refUserCounterResponsibility` (
  `ucrUserId` int(11) NOT NULL,
  `ucrCountrResponsibilityId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refUserStore`
--

CREATE TABLE `refUserStore` (
  `usStoreId` int(11) NOT NULL,
  `usUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `refUserStore`
--

INSERT INTO `refUserStore` (`usStoreId`, `usUserId`) VALUES
(28, 61),
(32, 65),
(33, 13),
(34, 3),
(40, 63);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refUserVehicle`
--

CREATE TABLE `refUserVehicle` (
  `uvUserId` int(11) NOT NULL,
  `uvVehicleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refUserWasher`
--

CREATE TABLE `refUserWasher` (
  `uwSiteAdminId` int(11) NOT NULL,
  `uwCompanyAdminId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refWasherPostProcess`
--

CREATE TABLE `refWasherPostProcess` (
  `wppWasherId` int(11) NOT NULL,
  `wppPostProcessId` int(11) NOT NULL,
  `wppPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `refWasherPostProcess`
--

INSERT INTO `refWasherPostProcess` (`wppWasherId`, `wppPostProcessId`, `wppPrice`) VALUES
(4, 4, 6.99),
(1, 1, 4.99),
(1, 5, 14.99),
(9, 2, 4.99),
(9, 1, 14.99),
(11, 1, 6.99),
(15, 2, 9.99);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refWasherPromotion`
--

CREATE TABLE `refWasherPromotion` (
  `wpWasherId` int(11) NOT NULL,
  `wpStartMin` int(11) NOT NULL,
  `wpEndMin` int(11) NOT NULL,
  `wpPromotionRate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `refWasherPromotion`
--

INSERT INTO `refWasherPromotion` (`wpWasherId`, `wpStartMin`, `wpEndMin`, `wpPromotionRate`) VALUES
(1, 720, 980, 10),
(1, 660, 720, 30),
(9, 720, 780, 50),
(9, 1270, 1320, 30),
(11, 720, 960, 30),
(8, 720, 1200, 30);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refWasherServiceType`
--

CREATE TABLE `refWasherServiceType` (
  `wstWasherId` int(11) NOT NULL,
  `wstServiceTypeId` int(11) NOT NULL,
  `wstPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `refWasherServiceType`
--

INSERT INTO `refWasherServiceType` (`wstWasherId`, `wstServiceTypeId`, `wstPrice`) VALUES
(1, 1, 6.99),
(1, 3, 29.99),
(9, 1, 6.99),
(11, 1, 14.99);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refWasherVehicleType`
--

CREATE TABLE `refWasherVehicleType` (
  `wvWasherId` int(11) NOT NULL,
  `wvVehicleTypeId` int(11) NOT NULL,
  `wvDurationMin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `refWasherVehicleType`
--

INSERT INTO `refWasherVehicleType` (`wvWasherId`, `wvVehicleTypeId`, `wvDurationMin`) VALUES
(1, 1, 5),
(1, 2, 2),
(1, 3, 0),
(1, 6, 8),
(2, 1, 0),
(2, 4, 0),
(2, 6, 15),
(3, 4, 15),
(3, 5, 15),
(3, 6, 10),
(4, 1, 0),
(8, 1, 0),
(8, 4, 0),
(9, 1, 0),
(9, 4, 0),
(10, 1, 0),
(11, 2, 0),
(15, 2, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refWasherWasherType`
--

CREATE TABLE `refWasherWasherType` (
  `wwtWasherId` int(11) NOT NULL,
  `wwtWasherTypeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `refWasherWasherType`
--

INSERT INTO `refWasherWasherType` (`wwtWasherId`, `wwtWasherTypeId`) VALUES
(1, 1),
(1, 3),
(1, 5),
(2, 2),
(3, 4),
(3, 2),
(2, 4),
(2, 3),
(2, 5),
(1, 4),
(8, 1),
(8, 2),
(9, 3),
(9, 2),
(9, 1),
(10, 2),
(11, 2),
(15, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `refWasherWasherTypeVehicleType`
--

CREATE TABLE `refWasherWasherTypeVehicleType` (
  `wwtvtWasherId` int(11) NOT NULL,
  `wwtvtVehicleTypeId` int(11) NOT NULL,
  `wwtvtWasherTypeId` int(11) NOT NULL,
  `wwtvtDurationMin` float NOT NULL,
  `wwtvtPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `refWasherWasherTypeVehicleType`
--

INSERT INTO `refWasherWasherTypeVehicleType` (`wwtvtWasherId`, `wwtvtVehicleTypeId`, `wwtvtWasherTypeId`, `wwtvtDurationMin`, `wwtvtPrice`) VALUES
(1, 1, 1, 15, 14.99),
(1, 2, 1, 5, 4.99),
(1, 6, 1, 5, 4.99),
(1, 1, 3, 5, 4.99),
(1, 2, 3, 5, 4.99),
(1, 6, 3, 5, 4.99),
(1, 1, 5, 5, 4.99),
(1, 2, 5, 5, 4.99),
(1, 6, 5, 5, 4.99),
(2, 6, 2, 20, 4.99),
(2, 6, 4, 10, 4.99),
(2, 6, 3, 10, 9.99),
(2, 1, 2, 5, 3.99),
(2, 1, 4, 20, 14.99),
(2, 1, 3, 5, 4.99),
(2, 4, 2, 5, 4.99),
(2, 4, 4, 5, 4.99),
(2, 4, 3, 5, 4.99),
(2, 1, 5, 5, 4.99),
(2, 4, 5, 5, 4.99),
(2, 6, 5, 5, 4.99),
(1, 3, 1, 5, 4.99),
(1, 3, 3, 5, 4.99),
(1, 3, 5, 5, 4.99),
(1, 1, 4, 5, 4.99),
(1, 2, 4, 5, 4.99),
(1, 3, 4, 5, 4.99),
(1, 6, 4, 5, 4.99),
(8, 1, 1, 10, 6.99),
(8, 4, 1, 20, 9.99),
(8, 1, 2, 3, 14.99),
(8, 4, 2, 5, 19.99),
(9, 1, 3, 5, 4.99),
(9, 4, 3, 5, 4.99),
(9, 1, 2, 3, 6.99),
(9, 4, 2, 5, 4.99),
(9, 1, 1, 10, 9.99),
(9, 4, 1, 20, 19.99),
(10, 1, 2, 5, 4.99),
(11, 2, 2, 5, 4.99),
(15, 2, 3, 10, 14.99);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `usertype` tinyint(4) DEFAULT 0,
  `imageUrl` varchar(128) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `usertype`, `imageUrl`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Zeki Akov', 'zekis@gmail.com', NULL, '$2y$10$4iZmvhx.BRC8uPfGa2KdSOxGcxk3RbuddK8darJLpG/KWfZmm/hMC', 3, '../src/assets/img/ZekiAk.jpg', NULL, '2023-01-18 23:31:53', '2023-01-18 23:31:53'),
(2, 'Zeki AK', 'zeki@gmail.com', NULL, '$2y$10$v8J/.6m8Nk8sW99IL6hfXe8o9PDkIbBD53zY0EPofhd96AWbp0Vry', 3, NULL, NULL, '2023-01-19 00:06:14', '2023-01-19 00:06:14'),
(3, 'Marianna Moore', 'ugleichner@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, NULL, 'ByWBebXPTo', '2023-01-19 01:18:01', '2023-02-15 12:40:32'),
(4, 'Dr. Hunter Parker', 'gweber@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'yjdgcXYZQ9', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(5, 'Ole Pagac II', 'jayde.kuphal@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'hzMUn0kt4J', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(6, 'Ludwig Trantow PhD', 'monty.hackett@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'mLmg8cEOqP', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(9, 'Dr. Pascale Zemlak I', 'dietrich.linnie@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'c7neM3HaIH', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(10, 'Dr. Floy Shields', 'jonathan.shields@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'HXwTgRgyff', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(11, 'Nella Brown', 'maximilian.legros@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, '1e3bjpnJ6G', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(12, 'Jessica Cummerata', 'anissa.cummings@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'VeFuu7fgLk', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(13, 'Mrs. Krystal Murphy Jr.', 'cecil35@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, NULL, 'tGKxqcgt6x', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(14, 'Avis Herman', 'collins.kaci@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'qCCPcGDx69', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(15, 'Trey Howe', 'alf93@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'g8YP7UmYEe', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(16, 'Cydney Bahringer', 'coy11@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'da49NxCitU', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(17, 'Mrs. Raquel McLaughlin DDS', 'cordelia.jakubowski@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'SylucjEpnA', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(18, 'Prof. Jairo Murphy III', 'schneider.abbie@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'fUvB313hcE', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(19, 'Robbie Cremin', 'bins.flossie@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'SXQMVswnav', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(20, 'Miss Maryam Shanahan', 'stokes.betty@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'KEayEKTfyZ', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(21, 'Georgianna Wunsch', 'xreynolds@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, '0C1SjIMj2O', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(22, 'Hermann Funk', 'trisha80@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'Qnvr57ZMSU', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(23, 'Angelita Ritchie', 'elton.rohan@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'He6MnDwTm6', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(24, 'Timmy Walker', 'qdickinson@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'mwJLWkWb2A', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(25, 'Enid Lang', 'alyson.balistreri@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'xLwJghtrfL', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(26, 'Mrs. Micaela Swift IV', 'langworth.daphnee@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'wNzPKBEGni', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(27, 'Prof. Delmer Rutherford Jr.', 'earline.goyette@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'BgNxxTJXcU', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(28, 'Mr. Larry Wehner Sr.', 'kattie.rau@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, '1EwBF21qSz', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(29, 'Deborah Spinka', 'zkoepp@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'IyqUlB5PwH', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(30, 'Charity Bruen Jr.', 'ihaley@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'CqMZ17lmz7', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(31, 'Brigitte Schultz', 'rae.aufderhar@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'Lpb4KWxqSx', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(32, 'Tiffany O\'Keefe', 'oschowalter@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'rqR6V2ajIm', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(33, 'Khalid Boyle', 'fkub@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, '3CeXXhisCh', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(34, 'Sigrid Heaney', 'bayer.delia@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'WFNd92KEPf', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(35, 'Dr. Lee Smitham', 'felipe.oconner@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'e0Luld3n50', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(36, 'Anya Bogisich MD', 'krajcik.lucie@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'GQgZKkew67', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(37, 'Mr. Charlie Graham MD', 'lveum@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'NwvucaTQ8j', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(38, 'Eusebio Douglas', 'dannie33@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, '0Plu51em66', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(39, 'Oran Kuhlman', 'robert05@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'FMXY515Ylo', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(40, 'Miss Verlie Shields', 'webster59@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'CyZm1g9Q0g', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(41, 'Dr. Lura Schiller Sr.', 'stefan12@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'D6uJf5cuw4', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(42, 'Ms. Sabrina Rutherford', 'zboncak.sandra@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, '5AGRbhEine', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(43, 'Prof. Chaz McCullough DDS', 'lurline.hill@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'aUTvCTclHw', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(44, 'Spencer Runolfsdottir', 'alexa23@example.org', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, NULL, '7rN3Rhcbbb', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(45, 'Annie Conroy', 'zemlak.deontae@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'zBCfkqEZh6', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(46, 'Dr. Greyson Hand', 'deshawn06@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'zfv53gkNFJ', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(47, 'Prof. Arne Shanahan', 'grady.gladyce@example.net', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, NULL, '3rE3yeTyZT', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(48, 'Miss Gregoria Keebler', 'scollins@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, '7I8po7CWX9', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(49, 'Teresa Bahringer Jr.', 'kohler.corbin@example.com', '2023-01-19 01:18:01', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 0, NULL, 'LccclqygEa', '2023-01-19 01:18:01', '2023-01-19 01:18:01'),
(61, 'Elif Selim', 'elif@gmail.com', NULL, '$2y$10$.m/z4tenQZWdS5reHqLziOuPM0nSJKmhTkhbdk4pddxODmt5/O57a', 1, NULL, NULL, '2023-01-23 19:39:19', '2023-01-23 19:39:19'),
(63, 'Beycan', 'beycan@gmail.com', NULL, '$2y$10$kSdOxAFgRdV3RU8k0yfuauxNatoajqaJylqLy8wC4KzyhhisBBAcm', 1, NULL, NULL, '2023-01-27 18:59:04', '2023-01-27 18:59:04'),
(64, 'Efe Selim', 'efe@gmail.com', NULL, '$2y$10$EpFN7/FoLiWsCheblc7SxeNy7zMZbmRfIdEJYxJlAcNQEiWELFW5S', 2, NULL, NULL, '2023-02-01 10:09:07', '2023-02-01 10:09:07'),
(65, 'Seval Ak', 'seval@gmail.com', NULL, '$2y$10$X28sC2blGsrHhs1SAMi0S.JBXjHRC92j9bKrBub0FpINo5vGlYzsO', 1, NULL, NULL, '2023-02-21 23:42:45', '2023-02-21 23:42:45'),
(66, 'New User', 'newUser@gmail.com', NULL, '$2y$10$jQEpaYwBEKH1RFnpdfv22.5EY4bfRGKYoNykwrj9JedZxRscBOzSq', 0, NULL, NULL, '2023-03-15 11:49:03', '2023-03-15 11:49:03'),
(80, 'ismail', 'ismail@gmail.com', NULL, '$2y$10$Sbe16f6Q.GzszZUahALOOeE6STVkE0a7CRComxPPUjdYK90pKZNHu', 0, NULL, NULL, '2023-03-16 19:54:16', '2023-03-16 19:54:16'),
(167, 'Beycan Kahraman', 'beycankahraman@gmail.com', NULL, '$2y$10$2V..wu21SYdB.Twmp7Rx9eVqW.PJO/J.oH8Xzoco3ujkOYjDNhXja', 0, NULL, NULL, '2023-05-13 10:46:25', '2023-05-13 10:46:25');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `defCompany`
--
ALTER TABLE `defCompany`
  ADD PRIMARY KEY (`cId`);

--
-- Tablo için indeksler `defOpenCloseDurations`
--
ALTER TABLE `defOpenCloseDurations`
  ADD PRIMARY KEY (`ocdId`);

--
-- Tablo için indeksler `defOpenClosePattern`
--
ALTER TABLE `defOpenClosePattern`
  ADD PRIMARY KEY (`ocpId`);

--
-- Tablo için indeksler `defPostProcess`
--
ALTER TABLE `defPostProcess`
  ADD PRIMARY KEY (`ppId`);

--
-- Tablo için indeksler `defReservation`
--
ALTER TABLE `defReservation`
  ADD PRIMARY KEY (`rId`);

--
-- Tablo için indeksler `defServiceType`
--
ALTER TABLE `defServiceType`
  ADD PRIMARY KEY (`stId`);

--
-- Tablo için indeksler `defStore`
--
ALTER TABLE `defStore`
  ADD PRIMARY KEY (`sId`);

--
-- Tablo için indeksler `defStoreResponsibility`
--
ALTER TABLE `defStoreResponsibility`
  ADD PRIMARY KEY (`srId`);

--
-- Tablo için indeksler `defUser`
--
ALTER TABLE `defUser`
  ADD PRIMARY KEY (`uId`);

--
-- Tablo için indeksler `defUserType`
--
ALTER TABLE `defUserType`
  ADD PRIMARY KEY (`utId`);

--
-- Tablo için indeksler `defVehicle`
--
ALTER TABLE `defVehicle`
  ADD PRIMARY KEY (`vId`);

--
-- Tablo için indeksler `defVehicleType`
--
ALTER TABLE `defVehicleType`
  ADD PRIMARY KEY (`vtId`);

--
-- Tablo için indeksler `defWasher`
--
ALTER TABLE `defWasher`
  ADD PRIMARY KEY (`wId`);

--
-- Tablo için indeksler `defWasherType`
--
ALTER TABLE `defWasherType`
  ADD PRIMARY KEY (`wtId`);

--
-- Tablo için indeksler `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Tablo için indeksler `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Tablo için indeksler `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Tablo için indeksler `refUserCompany`
--
ALTER TABLE `refUserCompany`
  ADD PRIMARY KEY (`ucUserId`);

--
-- Tablo için indeksler `refUserStore`
--
ALTER TABLE `refUserStore`
  ADD UNIQUE KEY `usStoreId` (`usStoreId`,`usUserId`);

--
-- Tablo için indeksler `refUserWasher`
--
ALTER TABLE `refUserWasher`
  ADD PRIMARY KEY (`uwSiteAdminId`);

--
-- Tablo için indeksler `refWasherVehicleType`
--
ALTER TABLE `refWasherVehicleType`
  ADD UNIQUE KEY `wvWasherId` (`wvWasherId`,`wvVehicleTypeId`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `defCompany`
--
ALTER TABLE `defCompany`
  MODIFY `cId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Tablo için AUTO_INCREMENT değeri `defOpenCloseDurations`
--
ALTER TABLE `defOpenCloseDurations`
  MODIFY `ocdId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `defOpenClosePattern`
--
ALTER TABLE `defOpenClosePattern`
  MODIFY `ocpId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `defPostProcess`
--
ALTER TABLE `defPostProcess`
  MODIFY `ppId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `defReservation`
--
ALTER TABLE `defReservation`
  MODIFY `rId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Tablo için AUTO_INCREMENT değeri `defServiceType`
--
ALTER TABLE `defServiceType`
  MODIFY `stId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `defStore`
--
ALTER TABLE `defStore`
  MODIFY `sId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Tablo için AUTO_INCREMENT değeri `defStoreResponsibility`
--
ALTER TABLE `defStoreResponsibility`
  MODIFY `srId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `defUser`
--
ALTER TABLE `defUser`
  MODIFY `uId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `defUserType`
--
ALTER TABLE `defUserType`
  MODIFY `utId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `defVehicle`
--
ALTER TABLE `defVehicle`
  MODIFY `vId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tablo için AUTO_INCREMENT değeri `defVehicleType`
--
ALTER TABLE `defVehicleType`
  MODIFY `vtId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `defWasher`
--
ALTER TABLE `defWasher`
  MODIFY `wId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Tablo için AUTO_INCREMENT değeri `defWasherType`
--
ALTER TABLE `defWasherType`
  MODIFY `wtId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=989;

--
-- Tablo için AUTO_INCREMENT değeri `refUserCompany`
--
ALTER TABLE `refUserCompany`
  MODIFY `ucUserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Tablo için AUTO_INCREMENT değeri `refUserWasher`
--
ALTER TABLE `refUserWasher`
  MODIFY `uwSiteAdminId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
