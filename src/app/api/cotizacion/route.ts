import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nombre, email, telefono, personas, experiencia_title, detalles, id } = data;

    const shortId = id ? id.substring(0, 8).toUpperCase() : "VIVA";
    const statusLink = `https://vivamytrip.com/pagatuaventura?quoteId=${id}`;
    const adminEditLink = `https://vivamytrip.com/admin/cotizaciones/${id}`;

    // 1. Correo para el Cliente (Estilo Azul Viva Trip)
    await resend.emails.send({
      from: "Viva Trip <contacto@vivamytrip.com>",
      to: email,
      subject: `Solicitud Recibida: ${experiencia_title} (#${shortId})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #03A9F4; padding: 40px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">¡Solicitud Recibida!</h1>
          </div>
          <div style="padding: 40px; color: #444;">
            <p>Hola <strong>${nombre}</strong>,</p>
            <p>Hemos recibido tu interés en la experiencia <strong>${experiencia_title}</strong>. Nuestro equipo concierge está revisando los detalles.</p>

            <a href="${statusLink}" style="display: inline-block; background: #212121; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">CONSULTAR ESTATUS / PAGAR</a>
          </div>
          <div style="background: #eee; padding: 20px; text-align: center; font-size: 12px;">
            Viva Trip México &copy; ${new Date().getFullYear()}
          </div>
        </div>
      `
    });

    // 2. Correo para el Admin (Estilo Naranja Alerta)
    await resend.emails.send({
      from: "Sistema Viva Trip <contacto@vivamytrip.com>",
      to: "contacto@vivamytrip.com",
      subject: `🚨 NUEVA COTIZACIÓN: ${nombre} - ${experiencia_title}`,
      html: `
        <div style="font-family: sans-serif; border: 2px solid #FF9800; padding: 20px; border-radius: 10px;">
          <h2 style="color: #FF9800;">NUEVA SOLICITUD PENDIENTE</h2>
          <p><strong>Cliente:</strong> ${nombre}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Experiencia:</strong> ${experiencia_title}</p>
          <p><strong>Detalles:</strong> ${detalles}</p>
          <a href="${adminEditLink}" style="background: #FF9800; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">DEFINIR PRECIO</a>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}