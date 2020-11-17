const { age, date } = require('../../lib/utils')
const Member = require('../models/member')

module.exports = { 
    index(req, res) {
        let {filter, page = 1, limit = 5} = req.query

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(members) {
                const pagination = {
                    total: Math.ceil(members[0].total / limit),
                    page
                }
    
                return res.render("members/index", {members, filter, pagination})
            }
        }

        Member.paginate(params)
    },
    create(req, res) {

        Member.instructorsSelectOptions(function(options) {
            return res.render("members/create",{instructorOptions: options})
        })

    },
    post(req, res) {

        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all files")
            }
                
        }
        
        Member.create(req.body, function(member) {
            res.redirect(`members/${member.id}/`)
        }) 

    },
    show(req, res) {
    
        Member.find(req.params.id, (member) => {

            if (!member) return res.send('Member not found')

            member.birth = date(member.birth).birthDay

            return res.render("members/show", {member})
            
        })
    },
    edit(req, res) {

        Member.find(req.params.id, (member) => {

            if (!member) return res.send('Member not found')

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options) {
                return res.render("members/edit", {member, instructorOptions: options})
            })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all files")
            }
                
        }

        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}/`)
        })
        
    }, 
    delet(req, res) {
        Member.delet(req.body.id, function() {
            return res.redirect(`/members`)
        })
    } 
}