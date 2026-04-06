import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje, sendToCustomer = true } = await req.json();

    // 1. EMAIL PARA EL ADMINISTRADOR (Notificación de Prospecto)
    // Diseño de Dashboard con acento Naranja para acción requerida
    const adminEmail = resend.emails.send({
      from: "Sistema Viva Trip <contacto@vivamytrip.com>",
      to: "contacto@vivamytrip.com",
      replyTo: email,
      subject: `🚨 NUEVO CONTACTO: ${nombre}`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; background-color: #ffffff;">
          <div style="background: #FF9800; color: white; padding: 30px; text-align: center;">
            <span style="font-size: 10px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; opacity: 0.9;">Notificación de Sistema</span>
            <h2 style="margin: 10px 0 0 0; font-size: 18px; letter-spacing: 1px; text-transform: uppercase;">Nuevo Mensaje Recibido</h2>
          </div>
          <div style="padding: 40px; background: white;">
            <table style="width: 100%; font-size: 14px; margin-bottom: 30px;">
              <tr>
                <td style="color: #888; padding: 8px 0; text-transform: uppercase; font-size: 10px; font-weight: bold; width: 30%;">Remitente:</td>
                <td style="font-weight: bold; color: #212121; border-bottom: 1px solid #f5f5f5; padding: 8px 0;">${nombre}</td>
              </tr>
              <tr>
                <td style="color: #888; padding: 8px 0; text-transform: uppercase; font-size: 10px; font-weight: bold;">Email:</td>
                <td style="font-weight: bold; color: #03A9F4; border-bottom: 1px solid #f5f5f5; padding: 8px 0;">${email}</td>
              </tr>
            </table>

            <div style="background: #FFF8E1; padding: 25px; border-radius: 4px; border-left: 4px solid #FF9800; margin: 20px 0;">
              <span style="font-size: 10px; color: #FF9800; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Mensaje Original:</span>
              <p style="margin-top: 15px; font-style: italic; color: #444; line-height: 1.6; font-size: 15px;">"${mensaje}"</p>
            </div>

            <a href="mailto:${email}" style="display: block; text-align: center; background: #212121; color: white; padding: 18px; text-decoration: none; border-radius: 2px; font-weight: bold; font-size: 12px; letter-spacing: 2px; margin-top: 30px; text-transform: uppercase;">Responder al Cliente</a>
          </div>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 10px; color: #9e9e9e;">
            ID de sesión generado por el formulario de contacto de vivamytrip.com
          </div>
        </div>
      `,
    });

    // 2. EMAIL PARA EL CLIENTE (Confirmación de Recepción)
    // Diseño Limpio en Azul para transmitir calma y profesionalismo
    let customerEmail = null;
    if (sendToCustomer) {
      customerEmail = resend.emails.send({
        from: "Viva My Trip <contacto@vivamytrip.com>",
        to: email,
        subject: `¡Hola ${nombre.split(' ')[0]}! Recibimos tu mensaje 📩`,
        html: `
          <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; border-radius: 4px; overflow: hidden; background-color: #ffffff;">
            <div style="background: #03A9F4; color: white; padding: 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 14px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase;">VIVA MY TRIP</h1>
            </div>
            <div style="padding: 40px; text-align: center; background: white;">
              <div style="display: inline-block; background: #E3F2FD; color: #03A9F4; padding: 8px 16px; border-radius: 50px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 25px;">Mensaje Confirmado</div>
              <h2 style="color: #212121; margin: 0 0 15px 0; font-size: 24px; font-weight: 300;">¡Gracias por escribirnos!</h2>
              <p style="color: #757575; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">Hola <strong>${nombre}</strong>, hemos recibido tu consulta. Un asesor de nuestro equipo revisará los detalles y te contactará en breve para ayudarte.</p>
              
              <div style="margin: 30px 0; padding: 25px; background: #FAFAFA; border-radius: 4px; text-align: left; border: 1px solid #eeeeee;">
                <span style="font-size: 10px; color: #bdbdbd; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Copia de tu mensaje:</span>
                <p style="color: #616161; font-size: 13px; line-height: 1.5; margin-top: 10px; font-style: italic;">"${mensaje}"</p>
              </div>

              <p style="font-size: 12px; color: #9e9e9e; border-top: 1px solid #f5f5f5; pt-20; margin-top: 30px; padding-top: 20px;">Si necesitas asistencia urgente, puedes escribir a atencion@vivamytrip.com </p>
            </div>
            <div style="background: #eeeeee; padding: 30px; text-align: center; font-size: 11px; color: #9e9e9e;">
              <p style="margin: 0; letter-spacing: 1px;">&copy; ${new Date().getFullYear()} VIVA MY TRIP MÉXICO | <a href="https://vivamytrip.com" style="color: #03A9F4; font-weight: bold; text-decoration: none;">VIVAMYTRIP.COM</a></p>
            </div>
          </div>
        `,
      });
    }

    await Promise.all([adminEmail, customerEmail].filter(Boolean));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando contacto:", error);
    return NextResponse.json({ error: "Error al enviar mensaje" }, { status: 500 });
  }
}