CREATE DATABASE sistema;

USE sistema;

CREATE TABLE marca(
    mar_codigo INT NOT NULL AUTO_INCREMENT,
    mar_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_marca PRIMARY KEY(mar_codigo)
);

CREATE TABLE console(
    cons_codigo INT NOT NULL AUTO_INCREMENT,
    cons_descricao VARCHAR(100) NOT NULL,
    cons_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    cons_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    cons_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    mar_codigo INT NOT NULL,
    CONSTRAINT pk_console PRIMARY KEY(cons_codigo)
);

INSERT INTO marca (mar_descricao)
VALUES ('Sony');

INSERT INTO marca (mar_descricao)
VALUES ('Nintendo');

INSERT INTO marca (mar_descricao)
VALUES ('Microsoft');

INSERT INTO marca (mar_descricao)
VALUES ('Sega');

INSERT INTO marca (mar_descricao)
VALUES ('Atari');

Select * From console;

INSERT INTO console (cons_descricao, cons_precoCusto, cons_precoVenda, cons_qtdEstoque, mar_codigo)
VALUES
  ('PlayStation 5', 3500.00, 4999.99, 100, 1),
  ('Nintendo Switch OLED', 2500.00, 3499.99, 50, 2),
  ('Xbox Series X', 3200.00, 4699.99, 80, 3),
  ('Sega Genesis Mini', 1200.00, 1999.99, 20, 4),
  ('Atari 2600 Plus', 800.00, 1499.99, 30, 5);
  
INSERT INTO console (cons_descricao, cons_precoCusto, cons_precoVenda, cons_qtdEstoque, mar_codigo)
VALUES
  ('PlayStation 4 Pro', 2500.00, 3999.99, 50, 1),
  ('Nintendo Switch Lite', 1800.00, 2499.99, 30, 2),
  ('Xbox One X', 2800.00, 4299.99, 40, 3),
  ('Sega Dreamcast', 1000.00, 1699.99, 15, 4),
  ('Atari 7800', 700.00, 1299.99, 25, 5),
  ('PlayStation 3 Slim', 1500.00, 2499.99, 20, 1),
  ('Nintendo Wii U', 2000.00, 2999.99, 25, 2),
  ('Xbox 360', 1200.00, 1999.99, 30, 3),
  ('Sega Saturn', 800.00, 1499.99, 10, 4),
  ('Atari 5200', 600.00, 1199.99, 15, 5);