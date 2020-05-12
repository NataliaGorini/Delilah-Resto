-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-05-2020 a las 02:50:06
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pedidos`
--

CREATE TABLE `Pedidos` (
  `Order_id` int(10) NOT NULL,
  `User_id` int(10) NOT NULL,
  `Date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `Payment` varchar(40) NOT NULL DEFAULT 'cash'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Pedidos`
--

INSERT INTO `Pedidos` (`Order_id`, `User_id`, `Date`, `Payment`) VALUES
(63, 2, '2020-05-11 01:13:13.243674', 'credit_card'),
(64, 2, '2020-05-11 01:14:28.668770', 'credit_card'),
(65, 2, '2020-05-11 01:15:57.381952', 'credit_card'),
(66, 2, '2020-05-11 01:16:44.619620', 'credit_card'),
(76, 2, '2020-05-11 02:09:55.926009', 'credit_card'),
(77, 2, '2020-05-11 02:11:53.496184', 'credit_card'),
(78, 2, '2020-05-11 02:12:57.181801', 'credit_card'),
(79, 2, '2020-05-11 02:19:21.201381', 'credit_card'),
(80, 2, '2020-05-11 02:22:03.477169', 'credit_card'),
(81, 2, '2020-05-11 02:25:20.681557', 'credit_card'),
(82, 2, '2020-05-11 02:30:10.402908', 'credit_card'),
(83, 2, '2020-05-11 02:34:14.418411', 'credit_card'),
(84, 2, '2020-05-11 02:35:11.235098', 'credit_card'),
(85, 2, '2020-05-11 02:36:02.651065', 'credit_card'),
(86, 2, '2020-05-11 02:36:44.063585', 'credit_card'),
(87, 2, '2020-05-11 03:25:19.714778', 'credit_card'),
(88, 2, '2020-05-11 03:27:57.854258', 'credit_card'),
(89, 2, '2020-05-11 03:28:40.172978', 'credit_card'),
(90, 2, '2020-05-11 03:30:29.466714', 'credit_card'),
(91, 2, '2020-05-11 03:34:47.325322', 'cash'),
(92, 2, '2020-05-11 03:36:11.923857', 'cash'),
(93, 2, '2020-05-11 03:44:20.595613', 'cash'),
(94, 2, '2020-05-11 18:14:55.257446', 'cash'),
(95, 2, '2020-05-11 21:47:29.221930', 'cash'),
(96, 11, '2020-05-12 00:14:29.141823', 'cash'),
(97, 1, '2020-05-12 00:23:07.273223', 'cash');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pedidos_Productos`
--

CREATE TABLE `Pedidos_Productos` (
  `id` int(10) NOT NULL,
  `Order_id` int(10) NOT NULL,
  `Product_id` int(10) NOT NULL,
  `Quantity` int(10) NOT NULL,
  `Amount` int(10) NOT NULL,
  `status` varchar(35) NOT NULL DEFAULT 'nuevo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Pedidos_Productos`
--

INSERT INTO `Pedidos_Productos` (`id`, `Order_id`, `Product_id`, `Quantity`, `Amount`, `status`) VALUES
(3, 63, 3, 4, 1200, 'cocinando'),
(4, 63, 3, 4, 1200, 'en camino'),
(5, 63, 1, 1, 360, 'nuevo'),
(6, 96, 1, 2, 720, 'nuevo'),
(7, 97, 3, 1, 300, 'nuevo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Productos`
--

CREATE TABLE `Productos` (
  `Product_id` int(64) NOT NULL,
  `Dish` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `Ingredients` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `Price` int(64) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Productos`
--

INSERT INTO `Productos` (`Product_id`, `Dish`, `Ingredients`, `Price`) VALUES
(1, 'VeganBurguer', 'burger de quinoa y hongos con cebollas caramelizadas', 360),
(2, 'Buñelos de la abuela', 'buñuelos de acelga y queso', 180),
(3, 'Green Life Poke', 'arroz integral, nueces, verdus de estacion y salsa', 300),
(4, 'GiveMe Potatos', 'papas rusticas con crocante de harina de maiz', 150),
(5, 'Oh My Soup', 'sopa cremosa de cabutia con semillas', 150),
(6, 'The Pope', 'bomba de papas rellenas de queso y seitan. Salsa spicy', 170);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `User_id` int(64) NOT NULL,
  `Nickname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `FullName` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `Phone` int(64) UNSIGNED NOT NULL,
  `Address` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `IsAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`User_id`, `Nickname`, `FullName`, `Password`, `Email`, `Phone`, `Address`, `IsAdmin`) VALUES
(1, 'Administrador', 'Natalia Gorini', '2736Nat', 'natygorini@gmail.com', 5768093, 'cuba 34894', 1),
(2, 'Paula', 'Paula Monje', 'tengoHambre', 'pm@gmail.com', 29587689, 'jose Hernandez 890', 0),
(3, 'NicK', 'Nicolas Gomez', 'seguro', 'ngs@gmail.com', 2163473, 'Soler 7658', 0),
(5, 'Mar', 'Martina Zeta', 'seguro3', 'mztg@hotmail.com', 216383903, 'calle 133 5145', 0),
(6, 'prueba', 'Jose pepe', 'seguro4', 'josepepe@hotmail.com', 216893903, 'calle 133', 0),
(11, 'Olguis', 'Olga Torres', 'soyunpug', 'adoptaunpug@gmail.com', 278654329, 'Laprida 7689', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD PRIMARY KEY (`Order_id`),
  ADD KEY `pedidos_ibfk_1` (`User_id`);

--
-- Indices de la tabla `Pedidos_Productos`
--
ALTER TABLE `Pedidos_Productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_id` (`Order_id`),
  ADD KEY `Product_id` (`Product_id`);

--
-- Indices de la tabla `Productos`
--
ALTER TABLE `Productos`
  ADD PRIMARY KEY (`Product_id`),
  ADD UNIQUE KEY `Dish` (`Dish`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`User_id`),
  ADD UNIQUE KEY `Password` (`Password`),
  ADD UNIQUE KEY `Nickname` (`Nickname`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  MODIFY `Order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de la tabla `Pedidos_Productos`
--
ALTER TABLE `Pedidos_Productos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `Productos`
--
ALTER TABLE `Productos`
  MODIFY `Product_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `User_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `Usuarios` (`User_id`);

--
-- Filtros para la tabla `Pedidos_Productos`
--
ALTER TABLE `Pedidos_Productos`
  ADD CONSTRAINT `pedidos_productos_ibfk_1` FOREIGN KEY (`Order_id`) REFERENCES `Pedidos` (`Order_id`),
  ADD CONSTRAINT `pedidos_productos_ibfk_2` FOREIGN KEY (`Product_id`) REFERENCES `Productos` (`Product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
