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
      subject: `Solicitud Recibida: ${experiencia_title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #03A9F4; padding: 40px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px; text-transform: uppercase;">¡Solicitud Recibida!</h1>
          </div>
          <div style="padding: 40px; color: #444;">
            <p>Hola <strong>${nombre}</strong>,</p>
            <p>Hemos recibido tu interés en la experiencia <strong>${experiencia_title}</strong>. Nuestro equipo concierge está revisando los detalles.</p>


            <div style="margin: 30px 0; padding: 25px; background: #FAFAFA; border-radius: 4px; text-align: left; border: 1px solid #eeeeee;">
                <span style="font-size: 10px; color: #bdbdbd; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Copia de tu consulta:</span>
                <p style="color: #616161; font-size: 13px; line-height: 1.5; margin-top: 10px; font-style: italic;">"${detalles}"</p>
            </div>

          </div>
          <div style="background: #eee; padding: 20px; text-align: center; font-size: 12px;">
            © ${new Date().getFullYear()} Viva My Trip México | vivamytrip.com<br>
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
          <p>Favor de enviar el nó. de cotización al cliente<p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}