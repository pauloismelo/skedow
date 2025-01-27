const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.compactainforma.com.br", // Substitua pelo servidor SMTP do seu provedor
    port: 587, // Porta comum para SMTP com STARTTLS
    secure: false, // Use 'false' para STARTTLS e 'true' para SSL/TLS
    auth: {
        user: "noreply@compactainforma.com.br", // Seu e-mail
        pass: "1p23FIGnfvw", // A senha do seu e-mail
    },
});

const sendEventEmail = async (to, eventDetails) => {
    const { title, description, location, startTime, endTime, guests } = eventDetails;

    // Substituir caracteres inválidos ou problemáticos no texto
    const sanitizedDescription = description.replace(/[^\x20-\x7E]/g, "");
    const sanitizedLocation = location.replace(/[^\x20-\x7E]/g, "");

    // Conte�do do arquivo ICS
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${Date.now()}@compactainforma.com.br
SUMMARY:${title}
DESCRIPTION:${sanitizedDescription}
LOCATION:${sanitizedLocation}
DTSTART:${startTime}
DTEND:${endTime}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR
    `.trim();

    console.log(icsContent);
    // Configura��o do e-mail
    const mailOptions = {
        from: '"Compacta Schedule" <noreply@compactainforma.com.br>',
        to: to,
        cc: guests,
        subject: `Convite: ${title}`,
        text: `Voce foi convidado para o evento "${title}". Confira os detalhes no convite anexado.`,
        attachments: [
            {
                filename: "convite.ics", // Nome do arquivo
                content: icsContent,    // Conte�do ICS
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado:", info.response);
    } catch (err) {
        console.error("Erro ao enviar e-mail:", err);
    }
};

module.exports = sendEventEmail;
