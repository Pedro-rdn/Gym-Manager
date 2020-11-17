const { age, date } = require('../../lib/utils')
const Instructor = require('../models/instructor')

module.exports = { 
    index(req, res) {
        let {filter, page = 1, limit = 5} = req.query

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {
                const pagination = {
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }

                const services = instructors.map(instructor => {
                    return instructor.services.split(',');
                })
    
                return res.render("instructors/index", {instructors, filter, services, pagination})
            }
        }

        Instructor.paginate(params)
    },
    create(req, res) {
        return res.render("instructors/create")
    },
    post(req, res) {

        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all files")
            }
                
        }
        
        Instructor.create(req.body, function(instructor) {
            res.redirect(`instructors/${instructor.id}/`)
        }) 

    },
    show(req, res) {
    
        Instructor.find(req.params.id, (instructor) => {

            if (!instructor) return res.send('Instructor not found')

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", {instructor})
            
        })
    },
    edit(req, res) {

        Instructor.find(req.params.id, (instructor) => {

            if (!instructor) return res.send('Instructor not found')

            instructor.birth = date(instructor.birth).iso

            return res.render('instructors/edit', {instructor})
            
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all files")
            }
                
        }

        Instructor.update(req.body, function() {
            return res.redirect(`/instructors/${req.body.id}/`)
        })
        
    }, 
    delet(req, res) {
        Instructor.delet(req.body.id, function() {
            return res.redirect(`/instructors`)
        })
    } 
}