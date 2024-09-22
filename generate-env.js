const fs = require('fs')

const variables = ['AUTHOR', 'COGNITO_CLIENT_ID', 'COGNITO_USER_POOL_ID', 'NEXTAUTH_SECRET', 'SITE_NAME']
variables.forEach((variable) => {
    const value = process.env[variable]
    if (value) {
        console.log(`Variable ${variable}: ${value}`)
    } else {
        console.warn(`Warning: Environment variable ${variable} is not set.`)
    }
})

const envContent = variables.map((variable) => `${variable}=${process.env[variable] || ''}`).join('\n')

fs.writeFileSync('.env', envContent)
console.log('.env file has been generated successfully')
