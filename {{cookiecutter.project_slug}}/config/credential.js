// This file store the credentials for database ad other connections

module.exports = {
    mongo: {
        development: {
            connectionString: process.env.DB_DEV_CONNECTION,
        },
        production: {
            connectionString: process.env.DB_PROD_CONNECTION,
        },
        test: {
            connectionString: 'mongodb://localhost/{{cookiecutter.project_slug}}'
        }
    },
    facebook: {
        clientId: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET
    },
    google: {
        clientId: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET
    },
    email: {
        host: (typeof process.env.EMAIL_HOST==='undefined' ? 'smtp.ethereal.email': process.env.EMAIL_HOST),
        from: (typeof process.env.EMAIL_FROM==='undefined' ? '"Fred Foo 👻" <foo@example.com>': process.env.EMAIL_FROM),
        secure: (typeof process.env.EMAIL_SECURE==='undefined' ? false: process.env.EMAIL_SECURE ),
        port: (typeof process.env.EMAIL_PORT==='undefined' ? 587: process.env.EMAIL_PORT ),
        user: (typeof process.env.EMAIL_USER==='undefined' ? null: process.env.EMAIL_USER ),
        password: (typeof process.env.EMAIL_PASSWORD==='undefined' ? null: process.env.EMAIL_PASSWORD ),

    },
    secret: (typeof process.env.SECRET_KEY==='undefined'? 'Secret Key ': process.env.SECRET_KEY)
};

