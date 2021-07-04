create database "tienda";

create table USUARIO(
	email       VARCHAR(100) NOT NULL,
	nombre      VARCHAR(60)  NOT NULL,
	apellido    VARCHAR(60)  NOT NULL,
	direccion   VARCHAR(150) NOT NULL,
    telefono    VARCHAR(9)   NOT NULL,
	contrasenia VARCHAR(200)  NOT NULL
);

alter table USUARIO
  add constraint PK_USUARIO primary key (email);

alter table USUARIO
  add constraint UK_USUARIO unique (telefono);

/*CREATE FUNCTION funcInsertUsuario()
	RETURNS trigger AS
$BODY$
DECLARE
pass   VARCHAR(200);
BEGIN
	pass = PGP_SYM_ENCRYPT(NEW.contrasenia,'AES_KEY');
	NEW.contrasenia = pass;
	RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

drop function funcInsertUsuario();

CREATE TRIGGER insertUsuario
  BEFORE INSERT
  ON USUARIO
  FOR EACH ROW
  EXECUTE PROCEDURE funcInsertUsuario();

DROP TRIGGER insertUsuario ON usuario;

SELECT nombre, pgp_sym_decrypt(contrasenia::bytea,'AES_KEY') FROM usuario;*/

create table LOGIN(
	email        VARCHAR(100) NOT NULL,
	token        VARCHAR(250) NOT NULL,
	fecha        DATE         NOT NULL,
	hora         TIME         NOT NULL,
	sesionActiva CHAR(1)      NOT NULL
);

alter table LOGIN
  add constraint PK_LOGIN primary key (email, token, fecha, hora);

alter table LOGIN 
	add constraint CK_LOGIN check (sesionActiva in ('S', 'N'));

create table producto(
	id               SERIAL       NOT NULL,
	nombre           VARCHAR(80)  NOT NULL,
	descripcionCorta VARCHAR(100)  NOT NULL,
	descripcion      VARCHAR(200) NOT NULL,
	imagen           VARCHAR(100) NOT NULL,
	precio           NUMERIC(7,2) NOT NULL,
	stock            NUMERIC      NOT NULL
);

alter table producto
	add constraint PK_PRODUCTO primary key (id);

CREATE INDEX I_PRODUCTO ON producto (nombre);

create sequence sec_venta
  minvalue 0
  maxvalue 9999999
  increment by 1;

create table venta(
	idVenta    NUMERIC      NOT NULL,
	idProducto integer      NOT NULL,
	email      VARCHAR(100) NOT NULL,
	fecha      DATE         NOT NULL,
	hora       TIME         NOT NULL,
	cantidad   NUMERIC      NOT NULL
);

alter table venta
	add constraint PK_VENTA primary key (idVenta, idProducto, email, fecha, hora);

alter table venta
	add constraint FK_VENTA_ID FOREIGN KEY (idProducto) REFERENCES producto(id);

/*alter table venta
	add constraint FK_VENTA_USUARIO FOREIGN KEY (email) REFERENCES usuario(email);*/

CREATE INDEX I_VENTA_ID      ON venta (idProducto);
CREATE INDEX I_VENTA_USUARIO ON venta (email);

CREATE VIEW destacado
 AS SELECT distinct(v.idProducto) as idProducto
	  FROM producto p, venta v
     WHERE p.id = v.idProducto
	   and v.idProducto in (SELECT distinct(resultado.idProducto)
						      FROM (SELECT v.idProducto, sum(v.cantidad) as cantidad
							  		  FROM producto p, venta v
									 WHERE p.id = v.idProducto
									GROUP BY v.idProducto
									ORDER BY cantidad DESC
									LIMIT 6
							  ) resultado);

create table pcsEscritorio(
	idProducto integer NOT NULL
);

alter table pcsEscritorio
	add constraint PK_PCSESCRITORIO PRIMARY KEY (idProducto);

alter table pcsEscritorio
	add constraint FK_PCSESCRITORIO FOREIGN KEY (idProducto) REFERENCES producto (id);

create table notebook(
	idProducto integer NOT NULL
);

alter table notebook
	add constraint PK_NOTEBOOK PRIMARY KEY (idProducto);

alter table notebook
	add constraint FK_NOTEBOOK FOREIGN KEY (idProducto) REFERENCES producto (id);

create table consola(
	idProducto   integer NOT NULL,
	subCategoria VARCHAR(50) NOT NULL
);

alter table consola
	add constraint PK_CONSOLA PRIMARY KEY (idProducto);

alter table consola
	add constraint FK_CONSOLA FOREIGN KEY (idProducto) REFERENCES producto (id);

CREATE INDEX I_CONSOLA ON consola (subCategoria);

create table carrito(
	idProducto integer      NOT NULL,
	email      VARCHAR(100) NOT NULL,
	fecha      DATE         NOT NULL,
	hora       TIME         NOT NULL,
	cantidad   NUMERIC      NOT NULL
);

alter table carrito
	add constraint PK_CARRITO primary key (idProducto, email);

alter table carrito
	add constraint FK_CARRITO_ID FOREIGN KEY (idProducto) REFERENCES producto(id);

alter table carrito
	add constraint FK_CARRITO_USUARIO FOREIGN KEY (email) REFERENCES usuario(email);

CREATE INDEX I_CARRITO_USUARIO ON carrito (email);

create table suscripcion(
	nombre      VARCHAR(60)  NOT NULL,
	email       VARCHAR(100) NOT NULL
);

alter table suscripcion
  add constraint PK_SUSCRIPCION primary key (email);