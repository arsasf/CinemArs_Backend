-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 17 Mei 2021 pada 07.07
-- Versi Server: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinemars_ticket_booking`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `show_time_id` int(11) NOT NULL,
  `booking_ticket` int(11) NOT NULL,
  `booking_total_price` int(11) NOT NULL,
  `booking_payment_method` varchar(150) DEFAULT NULL,
  `booking_status` enum('Pending','Received','Cancelled') DEFAULT NULL,
  `booking_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `booking_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`booking_id`, `user_id`, `premiere_id`, `show_time_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `booking_created_at`, `booking_updated_at`) VALUES
(60, 20, 28, 124, 1, 15, 'GoPay Google', 'Received', '2021-05-02 23:25:03', NULL),
(61, 22, 28, 124, 1, 15, 'GoPay Google', 'Received', '2021-05-03 03:56:18', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `booking_set_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `booking_seat`
--

INSERT INTO `booking_seat` (`booking_seat_id`, `booking_id`, `booking_set_location`) VALUES
(7, 60, 'A1'),
(8, 61, 'A1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_city` varchar(250) NOT NULL,
  `location_address` text NOT NULL,
  `location_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `location`
--

INSERT INTO `location` (`location_id`, `location_city`, `location_address`, `location_created_at`, `location_updated_at`) VALUES
(1, 'Banjarmasin', 'JL. A.Yani KM 5 No 27, Banjarmasin Utara', '2021-04-24 16:00:00', NULL),
(2, 'Banjarbaru', 'Jl. Hasan Basri N0 78, Banjarbaru', '2021-04-25 08:58:27', NULL),
(3, 'Barito Kuala', 'Jl. Trans Kalimantan No 46, Barito Kuala', '2021-04-25 08:59:14', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_image` varchar(100) NOT NULL,
  `movie_name` varchar(150) NOT NULL,
  `movie_category` varchar(250) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_duration` varchar(100) NOT NULL,
  `movie_directed_by` varchar(250) NOT NULL,
  `movie_casts` varchar(250) NOT NULL,
  `movie_synopsis` text NOT NULL,
  `movie_created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movie_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_image`, `movie_name`, `movie_category`, `movie_release_date`, `movie_duration`, `movie_directed_by`, `movie_casts`, `movie_synopsis`, `movie_created_at`, `movie_updated_at`) VALUES
(103, '2021-05-09T07-44-34.339Zimg-black-widow.png', 'Spiderman', 'CobaMovieCategory', '2021-05-14', '2 hours 2 minutes', 'CobaMovieDirector', 'Tom and Friends', 'bb', '2021-05-09 15:44:34', NULL),
(104, '2021-05-09T08-03-14.972Zimg-spiderman.png', 'Spiderman', 'Action, Sci', '2021-05-28', '2 hours 15 minutes', 'Jhon Wats', 'CobaMovieCasts', '1', '2021-05-09 16:03:14', NULL),
(105, '2021-05-10T04-44-40.832Zimg-black-window-home.png', 'test', 'Action, Sci', '2021-05-17', '2 hours 15 minutes', 'a', 'Tom and Friends', 'asgt', '2021-05-10 12:43:40', '2021-05-10 12:44:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `show_time_date` date NOT NULL,
  `premiere_image` varchar(250) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `premiere_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `show_time_date`, `premiere_image`, `premiere_name`, `premiere_price`, `premiere_created_at`, `premiere_updated_at`) VALUES
(12, 1, 1, '2021-05-30', '2021-05-02T21-01-05.787Zebv.png', 'ebv.id', 10, '2021-05-02 21:01:05', '2021-05-02 21:01:05'),
(13, 1, 2, '2021-05-30', '2021-05-02T18-55-11.220Zebv.png', 'ebv.id', 10, '2021-05-02 21:04:43', NULL),
(14, 1, 3, '2021-05-30', '2021-05-02T19-02-33.488Zebv.png', 'ebv.id', 10, '2021-05-02 21:04:56', NULL),
(15, 1, 1, '2021-05-30', '2021-05-02T19-08-47.526Zcineone21.png', 'CineOne21', 15, '2021-05-02 21:05:15', NULL),
(16, 1, 2, '2021-05-30', '2021-05-02T19-14-34.977Zcineone21.png', 'CineOne21', 15, '2021-05-02 21:05:33', NULL),
(17, 1, 3, '2021-05-30', '2021-05-02T19-23-12.791Zcineone21.png', 'CineOne21', 15, '2021-05-02 21:05:46', NULL),
(18, 1, 1, '2021-05-30', '2021-05-02T19-27-08.743Zhiflix.png', 'Hiflix', 15, '2021-05-02 21:10:52', NULL),
(19, 1, 2, '2021-05-30', '2021-05-02T19-31-18.291Zhiflix.png', 'Hiflix', 15, '2021-05-02 21:11:10', NULL),
(20, 1, 3, '2021-05-30', '2021-05-02T19-35-48.800Zhiflix.png', 'Hiflix', 15, '2021-05-02 21:11:22', NULL),
(21, 1, 1, '2021-05-29', '2021-05-02T21-13-53.937Zebv.png', 'ebv.id', 10, '2021-05-02 21:13:54', NULL),
(22, 1, 2, '2021-05-29', '2021-05-02T21-18-43.109Zebv.png', 'ebv.id', 10, '2021-05-02 21:18:43', NULL),
(23, 1, 3, '2021-05-29', '2021-05-02T21-21-56.539Zebv.png', 'ebv.id', 10, '2021-05-02 21:21:56', NULL),
(24, 1, 1, '2021-05-29', '2021-05-02T21-26-08.376Zcineone21.png', 'CineOne21', 15, '2021-05-02 21:26:08', NULL),
(25, 1, 2, '2021-05-29', '2021-05-02T21-27-55.152Zcineone21.png', 'CineOne21', 15, '2021-05-02 21:27:55', NULL),
(26, 1, 3, '2021-05-29', '2021-05-02T21-29-38.147Zcineone21.png', 'CineOne21', 15, '2021-05-02 21:29:38', NULL),
(27, 1, 1, '2021-05-29', '2021-05-02T23-20-33.835Zhiflix.png', 'Hiflix', 15, '2021-05-02 23:20:34', '2021-05-02 23:20:34'),
(28, 1, 2, '2021-05-29', '2021-05-02T23-20-47.930Zhiflix.png', 'Hiflix', 15, '2021-05-02 23:20:47', '2021-05-02 23:20:47'),
(29, 1, 3, '2021-05-29', '2021-05-02T23-20-59.899Zhiflix.png', 'Hiflix', 15, '2021-05-02 23:21:00', '2021-05-02 23:21:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `show_time`
--

CREATE TABLE `show_time` (
  `show_time_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `show_time_date` date NOT NULL,
  `show_time_clock` varchar(250) NOT NULL,
  `show_time_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `show_time_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `show_time`
--

INSERT INTO `show_time` (`show_time_id`, `premiere_id`, `show_time_date`, `show_time_clock`, `show_time_created_at`, `show_time_updated_at`) VALUES
(10, 12, '2021-05-30', '08:00 AM', '2021-05-02 18:44:29', NULL),
(11, 12, '2021-05-30', '10:00 AM', '2021-05-02 18:44:43', NULL),
(12, 12, '2021-05-30', '12:00 PM', '2021-05-02 18:45:05', NULL),
(13, 12, '2021-05-30', '14:00 PM', '2021-05-02 18:45:15', NULL),
(14, 12, '2021-05-30', '16:00 PM', '2021-05-02 18:45:25', NULL),
(15, 12, '2021-05-30', '18:00 PM', '2021-05-02 18:45:36', NULL),
(16, 12, '2021-05-30', '20:00 PM', '2021-05-02 18:45:46', NULL),
(17, 12, '2021-05-30', '22:00 PM', '2021-05-02 18:46:42', NULL),
(18, 21, '2021-05-29', '08:00 AM', '2021-05-02 18:47:39', '2021-05-02 18:50:27'),
(19, 21, '2021-05-29', '10:00 AM', '2021-05-02 18:47:50', '2021-05-02 18:50:41'),
(20, 21, '2021-05-29', '12:00 PM', '2021-05-02 18:48:06', NULL),
(21, 21, '2021-05-29', '14:00 PM', '2021-05-02 18:51:26', NULL),
(22, 21, '2021-05-29', '16:00 PM', '2021-05-02 18:51:34', NULL),
(23, 21, '2021-05-29', '18:00 PM', '2021-05-02 18:51:43', NULL),
(24, 21, '2021-05-29', '20:00 PM', '2021-05-02 18:51:53', NULL),
(25, 21, '2021-05-29', '22:00 PM', '2021-05-02 18:52:01', NULL),
(26, 13, '2021-05-30', '08:00 AM', '2021-05-02 18:56:07', '2021-05-02 19:18:16'),
(27, 22, '2021-05-29', '10:00 AM', '2021-05-02 18:58:37', NULL),
(28, 22, '2021-05-29', '12:00 PM', '2021-05-02 18:58:49', NULL),
(29, 22, '2021-05-29', '14:00 PM', '2021-05-02 18:58:56', NULL),
(30, 22, '2021-05-29', '16:00 PM', '2021-05-02 18:59:05', NULL),
(31, 22, '2021-05-29', '18:00 PM', '2021-05-02 18:59:14', NULL),
(32, 22, '2021-05-29', '20:00 PM', '2021-05-02 18:59:28', NULL),
(33, 22, '2021-05-29', '22:00 PM', '2021-05-02 18:59:38', NULL),
(34, 13, '2021-05-30', '08:00 AM', '2021-05-02 19:00:24', NULL),
(35, 13, '2021-05-30', '10:00 AM', '2021-05-02 19:00:35', NULL),
(36, 13, '2021-05-30', '12:00 PM', '2021-05-02 19:00:50', NULL),
(37, 13, '2021-05-30', '14:00 PM', '2021-05-02 19:00:58', NULL),
(38, 13, '2021-05-30', '16:00 PM', '2021-05-02 19:01:06', NULL),
(39, 13, '2021-05-30', '18:00 PM', '2021-05-02 19:01:16', NULL),
(40, 13, '2021-05-30', '20:00 PM', '2021-05-02 19:01:27', NULL),
(41, 13, '2021-05-30', '22:00 PM', '2021-05-02 19:01:34', NULL),
(42, 14, '2021-05-30', '08:00 AM', '2021-05-02 19:03:29', NULL),
(43, 14, '2021-05-30', '10:00 AM', '2021-05-02 19:03:41', NULL),
(44, 14, '2021-05-30', '12:00 PM', '2021-05-02 19:03:52', NULL),
(45, 14, '2021-05-30', '14:00 PM', '2021-05-02 19:04:01', NULL),
(46, 14, '2021-05-30', '16:00 PM', '2021-05-02 19:04:11', NULL),
(47, 14, '2021-05-30', '18:00 PM', '2021-05-02 19:04:20', NULL),
(48, 14, '2021-05-30', '20:00 PM', '2021-05-02 19:04:35', NULL),
(49, 14, '2021-05-30', '22:00 PM', '2021-05-02 19:04:43', NULL),
(50, 23, '2021-05-29', '08:00 AM', '2021-05-02 19:05:29', NULL),
(51, 23, '2021-05-29', '10:00 AM', '2021-05-02 19:05:38', NULL),
(52, 23, '2021-05-29', '12:00 PM', '2021-05-02 19:05:50', NULL),
(53, 23, '2021-05-29', '14:00 PM', '2021-05-02 19:05:59', NULL),
(54, 23, '2021-05-29', '16:00 PM', '2021-05-02 19:06:07', NULL),
(55, 23, '2021-05-29', '18:00 PM', '2021-05-02 19:06:15', NULL),
(56, 23, '2021-05-29', '20:00 PM', '2021-05-02 19:06:23', NULL),
(57, 23, '2021-05-29', '22:00 PM', '2021-05-02 19:06:31', NULL),
(58, 24, '2021-05-29', '08:00 AM', '2021-05-02 19:09:51', NULL),
(59, 24, '2021-05-29', '10:00 AM', '2021-05-02 19:10:01', NULL),
(60, 24, '2021-05-29', '12:00 PM', '2021-05-02 19:10:13', NULL),
(61, 24, '2021-05-29', '14:00 PM', '2021-05-02 19:10:21', NULL),
(62, 24, '2021-05-29', '16:00 PM', '2021-05-02 19:10:31', NULL),
(63, 24, '2021-05-29', '18:00 PM', '2021-05-02 19:10:40', NULL),
(64, 24, '2021-05-29', '20:00 PM', '2021-05-02 19:10:49', NULL),
(65, 24, '2021-05-29', '22:00 PM', '2021-05-02 19:10:58', NULL),
(66, 15, '2021-05-30', '08:00 AM', '2021-05-02 19:11:56', NULL),
(67, 15, '2021-05-30', '10:00 AM', '2021-05-02 19:12:08', NULL),
(68, 15, '2021-05-30', '12:00 PM', '2021-05-02 19:12:21', NULL),
(69, 15, '2021-05-30', '14:00 PM', '2021-05-02 19:12:28', NULL),
(70, 15, '2021-05-30', '16:00 PM', '2021-05-02 19:12:36', NULL),
(71, 15, '2021-05-30', '18:00 PM', '2021-05-02 19:12:44', NULL),
(72, 15, '2021-05-30', '20:00 PM', '2021-05-02 19:12:53', NULL),
(73, 15, '2021-05-30', '22:00 PM', '2021-05-02 19:13:02', NULL),
(74, 16, '2021-05-30', '08:00 AM', '2021-05-02 19:15:06', NULL),
(75, 16, '2021-05-30', '10:00 AM', '2021-05-02 19:15:15', NULL),
(76, 16, '2021-05-30', '12:00 PM', '2021-05-02 19:15:26', '2021-05-02 19:19:15'),
(77, 16, '2021-05-30', '14:00 PM', '2021-05-02 19:19:48', NULL),
(78, 16, '2021-05-30', '16:00 PM', '2021-05-02 19:19:59', NULL),
(79, 16, '2021-05-30', '18:00 PM', '2021-05-02 19:20:07', NULL),
(80, 16, '2021-05-30', '20:00 PM', '2021-05-02 19:20:14', NULL),
(81, 16, '2021-05-30', '22:00 PM', '2021-05-02 19:20:21', NULL),
(82, 25, '2021-05-29', '08:00 AM', '2021-05-02 19:21:13', NULL),
(83, 25, '2021-05-29', '10:00 AM', '2021-05-02 19:21:20', NULL),
(84, 25, '2021-05-29', '12:00 PM', '2021-05-02 19:21:33', NULL),
(85, 25, '2021-05-29', '14:00 PM', '2021-05-02 19:21:40', NULL),
(86, 25, '2021-05-29', '16:00 PM', '2021-05-02 19:21:49', NULL),
(87, 25, '2021-05-29', '18:00 PM', '2021-05-02 19:22:00', NULL),
(88, 25, '2021-05-29', '20:00 PM', '2021-05-02 19:22:08', NULL),
(89, 25, '2021-05-29', '22:00 PM', '2021-05-02 19:22:16', NULL),
(90, 26, '2021-05-29', '08:00 AM', '2021-05-02 19:23:44', NULL),
(91, 26, '2021-05-29', '10:00 AM', '2021-05-02 19:23:52', NULL),
(92, 26, '2021-05-29', '12:00 PM', '2021-05-02 19:24:01', NULL),
(93, 26, '2021-05-29', '14:00 PM', '2021-05-02 19:24:09', NULL),
(94, 26, '2021-05-29', '16:00 PM', '2021-05-02 19:24:17', NULL),
(95, 26, '2021-05-29', '18:00 PM', '2021-05-02 19:24:26', NULL),
(96, 26, '2021-05-29', '20:00 PM', '2021-05-02 19:24:35', NULL),
(97, 26, '2021-05-29', '22:00 PM', '2021-05-02 19:24:42', NULL),
(98, 17, '2021-05-30', '08:00 AM', '2021-05-02 19:25:19', NULL),
(99, 17, '2021-05-30', '10:00 AM', '2021-05-02 19:25:28', NULL),
(100, 17, '2021-05-30', '12:00 PM', '2021-05-02 19:25:38', NULL),
(101, 17, '2021-05-30', '14:00 PM', '2021-05-02 19:25:45', NULL),
(102, 17, '2021-05-30', '16:00 PM', '2021-05-02 19:25:52', NULL),
(103, 17, '2021-05-30', '18:00 PM', '2021-05-02 19:26:00', NULL),
(104, 17, '2021-05-30', '20:00 PM', '2021-05-02 19:26:09', NULL),
(105, 17, '2021-05-30', '22:00 PM', '2021-05-02 19:26:18', NULL),
(106, 18, '2021-05-30', '08:00 AM', '2021-05-02 19:27:28', NULL),
(107, 18, '2021-05-30', '10:00 AM', '2021-05-02 19:27:37', NULL),
(108, 18, '2021-05-30', '12:00 PM', '2021-05-02 19:27:47', NULL),
(109, 18, '2021-05-30', '14:00 PM', '2021-05-02 19:27:56', NULL),
(110, 18, '2021-05-30', '16:00 PM', '2021-05-02 19:28:03', NULL),
(111, 18, '2021-05-30', '18:00 PM', '2021-05-02 19:28:10', NULL),
(112, 18, '2021-05-30', '20:00 PM', '2021-05-02 19:28:21', NULL),
(113, 18, '2021-05-30', '22:00 PM', '2021-05-02 19:28:29', NULL),
(114, 27, '2021-05-29', '08:00 AM', '2021-05-02 19:29:31', NULL),
(115, 27, '2021-05-29', '10:00 AM', '2021-05-02 19:29:46', NULL),
(116, 27, '2021-05-29', '12:00 PM', '2021-05-02 19:29:56', NULL),
(117, 27, '2021-05-29', '14:00 PM', '2021-05-02 19:30:03', NULL),
(118, 27, '2021-05-29', '16:00 PM', '2021-05-02 19:30:09', NULL),
(119, 27, '2021-05-29', '18:00 PM', '2021-05-02 19:30:17', NULL),
(120, 27, '2021-05-29', '20:00 PM', '2021-05-02 19:30:25', NULL),
(121, 27, '2021-05-29', '22:00 PM', '2021-05-02 19:30:32', NULL),
(122, 28, '2021-05-29', '08:00 AM', '2021-05-02 19:31:41', NULL),
(123, 28, '2021-05-29', '10:00 AM', '2021-05-02 19:31:49', NULL),
(124, 28, '2021-05-29', '12:00 PM', '2021-05-02 19:32:10', NULL),
(125, 28, '2021-05-29', '14:00 PM', '2021-05-02 19:32:17', NULL),
(126, 28, '2021-05-29', '16:00 PM', '2021-05-02 19:32:24', NULL),
(127, 28, '2021-05-29', '18:00 PM', '2021-05-02 19:32:31', NULL),
(128, 28, '2021-05-29', '20:00 PM', '2021-05-02 19:32:41', NULL),
(129, 28, '2021-05-29', '22:00 PM', '2021-05-02 19:32:49', NULL),
(130, 19, '2021-05-30', '08:00 AM', '2021-05-02 19:33:57', NULL),
(131, 19, '2021-05-30', '10:00 AM', '2021-05-02 19:34:06', NULL),
(132, 19, '2021-05-30', '12:00 PM', '2021-05-02 19:34:16', NULL),
(133, 19, '2021-05-30', '14:00 PM', '2021-05-02 19:34:23', NULL),
(134, 19, '2021-05-30', '16:00 PM', '2021-05-02 19:34:30', NULL),
(135, 19, '2021-05-30', '18:00 PM', '2021-05-02 19:34:37', NULL),
(136, 19, '2021-05-30', '20:00 PM', '2021-05-02 19:34:45', NULL),
(137, 19, '2021-05-30', '22:00 PM', '2021-05-02 19:34:52', NULL),
(138, 20, '2021-05-30', '08:00 AM', '2021-05-02 19:36:37', NULL),
(139, 20, '2021-05-30', '10:00 AM', '2021-05-02 19:36:46', NULL),
(140, 20, '2021-05-30', '12:00 PM', '2021-05-02 19:36:56', NULL),
(141, 20, '2021-05-30', '14:00 PM', '2021-05-02 19:37:05', NULL),
(142, 20, '2021-05-30', '16:00 PM', '2021-05-02 19:37:12', NULL),
(143, 20, '2021-05-30', '18:00 PM', '2021-05-02 19:37:21', NULL),
(144, 20, '2021-05-30', '20:00 PM', '2021-05-02 19:37:29', NULL),
(145, 20, '2021-05-30', '22:00 PM', '2021-05-02 19:37:35', NULL),
(146, 29, '2021-05-29', '08:00 AM', '2021-05-02 19:39:19', NULL),
(147, 29, '2021-05-29', '10:00 AM', '2021-05-02 19:39:28', NULL),
(148, 29, '2021-05-29', '12:00 PM', '2021-05-02 19:39:38', NULL),
(149, 29, '2021-05-29', '14:00 PM', '2021-05-02 19:39:46', NULL),
(150, 29, '2021-05-29', '16:00 PM', '2021-05-02 19:39:54', NULL),
(151, 29, '2021-05-29', '18:00 PM', '2021-05-02 19:40:05', NULL),
(152, 29, '2021-05-29', '20:00 PM', '2021-05-02 19:40:13', NULL),
(153, 29, '2021-05-29', '22:00 PM', '2021-05-02 19:40:20', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_image` varchar(100) NOT NULL,
  `user_first_name` varchar(100) NOT NULL,
  `user_last_name` varchar(100) NOT NULL,
  `user_name` varchar(250) NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_phone_number` varchar(12) NOT NULL,
  `user_status` enum('0','1') NOT NULL,
  `user_role` enum('user','admin') NOT NULL,
  `user_cerated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_image`, `user_first_name`, `user_last_name`, `user_name`, `user_email`, `user_password`, `user_phone_number`, `user_status`, `user_role`, `user_cerated_at`, `user_updated_at`) VALUES
(4, '2021-05-02T04-19-52.777Zimg-profile.png', 'Admin', 'Cinemars', 'aul', 'auliasafitri2698@gmail.com', '$2b$10$QwCxWuuUlGRKIK0MzDL40uJD1h8EmPYFAwdPUEMAJAstq60DI4bym', '85612345050', '1', 'admin', '2021-04-27 15:13:51', '2021-05-02 12:19:52'),
(24, '2021-05-10T04-39-25.455Zprofile1.jpg', 'Jhonas', 'Wats', 'usercinemars', 'cinemars.user@gmail.com', '$2b$10$UQLrGiNyqI7vwMdweDs6DeG7lBiZL2CyS4l3O9V9WGNyGF8r0xNLG', '87921374873', '1', 'user', '2021-05-10 12:36:44', '2021-05-10 12:39:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indexes for table `show_time`
--
ALTER TABLE `show_time`
  ADD PRIMARY KEY (`show_time_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;
--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `show_time`
--
ALTER TABLE `show_time`
  MODIFY `show_time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
