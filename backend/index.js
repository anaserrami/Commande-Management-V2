const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const port = 3000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Import the authentication and authorization functions
const { generateToken, authenticateToken, authorizeRole } = require('./auth');

app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stage_db1',
    port: 3306
});

db.connect(err => {
    if(err) console.log(err, 'dberr');
    console.log('database connected ...');
});

//Protected route that requires authentication and authorization
app.get('/protected', authenticateToken, authorizeRole(['Admin']), (req, res) => {
    res.send({
      message: 'This is a protected route for admins only.',
      user: req.user,
    });
});  

app.post('/register', generateToken, async (req, res) => {
    try {
      const { nom, tele, email, password } = req.body;
      const idRole = 2;
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `INSERT INTO user (idRole, nom, tele, email, password) VALUES ('${idRole}', '${nom}', '${tele}', '${email}', '${hashedPassword}')`;
      await db.query(sql, [idRole, nom, tele, email, hashedPassword]);
      res.json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
});

app.post('/login', generateToken, async (req, res) => {
    try {
      const { nom, password } = req.body;
      const sql = `SELECT * FROM user WHERE nom = ${nom}`;
      const result = await db.query(sql, [nom]);
      const user = result[0];
  
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ nom: user.nom }, 'secret-key', { expiresIn: '2h' });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
});

//---------------CRUD ROLE-------------------------
app.get('/role', (req, res) => {
    let qr = "select * from role";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all roles data',
                data: result
            })
        }
    })
});

app.get('/role/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from role where id = ${gID}`;
    db.query(qr, (err, result) => {
        if(err) console.log(err);
        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            })
        }
        else {
            res.send({
                message: 'not found'
            })
        }
    })
});

app.post('/role', (req, res) => {
    console.log(req.body, 'createdata');

    let nom = req.body.nom;
    let qr = `insert into role(nom) values('${nom}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not inserted'
            });
        } else {
            res.send({
                message: 'data inserted'
            });
        }
    })
})

app.put('/role/:id', (req, res) => {
    console.log(req.body, 'updatedata');

    let gID = req.params.id;
    let nom = req.body.nom;

    let qr = `update role set nom = '${nom}' where id = ${gID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not updated'
            });
        } else {
            res.send({
                message: 'data updated'
            });
        }
    });
});

app.delete('/role/:id', (req, res) => {
    let roleID = req.params.id;

    let qr = `delete from role where id = ${roleID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

//---------------CRUD Commande Etat-------------------------
app.get('/commandeetat', (req, res) => {
    let qr = "select * from commandeetat";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all etats data',
                data: result
            })
        }
    })
});

app.get('/commandeetat/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from commandeetat where id = ${gID}`;
    db.query(qr, (err, result) => {
        if(err) console.log(err);
        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            })
        }
        else {
            res.send({
                message: 'not found'
            })
        }
    })
});

app.post('/commandeetat', (req, res) => {
    console.log(req.body, 'createdata');

    let etat = req.body.etat;
    let qr = `insert into commandeetat(etat) values('${etat}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not inserted'
            });
        } else {
            res.send({
                message: 'data inserted'
            });
        }
    })
})

app.put('/commandeetat/:id', (req, res) => {
    console.log(req.body, 'updatedata');

    let gID = req.params.id;
    let etat = req.body.etat;

    let qr = `update commandeetat set etat = '${etat}' where id = ${gID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not updated'
            });
        } else {
            res.send({
                message: 'data updated'
            });
        }
    });
});

app.delete('/commandeetat/:id', (req, res) => {
    let commandeetatID = req.params.id;

    let qr = `delete from commandeetat where id = ${commandeetatID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

//---------------CRUD USER-------------------------
app.get('/user', (req, res) => {
    let qr = "select * from user";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all users data',
                data: result
            })
        }
    })
});

app.get('/user/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`;
    db.query(qr, (err, result) => {
        if(err) console.log(err);
        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            })
        }
        else {
            res.send({
                message: 'not found'
            })
        }
    })
});

app.post('/user', (req, res) => {
    console.log(req.body, 'createdata');

    let idRole = req.body.idRole;
    let nom = req.body.nom;
    let tele = req.body.tele;
    let email = req.body.email;
    let password = req.body.password;

    let qr = `insert into user(idRole, nom, tele, email, password) values('${idRole}', '${nom}', '${tele}', '${email}', '${password}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not inserted'
            });
        } else {
            res.send({
                message: 'data inserted'
            });
        }
    })
})

app.put('/user/:id', (req, res) => {
    console.log(req.body, 'updatedata');

    let gID = req.params.id;
    let idRole = req.body.idRole;
    let nom = req.body.nom;
    let tele = req.body.tele;
    let email = req.body.email;
    let password = req.body.password;

    let qr = `update user set idRole = '${idRole}', nom = '${nom}', tele = '${tele}', email = '${email}', password = '${password}' where id = ${gID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not updated'
            });
        } else {
            res.send({
                message: 'data updated'
            });
        }
    });
});

app.delete('/user/:id', (req, res) => {
    let userID = req.params.id;

    let qr = `delete from user where id = ${userID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

//---------------CRUD FOURNISSEUR-------------------------
app.get('/fournisseur', (req, res) => {
    let qr = "select * from fournisseur";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all fournisseurs data',
                data: result
            })
        }
    })
});

app.get('/fournisseur/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from fournisseur where id = ${gID}`;
    db.query(qr, (err, result) => {
        if(err) console.log(err);
        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            })
        }
        else {
            res.send({
                message: 'not found'
            })
        }
    })
});

app.post('/fournisseur', (req, res) => {
    console.log(req.body, 'createdata');

    let idUser = req.body.idUser;
    let nom = req.body.nom;
    let email = req.body.email;
    let tele = req.body.tele;
    let description = req.body.description;

    let qr = `INSERT INTO fournisseur (idUser, nom, email, tele, description) VALUES (${idUser}, '${nom}', '${email}', '${tele}', '${description}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not inserted'
            });
        } else {
            res.send({
                message: 'data inserted'
            });
        }
    })
})

app.put('/fournisseur/:id', (req, res) => {
    console.log(req.body, 'updatedata');
  
    let id = req.params.id;
    let idUser = req.body.idUser;
    let nom = req.body.nom;
    let email = req.body.email;
    let tele = req.body.tele;
    let description = req.body.description;
  
    let qr = `UPDATE fournisseur SET idUser = '${idUser}', nom = '${nom}', email = '${email}', tele = '${tele}', description = '${description}' WHERE id = ${id}`;
  
    db.query(qr, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: 'Data not updated'
        });
      } else {
        res.send({
          message: 'Data updated'
        });
      }
    });
});

app.delete('/fournisseur/:id', (req, res) => {
    let fournisseurID = req.params.id;

    let qr = `delete from fournisseur where id = ${fournisseurID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

//---------------CRUD Commande-------------------------
app.get('/commande', (req, res) => {
    let qr = "select * from commande";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all commandes data',
                data: result
            })
        }
    })
});

app.get('/commande/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from commande where id = ${gID}`;
    db.query(qr, (err, result) => {
        if(err) console.log(err);
        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            })
        }
        else {
            res.send({
                message: 'not found'
            })
        }
    })
});

app.get('/commande/0/:idUser', (req, res) => {
    let ID = req.params.idUser;
    let qr = `select * from commande where idUser = ${ID}`;
    db.query(qr, (err, result) => {
        if(err) console.log(err);
        if(result.length > 0) {
            res.send({
                message: 'get all data user',
                data: result
            })
        }
        else {
            res.send({
                message: 'not found'
            })
        }
    })
});

app.post('/commande', (req, res) => {
    console.log(req.body, 'createdata');

    let idUser = req.body.idUser;
    let idEtat = req.body.idEtat;
    let prixCommande = req.body.prixCommande;
    let dateCommande = req.body.dateCommande;

    let qr = `INSERT INTO commande (idUser, idEtat, prixCommande, dateCommande) VALUES (${idUser}, '${idEtat}', '${prixCommande}', '${dateCommande}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not inserted'
            });
        } else {
            res.send({
                id:result.insertId,
                message: 'data inserted'
            });
        }
    })
})

app.put('/commande/:id', (req, res) => {
    console.log(req.body, 'updatedatasss');
  
    let id = req.params.id;
    let idUser = req.body.idUser;
    let idEtat = req.body.idEtat;
    let prixCommande = req.body.prixCommande;
    let dateCommande = req.body.dateCommande;

    let qr = `UPDATE commande SET idUser = '${idUser}', idEtat = '${idEtat}', prixCommande = '${prixCommande}', dateCommande = '${dateCommande}' WHERE id = ${id}`;
    //let qr1 = `SELECT qteTotal FROM lignedecommande where idCommande in (SELECT id FROM commande where id = ${id})`;

    db.query(qr, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: 'Data not updated'
        });
      } else {
        res.send({
          message: 'Data updated'
        });
      }
    });
});

app.patch('/commande/:id', (req, res) => {
    console.log(req.body, 'updatedata');
  
    let id = req.params.id;
    let idEtat = req.body.idEtat;
    let qr = `UPDATE commande SET idEtat = '${idEtat}' WHERE id = ${id}`;

    db.query(qr, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: 'Data not updated'
        });
      } else {
        res.send({
          message: 'Data updated'
        });
      }
    });
});

app.delete('/commande/:id', (req, res) => {
    let commandeID = req.params.id;

    let qr = `delete from commande where id = ${commandeID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

//---------------CRUD Produit-------------------------
app.get('/produit', (req, res) => {
    let qr = "select * from produit";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all produits data',
                data: result
            })
        }
    })
});

app.get('/produit/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from produit where id = ${gID}`;
    db.query(qr, (err, result) => {
        if(err) console.log(err);
        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            })
        }
        else {
            res.send({
                message: 'not found'
            })
        }
    })
});

app.post('/produit', (req, res) => {
    console.log(req.body, 'createdata');

    let idUser = req.body.idUser;
    let idCategorie = req.body.idCategorie;
    let nom = req.body.nom;
    let description = req.body.description;
    let qteStock = req.body.qteStock;
    let prix = req.body.prix;

    let qr = `INSERT INTO produit (idUser, idCategorie, nom, description, qteStock, prix) VALUES (${idUser}, '${idCategorie}', '${nom}', '${description}', '${qteStock}', '${prix}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not inserted'
            });
        } else {
            res.send({
                message: 'data inserted'
            });
        }
    })
})

app.put('/produit/:id', (req, res) => {
    console.log(req.body, 'updatedata');
  
    let id = req.params.id;
    let idUser = req.body.idUser;
    let idCategorie = req.body.idCategorie;
    let nom = req.body.nom;
    let description = req.body.description;
    let qteStock = req.body.qteStock;
    let prix = req.body.prix;
  
    let qr = `UPDATE produit SET idUser = '${idUser}', idCategorie = '${idCategorie}', nom = '${nom}', description = '${description}', qteStock = '${qteStock}', prix = '${prix}' WHERE id = ${id}`;
  
    db.query(qr, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: 'Data not updated'
        });
      } else {
        res.send({
          message: 'Data updated'
        });
      }
    });
});

app.delete('/produit/:id', (req, res) => {
    let produitID = req.params.id;

    let qr = `delete from produit where id = ${produitID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

//---------------CRUD Categorie-------------------------
app.get('/categorie', (req, res) => {
    let qr = "select * from categorie";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all categories data',
                data: result
            })
        }
    })
});

app.get('/categorie/:id', (req, res) => {
    let gID = req.params.id;
    let qr = `select * from categorie where id = ${gID}`;
    db.query(qr, (err, result) => {
        if(err) console.log(err);
        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            })
        }
        else {
            res.send({
                message: 'not found'
            })
        }
    })
});

app.post('/categorie', (req, res) => {
    console.log(req.body, 'createdata');

    let nom = req.body.nom;

    let qr = `INSERT INTO categorie (nom) VALUES ('${nom}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not inserted'
            });
        } else {
            res.send({
                message: 'data inserted'
            });
        }
    })
})

app.put('/categorie/:id', (req, res) => {
    console.log(req.body, 'updatedata');
  
    let id = req.params.id;
    let nom = req.body.nom;
  
    let qr = `UPDATE categorie SET nom = '${nom}' WHERE id = ${id}`;
  
    db.query(qr, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: 'Data not updated'
        });
      } else {
        res.send({
          message: 'Data updated'
        });
      }
    });
});

app.delete('/categorie/:id', (req, res) => {
    let categorieID = req.params.id;

    let qr = `delete from categorie where id = ${categorieID}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

//---------------CRUD Livraison-------------------------
app.get('/livraison', (req, res) => {
    let qr = "select * from livraison";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all livraisons data',
                data: result
            })
        }
    })
});

app.get('/livraison/:idFournisseur/:idProduit', (req, res) => {
    const frID = req.params.idFournisseur;
    const prID = req.params.idProduit;
  
    const qrPrdFrn = `SELECT * FROM livraison WHERE idFournisseur = ${frID} AND idProduit = ${prID}`;
    const qrFourn = `SELECT * FROM livraison WHERE idFournisseur = ${frID}`;
    const qrProd = `SELECT * FROM livraison WHERE idProduit = ${prID}`;
  
    db.query(qrPrdFrn, (err, prodFourResult) => {
        if (err) console.log(err);
        if (prodFourResult.length > 0) {
            res.send({
            message: 'get Single data',
            data: prodFourResult
            });
      } else {
        db.query(qrFourn, (err, fourResult) => {
            if (err) console.log(err);
            if (fourResult.length > 0) {
              res.send({
                message: 'get data of Products of a Command',
                data: fourResult
              });
          } else {
            db.query(qrProd, (err, prodResult) => {
                if (err) console.log(err);
                if (prodResult.length > 0) {
                    res.send({
                    message: 'get data of Commands of a Product',
                    data: prodResult
                    });
              } else {
                res.send({
                  message: 'not found'
                });
              }
            });
          }
        });
      }
    });
}); 

app.post('/livraison', (req, res) => {
    console.log(req.body, 'createdata');

    let idFournisseur = req.body.idFournisseur;
    let idProduit = req.body.idProduit;
    let delaisLivraison = req.body.delaisLivraison;
    let prixLivraison = req.body.prixLivraison;

    let qr = `INSERT INTO livraison (idFournisseur, idProduit, delaisLivraison, prixLivraison) VALUES ('${idFournisseur}', '${idProduit}', '${delaisLivraison}', '${prixLivraison}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not inserted'
            });
        } else {
            res.send({
                message: 'data inserted'
            });
        }
    })
})

app.put('/livraison/:idFournisseur/:idProduit', (req, res) => {
    console.log(req.body, 'updatedata');

    let idFournisseur = req.params.idFournisseur;
    let idProduit = req.params.idProduit;
    let delaisLivraison = req.body.delaisLivraison;
    let prixLivraison = req.body.prixLivraison;
  
    let qr = `UPDATE livraison SET idFournisseur = '${idFournisseur}', idProduit = '${idProduit}', delaisLivraison = '${delaisLivraison}', prixLivraison = '${prixLivraison}' WHERE idFournisseur = ${idFournisseur} AND idProduit = ${idProduit}`;
    
    db.query(qr, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: 'Data not updated'
        });
      } else {
        res.send({
          message: 'Data updated'
        });
      }
    });
});

app.delete('/livraison/:idFournisseur/:idProduit', (req, res) => {
    let idFournisseur = req.params.idFournisseur;
    let idProduit = req.params.idProduit;

    let qr = `delete from livraison where idFournisseur = ${idFournisseur} and idProduit = ${idProduit}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

//---------------CRUD Ligne de Commande-------------------------
app.get('/lignedecommande', (req, res) => {
    let qr = "select * from lignedecommande";
    db.query(qr, (err, result) => {
        if(err) console.log(err, 'err');
        if(result.length > 0) {
            res.send({
                message: 'all ligne de commandes data',
                data: result
            })
        }
    })
});

app.get('/lignedecommande/:idProduit/:idCommande', (req, res) => {
    //const prID = req.params.idProduit;
    const cmID = req.params.idCommande;
  
    //const qrProdCmd = `SELECT * FROM ligneDeCommande WHERE idProduit = ${prID} AND idCommande = ${cmID}`;
    const qrCmd = `SELECT * FROM ligneDeCommande WHERE idCommande = ${cmID}`;
    //const qrProd = `SELECT * FROM ligneDeCommande WHERE idProduit = ${prID}`;
  
    db.query(qrCmd, (err, cmdResult) => {
        if (err) console.log(err);
        if (cmdResult.length > 0) {
          res.send({
            message: 'get data of Products of a Command',
            data: cmdResult
            })
        }
    })

    /*db.query(qrProdCmd, (err, prodCmdResult) => {
        if (err) console.log(err);
        if (prodCmdResult.length > 0) {
            res.send({
            message: 'get Single data',
            data: prodCmdResult
            });
      } else {
        db.query(qrCmd, (err, cmdResult) => {
            if (err) console.log(err);
            if (cmdResult.length > 0) {
              res.send({
                message: 'get data of Products of a Command',
                data: cmdResult
              });
          } else {
            db.query(qrProd, (err, prodResult) => {
                if (err) console.log(err);
                if (prodResult.length > 0) {
                    res.send({
                    message: 'get data of Commands of a Product',
                    data: prodResult
                    });
              } else {
                res.send({
                  message: 'not found'
                });
              }
            });
          }
        });
      }
    });*/

});  

app.post('/lignedecommande', (req, res) => {
    console.log(req.body, 'createdata');
    Array.from(req.body).forEach(ligne=>{
        let idProduit = ligne.idProduit;
        let idCommande = ligne.idCommande;
        let qteTotal = ligne.qteTotal;
        let prixTotal = ligne.prixTotal;
        let qr = `INSERT INTO lignedecommande (idProduit, idCommande, qteTotal, prixTotal) VALUES ('${idProduit}', '${idCommande}', '${qteTotal}', '${prixTotal}')`;

        db.query(qr, (err, result) => {
            if (err) {
                console.log(err);
                res.send({
                    message: 'data not inserted'
                });
            } else {
              console.log('data inserted');
            }
        })
    })
    

    res.send({
        message: 'data inserted'
    });
})

app.put('/lignedecommande/:idProduit/:idCommande', (req, res) => {
    console.log(req.body, 'updatedata');
  
    let idProduit = req.params.idProduit;
    let idCommande = req.params.idCommande;
    let qteTotal = req.body.qteTotal;
    let prixTotal = req.body.prixTotal;
  
    let qr = `UPDATE lignedecommande SET idProduit = '${idProduit}', idCommande = '${idCommande}', qteTotal = '${qteTotal}', prixTotal = '${prixTotal}' WHERE idProduit = ${idProduit} AND idCommande = ${idCommande}`;
  
    db.query(qr, (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: 'Data not updated'
        });
      } else {
        res.send({
          message: 'Data updated'
        });
      }
    });
});

app.delete('/lignedecommande/:idProduit/:idCommande', (req, res) => {
    let idProduit = req.params.idProduit;
    let idCommande = req.params.idCommande;

    let qr = `delete from lignedecommande where idProduit = ${idProduit} and idCommande = ${idCommande}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                message: 'data not deleted'
            });
        } else {
            res.send({
                message: 'data deleted'
            });
        }
    });
});

app.listen(port, () => {
    console.log('Server running');
});