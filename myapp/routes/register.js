var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
  res.render('index',{title:'Porokmi'});
})
const profiles = {
  syok:{
    image:'/images/luffy.jpg',
    name:'samyok samba',
    company:'self',
    languages:['javascript','python']

  },
  emusk:{
    image:'/images/emusk.jpg',
    name:'elon musk',
    company:['tesla','SpaceX','Boring'],
    languages:['python','C++']
    
  },
  DG:{
    image:'/images/DG.jpg',
    name:'David Goggins',
    company:' US-Marines',
    languages:['stay hard','stay hard','who is gonna carry the boats,...the logs?']
    
  }
}



router.get('/:profile/:username',(req, res)=>{
  const profile = req.params.profile
  const username = req.params.username
  const currentprofile = profiles[username]
  

  if (currentprofile == null){
    res.json({
      confirmation:'fail',
      message:'Profile ' + username + ' not found'
    })

    return
  }

  currentprofile.timestamp = req.timestamp
  res.render('profile',currentprofile)
} )

router.post('/addprofile',(req,res)=>{
  const body = req.body
  body.languages = req.body.languages.split(', ')

  profiles[body.username] = body
  res.redirect('/profile/'+body.username)

  res.json({
    confirmation:'success',
    data:body
  })

})

router.get('/profiles',(req,res)=>{
  const keys = Object.keys(profiles);
  const list = []
  keys.forEach(key => {
    list.push(key)

  })
 
  const data = {
    profileshere:list,
    timestamp:req.timestamp
    
  }

  
  res.render('profiles',data)
  

})



module.exports = router;