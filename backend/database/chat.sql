-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 04-03-2023 a las 09:25:48
-- Versión del servidor: 5.7.36
-- Versión de PHP: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conversaciones`
--

DROP TABLE IF EXISTS `conversaciones`;
CREATE TABLE IF NOT EXISTS `conversaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_primerUsuario` int(11) NOT NULL,
  `id_segundoUsuario` int(11) NOT NULL,
  `emisor` varchar(255) NOT NULL,
  `receptor` varchar(255) NOT NULL,
  `nuevo_mensaje` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_primerUsuario` (`id_primerUsuario`),
  KEY `id_segundoUsuario` (`id_segundoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `conversaciones`
--

INSERT INTO `conversaciones` (`id`, `id_primerUsuario`, `id_segundoUsuario`, `emisor`, `receptor`, `nuevo_mensaje`, `createdAt`, `updatedAt`) VALUES
(20, 1, 2, 'pablo', 'pepe', 0, '2023-02-27 09:04:01', '2023-02-27 09:04:10'),
(21, 1, 3, 'pablo', 'samuel', 0, '2023-03-03 21:49:28', '2023-03-03 21:52:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
CREATE TABLE IF NOT EXISTS `mensajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cuerpo` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_conversacion` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_conversacion` (`id_conversacion`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `cuerpo`, `createdAt`, `id_usuario`, `id_conversacion`, `updatedAt`) VALUES
(76, 'Buenos días Pepe, que tal va todo por ahí?', '2023-02-27 17:16:32', 1, 20, '2023-02-27 17:37:34'),
(77, 'Estoy aquí esperandote para ir a pescar', '2023-02-27 17:16:32', 1, 20, '2023-02-27 17:37:52'),
(78, 'Vale, yo llego en 5mins', '2023-02-27 17:16:32', 2, 20, '2023-02-27 17:38:07'),
(79, 'Okey no hay problema, aquí te espero', '2023-02-27 17:16:32', 1, 20, '2023-02-27 17:41:22'),
(80, 'Vale, sin problema', '2023-02-27 17:16:32', 2, 20, '2023-02-27 17:42:49'),
(81, 'Hola ', '2023-02-28 08:40:38', 2, 20, '2023-02-28 08:43:49'),
(82, 'Cómo estás ', '2023-02-28 08:40:38', 2, 20, '2023-02-28 08:43:54'),
(83, 'Que fue', '2023-02-28 08:40:38', 1, 20, '2023-02-28 08:43:57'),
(85, 'Que tal las tareas', '2023-02-28 08:40:38', 1, 20, '2023-02-28 08:44:17'),
(86, 'A', '2023-02-28 08:40:38', 2, 20, '2023-02-28 08:44:17'),
(87, 'Bien', '2023-02-28 08:40:38', 2, 20, '2023-02-28 08:44:36'),
(88, 'jagahahajsj', '2023-02-28 08:40:38', 2, 20, '2023-02-28 08:50:34'),
(89, 'dghdbdgjbcghvxgf', '2023-02-28 08:40:38', 1, 20, '2023-02-28 08:54:03'),
(90, 'Ah', '2023-02-28 09:53:35', 2, 20, '2023-02-28 10:29:34'),
(91, 'No', '2023-02-28 09:53:35', 2, 20, '2023-02-28 10:31:38'),
(92, 'Sjduididkdkekekkdkdkekdkkdididisikskskwkwkwkekekkekekeke', '2023-02-28 09:53:35', 2, 20, '2023-02-28 11:03:55'),
(93, 'He\n', '2023-02-28 09:53:35', 2, 20, '2023-02-28 11:54:39'),
(94, 'Te llega el mensaje? ', '2023-02-28 09:53:35', 2, 20, '2023-02-28 11:56:30'),
(95, 'Dime ', '2023-02-28 09:53:35', 2, 20, '2023-02-28 11:56:40'),
(96, 'hola que tal ', '2023-02-28 09:53:35', 1, 20, '2023-02-28 12:38:51'),
(98, 'Hola', '2023-02-28 09:53:35', 2, 20, '2023-02-28 12:43:21'),
(99, 'Que fue pepe', '2023-03-01 17:24:15', 1, 20, '2023-03-01 19:01:17'),
(100, 'Na, aqui andamos', '2023-03-01 17:24:15', 2, 20, '2023-03-01 19:05:51'),
(101, 'dasdasdasd', '2023-03-03 21:46:25', 1, 20, '2023-03-03 21:46:29'),
(102, 'navdbnasmvdbanvdas', '2023-03-03 21:47:52', 1, 20, '2023-03-03 21:48:20'),
(103, 'Hahahahajaja', '2023-03-03 21:47:52', 2, 20, '2023-03-03 21:49:06'),
(104, 'F rc efveg eg eg', '2023-03-03 21:49:28', 2, 20, '2023-03-03 21:49:38'),
(105, 'Hchchcjcjchc', '2023-03-03 21:49:28', 2, 20, '2023-03-03 21:49:49'),
(106, 'Hsjsjsjsjsjsjzjz', '2023-03-03 21:49:28', 2, 20, '2023-03-03 21:51:13'),
(107, 'Ugychchchchchc', '2023-03-03 21:49:28', 2, 20, '2023-03-03 21:52:10'),
(108, 'Bsjsjjs', '2023-03-03 21:49:28', 2, 20, '2023-03-03 21:53:54'),
(109, 'Bbbzjzjzjjs', '2023-03-03 21:49:28', 2, 20, '2023-03-03 21:53:58'),
(110, 'Jsjsjsjksususus', '2023-03-03 21:49:28', 2, 20, '2023-03-03 21:54:32'),
(111, 'Jcjfjxjxjxjxjdjdj', '2023-03-03 22:13:52', 2, 20, '2023-03-03 22:14:07'),
(112, 'Vjvkvucu', '2023-03-03 22:14:32', 2, 20, '2023-03-03 22:14:36'),
(113, 'Ysjsjjsjsjs', '2023-03-03 22:15:12', 2, 20, '2023-03-03 22:15:15'),
(114, 'Jwjqjqwjwu', '2023-03-03 22:22:08', 2, 20, '2023-03-03 22:22:22'),
(115, 'Hshshsjsjsjsjsj', '2023-03-03 22:30:49', 2, 20, '2023-03-03 22:33:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `password`, `createdAt`, `updatedAt`, `imagen`, `descripcion`) VALUES
(1, 'pablo', '$2b$10$Jji3lD3aVHKkgl1T/2rqte70bckGK/9XAS6cJWDllZBtXq9h3IBnq', '2023-02-22 00:00:00', '2023-02-22 00:00:00', 'default.jpg', 'Informático y Programador Web'),
(2, 'pepe', '$2b$10$i4AIJEdrSnHqbWtpgLqIs.RJVJZFMq06eXFXlpXk34CfCHW.C8IAS', '2023-02-22 00:00:00', '2023-02-22 00:00:00', 'default.jpg', 'Técnico en telecomunicaciones'),
(3, 'samuel', '$2b$10$g4vDHrvIkWeqkmgyksBl2ukWPIs0/v6o65.hyRKJY2LGRabFCT95i', '2023-02-22 00:00:00', '2023-02-22 00:00:00', 'default.jpg', 'Desarrollador multiplataforma'),
(5, 'ben', '$2b$10$iageVxMAp4lEMkZjpli2k.F/i7CwVlFGvY59ezL2r/2HPhzkaKZ9u', '2023-02-22 00:00:00', '2023-02-22 00:00:00', 'default.jpg', 'Mecánico'),
(6, 'oscar', '$2b$10$nPEk50cjyQuDMFNaRgifUuhJMEOcjLJvgQ1qs5iH1f.2CcezKkKcm', '2023-02-23 00:00:00', '2023-02-23 00:00:00', 'default.jpg', 'Técnico informático'),
(7, 'daniel', '$2b$10$N2YnITOqZL8bvMs3YTtNa.KQ5s//A1g4z9nCVWlAmmLVdGMWtpQKe', '2023-02-23 00:00:00', '2023-02-23 00:00:00', 'default.jpg', 'Electromecánico'),
(8, 'luis', '$2b$10$7oF9SCL5lkZHTONjYuFm6OJk.1YBgLRy5Z7qB3mG8KfPI.yqoyT2m', '2023-02-23 00:00:00', '2023-02-23 00:00:00', 'default.jpg', 'Técnico en energías renovables'),
(9, 'brian', '$2b$10$9sEksh9cgCr0W5boTruYy.hus5m1b7XUSAmYOMXWbQg/ePJAzk9uy', '2023-02-23 00:00:00', '2023-02-23 00:00:00', 'default.jpg', 'Administrador de sistemas informáticos en red'),
(10, 'ivan', '$2b$10$SlMXG7B/NXf2ZFAxCXy75eV6tqrdiQuTWBd1aHYSXpau/JnFqwov2', '2023-02-23 00:00:00', '2023-02-23 00:00:00', 'default.jpg', 'Ingeniero en telecomunicaciones'),
(11, 'iker', '$2b$10$EiAnZK6qL4XExFdh4WptO.IwAlM1HO8gQ.qLc8IuLugVwwmdzxli.', '2023-02-23 00:00:00', '2023-02-23 00:00:00', 'default.jpg', ''),
(12, 'cristian', '$2b$10$U5KDHA.fCOp64VqUB95A9ejZ2ykX1khtPafiLEU/vfr7XRRIDuU2O', '2023-02-27 17:43:37', '2023-02-27 18:19:11', 'default.jpg', 'Técnico en telecomunicaciones');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conversaciones`
--
ALTER TABLE `conversaciones`
  ADD CONSTRAINT `conversaciones_ibfk_1` FOREIGN KEY (`id_primerUsuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `conversaciones_ibfk_2` FOREIGN KEY (`id_segundoUsuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`id_conversacion`) REFERENCES `conversaciones` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
