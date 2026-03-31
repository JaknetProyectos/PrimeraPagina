import { CheckoutInfo } from "@/interfaces/CheckoutInfo";
import { Reservation } from "@/interfaces/Reservations";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      reservations,
      checkoutInfo
    }: { reservations: Reservation[], checkoutInfo: CheckoutInfo } = await req.json();

    const customerEmail = checkoutInfo.billingAddress.email;

    await resend.emails.send({
      from: "Viva My Trip <contacto@vivamytrip.com>",
      to: customerEmail,
      subject: `Confirmación de Compra #${checkoutInfo.orderId} ✈️`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #444; line-height: 1.6; margin: 0; background-color: #f5f5f5; }
        .main-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 4px; overflow: hidden; shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid #e0e0e0; }
        
        /* Header Estilo Material */
        .header { background-color: #03A9F4; color: white; text-align: center; padding: 40px 20px; }
        .header h1 { margin: 0; font-size: 14px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase; }
        .header .check-icon { font-size: 48px; margin-bottom: 10px; display: block; }

        .content { padding: 40px; }
        
        /* Info de Orden */
        .order-status { text-align: center; margin-bottom: 40px; }
        .order-status h2 { font-size: 22px; margin: 0; color: #212121; font-weight: 700; }
        .order-status p { color: #757575; font-size: 13px; margin: 8px 0; text-transform: uppercase; letter-spacing: 1px; }

        /* Tabla de Productos */
        .ticket-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .ticket-table th { text-align: left; font-size: 10px; text-transform: uppercase; color: #03A9F4; padding: 10px 0; border-bottom: 2px solid #f0f0f0; letter-spacing: 1px; }
        .ticket-table td { padding: 18px 0; border-bottom: 1px solid #f5f5f5; font-size: 14px; vertical-align: top; }
        
        .item-title { font-weight: 700; color: #212121; display: block; margin-bottom: 4px; }
        .item-meta { font-size: 12px; color: #9e9e9e; }
        .price-text { font-weight: 700; color: #212121; text-align: right; }

        /* Totales */
        .summary-box { background-color: #fafafa; padding: 20px; border-radius: 4px; margin-bottom: 30px; }
        .summary-row { display: table; width: 100%; margin-bottom: 8px; }
        .summary-label { display: table-cell; font-size: 13px; color: #757575; }
        .summary-value { display: table-cell; text-align: right; font-weight: 700; color: #212121; }
        .total-row { border-top: 1px solid #e0e0e0; margin-top: 10px; padding-top: 10px; }
        .total-price { font-size: 20px; color: #03A9F4; }

        /* Tarjetas de Información */
        .info-grid { display: table; width: 100%; margin-top: 20px; }
        .info-col { display: table-cell; width: 50%; padding-right: 10px; vertical-align: top; }
        .card { background: #ffffff; border: 1px solid #eee; padding: 15px; border-radius: 4px; min-height: 120px; }
        .card h3 { font-size: 10px; text-transform: uppercase; color: #03A9F4; margin: 0 0 10px 0; letter-spacing: 1px; }
        .card p { font-size: 12px; margin: 0; color: #616161; line-height: 1.6; }

        .footer { background: #eeeeee; padding: 30px; text-align: center; font-size: 11px; color: #9e9e9e; text-transform: uppercase; letter-spacing: 1px; }
        .support-link { color: #03A9F4; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="main-container">
        <div class="header">
          <span class="check-icon">✓</span>
          <h1>Reserva Confirmada</h1>
        </div>
        
        <div class="content">
          <div class="order-status">
            <h2>¡Gracias por tu compra!</h2>
            <p>Orden #${checkoutInfo.orderId} • ${checkoutInfo.orderDate}</p>
          </div>

          <table class="ticket-table">
            <thead>
              <tr>
                <th>Experiencia</th>
                <th style="text-align: center;">Pax</th>
                <th style="text-align: right;">Monto</th>
              </tr>
            </thead>
            <tbody>
              ${reservations.map(res => `
                <tr>
                  <td>
                    <span class="item-title">${res.activityTitle ?? res?.activity_title}</span>
                    <span class="item-meta">📅 ${res.fecha}</span>
                  </td>
                  <td style="text-align: center; font-weight: 600;">${res.personas}</td>
                  <td class="price-text">$${Number(res.price).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="summary-box">
            <div class="summary-row">
              <span class="summary-label">Método de pago</span>
              <span class="summary-value" style="font-weight: 400;">${checkoutInfo.metodoPago}</span>
            </div>
            <div class="summary-row total-row">
              <span class="summary-label" style="font-weight: bold; color: #212121;">Total Pagado</span>
              <span class="summary-value total-price">$${checkoutInfo.subtotal} MXN</span>
            </div>
          </div>

          <div class="info-grid">
            <div class="info-col">
              <div class="card">
                <h3>Cliente</h3>
                <p>
                  <strong>${checkoutInfo.billingAddress.nombre}</strong><br>
                  ${checkoutInfo.billingAddress.email}<br>
                  Tel: ${checkoutInfo.billingAddress.telefono}
                </p>
              </div>
            </div>
            <div class="info-col">
              <div class="card">
                <h3>Facturación</h3>
                <p>
                  ${checkoutInfo.billingAddress.calle}<br>
                  ${checkoutInfo.billingAddress.ciudad}, CP ${checkoutInfo.billingAddress.codigoPostal}
                </p>
              </div>
            </div>
          </div>

          <div style="margin-top: 40px; padding: 20px; border-left: 4px solid #FF9800; background: #FFF8E1; border-radius: 0 4px 4px 0;">
            <p style="margin: 0; font-size: 13px; color: #856404;">
              <strong>¿Qué sigue?</strong><br>
              Recibirás un segundo correo con tus cupones digitales y las instrucciones de punto de encuentro para cada una de tus experiencias en breve.
            </p>
          </div>

          <p style="text-align: center; font-size: 12px; color: #9e9e9e; margin-top: 40px;">
            ¿Dudas? Chatea con nosotros en <a href="https://wa.me/TUNUMERO" class="support-link">WhatsApp</a> o responde a este email.
          </p>
        </div>

        <div class="footer">
          © ${new Date().getFullYear()} Viva My Trip México | vivamytrip.com<br>
          Transformando viajes en leyendas
        </div>
      </div>
    </body>
    </html>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error enviando ticket" }, { status: 500 });
  }
}