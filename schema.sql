CREATE DATABASE bridge_the_gap_db; 
USE bridge_the_gap_db;

CREATE TABLE homeless(
    id int NOT NULL AUTO_INCREMENT, 
    fullName varchar(255) NOT NULL, 
    email varchar(255), 
    phoneNumber varchar(255), 
    maillingAddress varchar (255), 
    catagory varchar(255), 
    explination varchar(255), 
    quantity int,
    PRIMARY KEY (id)
);

CREATE TABLE agency_need(
    id int NOT NULL AUTO_INCREMENT, 
    fullName varchar(255) NOT NULL, 
    email varchar(255), 
    phoneNumber varchar(255), 
    maillingAddress varchar (255), 
    catagory varchar(255), 
    explination varchar(255), 
    quantity int,
    PRIMARY KEY (id)
);

CREATE TABLE agency_supply(
    id int NOT NULL AUTO_INCREMENT, 
    fullName varchar(255) NOT NULL, 
    email varchar(255), 
    phoneNumber varchar(255), 
    maillingAddress varchar (255), 
    catagory varchar(255), 
    explination varchar(255), 
    quantity int,
    PRIMARY KEY (id)
);

CREATE TABLE volunteer(
    id int NOT NULL AUTO_INCREMENT, 
    fullName varchar(255) NOT NULL, 
    email varchar(255), 
    phoneNumber varchar(255), 
    maillingAddress varchar (255), 
    catagory varchar(255), 
    explination varchar(255), 
    quantity int,
    PRIMARY KEY (id)
);
