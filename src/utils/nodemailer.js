import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
/* import { logger } from "../middleware/loggers.middleware.js"; */

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_FROM,
    pass: process.env.NODEMAILER_PASS_APP,
  },
});

export const loadEmail = async (data) => {
  const mailOptions = {
    from: data.username,
    to: process.env.NODEMAILER_FROM,
    subject: "Nuevo Registro",
    html: `<div>
            <h4>Un nuevo cliente se registro en la Web</h4>
            <ul>
                <li>Nombre: ${data.name}</li>
                <li>Direccion: ${data.address}</li>
                <li>Edad: ${data.age}</li>
                <li>Telefono: ${data.phone}</li>
                <li>Email: ${data.username}</li>
                <li>Foto: ${data.file}</li>
            </ul>
    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
