import mysql from "mysql2/promise";
import pc from "picocolors";

const config = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "durostore_db",
};

let connection;

try {
    connection = await mysql.createConnection(config);
}  catch (error) {
    console.error("\n" + pc.red("Error al conectar en la base de datos") + "\n")

    if (error.code === "ECONNREFUSED") {
        console.error("\n" + pc.yellow("Esa base de datos esta apagada baboso!") + "\n");
    }

    connection = null;
}

export class DuroModel {
    static async getAll() {
        try {
            const [usuarios] = await connection.query("SELECT * FROM usuarios");
            const [productos] = await connection.query("SELECT BIN_TO_UUID(id) AS id, img1 AS front_img, img2 AS back_img, name, description, price, stock, provider, date FROM productos");
            return { usuarios, productos };
        } catch (error) {
            throw new Error("Error consultando la base de datos", error);
        }
    }
    
    static async countAll() {
        try {
            const [usuariosRows] = await connection.query("SELECT COUNT(*) AS total FROM usuarios")
            const [productosRows] = await connection.query("SELECT COUNT(*) AS total FROM productos")
            return { usuarios: usuariosRows[0].total, productos: productosRows[0].total,}

        } catch (error) {
            throw new Error("Error al contar los datos", error)
        }
    }
}

DuroModel.getAll()
    .then(({ usuarios, productos }) => {
        console.log("\n" + pc.green("TABLA DE USUARIOS:") + "\n");
        console.log(usuarios);
        console.log("\n" + pc.green("-TABLA DE PRODUCTOS:") + "\n");
        console.log(productos);
    })
    .catch(err => {
        console.error(pc.red("Papi que es esto?"));
        console.error(pc.yellow(err.message));
});