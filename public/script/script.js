$(document).ready(function() {
        let dateDropdown = document.getElementById('year'); 
        
        let currentYear = new Date().getFullYear();    
        let earliestYear = 1970;     
        while (currentYear >= earliestYear) {      
            let dateOption = document.createElement('option');          
            dateOption.text = currentYear;      
            dateOption.value = currentYear;        
            dateDropdown.add(dateOption);      
            currentYear -= 1;    
        };
        
        $('#search').click(function() {
            $('#title-search').append("hello");
            var name = $('#title-search').val();
            var year = $('#year-search').find(":selected").text();
            var rank = $('#year-search').val();

            if (name == "")
                name = ""

            if (name == "")
                year = 0

            if (name == "")
                rank = -1

            $.post('/search-movie', {name: name, year: year, rank: rank},function(err) {
                if(err) throw err
            });
        });

        $('#add-button').click(function() {
            console.log("was here");
            var name = $('#title').val();
            var year = $('#year').find(":selected").text();
            var rank = $('#rank').val();
            $.post('/add-movie', {name: name, year: year, rank: rank},function(err) {
                if(err) throw err
            });
        });

        $('#add-button').on('keyup', function(){
        
            var title = $('#title').val();
            var year = $('#year').val();
            var rank = $('#rank').val();

            if(title == "" || year == ""  || rank == "" ){
                $('#add-button').attr('disabled','disabled');
            } else {
                $('#add-button').removeAttr('disabled');
            }
        });
})