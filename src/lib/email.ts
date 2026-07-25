import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true, // true para puerto 465 (SSL)
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

interface LeadNotificationParams {
  nombre: string;
  whatsapp?: string | null;
  email?: string | null;
  asunto?: string | null;
  mensaje?: string | null;
}

export async function sendLeadNotification(lead: LeadNotificationParams) {
  const destinatarios = [
    "info@carolinabustamante.com.ar",
    "CBbienesraices@outlook.com",
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #0D2B59;">Nueva consulta recibida</h2>
      <p><strong>Nombre:</strong> ${lead.nombre}</p>
      ${lead.whatsapp ? `<p><strong>WhatsApp:</strong> ${lead.whatsapp}</p>` : ""}
      ${lead.email ? `<p><strong>Email:</strong> ${lead.email}</p>` : ""}
      ${lead.asunto ? `<p><strong>Asunto:</strong> ${lead.asunto}</p>` : ""}
      ${lead.mensaje ? `<p><strong>Mensaje:</strong><br/>${lead.mensaje}</p>` : ""}
      <hr style="border: none; border-top: 1px solid #C79A3B; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888;">Notificación automática — Carolina Bustamante Bienes Raíces</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Carolina Bustamante Web" <${process.env.EMAIL_SERVER_USER}>`,
      to: destinatarios.join(", "),
      subject: `Nueva consulta: ${lead.nombre}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Error enviando notificación de lead:", error);
    // No relanzamos el error para que un fallo de mail no rompa el guardado del lead
    return { success: false, error };
  }
}
