class producto {
    constructor(categoria, nombre, descripcionCorta, descripcion, imagen, precio) {
        this.categoria = categoria;
        this.nombre = nombre;
        this.descripcionCorta = descripcionCorta
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
    }
}

let destacados = [];
let pcsEscritorio = [];
let notebooks = [];
let consolas = [];

async function obtDestacados(){
    const resultado = await fetch("http://localhost:4000/obtProdDestacado", {
                                method: "GET",
                            });
    const parseResultado = await resultado.json();
    return destacados = parseResultado.data;
}

async function obtPCEscritorio(){
    const resultado = await fetch("http://localhost:4000/obtProductosPC", {
                                method: "GET",
                            });
    const parseResultado = await resultado.json();
    return pcsEscritorio = parseResultado.data;
}

async function obtNotebook(){
    const resultado = await fetch("http://localhost:4000/obtProductosNot", {
                                method: "GET",
                            });
    const parseResultado = await resultado.json();
    return notebooks = parseResultado.data;
}

async function obtConsolas(){
    const resultado = await fetch("http://localhost:4000/obtProductosCons", {
                                method: "GET",
                            });
    const parseResultado = await resultado.json();
    return consolas = parseResultado.data;
}

/*let destacados = [
    new producto('destacados','Equipo Intel Core I3 Comet Lake', 'Equipo Intel Core I3 Comet Lake', 'Equipo Intel Core I3 Comet Lake', './Recursos/pcEscritorio/intelCoreI3.webp', 490),
    new producto('destacados','LENOVO NOTEBOOK L340-17API RYZEN 5', 'LENOVO NOTEBOOK L340-17API RYZEN 5', 'LENOVO NOTEBOOK L340-17API RYZEN 5', './Recursos/notebook/LenovoL340.jpg', 745),
    new producto('destacados','NOTEBOOK HP GAMING 15', 'NOTEBOOK HP GAMING 15', 'NOTEBOOK HP GAMING 15', './Recursos/notebook/HPGaming.jpg', 1295),
    new producto('destacados', 'Equipo Intel Dualcore G4930 SSD', 'Equipo Intel Dualcore G4930 SSD', 'Equipo Intel Dualcore G4930 SSD', './Recursos/pcEscritorio/intelDualCore.png', 290),
    new producto('destacados','Xbox Series X', 'Microsoft Consola Xbox Series X 1TB', 'Microsoft Consola Xbox Series X 1TB', './Recursos/consolas/XboxX.jpg', 1297),
    new producto('destacados','PlayStation 5', 'Consola SONY PlayStation 5 AMD','Consola SONY PlayStation 5 AMD Radeon 825GB Blu-ray Ultra HD', './Recursos/consolas/playstation5.jpg', 1549)
];

let pcsEscritorio = [
    new producto('pcEscritorio', 'Equipo Intel Dualcore G4930 SSD', 'Equipo Intel Dualcore G4930 SSD', 'Equipo Intel Dualcore G4930 SSD', './Recursos/pcEscritorio/intelDualCore.png', 290),
    new producto('pcEscritorio','Equipo AMD E1 2100e – 8G – SSD', 'Equipo AMD E1 2100e – 8G – SSD', 'Equipo AMD E1 2100e – 8G – SSD', './Recursos/pcEscritorio/AMDE1.webp', 240),
    new producto('pcEscritorio','Equipo Intel Core I3 Comet Lake', 'Equipo Intel Core I3 Comet Lake', 'Equipo Intel Core I3 Comet Lake', './Recursos/pcEscritorio/intelCoreI3.webp', 490),
    new producto('pcEscritorio','Equipo AMD Ryzen 3 2200G Gamer', 'Equipo AMD Ryzen 3 2200G Gamer', 'Equipo AMD Ryzen 3 2200G Gamer', './Recursos/pcEscritorio/AMDRyzen3.webp', 450),
    new producto('pcEscritorio','Equipo Intel Core I5 10400f Full Gamer 16Gb + SSD + GTX1650 SUPER', 'Equipo Intel Core I5 10400f Full Gamer 16Gb + SSD + GTX1650 SUPER', 'Equipo Intel Core I5 10400f Full Gamer 16Gb + SSD + GTX1650 SUPER', './Recursos/pcEscritorio/intelCoreI5.jpg', 1150),
    new producto('pcEscritorio','Equipo AMD Ryzen 5 3500X PRO Gamer con GTX1660', 'Equipo AMD Ryzen 5 3500X PRO Gamer con GTX1660', 'Equipo AMD Ryzen 5 3500X PRO Gamer con GTX1660', './Recursos/pcEscritorio/AMDRyzen5.jpg', 1100)
];

let notebooks = [
    new producto('Notebook','LENOVO NOTEBOOK L340-17API RYZEN 5', 'LENOVO NOTEBOOK L340-17API RYZEN 5', 'LENOVO NOTEBOOK L340-17API RYZEN 5', './Recursos/notebook/LenovoL340.jpg', 745),
    new producto('Notebook', 'HP NOTEBOOK 14-DK1025WM', 'HP NOTEBOOK 14-DK1025WM', 'HP NOTEBOOK 14-DK1025WM', './Recursos/notebook/HP14.jpg', 688),
    new producto('Notebook','DELL NOTEBOOK L341I5CL Core i5', 'DELL NOTEBOOK L341I5CL Core i5', 'DELL NOTEBOOK L341I5CL Core i5', './Recursos/notebook/DellL341.jpg', 878),
    new producto('Notebook','Asus Zenbook Q407i Ryzen 5', 'Asus Zenbook Q407i Ryzen 5', 'Asus Zenbook Q407i Ryzen 5', './Recursos/notebook/AsusZenBook.jpg', 1160),
    new producto('Notebook','MSI MODERN AMD RYZEN 5', 'MSI MODERN AMD RYZEN 5', 'MSI MODERN AMD RYZEN 5', './Recursos/notebook/MSIModern.png', 1174),
    new producto('Notebook','NOTEBOOK HP GAMING 15', 'NOTEBOOK HP GAMING 15', 'NOTEBOOK HP GAMING 15', './Recursos/notebook/HPGaming.jpg', 1295)
];

let consolas = [
    new producto('Consolas','PlayStation 5', 'Consola SONY PlayStation 5 AMD','Consola SONY PlayStation 5 AMD Radeon 825GB Blu-ray Ultra HD', './Recursos/consolas/playstation5.jpg', 1549),
    new producto('Consolas','PlayStation 4', 'Consola PS4 bundle mega pack 15 1TB', 'Consola PS4 bundle mega pack 15 1TB', './Recursos/consolas/ps4.webp', 749),
    new producto('Consolas','Nintendo Switch', 'Consola NINTENDO switch lite', 'Consola NINTENDO switch lite', './Recursos/consolas/nintendoswitch.webp', 469),
    new producto('Consolas','Xbox Series X', 'Microsoft Consola Xbox Series X 1TB', 'Microsoft Consola Xbox Series X 1TB', './Recursos/consolas/XboxX.jpg', 1297),
    new producto('Consolas','Anbernic Retro RG350', 'Consola Portátil ANBERNIC RETRO RG350', 'Consola Portátil ANBERNIC RETRO RG350', './Recursos/consolas/ANBERNIC.jpg', 141),
    new producto('Consolas','NEOGEO MINI 40 GAMES', 'NEOGEO MINI 40 GAMES', 'NEOGEO MINI 40 GAMES', './Recursos/consolas/NEOGEO.jpg', 204)
];*/