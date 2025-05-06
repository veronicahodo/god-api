export const emails = {
    verify: {
        en: {
            subject: "Verification for G.O.D.",
            textBody: `Please click the link below to verify your account so you can access G.O.D.

%%VERIFY_URL%%`,
            htmlBody: `<p>Please click the link below to verify your account so you can access G.O.D.</p>
<p><a href="%%VERIFY_URL%%">Verify Account</a></p>`,
        },
        es: {
            subject: "Verificación para G.O.D.",
            textBody: `Por favor haz clic en el siguiente enlace para verificar tu cuenta y acceder a G.O.D.

%%VERIFY_URL%%`,
            htmlBody: `<p>Por favor haz clic en el siguiente enlace para verificar tu cuenta y acceder a G.O.D.</p>
            <p><a href="%%VERIFY_URL%%">Verificar Cuenta</a></p>`,
        },
    },
    forgotPassword: {
        en: {
            subject: "Password Reset for G.O.D.",
            textBody: `Please click the link below to reset your password.

%%RESET_URL%%`,
            htmlBody: `<p>Please click the link below to reset your password.</p>
                <p><a href="%%RESET_URL%%">Reset Password</a></p>`,
        },
        es: {
            subject: "Restablecimiento de contraseña para G.O.D.",
            textBody: `Por favor haz clic en el siguiente enlace para restablecer tu contraseña.

%%RESET_URL%%`,
            htmlBody: `<p>Por favor haz clic en el siguiente enlace para restablecer tu contraseña.</p>
                <p><a href="%%RESET_URL%%">Restablecer Contraseña</a></p>`,
        },
    },
};
