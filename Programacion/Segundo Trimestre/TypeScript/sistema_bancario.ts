// =============================================
// 🏦 Sistema Bancario - TypeScript
// =============================================

// 1. Interfaz Usuario
interface Usuario {
  nombre: string;
  numeroCuenta: string;
  saldo: number;
}

// 2. Arreglo de usuarios registrados
const usuarios: Usuario[] = [
  { nombre: "Ana García",    numeroCuenta: "001", saldo: 1500000 },
  { nombre: "Carlos López",  numeroCuenta: "002", saldo: 850000  },
  { nombre: "María Torres",  numeroCuenta: "003", saldo: 3200000 },
];

// =============================================
// 3. Función buscarUsuario
// =============================================
function buscarUsuario(numeroCuenta: string): Usuario | undefined {
  const usuario = usuarios.find((u) => u.numeroCuenta === numeroCuenta);
  if (!usuario) {
    console.log(`⚠️  No se encontró ningún usuario con la cuenta N° ${numeroCuenta}.`);
  }
  return usuario;
}

// =============================================
// 4. Función depositar
// =============================================
function depositar(numeroCuenta: string, monto: number): void {
  const usuario = buscarUsuario(numeroCuenta);
  if (usuario) {
    usuario.saldo += monto;
    console.log(`✅ Depósito de $${monto.toLocaleString()} realizado a ${usuario.nombre}. Nuevo saldo: $${usuario.saldo.toLocaleString()}`);
  }
}

// =============================================
// 5. Función retirar
// =============================================
function retirar(numeroCuenta: string, monto: number): void {
  const usuario = buscarUsuario(numeroCuenta);
  if (usuario) {
    if (usuario.saldo < monto) {
      console.log(`❌ Saldo insuficiente para ${usuario.nombre}. Saldo disponible: $${usuario.saldo.toLocaleString()}`);
    } else {
      usuario.saldo -= monto;
      console.log(`✅ Retiro de $${monto.toLocaleString()} realizado a ${usuario.nombre}. Nuevo saldo: $${usuario.saldo.toLocaleString()}`);
    }
  }
}

// =============================================
// VALOR AGREGADO: Transferencia entre usuarios
// =============================================
function transferir(cuentaOrigen: string, cuentaDestino: string, monto: number): void {
  const origen  = buscarUsuario(cuentaOrigen);
  const destino = buscarUsuario(cuentaDestino);

  if (!origen || !destino) return;

  if (origen.saldo < monto) {
    console.log(`❌ Fondos insuficientes en la cuenta de ${origen.nombre} para transferir $${monto.toLocaleString()}`);
    return;
  }

  origen.saldo  -= monto;
  destino.saldo += monto;
  console.log(`🔄 Transferencia de $${monto.toLocaleString()} de ${origen.nombre} ➜ ${destino.nombre} exitosa.`);
}

// =============================================
// VALOR AGREGADO: Consultar saldo
// =============================================
function consultarSaldo(numeroCuenta: string): void {
  const usuario = buscarUsuario(numeroCuenta);
  if (usuario) {
    console.log(`💰 Saldo de ${usuario.nombre} (cuenta ${usuario.numeroCuenta}): $${usuario.saldo.toLocaleString()}`);
  }
}

// =============================================
// VALOR AGREGADO: Registro con validación de cuenta duplicada
// =============================================
function registrarUsuario(nuevoUsuario: Usuario): void {
  const existe = usuarios.find((u) => u.numeroCuenta === nuevoUsuario.numeroCuenta);
  if (existe) {
    console.log(`⚠️  Ya existe una cuenta con el número ${nuevoUsuario.numeroCuenta}. No se puede registrar.`);
    return;
  }
  usuarios.push(nuevoUsuario);
  console.log(`✅ Usuario ${nuevoUsuario.nombre} registrado correctamente.`);
}

// =============================================
// 6. Ejecución y resultados en consola
// =============================================

console.log("=".repeat(50));
console.log("📋 LISTA DE USUARIOS REGISTRADOS");
console.log("=".repeat(50));
console.log(usuarios);

console.log("\n" + "=".repeat(50));
console.log("⚙️  OPERACIONES");
console.log("=".repeat(50));

depositar("001", 500000);         // Depósito a Ana
retirar("002", 200000);           // Retiro de Carlos
retirar("002", 1000000);          // Retiro fallido por saldo insuficiente
transferir("003", "001", 300000); // María le transfiere a Ana
buscarUsuario("999");             // Cuenta inexistente

console.log("\n--- Intentando registrar cuenta duplicada ---");
registrarUsuario({ nombre: "Pedro Ruiz", numeroCuenta: "001", saldo: 0 });

console.log("\n--- Registrando nuevo usuario válido ---");
registrarUsuario({ nombre: "Pedro Ruiz", numeroCuenta: "004", saldo: 100000 });

console.log("\n" + "=".repeat(50));
console.log("💵 CONSULTA DE SALDOS");
console.log("=".repeat(50));
consultarSaldo("001");
consultarSaldo("002");
consultarSaldo("003");
consultarSaldo("004");

console.log("\n" + "=".repeat(50));
console.log("📊 ESTADO FINAL DE TODOS LOS USUARIOS");
console.log("=".repeat(50));
console.log(usuarios);
