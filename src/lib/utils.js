module.exports = { 

    age(timestamp) {
    const today = new Date()
    const birthDate= new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const mounth = today.getMonth() - birthDate.getMonth() 

    if (mounth < 0|| mounth == 0 
        && today.getDate() <= birthDate.getDate()) {
            age = age - 1
    }
    return age
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const mounth = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            mounth,
            year,
            iso: `${year}-${mounth}-${day}`,
            birthDay: `${day}/${mounth}`,
            format:`${day}/${mounth}/${year}`
        }
    }
}