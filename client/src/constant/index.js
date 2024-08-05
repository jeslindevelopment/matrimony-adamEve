import secureLocalStorage from "react-secure-storage";

export const GENDER_TYPE = ["Male", "Female"];
export const MARITAL_STATUS = [
  "Never Married",
  "Married",
  "Divorced",
  "Widowed",
  "Awaiting Divorce",
  "Annulled",
  "Separated",
];

export const DENOMINATION_TYPES = [
  "Adventist",
  "Baptist",
  "Believer",
  "Born Again",
  "Brethren",
  "Church of North India",
  "Church of South India",
  "Evangelical",
  "Pentecostal",
  "Presbyterian",
  "Protestant",
  "Marthoma",
  "Messianic Judaism",
  "Methodist",
  "Roman Catholic",
  "Seventh Day Adventist",
  "Others",
];
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
export const HEIGHT = [
  "4ft 4in - 132cm",
  "4ft 5in - 135cm",
  "4ft 6in - 137cm",
  "4ft 7in - 140cm",
  "4ft 8in - 142cm",
  "4ft 9in - 145cm",
  "4ft 10in - 147cm",
  "4ft 11in - 150cm",
  "5ft - 152cm",
  "5ft 1in - 155cm",
  "5ft 2in - 157cm",
  "5ft 3in - 160cm",
  "5ft 4in - 162cm",
  "5ft 5in - 165cm",
  "5ft 6in - 167cm",
  "5ft 7in - 170cm",
  "5ft 8in - 173cm",
  "5ft 9in - 175cm",
  "5ft 10in - 178cm",
  "5ft 11in - 180cm",
  "6ft - 183cm",
  "6ft 1in - 185cm",
  "6ft 2in - 188cm",
  "6ft 3in - 190cm",
  "6ft 4in - 193cm",
  "6ft 5in - 195cm",
  "6ft 6in - 198cm",
  "6ft 7in - 201cm",
  "6ft 8in - 203cm",
];
export const BODY_TYPES = ["Slim", "Athletic", "Average", "Healthy", "Heavy"];
// HIGHEST EDUCATION
export const HIGHEST_EDUCATION = [
  "Uneducated",
  "Middle School",
  "High School",
  "Higher Secondary",
  "Graduate",
  "Post Graduate",
  "Doctorate",
  "PhD",
  "M. Phil",
  "Other"
];

// OCCUPATION
export  const OCCUPATION = [
  "Unemployed",
  "Student",
  "Govt. Servant",
  "Private Job",
  "Self Employed",
  "Commission Agent",
  "NGO",
  "Business",
  "Full Time Minister",
  "Looking for a Job",
  "Other"
];

// ANNUAL INCOME
export const ANNUAL_INCOME = [
  "Not Applicable",
  "Below 1 Lacs",
  "Rs. 1 – 2 Lacs",
  "Rs. 2 – 3 Lacs",
  "Rs. 3 – 4 Lacs",
  "Rs. 4 – 5 Lacs",
  "Rs. 5 – 6 Lacs",
  "Rs. 6 – 7 Lacs",
  "Rs. 7 – 8 Lacs",
  "Rs. 8 – 9 Lacs",
  "Rs. 9 – 10 Lacs",
  "Rs. 10 – 11 Lacs",
  "Rs. 11 – 12 Lacs",
  "Rs. 12 – 13 Lacs",
  "Rs. 14 – 16 Lacs",
  "Rs. 17 – 20 Lacs",
  "Rs. 21 – 25 Lacs",
  "Rs. 26 – 30 Lacs",
  "Rs. 31 – 35 Lacs",
  "Rs. 36 – 40 Lacs",
  "Rs. 41 – 45 Lacs",
  "Rs. 46 – 50 Lacs",
  "Rs. 51 – 75 Lacs",
  "Rs. 76 – 99 Lacs",
  "Rs. 99 Lacs Plus"
];

//
export const COMPLEXION = [
  "Fair",
  "Very Fair",
  "Wheatish",
  "Medium Wheatish",
  "Dark",
  "Very Fair",
  "Wheatish",
  "Medium Wheatish",
  "Dark",
];

export const EATING_HABIT = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
// Language

export const LANGUAGES = [
  "Hindi",
  "English",
  "Marathi",
  "Rajasthani",
  "Punjabi",
  "Haryanvi",
  "Bengali",
  "Urdu",
  "Sindhi",
  "Tamil",
  "Odia",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Arunachali",
  "Assamese",
  "Bhojpuri",
  "Chhattisgarhi",
  "Dogri",
  "Garhwali",
  "Gujarati",
  "Himachali",
  "Kashmiri",
  "Konkani",
  "Manipuri",
  "Mizo",
  "Nepali",
  "Other"
];
export const BLOOD_GROUP = [
  "A+ve",
  "A-ve",
  "AB+ve",
  "AB-ve",
  "B+ve",
  "B-ve",
  "O+ve",
  "O-ve",
  "Other",
  "A+ve",
  "A-ve",
  "AB+ve",
  "AB-ve",
  "B+ve",
  "B-ve",
  "O+ve",
  "O-ve",
  "Other",
];

// DRINK
export const DRINK = ["Yes", "No", "Occasionally"];
export const SMOKE = ["Yes", "No", "Sometimes"];

// MINISTRY IF Any
export const MINISTRY = [
  "Prophet",
  "Apostle",
  "Evangelist",
  "Pastor",
  "Bible Teacher",
  "Preacher",
  "Worshipper",
  "Worship Leader",
  "Translator",
  "Sunday School Teacher",
  "Other",
  "No Any"
];

// Father’s Occupation
export const  FATHER_OCCUPATION = [
  "Business Owner",
  "Commission Agent",
  "Daily Wages Labour",
  "Farming",
  "Full time minister",
  "Govt. Servant",
  "Homemaker",
  "NGO",
  "Passed Away",
  "Pensioner",
  "Private Job",
  "Property Broker",
  "Retired",
  "Self Employed",
  "Other"
];

// Mother’s Occupation
export const  MOTHER_OCCUPATION = [
  "Business Owner",
  "Commission Agent",
  "Daily Wages Labour",
  "Farming",
  "Full time minister",
  "Govt. Servant",
  "Homemaker",
  "NGO",
  "Passed Away",
  "Pensioner",
  "Private Job",
  "Property Broker",
  "Retired",
  "Self Employed",
  "Other"
];

export const loginData= secureLocalStorage.getItem(process.env.REACT_APP_TOKEN_STORAGE_KEY)