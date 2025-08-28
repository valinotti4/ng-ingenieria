import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, message } = await request.json();

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email to site owners
    const ownerMailOptions = {
      from: `"NG Ingeniería en Seguridad" <${process.env.SMTP_MAIL}>`,
      replyTo: process.env.SMTP_MAIL,
      to: "consultas@ng.com.ar",
      subject: `Nueva solicitud de cotización - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            🔔 Nueva Solicitud de Cotización
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">📋 Datos del Cliente:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Teléfono:</strong> <a href="tel:${phone}" style="color: #1e40af;">${phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h3 style="color: #334155; margin-top: 0;">💬 Proyecto de Seguridad:</h3>
            <p style="white-space: pre-line; line-height: 1.6; background-color: #fafafa; padding: 15px; border-radius: 6px;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              📅 Solicitud recibida el ${new Date().toLocaleString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
              })}
            </p>
          </div>
        </div>
      `,
    };

    // Email confirmation to customer
    const customerMailOptions = {
      from: `"NG Ingeniería en Seguridad" <${process.env.SMTP_MAIL}>`,
      replyTo: process.env.SMTP_MAIL,
      to: email,
      subject: "Confirmación de solicitud - NG Ingeniería en Seguridad",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1e40af; margin: 0;">NG Ingeniería en Seguridad</h2>
            <p style="color: #64748b; margin: 5px 0;">Soluciones Integrales de Seguridad</p>
          </div>
          
          <div style="background-color: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 12px; padding: 25px; text-align: center; margin: 20px 0;">
            <h2 style="color: #0c4a6e; margin: 0 0 15px 0;">✅ ¡Solicitud Recibida!</h2>
            <p style="color: #334155; font-size: 16px; margin: 0;">Hemos recibido tu solicitud de cotización correctamente.</p>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">📋 Resumen de tu solicitud:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 15px;">
              <strong>Proyecto:</strong><br>
              <span style="white-space: pre-line; line-height: 1.6;">${message}</span>
            </div>
          </div>
          
          <div style="background-color: #1e40af; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: white;">🚀 Próximos pasos:</h3>
            <ul style="line-height: 1.8; padding-left: 20px;">
              <li>Revisaremos tu solicitud en las próximas 24 horas</li>
              <li>Te contactaremos para coordinar una evaluación</li>
              <li>Elaboraremos una cotización personalizada</li>
            </ul>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
            <h4 style="color: #334155; margin-top: 0;">📞 ¿Necesitas contactarnos?</h4>
            <p style="margin: 5px 0;"><strong>Teléfono:</strong> +5493471521618 / +5493471594772</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> info@ng.com.ar</p>
            <p style="margin: 15px 0 0 0; color: #64748b; font-size: 14px;">
              Atención las 24 horas - Cobertura Nacional
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              NG Ingeniería en Seguridad - Protegemos lo que más importa
            </p>
          </div>
        </div>
      `,
    };

    // Google Sheets integration
    async function addToGoogleSheets() {
      try {
        if (
          !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
          !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
          !process.env.GOOGLE_SHEETS_ID
        ) {
          console.warn(
            "Google Sheets credentials not configured, skipping sheets integration"
          );
          return;
        }

        const auth = new google.auth.GoogleAuth({
          credentials: {
            private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(
              /\\n/g,
              "\n"
            ),
            client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          },
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const timestamp = new Date().toLocaleString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
        });

        // Try to append to the first available sheet
        const spreadsheet = await sheets.spreadsheets.get({
          spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        });

        const sheetName =
          spreadsheet.data.sheets?.[0]?.properties?.title || "Sheet1";

        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEETS_ID,
          range: `${sheetName}!A:F`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                timestamp,
                name,
                phone,
                email,
                message,
                "Nuevo", // Status
              ],
            ],
          },
        });
      } catch (error) {
        console.error("Error adding to Google Sheets:", error);
        // Don't fail the entire request if sheets fails
      }
    }

    try {
      const [ownerResult, customerResult] = await Promise.all([
        transporter.sendMail(ownerMailOptions),
        transporter.sendMail(customerMailOptions),
        addToGoogleSheets(),
      ]);

      console.log("Owner email sent:", ownerResult.messageId);
      console.log("Customer email sent:", customerResult.messageId);
      console.log("Data added to Google Sheets successfully");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      throw emailError;
    }

    return NextResponse.json(
      { message: "Mensaje enviado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intente nuevamente." },
      { status: 500 }
    );
  }
}
