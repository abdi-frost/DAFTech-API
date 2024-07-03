// models/user.model.js

class User {
    constructor(
      id,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      address,
      profilePicture = null,
      spouseFirstName = null,
      spouseLastName = null,
      relationshipStartDate = null,
      username,
      password,
    ) {
      this.id = id; 
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.dateOfBirth = dateOfBirth;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.profilePicture = profilePicture;
      this.spouseFirstName = spouseFirstName;
      this.spouseLastName = spouseLastName;
      this.relationshipStartDate = relationshipStartDate;
      this.username = username;
      this.password = password;
    }
  }
  
  module.exports = User;
  