const express = require("express");
const mongoose = require("mongoose");
const Contact = require('./models/contact');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.get('/v1/contacts', async(req,res)=>{

    try{

        const contacts = await Contact.find({});
        res.status(200).json(contacts);

    }catch(error){
        res.status(500).json({message: error.message});
    }
})

app.post('/v1/contacts', async(req,res)=>{

    try{
        const contact = await Contact.create(req.body);
        res.status(200).json({id: contact._id,  contact}
           );

    }
    catch(error){
        res.status(500).json({message: error.message});
    }

})

app.get('/v1/contacts/:id', async(req,res)=>{

    try{
        const {id} = req.params;

        const contact = await Contact.findById(id);

        if(!contact){
            res.status(404).json({
                error:  "There is no contact with that id"
                
            })
        }
        res.status(200).json({
            id: contact._id, contact
        })

    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

app.delete('/v1/contacts/:id', async(req,res)=>{
    try{

        const {id} = req.params;
        const contact = await Contact.findByIdAndDelete(id);

        res.status(204).json();

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.put('/v1/contacts/:id', async(req,res)=>{

    try{
        const {id} = req.params;
        const contact = await Contact.findByIdAndUpdate(id,req.body);

        if(!contact){
            return res.status(404).json({error: "There is no contact with that id"
        })
        }

        res.status(204).json();

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.patch('/v1/contacts/:id', async(req,res)=>{

    try{
        const {id} = req.params;
        const contact = await Contact.findByIdAndUpdate(id,req.body);

        if(!contact){
            return res.status(404).json({error: "There is no contact with that id"
        })
        }

        res.status(204).json();

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})





const url = "mongodb+srv://thejus:thejus@contact-manager.xxdkwwh.mongodb.net/?retryWrites=true&w=majority"

mongoose.set("strictQuery", false)

mongoose.connect(url).then(()=>{
    console.log("connected to database")

    app.listen(8000,()=>{
        console.log("Server up at 8000");
    })
})


