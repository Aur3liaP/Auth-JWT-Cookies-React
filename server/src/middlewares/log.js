export const log = (req, res, next) => {
    console.info(`${new Date().toLocaleString() } method "${req.method}" on path "${req.path}"`) 
    // créer un console.log date creation + methode utilisée sur tette route 
    next()
}

