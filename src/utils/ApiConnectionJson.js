import axios  from "axios";
import React, { useState, useEffect } from "react";

let API_Token = localStorage.getItem("fcc_access_token");
//let API_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZjYzExLml0aWZmeWNvbnN1bHRhbnRzLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE3MDQxMTIyMzYsImV4cCI6MTcwNDExNTgzNiwibmJmIjoxNzA0MTEyMjM2LCJqdGkiOiJwcmRLcUNoSTdDQUU3T1g3Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJlbWFpbCI6ImZjY2FkbWluQGdtYWlsLmNvbSJ9.Hptjs2YKBwZSFLzY0lbFpIA4kSfeG6_ITjzYt_9UQEs"

// export const BaseUrl = {
//     baseurl: 'https://fcc11.com/fcc11-api/'
// }

export const BaseUrl = {
    baseurl: 'https://fancric11.com/fcc11-api/'
}

const URL = "https://fancric11.com/fcc11-api/api/"
//const URL = "https://fcc11.com/fcc11-api/api/"



export default axios.create({
    baseURL:URL,
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+API_Token,
        'X-Requested-With': 'XMLHttpRequest', 
    },
   
})