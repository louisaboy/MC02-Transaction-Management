$(document).ready(function() {
let dateDropdown = document.getElementById('year-search'); 
        
        let currentYear = new Date().getFullYear();    
        let earliestYear = 1970;     
        while (currentYear >= earliestYear) {      
            let dateOption = document.createElement('option');          
            dateOption.text = currentYear;      
            dateOption.value = currentYear;        
            dateDropdown.add(dateOption);      
            currentYear -= 1;    
        }
    
    })