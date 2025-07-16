const { default: mongoose } = require("mongoose");
const userModel = require("../Model/userModel.js");

const {
  isValid,
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidPassword,
} = require("./validator.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

// Add Users
const addUsers = async (req, res) => {
  try {
    let userData = req.body;
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    let { Name, Email, Contact, password, Address, gender, Age } = userData;

    // Name Validation
    if (!isValid(Name)) {
      return res.status(400).json({ msg: "Name is Required" });
    }

    if (!isValidName(Name)) {
      return res.status(400).json({ msg: "Invalid Name" });
    }

    // UserEmail Validation
    if (!isValid(Email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }

    if (!isValidEmail(Email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    let duplicateEmail = await userModel.findOne({ Email });
    if (duplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // User Contact Validation
    if (!isValid(Contact)) {
      return res.status(400).json({ msg: "Contact is Required" });
    }
    if (!isValidPhone(Contact)) {
      return res.status(400).json({ msg: "Invalid Contact" });
    }

    let duplicateContact = await userModel.findOne({ Contact });
    if (duplicateContact) {
      return res.status(400).json({ msg: "Contact Already Exists" });
    }

    // Address Validation
    if (!isValid(Address)) {
      return res.status(400).json({ msg: "Address is Required" });
    }

    // Gender Validation
    if (!isValid(gender)) {
      return res.status(400).json({ msg: "Gender is Required" });
    }

    let validGenders = ["male", "female", "others"];
    if (!validGenders.includes(gender.trim().toLowerCase())) {
      return res
        .status(400)
        .json({ msg: "Gender must be 'male', 'female' and 'Others'" });
    }

    // Password Validation
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        msg: "Password must be contain 6-20 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      });
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    // Age Validation
    if (!isValid(Age)) {
      return res.status(400).json({ msg: "Age is Required" });
    }

    let user = await userModel.create({
      Name,
      Email,
      Contact,
      password: hashedPassword,
      Address,
      gender,
      Age,
    });
    return res.status(201).json({ msg: "User Added Successfully", user });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// get all Users

const getUsers=async(req,res)=>{

  try {
    let userData=req.body;
    let users = await userModel.find();
    if(users.length===0){
      return res.status(404).json({ msg: "No Users Found" });
    }
    return res.status(200).json({ msg: "Users Found", users });
    
  } catch (error) {
    return res.status(500).json({msg:"Internal server error"})
  }
}

//Update users
const updateUser = async (req, res) =>{
  try {
    let userId=req.params.id;
    
    let loggedInUserId=req.user.userId;
    if(userId!==loggedInUserId){
      return res.status(403).json({msg:"You are not authorized to update this user"})
    }

    //user id validation
    if(!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).json({msg:"Invalid User Id"})
    }
    let userData=req.body;
    if(Object.keys(userData).length===0){
      return res.status(400).json({msg:"No data provided"})

    }
    let { Name, Email, Contact, password, Address, gender, Age } = userData;

    // Name Validation
    if(Name!==undefined){
      if (!isValid(Name)) {
      return res.status(400).json({ msg: "Name is Required" });
    }
    if (!isValidName(Name)) {
      return res.status(400).json({ msg: "Invalid Name" });
    }
  }

    // UserEmail Validation
    if(Email!==undefined){
       if (!isValid(Email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }
   
    if (!isValidEmail(Email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    let duplicateEmail = await userModel.findOne({ Email });
    if (duplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }
  }

    // User Contact Validation
    if(Contact!==undefined){
      if (!isValid(Contact)) {
      return res.status(400).json({ msg: "Contact is Required" });
    }
    
    if (!isValidPhone(Contact)) {
      return res.status(400).json({ msg: "Invalid Contact" });
    }

    let duplicateContact = await userModel.findOne({ Contact });
    if (duplicateContact) {
      return res.status(400).json({ msg: "Contact Already Exists" });
    }
  }

    // Address Validation
    if(Address!==undefined){
      if (!isValid(Address)) {
      return res.status(400).json({ msg: "Address is Required" });
    }
    }
    

    // Gender Validation
    if(gender!==undefined){
       if (!isValid(gender)) {
      return res.status(400).json({ msg: "Gender is Required" });
    }
    let validGenders = ["male", "female", "others"];
    if (!validGenders.includes(gender.trim().toLowerCase())) {
      return res
        .status(400)
        .json({ msg: "Gender must be 'male', 'female' and 'Others'" });
    }
    }

    // Password Validation
    let salt;
    let hashedPassword;
    if(password!==undefined){
       if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }
    
    if (!isValidPassword(password)) {
      return res.status(400).json({
        msg: "Password must be contain 6-20 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
      });
    }

     salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
    }

    // Age Validation
    if (Age !== undefined) {
      if (!isValid(Age)) {
      return res.status(400).json({ msg: "Age is Required" });
    }


    }
    
    let update = await userModel.findByIdAndUpdate(
      userId,
      {
      Name,
      Email,
      Contact,
      password: hashedPassword,
      Address,
      gender,
      Age,
    },
     { new: true }
  );
   if (!update) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    return res.status(200).json({ msg: "User Updated Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Internal server error"})
    
  }
}

// Delet User

const deleteUser=async(req,res)=>{
  try {
    let userId=req.params.id;
    let deletedUser=await userModel.findByIdAndDelete(userId)
      if(!deleteUser){
        return res.status(404).json({ msg: "User Not Found" });
      }

      return res.status(200).json({msg:"Deleted user succeessfully",deleteUser})
    
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Internal server error"})
    
  }
}
const loginUser=async(req,res)=>{
  try {
    let{Email,password}=req.body;
    if(Object.keys(req.body).length==0){
       return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }
    // if body empty
    if(!Email || !password){
      return res.status(400).json({ msg: "Email and Password are required" });
    }
    if(!isValid(Email)) {
      return res.status(400).json({ msg: "Email is Required" });
    }
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is Required" });
    }
    let user=await userModel.findOne({Email})
    if(!user){
      return res.status(404).json({ msg: "User Not Found with this email" });
    }
    let matchedUser=await bcrypt.compare(password,user.password);
    if(!matchedUser){
      return res.status(400).json({ msg: "Invalid Password" });
    }

    let token=jwt.sign(
      {userId:user._id,Email: user.Email},
      "my-secret-key",
      { expiresIn: "24h" }
    );
    return res.status(200).json({msg:"login successfully",token})

  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Internal server error"})
    
  }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From token

    const user = await userModel.findById(userId).select("-password"); // Don't return password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};



module.exports = { addUsers,getUsers,updateUser,deleteUser,loginUser,getProfile};
