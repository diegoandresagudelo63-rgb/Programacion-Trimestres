import * as readline from "readline";

// Interfaz y datos

interface Usuario {
  nombre: string;
  numeroCuenta: string;
  saldo: number;
}

const usuarios: Usuario[] = [
  { nombre: "Ana García",   numeroCuenta: "001", saldo: 150000  },
  { nombre: "Carlos López", numeroCuenta: "002", saldo: 850000  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntar(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}


// Funciones del sistema

function buscarUsuario(numeroCuenta: string): Usuario | undefined {
  const usuario = usuarios.find((u) => u.numeroCuenta === numeroCuenta);
  if (!usuario) console.log(`\n  No existe cuenta N° ${numeroCuenta}.`);
  return usuario;
}

function listarUsuarios(): void {
  console.log("\n USUARIOS REGISTRADOS:");
  console.log("─".repeat(50));
  usuarios.forEach((u) => {
    console.log(`  Cuenta: ${u.numeroCuenta} | ${u.nombre} | Saldo: $${u.saldo.toLocaleString()}`);
  });
  console.log("─".repeat(50));
}

async function registrarUsuario(): Promise<void> {
  console.log("\n REGISTRAR NUEVO USUARIO");
  const nombre       = await preguntar("  Nombre completo: ");
  const numeroCuenta = await preguntar("  Número de cuenta: ");
  const saldoStr     = await preguntar("  Saldo inicial: ");
  const saldo        = parseFloat(saldoStr);

  if (isNaN(saldo) || saldo < 0) {
    console.log(" Saldo inválido."); return;
  }
  if (usuarios.find((u) => u.numeroCuenta === numeroCuenta)) {
    console.log(` Ya existe la cuenta N° ${numeroCuenta}.`); return;
  }

  usuarios.push({ nombre, numeroCuenta, saldo });
  console.log(` Usuario "${nombre}" registrado correctamente.`);
}

async function depositar(): Promise<void> {
  console.log("\n DEPÓSITO");
  const cuenta  = await preguntar("  Número de cuenta: ");
  const usuario = buscarUsuario(cuenta);
  if (!usuario) return;

  const monto = parseFloat(await preguntar("  Monto a depositar: "));
  if (isNaN(monto) || monto <= 0) { console.log(" Monto inválido."); return; }

  usuario.saldo += monto;
  console.log(` Nuevo saldo de ${usuario.nombre}: $${usuario.saldo.toLocaleString()}`);
}

async function retirar(): Promise<void> {
  console.log("\n RETIRO");
  const cuenta  = await preguntar("  Número de cuenta: ");
  const usuario = buscarUsuario(cuenta);
  if (!usuario) return;

  const monto = parseFloat(await preguntar("  Monto a retirar: "));
  if (isNaN(monto) || monto <= 0) { console.log(" Monto inválido."); return; }

  if (usuario.saldo < monto) {
    console.log(` Saldo insuficiente. Disponible: $${usuario.saldo.toLocaleString()}`);
    return;
  }

  usuario.saldo -= monto;
  console.log(` Nuevo saldo de ${usuario.nombre}: $${usuario.saldo.toLocaleString()}`);
}

async function transferir(): Promise<void> {
  console.log("\n TRANSFERENCIA");
  const cuentaOrigen  = await preguntar("  Cuenta origen: ");
  const cuentaDestino = await preguntar("  Cuenta destino: ");
  const origen  = buscarUsuario(cuentaOrigen);
  const destino = buscarUsuario(cuentaDestino);
  if (!origen || !destino) return;

  const monto = parseFloat(await preguntar("  Monto a transferir: "));
  if (isNaN(monto) || monto <= 0) { console.log(" Monto inválido."); return; }

  if (origen.saldo < monto) {
    console.log(` Saldo insuficiente en cuenta de ${origen.nombre}.`); return;
  }

  origen.saldo  -= monto;
  destino.saldo += monto;
  console.log(` Transferencia de $${monto.toLocaleString()} de ${origen.nombre} ➜ ${destino.nombre} exitosa.`);
}

async function consultarSaldo(): Promise<void> {
  console.log("\n CONSULTAR SALDO");
  const cuenta  = await preguntar("  Número de cuenta: ");
  const usuario = buscarUsuario(cuenta);
  if (usuario) {
    console.log(`  ${usuario.nombre} — Saldo: $${usuario.saldo.toLocaleString()}`);
  }
}


// Menú principal

async function menu(): Promise<void> {
  while (true) {
    console.log("\n" + "─".repeat(30));
    console.log("       BANCO TYPESCRIPT      ");
    console.log("  1. Ver todos los usuarios   ");
    console.log("  2. Registrar usuario        ");
    console.log("  3. Depositar                ");
    console.log("  4. Retirar                  ");
    console.log("  5. Transferir               ");
    console.log("  6. Consultar saldo          ");
    console.log("  7. Salir                    ");

    const opcion = await preguntar("\n  Elige una opción: ");

    switch (opcion.trim()) {
      case "1": listarUsuarios();        break;
      case "2": await registrarUsuario(); break;
      case "3": await depositar();        break;
      case "4": await retirar();          break;
      case "5": await transferir();       break;
      case "6": await consultarSaldo();   break;
      case "7":
        console.log("\n ¡Hasta luego! \n");
        rl.close();
        process.exit(0);
      default:
        console.log("\n Opción inválida. Intenta de nuevo.");
    }
  }
}

menu();
