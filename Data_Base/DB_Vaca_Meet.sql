-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 19 juil. 2024 à 10:58
-- Version du serveur : 10.5.23-MariaDB-0+deb11u1
-- Version de PHP : 8.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Vaca_Meet`
--

-- --------------------------------------------------------

--
-- Structure de la table `ACTIVITY`
--

CREATE TABLE `ACTIVITY` (
  `id_activity` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `idCamping` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `ACTIVITY`
--

INSERT INTO `ACTIVITY` (`id_activity`, `libelle`, `idCamping`) VALUES
(1, 'tournoi de foot !', 1),
(2, 'Tournoi de pétanque', 1);

-- --------------------------------------------------------

--
-- Structure de la table `CAMPING`
--

CREATE TABLE `CAMPING` (
  `id_camping` int(11) NOT NULL,
  `nom_camping` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `siret` int(11) NOT NULL,
  `map` longblob DEFAULT NULL,
  `password` varchar(1000) NOT NULL,
  `mdp_vacancier` varchar(1000) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`roles`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `CAMPING`
--

INSERT INTO `CAMPING` (`id_camping`, `nom_camping`, `email`, `siret`, `map`, `password`, `mdp_vacancier`, `is_verified`, `roles`) VALUES
(1, 'camping PAGO', 'adrien.pago@gmail.com', 15151515, NULL, '$2y$13$OPzVD7dBebCyBSDXLC0UfeeYq6ocbSULW6OZ1LAeioZLuYodWps8O', '$2y$13$sVpMe0C8HgJMbH7FO3LMaulErA5RHLArk87YP0rkhIYiLPb3EOiga', 1, '[]'),
(2, 'camping ESIA', 'adrien.pago@campusermitage.com', 789, NULL, '$2y$13$qIn32EGiNwjTFd1XEtet2OCHYA/I4aRi3/C5.8tvYhgGqlmovwEQS', NULL, 0, '[]');

-- --------------------------------------------------------

--
-- Structure de la table `COMPTE_VACA_MEET`
--

CREATE TABLE `COMPTE_VACA_MEET` (
  `idCompteVaca` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `mdpVaca` varchar(10000) NOT NULL,
  `email` varchar(100) NOT NULL,
  `isVerified` int(2) NOT NULL,
  `tokenComfirm` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `COMPTE_VACA_MEET`
--

INSERT INTO `COMPTE_VACA_MEET` (`idCompteVaca`, `nom`, `mdpVaca`, `email`, `isVerified`, `tokenComfirm`) VALUES
(1, 'adrien', '$2y$10$DAApam/aJK3PyqF1PpkrQemRD.PIZ4suIsL1XOsnj0duuaTNpTClm', 'adrien.pago@gmail.com', 1, '7044e9b58d0fb7d33bacde2bfcce780ae670a29f52808547ae438951d57c507c'),
(2, 'paul', '$2y$10$HVgB//DVMRB5X2Lph63V2umn4CwmXC2j8f1ZS0nYUcY4JvSQHbFdW', 'adrien.pago@campusermitage.com', 1, '9ac9758ccaa158dfd7de5e7c0004a45e91240933ce667e268522a484bd46d561');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20240626115331', '2024-06-26 13:54:11', 6),
('DoctrineMigrations\\Version20240627081253', '2024-06-27 10:13:46', 13),
('DoctrineMigrations\\Version20240709141457', '2024-07-09 16:15:27', 15),
('DoctrineMigrations\\Version20240716180511', '2024-07-16 18:05:11', 3),
('DoctrineMigrations\\Version20240717141615', '2024-07-17 14:16:15', 2),
('DoctrineMigrations\\Version20240717172943', '2024-07-17 17:29:43', 2);

-- --------------------------------------------------------

--
-- Structure de la table `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `PARTICIPANT_ROOM_EVENT`
--

CREATE TABLE `PARTICIPANT_ROOM_EVENT` (
  `id_room_event` int(11) NOT NULL,
  `id_vaca` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `PARTICIPANT_ROOM_EVENT`
--

INSERT INTO `PARTICIPANT_ROOM_EVENT` (`id_room_event`, `id_vaca`) VALUES
(3, 1),
(1, 1),
(5, 1),
(3, 2),
(4, 2),
(1, 2),
(7, 2);

-- --------------------------------------------------------

--
-- Structure de la table `PLANNING`
--

CREATE TABLE `PLANNING` (
  `id_planning` int(11) NOT NULL,
  `libelle_activity` varchar(100) NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `idCamping` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `PLANNING`
--

INSERT INTO `PLANNING` (`id_planning`, `libelle_activity`, `date_debut`, `date_fin`, `idCamping`) VALUES
(1, 'foot', '2024-07-10 14:30:00', '2024-07-10 15:30:00', 1),
(2, 'pétanque', '2024-07-10 17:00:00', '2024-07-10 18:30:00', 1),
(3, 'volley', '2024-07-10 07:00:00', '2024-07-10 11:30:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `ROOM_EVENT`
--

CREATE TABLE `ROOM_EVENT` (
  `id_room_event` int(11) NOT NULL,
  `id_compte_vaca` int(11) NOT NULL,
  `date_time_event` datetime NOT NULL,
  `libelle` varchar(100) NOT NULL,
  `nb_vaca` int(11) NOT NULL,
  `id_camping` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `ROOM_EVENT`
--

INSERT INTO `ROOM_EVENT` (`id_room_event`, `id_compte_vaca`, `date_time_event`, `libelle`, `nb_vaca`, `id_camping`) VALUES
(1, 1, '2024-07-11 09:00:00', 'foot', 2, 1),
(2, 1, '2024-07-10 15:00:00', 'tennis', 1, 1),
(3, 1, '2024-07-11 17:37:00', 'pétanque', 1, 1),
(4, 1, '2024-07-11 08:12:00', 'surf a la plage sud', 1, 1),
(5, 1, '2024-07-11 20:20:00', 'Apéro ', 1, 1),
(7, 2, '2024-07-11 14:32:00', 'test paul', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `STRUCTURE`
--

CREATE TABLE `STRUCTURE` (
  `id_structure` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `nb_structure` int(11) NOT NULL,
  `etat_structure` varchar(20) DEFAULT NULL,
  `idCamping` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `STRUCTURE`
--

INSERT INTO `STRUCTURE` (`id_structure`, `libelle`, `nb_structure`, `etat_structure`, `idCamping`) VALUES
(14, 'terrain de foot', 12, NULL, 1),
(16, 'terrain de volley', 15, NULL, 1),
(19, 'jeux extérieur', 1, NULL, 1),
(21, 'Bar', 4, NULL, 1),
(23, 'trampoline', 10, NULL, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ACTIVITY`
--
ALTER TABLE `ACTIVITY`
  ADD PRIMARY KEY (`id_activity`),
  ADD KEY `IDX_6A47951691106F16` (`idCamping`);

--
-- Index pour la table `CAMPING`
--
ALTER TABLE `CAMPING`
  ADD PRIMARY KEY (`id_camping`),
  ADD UNIQUE KEY `UNIQ_BEECFAFEE7927C74` (`email`);

--
-- Index pour la table `COMPTE_VACA_MEET`
--
ALTER TABLE `COMPTE_VACA_MEET`
  ADD PRIMARY KEY (`idCompteVaca`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`);

--
-- Index pour la table `PLANNING`
--
ALTER TABLE `PLANNING`
  ADD PRIMARY KEY (`id_planning`),
  ADD KEY `IDX_12AA23BA91106F16` (`idCamping`);

--
-- Index pour la table `ROOM_EVENT`
--
ALTER TABLE `ROOM_EVENT`
  ADD PRIMARY KEY (`id_room_event`);

--
-- Index pour la table `STRUCTURE`
--
ALTER TABLE `STRUCTURE`
  ADD PRIMARY KEY (`id_structure`),
  ADD KEY `IDX_2BC3290591106F16` (`idCamping`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ACTIVITY`
--
ALTER TABLE `ACTIVITY`
  MODIFY `id_activity` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `CAMPING`
--
ALTER TABLE `CAMPING`
  MODIFY `id_camping` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `COMPTE_VACA_MEET`
--
ALTER TABLE `COMPTE_VACA_MEET`
  MODIFY `idCompteVaca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `PLANNING`
--
ALTER TABLE `PLANNING`
  MODIFY `id_planning` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `ROOM_EVENT`
--
ALTER TABLE `ROOM_EVENT`
  MODIFY `id_room_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `STRUCTURE`
--
ALTER TABLE `STRUCTURE`
  MODIFY `id_structure` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ACTIVITY`
--
ALTER TABLE `ACTIVITY`
  ADD CONSTRAINT `FK_6A47951691106F16` FOREIGN KEY (`idCamping`) REFERENCES `CAMPING` (`id_camping`);

--
-- Contraintes pour la table `PLANNING`
--
ALTER TABLE `PLANNING`
  ADD CONSTRAINT `FK_12AA23BA91106F16` FOREIGN KEY (`idCamping`) REFERENCES `CAMPING` (`id_camping`);

--
-- Contraintes pour la table `STRUCTURE`
--
ALTER TABLE `STRUCTURE`
  ADD CONSTRAINT `FK_2BC3290591106F16` FOREIGN KEY (`idCamping`) REFERENCES `CAMPING` (`id_camping`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
