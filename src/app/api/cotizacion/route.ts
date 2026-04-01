import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nombre, email, telefono, personas, experiencia_title, detalles, id } = data;

    // Enlace para consultar estatus o pagar después
    const statusLink = `https://vivamytrip.com/pagatuaventura?quoteId=${id}`;
    const adminEditLink = `https://vivamytrip.com/admin/cotizaciones/${id}`;

    await resend.emails.send({
      from: "Viva Trip <contacto@vivamytrip.com>",
      to: email,
      subject: `Solicitud Recibida: ${experiencia_title} (#${id.substring(0, 8).toUpperCase()})`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        .main-container { font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden; }
        .hero { background-color: #03A9F4; padding: 40px 20px; text-align: center; color: white; }
        .hero h1 { margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px; font-weight: 900; }
        .content { padding: 40px; color: #444; }
        .status-badge { background-color: #E3F2FD; color: #03A9F4; padding: 8px 16px; border-radius: 4px; font-size: 12px; font-weight: bold; display: inline-block; margin-bottom: 20px; text-transform: uppercase; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #fafafa; border-radius: 8px; overflow: hidden; }
        .details-table td { padding: 15px; border-bottom: 1px solid #eee; font-size: 14px; }
        .label { font-weight: bold; color: #888; text-transform: uppercase; font-size: 10px; width: 35%; }
        .value { color: #212121; font-weight: 500; }
        .quote-id-box { border-top: 2px solid #03A9F4; background: #f9f9f9; padding: 20px; text-align: center; margin-top: 30px; border-radius: 0 0 8px 8px; }
        .btn-status { display: inline-block; background-color: #212121; color: #ffffff !important; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
        .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 11px; color: #999; }
      </style>
    </head>
    <body>
      <div class="main-container">
        <div class="hero">
          <h1>¡Solicitud Recibida!</h1>
        </div>
        
        <div class="content">
          <div class="status-badge">Estatus: En Revisión</div>
          <p>Hola <strong>${nombre}</strong>,</p>
          <p>Gracias por confiar en <strong>Viva Trip</strong>. Hemos recibido exitosamente tu solicitud para la experiencia <strong>${experiencia_title}</strong>. Nuestro equipo de expertos ya está trabajando en tu propuesta personalizada.</p>
          
          <table class="details-table">
            <tr>
              <td class="label">Configuración</td>
              <td class="value">${personas}</td>
            </tr>
            <tr>
              <td class="label">Teléfono</td>
              <td class="value">${telefono}</td>
            </tr>
            <tr>
              <td class="label">Notas</td>
              <td class="value">${detalles || "Sin especificaciones adicionales"}</td>
            </tr>
          </table>

          <div class="quote-id-box">
            <p style="font-size: 12px; color: #666; margin-bottom: 5px;">Tu ID de seguimiento es:</p>
            <strong style="font-family: monospace; font-size: 18px; color: #03A9F4;">${id.toUpperCase()}</strong>
            <br>
            <a href="${statusLink}" class="btn-status">Consultar Estatus / Pagar</a>
          </div>

          <p style="margin-top: 30px; font-size: 13px; color: #777; line-height: 1.6;">
            <strong>¿Qué sigue?</strong><br>
            En un plazo máximo de 24 horas recibirás un segundo correo con el precio final confirmado y el enlace directo para formalizar tu reserva.
          </p>
        </div>

        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Viva Trip México | vivamytrip.com</p>
        </div>
      </div>
    </body>
    </html>
  `,
    });

    // 2. EMAIL PARA EL ADMINISTRADOR (Nueva Cotización por evaluar)
    await resend.emails.send({
      from: "Sistema Viva Trip <contacto@vivamytrip.com>",
      to: "contacto@vivamytrip.com", // 📧 Correo del Admin
      subject: `🚨 NUEVA COTIZACIÓN: ${nombre} - ${experiencia_title}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #FF9800; padding: 30px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 2px; font-weight: 900;">NUEVA SOLICITUD POR EVALUAR</h1>
          </div>
          <div style="padding: 30px; color: #333;">
            <p style="font-size: 14px; color: #666; text-transform: uppercase; font-weight: bold; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Datos del Prospecto</p>
            <table style="width: 100%; font-size: 14px;">
              <tr><td style="color: #888; padding: 5px 0;">Cliente:</td><td style="font-weight: bold;">${nombre}</td></tr>
              <tr><td style="color: #888; padding: 5px 0;">Email:</td><td style="font-weight: bold;">${email}</td></tr>
              <tr><td style="color: #888; padding: 5px 0;">Teléfono:</td><td style="font-weight: bold;">${telefono}</td></tr>
              <tr><td style="color: #888; padding: 5px 0;">Experiencia:</td><td style="font-weight: bold; color: #FF9800;">${experiencia_title}</td></tr>
              <tr><td style="color: #888; padding: 5px 0;">Pax:</td><td style="font-weight: bold;">${personas}</td></tr>
            </table>
            
            <p style="font-size: 14px; color: #666; text-transform: uppercase; font-weight: bold; margin-top: 30px; margin-bottom: 10px;">Mensaje/Detalles:</p>
            <div style="background-color: #FFF3E0; padding: 15px; border-left: 4px solid #FF9800; font-style: italic; font-size: 13px;">
              "${detalles || "Sin detalles adicionales"}"
            </div>

            <a href="${adminEditLink}" style="display: block; background-color: #FF9800; color: #ffffff !important; text-decoration: none; padding: 15px; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 13px; text-align: center; margin-top: 30px;">
              Establecer Precio y Confirmar
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en API Cotización:", error);
    return NextResponse.json({ error: "Error al procesar la cotización" }, { status: 500 });
  }
}