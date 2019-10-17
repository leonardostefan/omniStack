const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {



    async index(req, res) {
        const { tech } = req.query;
        if (tech) {
            const spots = await Spot.find({ techs: tech });
            return res.json(spots);
        } else {
            const spots = await Spot.find();
            return res.json(spots);
        }
    },


    async allTechs(req, res) {
        const spots = await Spot.find();
        // console.log(spots);
        const techsArray = spots.map(spot => spot.techs)
        var allTechs = [];
        techsArray.forEach(
            (list) => {
                list.forEach((item) => {
                    allTechs.push(item);
                })
            })

        // allTechs= allTechs.maps(x=>x)
        return (res.json(
            (allTechs.filter((value, index, array) => array.indexOf(value) === index))
        ));
    },


    async store(req, res) {
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id)

        if (!user) {
            return status(400).json({ error: "O loco não existe" });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price

        })

        return res.json(spot);
    }
};