const Contact = require('../models/contactModel')

const createContact = async (req, res, next) => {
    try {
        const contact = req.value.body
        const newContact = new Contact(contact)
        await newContact.save()
        return res.status(200).json({
            message: 'Create contact success',
            cart: newContact,
        })
    } catch (err) {
        next(err)
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const { contactID } = req.value.params
        const contact = await Contact.findOneAndDelete({ id: contactID })
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not exist',
            })
        } else {
            return res.status(200).json({
                message: 'Delete contact success',
            })
        }
    } catch (err) {
        next(err)
    }
}

const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({})
        return res.status(200).json({
            contacts,
        })
    } catch (err) {
        next(err)
    }
}
module.exports = {
    createContact,
    deleteContact,
    getContacts,
}
