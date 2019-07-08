const jsonfile = require('jsonfile')
const file = './DB/users.json'
module.exports = app =>
{
    /*jsonfile.readFile(file, function(err, obj) 
    {
        console.dir(obj)
    })*/
    app.get("/users", (req, res) => 
    {
        console.log("fetching all users");
        
        // jsonfile reading
        jsonfile.readFile("./DB/users.json", function(err, content)
        {
            // send file contents back to sender
            res.send(content);
        });
    });
    app.post("/users/new", (req, res) => 
    {

        let email    = req.body.email
        let username = req.body.username

        jsonfile.readFile(file, function(err, content) 
        {
            if(err) throw err;
            content.push({ email: email, username: username });

            //console.log(req.body);
            //console.log(req);
            console.log("added " + req.body.email + " to DB");

            jsonfile.writeFile(file, content, function(err) 
            {
                console.log(err);
            });

            res.sendStatus(200);
      
        });
    });
    app.delete("/users/destroy", (req, res) => {

        //console.log("test 1")
        let email = req.body.email;
        //console.log("test 2")
    
        jsonfile.readFile(file, function(err, content) 
        {
    
            //we start at content-length-1 and check > 0 
            //because the length will change when deleting a user from the array
            //by the way it's faster to do a loop iteration in the descending direction since
            //we don't have to access content.length at each check :o 
            //console.log(content.length);
            for (let i = content.length - 1; i >= 0; i--) 
            {
                //console.log("test 4",i, content[i].email);
        
                if (content[i].email === email) 
                {
                    console.log("removing " + content[i].email + "from DB");
                    content.pop(i);
                }
                //to delete an empty entry in the DB we set email to null in the body of the delete request
                else if( content[i].email === undefined && email === null )
                {
                  console.log("removing empty entries from DB");
                  content.pop(i);
                }
        
            }
            console.log("contenu", content);
            console.log("email", email);
        
            jsonfile.writeFile(file, content, function(err) 
            {
                console.log(err);
            });
    
          res.sendStatus(200);
        });
    });
    app.put("/user", (req, res) => 
    {
        let user;
        let username = req.body.username;
        let email = req.query.email || req.body.email;
        console.log("query : ",req.query,"\nbody : ", req.body);
        if(email === undefined|| email === null)
        {
          res.send("email not specified");
          console.log("email not specified");
          return "";
        }
        if(username === undefined || username === null)
        {
          res.send("username not specified");
          console.log("username not specified");
          return "";
        }

      
        jsonfile.readFile(file, function(err, content) 
        {
            let alreadyInDatabase = false
            for (let i = content.length - 1; i >= 0; i--) 
            {
              if (content[i].email === email) {
        
                console.log("updated user " + email + " has now username : " + username);
        
                user = content[i];
                user.username = username;
                alreadyInDatabase=true;
        
              }
            }
            if(!alreadyInDatabase)
            {
                user=
                {
                  email : email,
                  username : username
                };
                content.push(user);
                console.log("added " + email + " to DB");
            }
        
            jsonfile.writeFile(file, content, function(err) 
            {
              console.log(err);
            });
        
        });
        res.send(user);
    });
    app.get("/user", (req, res) => {
      let user=undefined;
      let email = req.query.email||req.body.email;
    
      jsonfile.readFile(file, function(err, content) {
        for (let  i = content.length - 1; i >= 0; i--) {
          if (content[i].email === email) {
            console.log("found user" + content[i]);
            console.log(content[i]);
            user = content[i];
          }
        }
        if(user===undefined)
        {
          console.log("user not found");
        }
    
        res.send(user);
      });
    });
    
}


/* CODE LUDO P

const jsonfile = require("jsonfile");
const file_path = "./DB/users.json";

module.exports = app => {

  app.put("/user", (req, res) => {

    let user;
    let username = req.body.username;
    let email    = req.query.email;

    jsonfile.readFile(file_path, function(err, content) {
      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === req.query.email) {

          console.log("updated user " + req.query.email + " has now username : " + username);

          user = content[i];
          user.username = username;

        }
      }

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });

    });
    res.send(user);
  });

  app.delete("/users/destroy", (req, res) => {

    let email = req.body.email;

    jsonfile.readFile(file_path, function(err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.pop(i);
        }

      }

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });

  app.get("/users", (req, res) => {
    console.log("fetching all users");

    jsonfile.readFile(file_path, function(err, content) {
      res.send(content);
    });
  });

  app.get("/user", (req, res) => {

    let user;
    let username = req.query.username;

    jsonfile.readFile(file_path, function(err, content) {

      for (var i = content.length - 1; i >= 0; i--) {

        if (content[i].username === username) {
          console.log("user found");
          console.log(content[i]);
          user = content[i];
        }

      }

      res.send(user);
    });
  });

  app.post("/users/new", (req, res) => {

    let { email, username } = req.body;

    jsonfile.readFile(file_path, function(err, content) {

      content.push({ email, username });

      console.log("added " + email + "to DB");

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });
};

*/


/**/ 