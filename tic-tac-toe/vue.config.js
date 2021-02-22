module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'http://localhost/mastery/tic-tac-toe/dist/'
        : '/'
}