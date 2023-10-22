-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2023 at 01:10 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackathon`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `is_correct` smallint(6) NOT NULL,
  `is_enabled` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer`, `is_correct`, `is_enabled`) VALUES
(1, 1, 'A) Candy wrappers', 0, 1),
(2, 1, 'B) Lollipop sticks', 0, 1),
(3, 1, 'C) Exhaust fumes', 1, 1),
(4, 1, 'D) Balloons', 0, 1),
(5, 2, 'A) Throw it in the ocean', 0, 1),
(6, 2, 'B) Leave it on the sidewalk', 0, 1),
(7, 2, 'C) Recycle it', 1, 1),
(8, 2, 'D) Use it as a toy boat', 0, 1),
(9, 3, 'A) Use lots of soap', 0, 1),
(10, 3, 'B) Let the water run while you\'re not using it', 0, 1),
(11, 3, 'C) Use water-saving faucets and turn off the tap while you lather', 1, 1),
(12, 3, 'D) Play with soap bubbles in the sink', 0, 1),
(13, 4, 'A) Throw it in the river', 0, 1),
(14, 4, 'B) Bury it in the backyard', 0, 1),
(15, 4, 'C) Recycle it', 1, 1),
(16, 4, 'D) Keep it as a toy', 0, 1),
(17, 5, 'A) Banana peels', 0, 1),
(18, 5, 'B) Glass jars', 1, 1),
(19, 5, 'C) Old shoes', 0, 1),
(20, 5, 'D) Dirty tissues', 0, 1),
(21, 6, 'A) To make the recycling bin look full', 0, 1),
(22, 6, 'B) To save trees and reduce waste', 1, 1),
(23, 6, 'C) To create colorful artwork', 0, 1),
(24, 6, 'D) To use it as wrapping paper', 0, 1),
(25, 7, 'A) Zebras', 0, 1),
(26, 7, 'B) Giraffes', 0, 1),
(27, 7, 'C) Pandas', 1, 1),
(28, 7, 'D) Kangaroos', 0, 1),
(29, 8, 'A) Cheetah', 1, 1),
(30, 8, 'B) Puma', 0, 1),
(31, 8, 'C) House cat', 0, 1),
(32, 8, 'D) Tiger', 0, 1),
(33, 9, 'A) They\'re good at hiding', 0, 1),
(34, 9, 'B) They\'re not very interesting', 0, 1),
(35, 9, 'C) They are vital to the balance of marine ecosystems', 1, 1),
(36, 9, 'D) They don\'t need protection', 0, 1),
(37, 10, 'A) Potato power', 0, 1),
(38, 10, 'B) Wind power', 0, 1),
(39, 10, 'C) Candy power', 0, 1),
(40, 10, 'D) Rainbow power', 1, 1),
(41, 11, 'A) Solar power', 0, 1),
(42, 11, 'B) Wind power', 0, 1),
(43, 11, 'C) Geothermal power', 1, 1),
(44, 11, 'D) Moonlight power', 0, 1),
(45, 12, 'A) Pizza power', 0, 1),
(46, 12, 'B) Wind power', 1, 1),
(47, 12, 'C) Tornado power', 0, 1),
(48, 12, 'D) Lightning power', 0, 1),
(49, 13, 'A) To make more noise', 0, 1),
(50, 13, 'B) To create more pollution', 0, 1),
(51, 13, 'C) To save money and protect the environment', 1, 1),
(52, 13, 'D) To have brighter lights', 0, 1),
(53, 14, 'A) We get free ice cream', 0, 1),
(54, 14, 'B) Glaciers melt, sea levels rise, and it can lead to extreme weather', 1, 1),
(55, 14, 'C) It\'s a great day at the beach', 0, 1),
(56, 14, 'D) We all get sunburned', 0, 1),
(57, 15, 'A) Drive more, fly often, and use lots of plastic', 0, 1),
(58, 15, 'B) Reduce, reuse, and recycle', 1, 1),
(59, 15, 'C) Turn up the heat in the summer and the AC in the winter', 0, 1),
(60, 15, 'D) Use as much water as possible', 0, 1),
(61, 16, 'A) To see who can use the most water', 0, 1),
(62, 16, 'B) Because water is never-ending', 0, 1),
(63, 16, 'C) To protect against water scarcity and ensure there\'s enough for everyone', 1, 1),
(64, 16, 'D) To create more puddles to jump in', 0, 1),
(65, 17, 'A) Taking short showers', 0, 1),
(66, 17, 'B) Turning off the tap while brushing your teeth', 1, 1),
(67, 17, 'C) Leaving the hose running while playing', 0, 1),
(68, 17, 'D) Fixing leaky faucets', 0, 1),
(69, 18, 'A) Everyone gets a water balloon', 0, 1),
(70, 18, 'B) People have to walk long distances for dirty water', 0, 1),
(71, 18, 'C) Water fights break out', 0, 1),
(72, 18, 'D) Nothing, it\'s always available', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_enabled` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `is_enabled`) VALUES
(1, 'Pollution', 1),
(2, 'Recycling', 1),
(3, 'Endangered Species', 1),
(4, 'Renewable Energy', 1),
(5, 'Climate Change', 1),
(6, 'Water Scarcity', 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `number` smallint(6) NOT NULL,
  `question` varchar(255) NOT NULL,
  `incorrect_response` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `category_id`, `number`, `question`, `incorrect_response`) VALUES
(1, 1, 1, 'What is the main source of air pollution that comes from cars and trucks?', 'Oh no! The correct answer is C) Exhaust fumes. These fumes come from the back of cars and trucks and can harm our environment. But don\'t worry, you can learn more and try again!'),
(2, 1, 2, 'What should you do with an empty plastic bottle to help the environment?', 'Oops! That\'s not quite right. The correct answer is C) Recycle it. Recycling plastic bottles helps reduce waste and protect our environment. Keep trying, you\'ll get it!'),
(3, 1, 3, 'What can you do to reduce water pollution when you wash your hands?', 'Not quite! The right answer is C) Use water-saving faucets and turn off the tap while you lather. It helps save water and reduce water pollution. Don\'t worry, keep learning and try again!'),
(4, 2, 1, 'What should you do with a glass bottle when you\'re done with it to help the environment?', 'Oops, that\'s not quite right. The correct answer is C) Recycle it. Recycling glass bottles helps save energy and resources. Keep learning, and you\'ll get it next time!'),
(5, 2, 2, 'Which of the following items can be recycled?', 'Nice try, but the correct answer is B) Glass jars. They can be recycled to make new glass products. Keep going, and you\'ll get it next time!'),
(6, 2, 3, 'What is the purpose of recycling paper and cardboard products?', 'That\'s not it, but don\'t give up! The correct answer is B) To save trees and reduce waste. Recycling paper and cardboard helps protect our forests. Keep learning and try again!'),
(7, 3, 1, 'Which animal is critically endangered and is known for its black and white fur?', 'Nice try, but the correct answer is C) Pandas. Pandas are critically endangered, and we need to protect them and their habitat. Keep going, you\'re doing great!'),
(8, 3, 2, 'Which big cat species is endangered and known for its beautiful spots?', 'Good effort, but the correct answer is A) Cheetah. They are endangered too! Keep learning about these beautiful animals.'),
(9, 3, 3, 'Why is it important to protect sea turtles?', 'Not quite, but it\'s important to protect sea turtles because they are vital to the balance of marine ecosystems. Keep exploring the world of endangered species!'),
(10, 4, 1, 'What is a type of energy that comes from the sun and is good for the environment?', 'Oh, that\'s not quite right. The correct answer is D) Rainbow power. Just kidding! It\'s actually B) Wind power. Wind energy is clean and good for our planet. Don\'t give up, keep playing!'),
(11, 4, 2, 'What is a source of renewable energy that uses the heat from the Earth\'s interior?', 'Almost there! The correct answer is C) Geothermal power, which uses heat from the Earth\'s interior. Keep learning about renewable energy sources.'),
(12, 4, 3, 'What is a type of energy that comes from the wind, making tall towers spin around?', 'Not quite, but you\'re on the right track. The correct answer is B) Wind power, which uses the wind to generate electricity. Keep exploring renewable energy!'),
(13, 5, 1, 'Why is it important to use less electricity and save energy in your home?', 'Oops, not quite there. The correct answer is C) To save money and protect the environment. Using less electricity helps reduce greenhouse gasses and saves our planet. Keep learning, you\'re on the right track!'),
(14, 5, 2, 'What happens when the Earth gets too warm because of climate change?', 'Close, but not quite. When the Earth gets too warm because of climate change, glaciers melt, sea levels rise, and it can lead to extreme weather. Keep learning about climate change and its effects!'),
(15, 5, 3, 'What can we do to reduce our carbon footprint and fight climate change?', 'That\'s not it, but you\'re learning. The correct answer is B) Reduce, reuse, and recycle. These actions help reduce your carbon footprint and fight climate change. Keep up the good work!'),
(16, 6, 1, 'Why is it important to conserve water in your daily life?', 'Nice try, but the correct answer is C) To protect against water scarcity and ensure there\'s enough for everyone. Conserving water is vital for the future. Keep learning about water conservation!'),
(17, 6, 2, 'Which of the following activities is a big water waster?', 'Not quite! The correct answer is C) Leaving the hose running while playing. That\'s a big water waster. Keep practicing water-saving habits!'),
(18, 6, 3, 'What can happen when there isn\'t enough clean water for people to drink?', 'Almost there, but the correct answer is B) People have to walk long distances for dirty water. This is a serious problem in some places. Keep exploring the importance of clean water!');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` int(11) NOT NULL,
  `password` int(11) NOT NULL,
  `email` int(11) NOT NULL,
  `joined_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
