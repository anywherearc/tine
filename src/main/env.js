

function nodeEnv(){
    if(process.env.NODE_ENV == undefined){
        return 'production'
    }
    return process.env.NODE_ENV
}

function isDev(){
    return nodeEnv() == 'dev'
}

function isProduction(){
    return !isDev()
}


module.exports = {
    nodeEnv,
    isDev,
    isProduction
}