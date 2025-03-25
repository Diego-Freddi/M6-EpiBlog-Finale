const welcomeEmailTemplate = (firstName) => {
    return {
        subject: 'Benvenuto su EpiBlog!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #0d6efd; text-align: center;">Benvenuto su EpiBlog!</h1>
                <div style="padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                    <h2 style="color: #333;">Ciao ${firstName}!</h2>
                    <p style="color: #666; line-height: 1.6;">
                        Grazie per esserti registrato su EpiBlog! Siamo felici di averti con noi.
                    </p>
                    <p style="color: #666; line-height: 1.6;">
                        Su EpiBlog potrai:
                        <ul style="color: #666;">
                            <li>Creare e pubblicare i tuoi post</li>
                            <li>Leggere e commentare i post di altri utenti</li>
                            <li>Personalizzare il tuo profilo</li>
                        </ul>
                    </p>
                    <p style="color: #666; line-height: 1.6;">
                        Non vediamo l'ora di leggere i tuoi contributi!
                    </p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="http://localhost:3000" 
                           style="background-color: #0d6efd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            Vai al Blog
                        </a>
                    </div>
                </div>
                <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
                    Questa è un'email automatica, per favore non rispondere.
                </p>
            </div>
        `
    };
};

module.exports = {
    welcomeEmailTemplate
}; 