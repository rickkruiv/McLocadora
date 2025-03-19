function enviarWhatsApp( event ) {

    event.preventDefault();
    
    let numero   = "5544997687380";
    let nome     = document.getElementById( "name-input" ).value;
    let mensagem = document.getElementById( "message" ).value;
    let textoFormatado = `Olá, me chamo ${nome}.\n${mensagem}`;
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(textoFormatado)}`;

    window.open(url, "_blank");
}