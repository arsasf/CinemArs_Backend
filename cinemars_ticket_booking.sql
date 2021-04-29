-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 29 Apr 2021 pada 05.14
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
  `premiere_id` int(11) NOT NULL,
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

INSERT INTO `booking` (`booking_id`, `premiere_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `booking_created_at`, `booking_updated_at`) VALUES
(51, 1, 3, 30, 'Gopay Gojek', 'Received', '2021-04-14 00:48:43', NULL),
(52, 1, 2, 20, 'BANK BCA', 'Received', '2021-04-14 00:48:50', NULL),
(53, 1, 3, 30, 'GoPay Google', 'Received', '2021-04-14 00:52:43', NULL),
(54, 2, 3, 30, 'GoPay Google', 'Received', '2021-04-14 04:14:47', NULL),
(55, 3, 3, 45, 'GoPay Google', 'Received', '2021-04-14 04:14:59', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `booking_set_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, '2021-04-29T02-08-30.982ZRectangle 119.png', 'SpiderMan: Home Coming', 'Action, Sci-Fi', '2021-04-29', '2 hours 11 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-08 10:37:40', '2021-04-29 10:08:31'),
(2, '', 'Tenet', 'Action', '2021-04-13', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-09 12:37:28', '2021-04-13 15:58:07'),
(3, '', 'The Witches', 'Action', '2021-04-13', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-09 15:03:33', '2021-04-13 15:58:21'),
(4, '', 'Batman A', 'Action', '2021-04-13', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-09 15:04:18', '2021-04-13 15:58:36'),
(5, '', 'Marvel', 'Action', '2021-04-13', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-09 15:12:57', '2021-04-13 15:58:55'),
(6, '', 'Marvel A', 'Action', '2021-05-06', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-09 12:18:26', '2021-04-13 15:57:46'),
(7, '', 'Marvel B', 'Action', '2021-04-13', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-09 15:26:22', '2021-04-13 15:59:41'),
(8, '', 'Marvel C', 'Action', '2021-04-13', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-09 15:25:18', '2021-04-13 15:59:19'),
(9, '', 'Marvel D', 'Action', '2021-04-13', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-09 15:20:01', '2021-04-13 15:59:07'),
(10, '', 'Harry Potter', 'Action, Fantasy', '2021-04-13', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-13 09:48:02', '2021-04-13 16:00:41'),
(11, '', 'Harry Potter A', 'Action, Fantasy', '2021-04-09', '2 hours 13 minutes', 'Jon Watss', 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened. ', '2021-04-13 09:48:46', '2021-04-13 15:51:25'),
(12, '', 'Batman Dark', 'Action, Thriller', '2021-06-18', '2 hours 4 Minutes', 'unknown', 'unknown', '-', '2021-04-22 13:03:10', NULL),
(29, '2021-04-29T02-10-20.713ZRectangle 33(1).png', 'Spiderman', 'action', '2021-04-05', '2 hours 12 minutes', 'unknown', 'unknown', '-', '2021-04-29 10:10:20', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `show_time_id` int(11) NOT NULL,
  `premiere_img` varchar(250) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `premiere_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `show_time_id`, `premiere_img`, `premiere_name`, `premiere_price`, `premiere_created_at`, `premiere_updated_at`) VALUES
(1, 1, 1, 1, 'https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector(1).png', 'ebv.id', 50000, '2021-04-25 20:48:10', NULL),
(2, 1, 2, 2, 'https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector.png', 'CineOne21', 45000, '2021-04-25 20:49:48', NULL),
(3, 1, 3, 3, 'https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector(2).png', 'Hiflix', 45000, '2021-04-25 20:49:49', NULL),
(4, 1, 1, 4, 'https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector(1).png', 'ebv.id', 50000, '2021-04-25 20:49:49', NULL),
(5, 1, 2, 5, 'https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector.png', 'CineOne21', 40000, '2021-04-25 20:49:49', NULL),
(6, 1, 3, 6, 'https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector(2).png', 'Hiflix', 45000, '2021-04-25 20:49:49', NULL),
(7, 1, 1, 7, 'https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector(1).png', 'ebv.id', 50000, '2021-04-25 20:49:49', NULL),
(8, 1, 2, 8, '', 'CineOne21', 45000, '2021-04-25 10:06:55', NULL),
(9, 1, 3, 9, 'https://cinemarsticketbooking.netlify.app/img/[V1]%20-%20Movie%20Details/Vector(2).png', 'Hiflix', 40000, '2021-04-25 20:49:49', NULL);

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
(1, 1, '2021-04-27', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:22:16', NULL),
(2, 2, '2021-04-27', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:22:16', NULL),
(3, 3, '2021-04-27', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:22:44', NULL),
(4, 4, '2021-04-28', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:53:19', NULL),
(5, 5, '2021-04-28', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:53:19', NULL),
(6, 6, '2021-04-28', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:53:19', NULL),
(7, 7, '2021-04-29', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:53:19', NULL),
(8, 8, '2021-04-29', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:53:19', NULL),
(9, 9, '2021-04-29', '08:00AM, 10:00AM, 12:00PM, 14:00PM, 16:00PM, 18:00PM, 20:00PM, 22:00PM', '2021-04-25 09:53:42', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(250) NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_cerated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_cerated_at`, `user_updated_at`) VALUES
(4, 'aul', 'aul@gmail.com', '$2b$10$QwCxWuuUlGRKIK0MzDL40uJD1h8EmPYFAwdPUEMAJAstq60DI4bym', '2021-04-27 15:13:51', '0000-00-00 00:00:00');

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
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `show_time`
--
ALTER TABLE `show_time`
  MODIFY `show_time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
