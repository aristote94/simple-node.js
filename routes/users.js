const express = require("express")
const router = express.Router()
const db = require("../database")

// const usersArray = [
//     { id: 1, firstName: "John", lastName: "Doe", role: "admin" },
//     { id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
//     { id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
//     { id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
//     { id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
// ]

router.get("/users", (req, res) => {
    // res.json(usersArray)
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
      });
    
})


// POST : CRÉER un nouvel utilisateur, basé sur les données passées dans le corps(body) de la requête
router.post("/", (req, res) => {
    console.log(req.body)

	const lastId = users[users.length - 1].id
    const newId = lastId + 1
    // // récupérer l'ID du dernier utilisateur en fonction du nombre d'utilisateurs dans notre variable de tableau 'users'.
	// // ajouter un pour créer un utilisateur unique
	
	// const userIndex = users.findIndex((user) => user.id === id)

	// // récupérer toutes les données qui arrivent dans le corps de la requête (body)
	const { firstName, lastName } = req.body
    const newUser = {
		firstName,
		lastName,
		id: newId,
	}

	// créer le nouvel utilisateur avec les données du corps de la requête et l'ID calculé
	

	// ajouter le nouvel utilisateur à notre liste d'utilisateurs en utilisant la méthode 'push'
	users.push(newUser)
	// envoyer le code de statut 201 (créé) et les données du nouvel utilisateur afin de confirmer au client.
	res.status(201).json(newUser)
    // trouve son index, verifier si le userIndex est positive
    	// utilisateur non trouvé
	
})


router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex((user) => user.id === id)

    // utilisateur non trouvé
    if (userIndex < 0)
        return res.status(404).json({ msg: "utilisateur non trouvé" })

    // si l'utilisateur est trouvé, nous vérifions quelles valeurs ont été envoyées
    const { firstName, lastName,role } = req.body

    // si une valeur est envoyée, nous la mettons à jour
    if (firstName) users[userIndex].firstName = firstName
    if (lastName) users[userIndex].lastName = lastName
    if(role) users[userIndex].role = role
    console.log(users)

    // renvoyer un message de confirmation et les données de l'utilisateur mis à jour
    res.json({
        msg: "utilisateur mis à jour",
        user: users[userIndex],
    })
})

router.delete("/:id", (req, res) => {  
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex((user) => user.id === id)

    // utilisateur non trouvé
    if (userIndex < 0)
        return res.status(404).json({ msg: "utilisateur non trouvé" })

    // supprimer l'utilisateur du tableau
    users.splice(userIndex, 1)

    // renvoyer un message de confirmation
    res.json({ msg: "utilisateur supprimé" })
})

module.exports = router