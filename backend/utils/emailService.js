const sgMail = require('@sendgrid/mail');
const { welcomeEmailTemplate } = require('./emailTemplates');

// Configura SendGrid con la tua API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (user) => {
    try {
        const { subject, html } = welcomeEmailTemplate(user.firstName);
        
        const msg = {
            to: user.email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: subject,
            html: html
        };

        await sgMail.send(msg);
        console.log('Email di benvenuto inviata con successo');
    } catch (error) {
        console.error('Errore nell\'invio dell\'email:', error);
        // Non lanciamo l'errore per non bloccare la registrazione
    }
};

module.exports = {
    sendWelcomeEmail
}; 