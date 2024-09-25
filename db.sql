CREATE DATABASE crowdfunding_db;
USE crowdfunding_db;

CREATE TABLE CATEGORY (
  CATEGORY_ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(50) NOT NULL
);

CREATE TABLE FUNDRAISER (
  FUNDRAISER_ID INT PRIMARY KEY AUTO_INCREMENT,
  ORGANIZER VARCHAR(100) NOT NULL,
  CAPTION VARCHAR(255) NOT NULL,
  TARGET_FUNDING DECIMAL(10, 2) NOT NULL,
  CURRENT_FUNDING DECIMAL(10, 2) NOT NULL DEFAULT 0,
  CITY VARCHAR(100) NOT NULL,
  ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
  CATEGORY_ID INT,
  FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
);

INSERT INTO CATEGORY (NAME) VALUES 
('Medical'), ('Education'), ('Social Impact'), ('Crisis Relief'), ('Environment');

INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES
('Jackson Family', 'Help The Jackson\'s Rebuild After Flood', 10000.00, 7730.00, 'Byron Bay', TRUE, 4),
('Sarah Smith', 'Support Sarah\'s Cancer Treatment', 50000.00, 35000.00, 'Melbourne', TRUE, 1),
('Green Earth Initiative', 'Plant 10,000 Trees in Urban Areas', 25000.00, 15000.00, 'Sydney', TRUE, 5),
('Tech for Kids', 'Provide Laptops for Underprivileged Students', 20000.00, 12000.00, 'Brisbane', TRUE, 2),
('Homeless Shelter Project', 'Expand Local Homeless Shelter', 100000.00, 75000.00, 'Perth', TRUE, 3);
