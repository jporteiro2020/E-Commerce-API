--pass 12345
insert into usuario values ('default@protonmail.com', 'default', 'default', 'direccion', 'default', '$2b$16$Z82lyGgOM/zxF2djZfLr0eAABJg0nzNZDfTS4ozH0dbnEqj3CS1uu');

insert into producto (nombre, descripcionCorta, descripcion, imagen, precio, stock) values ('Equipo Intel Dualcore G4930 SSD', 'Equipo Intel Dualcore G4930 SSD', 'Equipo Intel Dualcore G4930 SSD', './Recursos/pcEscritorio/intelDualCore.png', 290, 20),
                                                                                           ('Equipo AMD E1 2100e – 8G – SSD', 'Equipo AMD E1 2100e – 8G – SSD', 'Equipo AMD E1 2100e – 8G – SSD', './Recursos/pcEscritorio/AMDE1.webp', 240, 30),
                                                                                           ('Equipo Intel Core I3 Comet Lake'                                  , 'Equipo Intel Core I3 Comet Lake'                                  , 'Equipo Intel Core I3 Comet Lake'                                  , './Recursos/pcEscritorio/intelCoreI3.webp',  490, 10),
                                                                                           ('Equipo AMD Ryzen 3 2200G Gamer'                                   , 'Equipo AMD Ryzen 3 2200G Gamer'                                   , 'Equipo AMD Ryzen 3 2200G Gamer'                                   , './Recursos/pcEscritorio/AMDRyzen3.webp'  ,  450, 15),
                                                                                           ('Equipo Intel Core I5 10400f Full Gamer 16Gb + SSD + GTX1650 SUPER', 'Equipo Intel Core I5 10400f Full Gamer 16Gb + SSD + GTX1650 SUPER', 'Equipo Intel Core I5 10400f Full Gamer 16Gb + SSD + GTX1650 SUPER', './Recursos/pcEscritorio/intelCoreI5.jpg' , 1150, 25),
                                                                                           ('Equipo AMD Ryzen 5 3500X PRO Gamer con GTX1660'                   , 'Equipo AMD Ryzen 5 3500X PRO Gamer con GTX1660'                   , 'Equipo AMD Ryzen 5 3500X PRO Gamer con GTX1660'                   , './Recursos/pcEscritorio/AMDRyzen5.jpg'   , 1100, 35),
																						   ('LENOVO NOTEBOOK L340-17API RYZEN 5'                               , 'LENOVO NOTEBOOK L340-17API RYZEN 5'                               , 'LENOVO NOTEBOOK L340-17API RYZEN 5'                               , './Recursos/notebook/LenovoL340.jpg'      ,  745,  5),
                                                                                           ('HP NOTEBOOK 14-DK1025WM'                                          , 'HP NOTEBOOK 14-DK1025WM'                                          , 'HP NOTEBOOK 14-DK1025WM'                                          , './Recursos/notebook/HP14.jpg'            ,  688,  9),
                                                                                           ('DELL NOTEBOOK L341I5CL Core i5'                                   , 'DELL NOTEBOOK L341I5CL Core i5'                                   , 'DELL NOTEBOOK L341I5CL Core i5'                                   , './Recursos/notebook/DellL341.jpg'        ,  878,  3),
                                                                                           ('Asus Zenbook Q407i Ryzen 5'                                       , 'Asus Zenbook Q407i Ryzen 5'                                       , 'Asus Zenbook Q407i Ryzen 5'                                       , './Recursos/notebook/AsusZenBook.jpg'     , 1160, 12),
                                                                                           ('MSI MODERN AMD RYZEN 5'                                           , 'MSI MODERN AMD RYZEN 5'                                           , 'MSI MODERN AMD RYZEN 5'                                           , './Recursos/notebook/MSIModern.png'       , 1174,  7),
                                                                                           ('NOTEBOOK HP GAMING 15'                                            , 'NOTEBOOK HP GAMING 15'                                            , 'NOTEBOOK HP GAMING 15'                                            , './Recursos/notebook/HPGaming.jpg'        , 1295, 11),
																						   ('PlayStation 5'                                                    , 'Consola SONY PlayStation 5 AMD'                                   ,'Consola SONY PlayStation 5 AMD Radeon 825GB Blu-ray Ultra HD'      , './Recursos/consolas/playstation5.jpg'    , 1549, 10),
																						   ('PlayStation 4'                                                    , 'Consola PS4 bundle mega pack 15 1TB'                              , 'Consola PS4 bundle mega pack 15 1TB'                              , './Recursos/consolas/ps4.webp'            ,  749, 15),
																						   ('Nintendo Switch'                                                  , 'Consola NINTENDO switch lite'                                     , 'Consola NINTENDO switch lite'                                     , './Recursos/consolas/nintendoswitch.webp' ,  469, 20),
																						   ('Xbox Series X'                                                    , 'Microsoft Consola Xbox Series X 1TB'                              , 'Microsoft Consola Xbox Series X 1TB'                              , './Recursos/consolas/XboxX.jpg'           , 1297, 12),
																						   ('Anbernic Retro RG350'                                             , 'Consola Portátil ANBERNIC RETRO RG350'                            , 'Consola Portátil ANBERNIC RETRO RG350'                            , './Recursos/consolas/ANBERNIC.jpg'        ,  141, 30),
																						   ('NEOGEO MINI 40 GAMES'                                             , 'NEOGEO MINI 40 GAMES'                                             , 'NEOGEO MINI 40 GAMES'                                             , './Recursos/consolas/NEOGEO.jpg'          ,  204, 30);

insert into pcsEscritorio values (1), (2), (3), (4), (5), (6);

insert into notebook values (7), (8), (9), (10), (11), (12);

insert into consola values (13, 'PLAYSTATION'), (14, 'PLAYSTATION'), (15, 'NINTENDO'), (16, 'XBOX'), (17, 'RETRO'), (18, 'RETRO');

insert into venta (idVenta, idProducto, email, fecha, hora, cantidad) values (nextval('sec_venta'), 1, 'default@protonmail.com', current_date, current_time, 10),
                                                          (nextval('sec_venta'), 1, 'default@protonmail.com', current_date, current_time, 5),
														  (nextval('sec_venta'), 1, 'default@protonmail.com', current_date, current_time, 10),
														  (nextval('sec_venta'), 2, 'default@protonmail.com', current_date, current_time, 15),
														  (nextval('sec_venta'), 2, 'default@protonmail.com', current_date, current_time, 20),
														  (nextval('sec_venta'), 2, 'default@protonmail.com', current_date, current_time, 25),
														  (nextval('sec_venta'), 3, 'default@protonmail.com', current_date, current_time, 30),
														  (nextval('sec_venta'), 3, 'default@protonmail.com', current_date, current_time, 35),
														  (nextval('sec_venta'), 3, 'default@protonmail.com', current_date, current_time, 40),
														  (nextval('sec_venta'), 3, 'default@protonmail.com', current_date, current_time, 45),
														  (nextval('sec_venta'), 4, 'default@protonmail.com', current_date, current_time, 50),
														  (nextval('sec_venta'), 4, 'default@protonmail.com', current_date, current_time, 55),
														  (nextval('sec_venta'), 4, 'default@protonmail.com', current_date, current_time, 60),
														  (nextval('sec_venta'), 4, 'default@protonmail.com', current_date, current_time, 65),
														  (nextval('sec_venta'), 5, 'default@protonmail.com', current_date, current_time, 70),
														  (nextval('sec_venta'), 5, 'default@protonmail.com', current_date, current_time, 75),
														  (nextval('sec_venta'), 5, 'default@protonmail.com', current_date, current_time, 80),
														  (nextval('sec_venta'), 5, 'default@protonmail.com', current_date, current_time, 85),
														  (nextval('sec_venta'), 5, 'default@protonmail.com', current_date, current_time, 90);