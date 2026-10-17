//checking if the user doing something is a admin or not 

export const checkAdmin = (req, res, next) => {

    const { role } = req.user
    console.log(role)


    if (role !== "admin") {

        return res.status(200).json({
            success: false,
            message: "you are not authorized to do this",
           
        })

    }
    next()
}