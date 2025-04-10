USE spotify_db;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

select * from users;

INSERT INTO users (username, email, password) VALUES ('prajwal', 'prajwal@gmail.com', '12345');

CREATE table artists(
	artist_id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP default current_timestamp
);

create table albums(
	album_id INT auto_increment PRIMARY KEY,
    artist_id INT NOT NULL,
    title varchar(255) NOT NULL,
    release_date DATE,
    cover_image VARCHAR(255),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

CREATE TABLE songs(
	song_id INT auto_increment primary key,
    album_id INT,
    artist_id INT NOT NULL,
    title varchar(100) NOT NULL,
    duration INT,
    audio_url varchar(255),
    foreign key (album_id) references albums(album_id),
    foreign key (artist_id) references artists(artist_id)
);

create table genre(
	genre_id INT auto_increment primary key,
    name varchar(50) NOT NULL unique
);

create table song_genres(
	song_id INT,
    genre_id INT,
    primary key (song_id, genre_id),
    foreign key (song_id) references songs(song_id),
    foreign key (genre_id) references genre(genre_id)
);

CREATE TABLE playlists (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

create table playlist_songs(
	playlist_id BIGINT,
    song_id INT,
    PRIMARY KEY (playlist_id, song_id),
    foreign key (playlist_id) references playlists(id),
    foreign key (song_id) references songs(song_id)
);

show tables;
select * from users;
use spotify_db;
DELETE FROM users WHERE id = "13";



select * from playlists;

INSERT INTO playlists (user_id, name, is_public)
VALUES 
(12, 'Chill Vibes', TRUE),
(12, 'Workout Hits', TRUE),
(10, 'Coding Music', FALSE);

select * from users;
use spotify_db;
show tables;
