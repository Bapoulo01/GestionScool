 const sidebar = document.querySelector(".sidebar");
 const sidebarToggler = document.querySelector(".sidebar-toggler");
// sidebarToggler represente le classe name du fleche
 sidebarToggler.addEventListener("click",() =>{
    // sa s'est une ecouteur d'evenement 
    sidebar.classList.toggle("collapsed");  //remplace sidebar par collapsed
    // alert('ok');
    

})

