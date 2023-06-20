import conectarDB from '@/lib/dbConnect';
import Restaurant from '@/models/Restaurant';
import User from '@/models/User';


export default async function handler(req, res) {

    conectarDB()

    // POST /api/signup

    if (req.method === 'POST') {
        try {
            const isUser = req.body.isUser;
            if (isUser) {

                const { name, email, password , age, gender } = req.body;
                
                const user = await User.create({
                    name,
                    email,
                    password,
                    age,
                    gender,
                })

                res.status(201).json({ success: true, data: user })
            } else {

                const { name, address, phone, email } = req.body;

                const restaurant = await Restaurant.create({
                    name,
                    address,
                    phone,
                    email,
                })

                res.status(201).json({ success: true, data: restaurant })
            }
            
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
}
    