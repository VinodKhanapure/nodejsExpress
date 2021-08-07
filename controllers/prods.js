const Prod = require("../model/prod");



exports.createProd = (req, res) => {
    // console.log("reqprotocol", req.protocol,req.get("host"));
    const url = req.protocol + "://" + req.get("host");
   
    
    const prod = new Prod({
      name: req.body.name,
      cost: req.body.cost,
      creator: req.userData.userId,
    });
    prod
      .save()
      .then((dbProd) => {
        
        res.status(201).json({
          message: "Prod added successfully",
          post: {
            ...dbProd,
            id: dbProd._id,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message:"Creating A Prod Failed"
        })
      });
  }


  exports.updateProd = (req, res) => {
    const prodModel = new Prod({
      _id: req.params.id,
      name: req.body.name,
      cost: req.body.cost,
      
    });
    
    Prod.updateOne({ _id: req.params.id,creator:req.userData.userId }, prodModel).then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Update successful",
        });
      } else {
        res.status(401).json({
          message: "Not Authorized",
        });
      }
    }).catch(err=>{
      res.status(500).json({
        message:"Couldn't Update Prod"
      })
    });
  }


  exports.getProds = (req, res) => {
    
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    
    const prodQuery = Prod.find();
    if (pageSize && currentPage) {
      prodQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    prodQuery
      .then((prods) => {
        
        res.json({
          message: "Prods fecthed successfully",
          prods: prods,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Fecthing Prodss Failed",
        });
      });
  }


  exports.getProd = (req, res) => {
    console.log("###########", req.params.id);
    let id = req.params.id;
    
    Prod.findById({ _id: id })
      .then((prodObj) => {
        res.json({
          prod: prodObj,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Fecthing Prod Failed",
        });
      });
  }

  
  exports.deleteProd = (req, res) => {
    let id = req.params.id;
    console.log("111111")
    let userId = req.userData.userId;
    Prod.deleteOne({ _id: id, creator: userId })
      .then((result) => {
        
        if (result.n > 0) {
          
          res.status(200).json({ message: "Delete successful!" });
        } else {
          
          res.status(401).json({ message: "Not Authorized!" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Deletion Not Done!",
        });
      });
  }