import Question from "@/models/Question"

export default async function handler(req, res) {

    conectarDB()

    // Get /api/question

    if (req.method === 'GET') {
        try {
            const questions = await Question.find({})

            res.status(200).json({ success: true, data: questions })
        } catch (error) {
            res.status(400).json({ success: false })
        }
    }
}