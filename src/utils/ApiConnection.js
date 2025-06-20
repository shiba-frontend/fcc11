import axios  from "axios";
import React, { useState, useEffect } from "react";

let API_Token = localStorage.getItem("fcc_access_token");
//let API_Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZjYzExLml0aWZmeWNvbnN1bHRhbnRzLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE3MDQxMTIyMzYsImV4cCI6MTcwNDExNTgzNiwibmJmIjoxNzA0MTEyMjM2LCJqdGkiOiJwcmRLcUNoSTdDQUU3T1g3Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJlbWFpbCI6ImZjY2FkbWluQGdtYWlsLmNvbSJ9.Hptjs2YKBwZSFLzY0lbFpIA4kSfeG6_ITjzYt_9UQEs"
//https://fancric11.com/fcc11-api/api/
//https://fcc11.itiffyconsultants.in/api/
// export const BaseUrl = {
//     baseurl: 'https://fcc11.com/fcc11-api/'
// }
export const BaseUrl = {
    baseurl: 'https://fancric11.com/fcc11-api/'
}

// export const BaseUrl = {
//     baseurl: 'https://fcc11.com/fcc11-api/'
// }

export const key = {
     STRIPE_KEY:'pk_test_51PgReODOeRzbqDrrMbC9qwRP47Q16jy4GbLXRPPyg0LButq7EtVKwrpEHhqkEAfdpvJH5uc8RlZM7TUYvNUzLzDA00qAE9ppZj'
} 
//STRIPE_SECRET=sk_test_51PgReODOeRzbqDrrn9s1SqlLvomCCUclEB444UbiHZHdduWukZotqwB5NaYL9nzHimgUSseLeCtq0uArONA98fJ800AFiQZyek

// const URL = "https://fcc11.com/fcc11-api/api/"
const URL = "https://fancric11.com/fcc11-api/api/"

export default axios.create({
    baseURL:URL,
    headers: { 
        //'Content-Type': 'application/json', 
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '+API_Token,
        'X-Requested-With': 'XMLHttpRequest', 
    },
   
})