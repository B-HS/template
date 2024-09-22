const fs = require('fs')

const requiredEnvVars = ['AUTHOR', 'COGNITO_CLIENT_ID', 'COGNITO_USER_POOL_ID', 'NEXTAUTH_SECRET', 'SITE_NAME']

const envContent = requiredEnvVars
    .map((key) => {
        const value = process.env[key]
        if (!value) {
            console.warn(`Warning: Environment variable ${key} is not set.`)
        }
        return `${key}=${value || ''}`
    })
    .join('\n')

fs.writeFileSync('.env', envContent, 'utf8')

console.log('.env file has been generated successfully')
