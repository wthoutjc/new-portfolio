import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const db = new PrismaClient();

async function main() {
  const email = "juancamilorr2012@hotmail.com";

  // Verifica si el usuario ya existe
  const existingUser = await db.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.info(`El usuario con correo ${email} ya existe. Saltando seed.`);
    return;
  }

  // Genera una contraseña aleatoria y segura (32 caracteres hexadecimales)
  const randomPassword = crypto.randomBytes(16).toString("hex");
  console.info(
    `Contraseña generada para el usuario por defecto: ${randomPassword}`
  );

  // Hashea la contraseña con bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

  // Crea el usuario por defecto en la base de datos
  const user = await db.users.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.info("Usuario por defecto creado:", user);
}

main()
  .catch((error) => {
    console.error("Error al ejecutar el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
