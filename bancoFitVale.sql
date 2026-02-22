-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para fitvale
CREATE DATABASE IF NOT EXISTS `fitvale` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `fitvale`;

-- Copiando estrutura para tabela fitvale.aluno
CREATE TABLE IF NOT EXISTS `aluno` (
  `codAluno` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `dataNasc` date DEFAULT NULL,
  `sexo` varchar(20) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  `tipoUsuario` varchar(20) DEFAULT NULL,
  `imagem` longtext DEFAULT NULL,
  `statusPagamento` varchar(50) DEFAULT NULL,
  `pagamentoData` date DEFAULT NULL,
  PRIMARY KEY (`codAluno`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela fitvale.aluno: ~6 rows (aproximadamente)
DELETE FROM `aluno`;
INSERT INTO `aluno` (`codAluno`, `nome`, `dataNasc`, `sexo`, `endereco`, `telefone`, `email`, `senha`, `tipoUsuario`, `imagem`, `statusPagamento`, `pagamentoData`) VALUES
	(1, 'Vitor Gabriel Mandira Soares', '2006-08-09', 'Masculino', 'Jacupiranga', '999999999', 'vg', '1234', 'aluno', 'img/perfilVitor.png', 'pago', '2024-12-04'),
	(2, 'Kauã Ribeiro e Moledo', '2006-09-08', 'Feminino', 'Jacupiranga', '999999999', 'kr', '1234', 'instrutor', 'img/perfilMoledo.png', 'pago', '2024-10-23'),
	(8, 'Murilo de Lima Martins', '2006-08-09', 'Masculino', 'Jacupiranga', '12314212', 'ml', '1234', 'instrutor', 'img/muriloPerfil.jpeg', 'pago', NULL),
	(9, 'Geovanna Pereira da Silva', '2006-09-08', 'Feminino', 'Jacupiranga', '888888888', 'gp', '1234', 'aluno', 'img/perfilGeovanna.png', 'vencido', '2024-11-03'),
	(10, 'Ana Flávia Cardozo Ribeiro', '2006-09-08', 'Feminino', 'Jacupiranga', '999999999', 'af', '1234', 'aluno', 'img/perfilFlavia.png', 'pago', '2024-12-04'),
	(11, 'Ana Kelly Santos Mascarenhas', '2006-08-09', 'Feminino', 'Jacupiranga', '999999999', 'ak', '1234', 'aluno', 'img/perfilKelly.png', 'vencido', '2024-05-01');

-- Copiando estrutura para tabela fitvale.canais_chat
CREATE TABLE IF NOT EXISTS `canais_chat` (
  `idCanalChat` int(11) NOT NULL AUTO_INCREMENT,
  `nomeCanal` varchar(50) DEFAULT NULL,
  `idPersonal` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCanalChat`),
  KEY `idPersonal` (`idPersonal`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `canais_chat_ibfk_1` FOREIGN KEY (`idPersonal`) REFERENCES `aluno` (`codAluno`),
  CONSTRAINT `canais_chat_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `aluno` (`codAluno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela fitvale.canais_chat: ~0 rows (aproximadamente)
DELETE FROM `canais_chat`;

-- Copiando estrutura para tabela fitvale.exercicios
CREATE TABLE IF NOT EXISTS `exercicios` (
  `codExercicio` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `grupoMuscular` varchar(255) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`codExercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela fitvale.exercicios: ~5 rows (aproximadamente)
DELETE FROM `exercicios`;
INSERT INTO `exercicios` (`codExercicio`, `nome`, `grupoMuscular`, `imagem`) VALUES
	(1, 'Supino Reto com Barra', 'Peito', 'img/SupinoRetoComBarra'),
	(2, 'Puxada Alta', 'Costas', NULL),
	(3, 'Remada Curvada', 'Costas', NULL),
	(4, 'Rosca Direta com Barra', 'Biceps', NULL),
	(5, 'Rosca Direta com Halteres', 'Biceps', NULL);

-- Copiando estrutura para tabela fitvale.exercicio_treino
CREATE TABLE IF NOT EXISTS `exercicio_treino` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `treinoId` int(11) DEFAULT NULL,
  `codExercicio` int(11) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `series` int(11) DEFAULT NULL,
  `repeticoes` int(11) DEFAULT NULL,
  `carga` decimal(6,2) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `treinoId` (`treinoId`),
  KEY `codExercicio` (`codExercicio`),
  CONSTRAINT `exercicio_treino_ibfk_1` FOREIGN KEY (`treinoId`) REFERENCES `treino` (`id`),
  CONSTRAINT `exercicio_treino_ibfk_2` FOREIGN KEY (`codExercicio`) REFERENCES `exercicios` (`codExercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela fitvale.exercicio_treino: ~1 rows (aproximadamente)
DELETE FROM `exercicio_treino`;
INSERT INTO `exercicio_treino` (`id`, `treinoId`, `codExercicio`, `nome`, `series`, `repeticoes`, `carga`, `imagem`) VALUES
	(1, 1, 1, 'Supino Reto com Barra', 4, 10, 30.00, NULL);

-- Copiando estrutura para tabela fitvale.feedback
CREATE TABLE IF NOT EXISTS `feedback` (
  `codFeedback` int(11) NOT NULL AUTO_INCREMENT,
  `mensagem` longtext DEFAULT NULL,
  `estrelas` int(11) DEFAULT NULL,
  PRIMARY KEY (`codFeedback`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela fitvale.feedback: ~3 rows (aproximadamente)
DELETE FROM `feedback`;
INSERT INTO `feedback` (`codFeedback`, `mensagem`, `estrelas`) VALUES
	(1, 'Achei a academia muito boa!', 5),
	(2, 'Estrutura boa', 4),
	(3, 'Pode melhorar', 3);

-- Copiando estrutura para tabela fitvale.ficha_tecnica
CREATE TABLE IF NOT EXISTS `ficha_tecnica` (
  `codFicha` int(11) NOT NULL AUTO_INCREMENT,
  `altura` varchar(10) DEFAULT NULL,
  `peso` varchar(10) DEFAULT NULL,
  `objetivos` varchar(100) DEFAULT NULL,
  `diasTreino` varchar(250) DEFAULT NULL,
  `experiencia` varchar(250) DEFAULT NULL,
  `preferencia` varchar(250) DEFAULT NULL,
  `restricoes` varchar(250) DEFAULT NULL,
  `habitos` varchar(250) DEFAULT NULL,
  `nivelCondicionamento` varchar(250) DEFAULT NULL,
  `comentarios` varchar(250) DEFAULT NULL,
  `dataEmissao` date DEFAULT NULL,
  `alunoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`codFicha`),
  KEY `alunoId` (`alunoId`),
  CONSTRAINT `ficha_tecnica_ibfk_1` FOREIGN KEY (`alunoId`) REFERENCES `aluno` (`codAluno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela fitvale.ficha_tecnica: ~1 rows (aproximadamente)
DELETE FROM `ficha_tecnica`;
INSERT INTO `ficha_tecnica` (`codFicha`, `altura`, `peso`, `objetivos`, `diasTreino`, `experiencia`, `preferencia`, `restricoes`, `habitos`, `nivelCondicionamento`, `comentarios`, `dataEmissao`, `alunoId`) VALUES
	(1, '176', '76', 'Hipertrofia', 'Seg a Sex', 'Intermediário', 'Musculação', 'Nenhuma', 'Ativo', 'Bom', 'OK', '2024-10-02', 1);

-- Copiando estrutura para tabela fitvale.treino
CREATE TABLE IF NOT EXISTS `treino` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomeTreino` varchar(255) DEFAULT NULL,
  `grupoMuscular` varchar(255) DEFAULT NULL,
  `codAluno` int(11) DEFAULT NULL,
  `image` longtext DEFAULT NULL,
  `imageText` longtext DEFAULT NULL,
  `codInstrutor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `codAluno` (`codAluno`),
  KEY `codInstrutor` (`codInstrutor`),
  CONSTRAINT `treino_ibfk_1` FOREIGN KEY (`codAluno`) REFERENCES `aluno` (`codAluno`),
  CONSTRAINT `treino_ibfk_2` FOREIGN KEY (`codInstrutor`) REFERENCES `aluno` (`codAluno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela fitvale.treino: ~1 rows (aproximadamente)
DELETE FROM `treino`;
INSERT INTO `treino` (`id`, `nomeTreino`, `grupoMuscular`, `codAluno`, `image`, `imageText`, `codInstrutor`) VALUES
	(1, 'A', 'Costas', 1, '48688430.jpeg', 'http://localhost/api/img/48688430.jpeg', 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
