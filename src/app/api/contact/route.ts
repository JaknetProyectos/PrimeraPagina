import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { nombre, email, mensaje, sendToCustomer = true } = await req.json();

        // 1. EMAIL PARA EL PROVEEDOR (Tú / Atencion al cliente)
        // Este tiene un diseño de "Dashboard" para identificar rápido al prospecto
        const adminEmail = resend.emails.send({
            from: "Sistema Viva Trip <contacto@vivamytrip.com>",
            to: "contacto@vivamytrip.com",
            replyTo: email, // IMPORTANTE: Para que al darle "Responder" le escribas al cliente
            subject: `🔔 NUEVO CONTACTO: ${nombre}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background: #1a1a1a; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 16px; letter-spacing: 2px;">NUEVO PROSPECTO</h2>
          </div>
          <div style="padding: 30px; background: white;">
            <p style="font-size: 14px; color: #666;">Has recibido un mensaje desde el formulario de contacto:</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Cliente:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="background: #fdf6e3; padding: 20px; border-radius: 8px; border-left: 4px solid #f39c12; margin: 20px 0;">
              <span style="font-size: 11px; color: #999; text-transform: uppercase; font-weight: bold;">Mensaje del cliente:</span>
              <p style="margin-top: 10px; font-style: italic; color: #333;">"${mensaje}"</p>
            </div>
            <a href="mailto:${email}" style="display: block; text-align: center; background: #1a1a1a; color: white; padding: 15px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">RESPONDER AHORA</a>
          </div>
        </div>
      `,
        });

        // 2. EMAIL PARA EL CLIENTE (Opcional)
        let customerEmail = null;
        if (sendToCustomer) {
            customerEmail = resend.emails.send({
                from: "Viva My Trip <contacto@vivamytrip.com>",
                to: email,
                subject: `¡Hola ${nombre.split(' ')[0]}! Recibimos tu mensaje 📝`,
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background: #1a1a1a; color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 3px;">VIVA MY TRIP</h1>
            </div>
            <div style="padding: 40px 30px; text-align: center; background: white;">
              <h2 style="color: #1a1a1a; margin-top: 0;">¡Gracias por contactarnos!</h2>
              <p style="color: #666; font-size: 16px;">Hola <strong>${nombre}</strong>, hemos recibido tu mensaje correctamente. Nuestro equipo revisará tu solicitud y te responderemos en breve.</p>
              
              <div style="margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 8px; text-align: left;">
                <span style="font-size: 11px; color: #aaa; text-transform: uppercase;">Copia de tu mensaje:</span>
                <p style="color: #555; font-size: 14px; line-height: 1.5; margin-top: 10px;">"${mensaje}"</p>
              </div>

              <p style="font-size: 13px; color: #999;">Si necesitas asistencia inmediata, puedes responder directamente a este correo.</p>
            </div>
            <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
              <p style="margin: 0;">Explora más experiencias en <a href="https://vivamytrip.com" style="color: #1a1a1a; font-weight: bold; text-decoration: none;">vivamytrip.com</a></p>
            </div>
          </div>
        `,
            });
        }

        // Ejecutamos ambos (o solo uno)
        await Promise.all([adminEmail, customerEmail].filter(Boolean));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error enviando contacto:", error);
        return NextResponse.json({ error: "Error al enviar mensaje" }, { status: 500 });
    }
}